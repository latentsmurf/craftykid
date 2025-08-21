import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get user from database and verify admin role
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Get stats
    const [
      totalUsers,
      totalInstructors,
      totalClasses,
      totalBookings,
      totalRevenue,
      pendingVerifications
    ] = await Promise.all([
      prisma.user.count(),
      prisma.instructorProfile.count({
        where: { verificationStatus: 'CLEAR' }
      }),
      prisma.class.count(),
      prisma.booking.count({
        where: { status: 'PAID' }
      }),
      prisma.booking.aggregate({
        where: { status: 'PAID' },
        _sum: { amountCents: true }
      }),
      prisma.instructorProfile.count({
        where: { verificationStatus: 'PENDING' }
      })
    ])

    return NextResponse.json({
      totalUsers,
      totalInstructors,
      totalClasses,
      totalBookings,
      totalRevenue: totalRevenue._sum.amountCents || 0,
      pendingVerifications
    })

  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
