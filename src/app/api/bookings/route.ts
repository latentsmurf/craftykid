import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

const createBookingSchema = z.object({
  scheduleId: z.string(),
  classId: z.string(),
  children: z.array(z.string()).optional(), // Child IDs
})

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { scheduleId, classId } = createBookingSchema.parse(body)

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

    // Verify the schedule exists and has availability
    const schedule = await prisma.classSchedule.findUnique({
      where: { id: scheduleId },
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
    })

    if (!schedule) {
      return NextResponse.json(
        { error: 'Class schedule not found' },
        { status: 404 }
      )
    }

    if (schedule.seatsRemaining <= 0) {
      return NextResponse.json(
        { error: 'No seats available' },
        { status: 400 }
      )
    }

    // Verify the class ID matches
    if (schedule.class.id !== classId) {
      return NextResponse.json(
        { error: 'Invalid class ID' },
        { status: 400 }
      )
    }

    // Check if user already has a booking for this schedule
    const existingBooking = await prisma.booking.findFirst({
      where: {
        scheduleId,
        parentId: user.id,
        status: {
          in: ['RESERVED', 'PAID']
        }
      }
    })

    if (existingBooking) {
      return NextResponse.json(
        { error: 'You already have a booking for this class' },
        { status: 400 }
      )
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        scheduleId,
        parentId: user.id,
        amountCents: schedule.class.priceCents,
        status: 'RESERVED'
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

    // Update available seats
    await prisma.classSchedule.update({
      where: { id: scheduleId },
      data: {
        seatsRemaining: {
          decrement: 1
        }
      }
    })

    return NextResponse.json({
      id: booking.id,
      status: booking.status,
      amountCents: booking.amountCents,
      class: {
        id: booking.schedule.class.id,
        title: booking.schedule.class.title,
        instructor: booking.schedule.class.instructor.user.name,
        venue: booking.schedule.class.venue.name
      },
      schedule: {
        startsAt: booking.schedule.startsAt,
        endsAt: booking.schedule.endsAt
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
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

    // Get user's bookings
    const bookings = await prisma.booking.findMany({
      where: {
        parentId: user.id
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(bookings.map(booking => ({
      id: booking.id,
      status: booking.status,
      amountCents: booking.amountCents,
      createdAt: booking.createdAt,
      class: {
        id: booking.schedule.class.id,
        title: booking.schedule.class.title,
        instructor: booking.schedule.class.instructor.user.name,
        venue: booking.schedule.class.venue.name,
        images: booking.schedule.class.images
      },
      schedule: {
        startsAt: booking.schedule.startsAt,
        endsAt: booking.schedule.endsAt
      }
    })))

  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
