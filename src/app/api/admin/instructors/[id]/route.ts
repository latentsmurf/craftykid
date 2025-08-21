import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

const updateInstructorSchema = z.object({
  action: z.enum(['approve', 'reject'])
})

export async function PATCH(
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

    const body = await req.json()
    const { action } = updateInstructorSchema.parse(body)

    const instructorProfile = await prisma.instructorProfile.findUnique({
      where: { id: params.id },
      include: {
        user: true
      }
    })

    if (!instructorProfile) {
      return NextResponse.json(
        { error: 'Instructor profile not found' },
        { status: 404 }
      )
    }

    // Update verification status
    const newStatus = action === 'approve' ? 'CLEAR' : 'FLAGGED'
    
    await prisma.instructorProfile.update({
      where: { id: params.id },
      data: {
        verificationStatus: newStatus
      }
    })

    // TODO: Send email notification to instructor
    // This would integrate with an email service like SendGrid or AWS SES

    return NextResponse.json({
      success: true,
      message: `Instructor ${action}d successfully`,
      status: newStatus
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Update instructor error:', error)
    return NextResponse.json(
      { error: 'Failed to update instructor status' },
      { status: 500 }
    )
  }
}
