import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

const createPaymentIntentSchema = z.object({
  bookingId: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing not configured' },
        { status: 503 }
      )
    }

    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await req.json()
    const { bookingId } = createPaymentIntentSchema.parse(body)

    // Get booking details
    const booking = await prisma.booking.findUnique({
      where: { 
        id: bookingId,
        parentId: user.id // Ensure user owns this booking
      },
      include: {
        schedule: {
          include: {
            class: {
              include: {
                instructor: {
                  include: {
                    user: true
                  }
                },
                venue: true
              }
            }
          }
        }
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    if (booking.status !== 'RESERVED') {
      return NextResponse.json(
        { error: 'Booking is not in a payable state' },
        { status: 400 }
      )
    }

    // Check if payment intent already exists
    if (booking.paymentIntentId) {
      try {
        const existingIntent = await stripe.paymentIntents.retrieve(booking.paymentIntentId)
        
        if (existingIntent.status === 'requires_payment_method' || 
            existingIntent.status === 'requires_confirmation') {
          return NextResponse.json({
            clientSecret: existingIntent.client_secret,
            paymentIntentId: existingIntent.id
          })
        }
      } catch (error) {
        console.log('Existing payment intent not found, creating new one')
      }
    }

    // Create new payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.amountCents,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        bookingId: booking.id,
        userId: user.id,
        classTitle: booking.schedule.class.title,
        instructorName: booking.schedule.class.instructor.user.name || 'Unknown',
      },
      description: `Crafty Kid - ${booking.schedule.class.title}`,
      receipt_email: user.email,
    })

    // Update booking with payment intent ID
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentIntentId: paymentIntent.id
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create payment intent error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
