import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { PageBuilder } from "@/lib/page-builder/renderer"
import { ClassBookingSection } from "@/components/booking/class-booking-section"
import { ClassGallery } from "@/components/class/class-gallery"
import { InstructorCard } from "@/components/class/instructor-card"
import { VenueInfo } from "@/components/class/venue-info"
import { ReviewsSection } from "@/components/class/reviews-section"
import { RelatedClasses } from "@/components/class/related-classes"
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Star,
  CheckCircle,
  XCircle,
  DollarSign
} from "lucide-react"

interface ClassPageProps {
  params: {
    id: string
  }
}

async function getClass(id: string) {
  try {
    const classData = await prisma.class.findUnique({
      where: { id },
      include: {
        category: true,
        instructor: {
          include: {
            user: true
          }
        },
        venue: true,
        schedules: {
          where: {
            startsAt: {
              gte: new Date() // Only future schedules
            }
          },
          orderBy: {
            startsAt: 'asc'
          }
        },
        reviews: {
          include: {
            parent: {
              select: {
                name: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        }
      }
    })

    return classData
  } catch (error) {
    console.error('Error fetching class:', error)
    return null
  }
}

async function getRelatedClasses(categoryId: string, currentClassId: string) {
  try {
    const relatedClasses = await prisma.class.findMany({
      where: {
        categoryId,
        id: { not: currentClassId }
      },
      include: {
        instructor: {
          include: {
            user: true
          }
        },
        venue: true,
        schedules: {
          where: {
            startsAt: {
              gte: new Date()
            }
          },
          take: 1,
          orderBy: {
            startsAt: 'asc'
          }
        }
      },
      take: 4
    })

    return relatedClasses
  } catch (error) {
    console.error('Error fetching related classes:', error)
    return []
  }
}

export async function generateMetadata({ params }: ClassPageProps) {
  const classData = await getClass(params.id)
  
  if (!classData) {
    return {
      title: 'Class Not Found | Crafty Kid'
    }
  }

  return {
    title: `${classData.title} | Crafty Kid`,
    description: classData.description.slice(0, 160) + '...',
    openGraph: {
      title: classData.title,
      description: classData.description.slice(0, 160) + '...',
      images: classData.images?.gallery?.[0] ? [classData.images.gallery[0]] : []
    }
  }
}

export default async function ClassPage({ params }: ClassPageProps) {
  const classData = await getClass(params.id)
  
  if (!classData) {
    notFound()
  }

  const relatedClasses = await getRelatedClasses(classData.categoryId, classData.id)
  
  // Calculate average rating from reviews
  const avgRating = classData.reviews.length > 0 
    ? classData.reviews.reduce((sum, review) => sum + review.rating, 0) / classData.reviews.length
    : 0

  return (
    <>
      <PageBuilder 
        blocks={[
          {
            type: "NavBar",
            props: { id: "navbar" }
          }
        ]}
      />

      <main className="min-h-screen bg-background transition-colors duration-300">
        {/* Hero Section */}
        <div className="bg-muted/30 py-6 lg:py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Breadcrumb */}
              <nav className="text-sm text-muted-foreground mb-4 hidden sm:block">
                <span>Classes</span>
                <span className="mx-2">›</span>
                <span>{classData.category.name}</span>
                <span className="mx-2">›</span>
                <span className="text-foreground">{classData.title}</span>
              </nav>

              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Image Gallery */}
                <div>
                  <ClassGallery 
                    images={classData.images?.gallery || []} 
                    title={classData.title}
                  />
                </div>

                {/* Class Info & Booking */}
                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {classData.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {avgRating > 0 ? avgRating.toFixed(1) : 'New'}
                        {classData.reviews.length > 0 && ` (${classData.reviews.length} reviews)`}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Ages {classData.ageMin}-{classData.ageMax}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {classData.venue.name}
                      </span>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
                      <div className="text-lg font-semibold">
                        ${(classData.priceCents / 100).toFixed(0)}
                      </div>
                      <div className="text-xs text-gray-600">per family</div>
                    </div>
                    <div className="text-center">
                      <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-lg font-semibold">2 hours</div>
                      <div className="text-xs text-gray-600">duration</div>
                    </div>
                  </div>

                  {/* Materials Info */}
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    {classData.materialsProvided ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-800 font-medium">All materials included</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-orange-600" />
                        <span className="text-orange-800 font-medium">Bring your own materials</span>
                      </>
                    )}
                  </div>

                  {/* Booking Section */}
                  <ClassBookingSection 
                    classId={classData.id}
                    schedules={classData.schedules}
                    price={classData.priceCents}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">About This Class</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-foreground/80 leading-relaxed">{classData.description}</p>
                  </div>
                </section>

                {/* What You'll Learn */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">What You'll Learn</h2>
                  <ul className="space-y-2 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      Basic techniques and safety procedures
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      Hands-on practice with professional tools
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      Creative problem-solving and artistic expression
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      Parent-child collaboration techniques
                    </li>
                  </ul>
                </section>

                {/* Reviews */}
                <ReviewsSection 
                  reviews={classData.reviews}
                  averageRating={avgRating}
                />
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-8">
                {/* Instructor */}
                <InstructorCard instructor={classData.instructor} />

                {/* Venue */}
                <VenueInfo venue={classData.venue} />
              </div>
            </div>

            {/* Related Classes */}
            {relatedClasses.length > 0 && (
              <div className="mt-16">
                <RelatedClasses 
                  classes={relatedClasses}
                  categoryName={classData.category.name}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <PageBuilder 
        blocks={[
          {
            type: "Footer",
            props: { id: "footer" }
          }
        ]}
      />
    </>
  )
}
