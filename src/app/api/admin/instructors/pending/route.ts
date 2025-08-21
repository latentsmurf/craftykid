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

    // Get pending instructor profiles
    const pendingInstructors = await prisma.instructorProfile.findMany({
      where: {
        verificationStatus: 'PENDING'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedInstructors = pendingInstructors.map(profile => ({
      id: profile.id,
      name: profile.user.name || profile.user.email,
      email: profile.user.email,
      crafts: profile.crafts,
      status: profile.verificationStatus,
      submittedAt: profile.createdAt.toISOString()
    }))

    return NextResponse.json(formattedInstructors)

  } catch (error) {
    console.error('Pending instructors error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pending instructors' },
      { status: 500 }
    )
  }
}
