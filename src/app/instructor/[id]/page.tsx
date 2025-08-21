import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Calendar, Users, Award, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/lib/db"

interface InstructorPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: InstructorPageProps): Promise<Metadata> {
  const instructor = await getInstructor(params.id)
  
  if (!instructor) {
    return {
      title: "Instructor Not Found",
    }
  }

  return {
    title: `${instructor.user.name} - Craft Instructor | Crafty Kid`,
    description: instructor.bio || `Learn ${instructor.crafts.join(", ")} with ${instructor.user.name} in ${instructor.user.address}`,
  }
}

async function getInstructor(id: string) {
  try {
    const instructor = await prisma.instructorProfile.findUnique({
      where: { id },
      include: {
        user: true,
        classes: {
          include: {
            category: true,
            venue: true,
            schedules: {
              where: {
                startsAt: {
                  gte: new Date(),
                },
              },
              orderBy: {
                startsAt: 'asc',
              },
              take: 3,
            },
          },
          take: 5,
        },
        reviews: {
          include: {
            parent: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
      },
    })

    return instructor
  } catch (error) {
    return null
  }
}

// Static instructor data for testing
const staticInstructors: Record<string, any> = {
  "inst_123": { name: "Sarah Chen", location: "Montecito, CA", craft: "Pottery", bio: "Award-winning potter with over 10 years of experience teaching children and families." },
  "inst_456": { name: "Maria Rodriguez", location: "Santa Barbara, CA", craft: "Painting", bio: "Professional artist specializing in vibrant paintings that inspire joy." },
  "inst_789": { name: "Tom Wilson", location: "East Beach, Santa Barbara, CA", craft: "Woodworking", bio: "Former carpenter turned craft educator." },
}

function createMockInstructor(id: string) {
  const staticData = staticInstructors[id]
  if (!staticData) return null
  
  return {
    id,
    user: {
      id: `user_${id}`,
      name: staticData.name,
      email: `${staticData.name.toLowerCase().replace(' ', '.')}@example.com`,
      address: staticData.location,
    },
    bio: staticData.bio,
    crafts: [staticData.craft],
    portfolioMedia: {
      images: [
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
      ]
    },
    verificationStatus: "CLEAR",
    ratingAvg: 4.5 + Math.random() * 0.5,
    ratingCount: Math.floor(Math.random() * 150) + 20,
    classes: [
      {
        id: `class_${id}_1`,
        title: `${staticData.craft} for Beginners`,
        description: `Join ${staticData.name.split(' ')[0]} for an exciting ${staticData.craft.toLowerCase()} adventure!`,
        ageMin: 5,
        ageMax: 10,
        priceCents: 4500,
        category: { name: staticData.craft },
        venue: { name: `${staticData.name.split(' ')[0]}'s Studio`, address: staticData.location },
        schedules: [
          { startsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
        ],
      },
    ],
    reviews: [
      {
        id: `rev_${id}_1`,
        rating: 5,
        title: "Amazing instructor!",
        body: `${staticData.name.split(' ')[0]} is so patient and encouraging with the kids.`,
        parent: { name: "Jennifer M." },
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    ],
  }
}

export default async function InstructorProfilePage({ params }: InstructorPageProps) {
  let instructor = await getInstructor(params.id)
  
  // If not found in database, try static data
  if (!instructor) {
    instructor = createMockInstructor(params.id)
  }

  if (!instructor) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${instructor.user.name}`}
                alt={instructor.user.name}
                fill
                className="rounded-full object-cover"
              />
              {instructor.verificationStatus === "CLEAR" && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{instructor.user.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{instructor.user.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{instructor.ratingAvg}</span>
                  <span>({instructor.ratingCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>Verified Instructor</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {instructor.crafts.map((craft) => (
                  <Badge key={craft} variant="secondary">
                    {craft}
                  </Badge>
                ))}
              </div>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Book a Class
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>About {instructor.user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">{instructor.bio}</p>
              </CardContent>
            </Card>

            {/* Classes */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Join {instructor.user.name?.split(' ')[0]} for these amazing experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructor.classes.map((classItem) => (
                    <div key={classItem.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-foreground">{classItem.title}</h4>
                        <Badge variant="outline">${(classItem.priceCents / 100).toFixed(0)}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{classItem.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Ages {classItem.ageMin}-{classItem.ageMax}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {classItem.venue.name}
                        </span>
                        {classItem.schedules[0] && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(classItem.schedules[0].startsAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructor.reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium text-foreground">{review.title}</span>
                      </div>
                      <p className="text-sm text-foreground/70">{review.body}</p>
                      <p className="text-xs text-muted-foreground">
                        — {review.parent.name}, {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Response time</span>
                  <span className="font-medium">< 2 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
