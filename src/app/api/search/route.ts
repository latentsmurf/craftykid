import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const searchSchema = z.object({
  query: z.string().min(1).max(100),
  type: z.enum(['all', 'classes', 'instructors']).optional().default('all'),
  location: z.string().optional(),
  craft: z.string().optional(),
  minAge: z.number().min(0).max(18).optional(),
  maxAge: z.number().min(0).max(18).optional(),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(50).optional().default(10),
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const params = {
      query: searchParams.get('query') || '',
      type: searchParams.get('type') || 'all',
      location: searchParams.get('location') || undefined,
      craft: searchParams.get('craft') || undefined,
      minAge: searchParams.get('minAge') ? parseInt(searchParams.get('minAge')!) : undefined,
      maxAge: searchParams.get('maxAge') ? parseInt(searchParams.get('maxAge')!) : undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10,
    }

    const validated = searchSchema.parse(params)
    const skip = (validated.page - 1) * validated.limit

    const results: any = {
      classes: [],
      instructors: [],
      totalClasses: 0,
      totalInstructors: 0,
    }

    // Search classes
    if (validated.type === 'all' || validated.type === 'classes') {
      const classWhere = {
        AND: [
          {
            OR: [
              { title: { contains: validated.query, mode: 'insensitive' as const } },
              { description: { contains: validated.query, mode: 'insensitive' as const } },
              { instructor: { crafts: { has: validated.query } } },
            ],
          },
          validated.location ? { 
            instructor: { 
              user: { 
                address: { contains: validated.location, mode: 'insensitive' as const } 
              } 
            } 
          } : {},
          validated.craft ? { 
            instructor: { 
              crafts: { has: validated.craft } 
            } 
          } : {},
          validated.minAge !== undefined ? { ageMin: { gte: validated.minAge } } : {},
          validated.maxAge !== undefined ? { ageMax: { lte: validated.maxAge } } : {},
        ],
      }

      const [classes, totalClasses] = await Promise.all([
        prisma.class.findMany({
          where: classWhere,
          skip,
          take: validated.limit,
          include: {
            instructor: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    address: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.class.count({ where: classWhere }),
      ])

      results.classes = classes
      results.totalClasses = totalClasses
    }

    // Search instructors
    if (validated.type === 'all' || validated.type === 'instructors') {
      const instructorWhere = {
        AND: [
          {
            OR: [
              { user: { name: { contains: validated.query, mode: 'insensitive' as const } } },
              { bio: { contains: validated.query, mode: 'insensitive' as const } },
              { crafts: { has: validated.query } },
            ],
          },
          validated.location ? { 
            user: { 
              address: { contains: validated.location, mode: 'insensitive' as const } 
            } 
          } : {},
          validated.craft ? { 
            crafts: { has: validated.craft } 
          } : {},
          { verificationStatus: 'CLEAR' }, // Only show verified instructors
        ],
      }

      const [instructors, totalInstructors] = await Promise.all([
        prisma.instructorProfile.findMany({
          where: instructorWhere,
          skip: validated.type === 'instructors' ? skip : 0,
          take: validated.type === 'instructors' ? validated.limit : 5, // Limit instructors when searching all
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                address: true,
              },
            },
          },
          orderBy: [
            { ratingAvg: 'desc' },
            { ratingCount: 'desc' },
          ],
        }),
        prisma.instructorProfile.count({ where: instructorWhere }),
      ])

      results.instructors = instructors
      results.totalInstructors = totalInstructors
    }

    return NextResponse.json({
      ...results,
      query: validated.query,
      type: validated.type,
      page: validated.page,
      limit: validated.limit,
      hasMore: validated.type === 'classes' 
        ? results.totalClasses > skip + validated.limit
        : validated.type === 'instructors'
        ? results.totalInstructors > skip + validated.limit
        : false,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid search parameters', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}