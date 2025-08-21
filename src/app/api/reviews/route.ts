import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

const createReviewSchema = z.object({
  targetType: z.enum(['Class', 'Instructor', 'Venue']),
  targetId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(100),
  body: z.string().min(10).max(1000),
  bookingId: z.string().optional() // To verify the user actually attended
})

const getReviewsSchema = z.object({
  targetType: z.enum(['Class', 'Instructor', 'Venue']).optional(),
  targetId: z.string().optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(50).optional().default(10),
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
    const { targetType, targetId, rating, title, body: reviewBody, bookingId } = createReviewSchema.parse(body)

    // If bookingId is provided, verify the user has a completed booking
    if (bookingId) {
      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
          parentId: user.id,
          status: 'PAID'
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
          { error: 'Booking not found or not completed' },
          { status: 400 }
        )
      }

      // Verify the target matches the booking
      if (targetType === 'Class' && booking.schedule.class.id !== targetId) {
        return NextResponse.json(
          { error: 'Review target does not match booking' },
          { status: 400 }
        )
      }

      if (targetType === 'Instructor' && booking.schedule.class.instructorId !== targetId) {
        return NextResponse.json(
          { error: 'Review target does not match booking instructor' },
          { status: 400 }
        )
      }

      // Check if class has already passed
      if (new Date() < booking.schedule.startsAt) {
        return NextResponse.json(
          { error: 'Cannot review before class completion' },
          { status: 400 }
        )
      }
    }

    // Check if user has already reviewed this target
    const existingReview = await prisma.review.findFirst({
      where: {
        parentId: user.id,
        targetType,
        targetId
      }
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this item' },
        { status: 400 }
      )
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        parentId: user.id,
        targetType,
        targetId,
        rating,
        title,
        body: reviewBody,
        verified: !!bookingId // Mark as verified if linked to a booking
      },
      include: {
        parent: {
          select: {
            name: true
          }
        }
      }
    })

    // Update instructor rating if this is an instructor review
    if (targetType === 'Instructor') {
      const instructorReviews = await prisma.review.findMany({
        where: {
          targetType: 'Instructor',
          targetId,
          flagged: false
        }
      })

      const avgRating = instructorReviews.reduce((sum, r) => sum + r.rating, 0) / instructorReviews.length
      
      await prisma.instructorProfile.update({
        where: { id: targetId },
        data: {
          ratingAvg: avgRating,
          ratingCount: instructorReviews.length
        }
      })
    }

    return NextResponse.json({
      id: review.id,
      rating: review.rating,
      title: review.title,
      body: review.body,
      verified: review.verified,
      createdAt: review.createdAt,
      parent: {
        name: review.parent.name
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid review data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create review error:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const params = {
      targetType: searchParams.get('targetType') || undefined,
      targetId: searchParams.get('targetId') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10,
    }

    const { targetType, targetId, page, limit } = getReviewsSchema.parse(params)
    const skip = (page - 1) * limit

    const where = {
      ...(targetType && { targetType }),
      ...(targetId && { targetId }),
      flagged: false // Only show non-flagged reviews
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip,
        take: limit,
        include: {
          parent: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.review.count({ where })
    ])

    const formattedReviews = reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      body: review.body,
      verified: review.verified,
      createdAt: review.createdAt,
      parent: {
        name: review.parent.name
      }
    }))

    return NextResponse.json({
      reviews: formattedReviews,
      total,
      page,
      limit,
      hasMore: total > skip + limit
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Get reviews error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
