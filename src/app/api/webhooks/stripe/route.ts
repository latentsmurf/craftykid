import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No Stripe signature found' },
        { status: 400 }
      )
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not set')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object
        await handlePaymentSuccess(paymentIntent)
        break
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        await handlePaymentFailure(paymentIntent)
        break
      }
      
      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object
        await handlePaymentCanceled(paymentIntent)
        break
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccess(paymentIntent: any) {
  try {
    const bookingId = paymentIntent.metadata.bookingId
    
    if (!bookingId) {
      console.error('No booking ID in payment intent metadata')
      return
    }

    // Update booking status to PAID
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'PAID',
        receiptUrl: paymentIntent.charges?.data[0]?.receipt_url || null
      },
      include: {
        schedule: {
          include: {
            class: {
              include: {
                instructor: true
              }
            }
          }
        },
        parent: true
      }
    })

    console.log(`Payment successful for booking ${bookingId}`)

    // TODO: Send confirmation email to customer
    // TODO: Send notification to instructor
    // TODO: Create calendar event
    
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailure(paymentIntent: any) {
  try {
    const bookingId = paymentIntent.metadata.bookingId
    
    if (!bookingId) {
      console.error('No booking ID in payment intent metadata')
      return
    }

    // Optionally update booking status or handle failure
    console.log(`Payment failed for booking ${bookingId}:`, paymentIntent.last_payment_error?.message)

    // TODO: Send failure notification email
    // TODO: Release reserved seat after a timeout
    
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

async function handlePaymentCanceled(paymentIntent: any) {
  try {
    const bookingId = paymentIntent.metadata.bookingId
    
    if (!bookingId) {
      console.error('No booking ID in payment intent metadata')
      return
    }

    // Update booking status back to available
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED'
      }
    })

    // Release the reserved seat
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: { scheduleId: true }
    })

    if (booking) {
      await prisma.classSchedule.update({
        where: { id: booking.scheduleId },
        data: {
          seatsRemaining: {
            increment: 1
          }
        }
      })
    }

    console.log(`Payment canceled for booking ${bookingId}`)
    
  } catch (error) {
    console.error('Error handling payment cancellation:', error)
  }
}
