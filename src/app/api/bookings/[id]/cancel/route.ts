import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { auth } from '@clerk/nextjs/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    // Get booking details
    const booking = await prisma.booking.findUnique({
      where: { 
        id: params.id,
        parentId: user.id // Ensure user owns this booking
      },
      include: {
        schedule: {
          include: {
            class: true
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

    if (booking.status === 'CANCELLED') {
      return NextResponse.json(
        { error: 'Booking is already cancelled' },
        { status: 400 }
      )
    }

    // Check if cancellation is within policy (24 hours before class)
    const classStart = new Date(booking.schedule.startsAt)
    const now = new Date()
    const hoursUntilClass = (classStart.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursUntilClass < 24) {
      return NextResponse.json(
        { error: 'Cannot cancel within 24 hours of class start' },
        { status: 400 }
      )
    }

    let refundAmount = 0
    let refundStatus = 'none'

    // Handle refund if payment was made and Stripe is configured
    if (stripe && booking.status === 'PAID' && booking.paymentIntentId) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(booking.paymentIntentId)
        
        if (paymentIntent.status === 'succeeded') {
          // Full refund if cancelled more than 24 hours in advance
          const refund = await stripe.refunds.create({
            payment_intent: booking.paymentIntentId,
            amount: booking.amountCents,
            reason: 'requested_by_customer',
            metadata: {
              bookingId: booking.id,
              userId: user.id,
            }
          })

          refundAmount = refund.amount
          refundStatus = 'full'
        }
      } catch (error) {
        console.error('Refund error:', error)
        // Continue with cancellation even if refund fails
      }
    }

    // Update booking status
    await prisma.booking.update({
      where: { id: params.id },
      data: {
        status: refundAmount > 0 ? 'REFUNDED' : 'CANCELLED',
        updatedAt: new Date()
      }
    })

    // Release the seat
    await prisma.classSchedule.update({
      where: { id: booking.scheduleId },
      data: {
        seatsRemaining: {
          increment: 1
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
      refund: {
        status: refundStatus,
        amount: refundAmount
      }
    })

  } catch (error) {
    console.error('Cancel booking error:', error)
    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    )
  }
}
