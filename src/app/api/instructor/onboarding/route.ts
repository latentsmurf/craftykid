import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

const onboardingSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  bio: z.string().min(10),
  crafts: z.array(z.string()).min(1),
  experience: z.string().min(1),
  teachingExperience: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  portfolioImages: z.array(z.string()).optional(),
  portfolioDescription: z.string().min(10),
  backgroundCheckConsent: z.boolean().refine(val => val === true, {
    message: "Background check consent is required"
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Terms acceptance is required"
  }),
  marketingConsent: z.boolean().optional()
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

    if (user.role !== 'INSTRUCTOR') {
      return NextResponse.json(
        { error: 'Only instructors can complete onboarding' },
        { status: 403 }
      )
    }

    // Check if instructor profile already exists
    const existingProfile = await prisma.instructorProfile.findUnique({
      where: { userId: user.id }
    })

    if (existingProfile) {
      return NextResponse.json(
        { error: 'Instructor profile already exists' },
        { status: 400 }
      )
    }

    const body = await req.json()
    const validatedData = onboardingSchema.parse(body)

    // Update user information
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        phone: validatedData.phone,
        address: `${validatedData.address}${validatedData.city ? `, ${validatedData.city}` : ''}${validatedData.state ? `, ${validatedData.state}` : ''}${validatedData.zipCode ? ` ${validatedData.zipCode}` : ''}`,
        marketingOptIn: validatedData.marketingConsent || false
      }
    })

    // Create instructor profile
    const instructorProfile = await prisma.instructorProfile.create({
      data: {
        userId: user.id,
        bio: validatedData.bio,
        crafts: validatedData.crafts,
        verificationStatus: 'PENDING', // Will be updated after background check
        portfolioMedia: {
          images: validatedData.portfolioImages || [],
          description: validatedData.portfolioDescription
        }
      }
    })

    // Create background check record
    await prisma.backgroundCheck.create({
      data: {
        instructorId: instructorProfile.id,
        provider: 'checkr', // Example provider
        status: 'PENDING',
        tokenRef: `bg_${Date.now()}_${user.id}`,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      instructorId: instructorProfile.id
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    )
  }
}
