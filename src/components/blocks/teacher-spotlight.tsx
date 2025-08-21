import { Star, Award, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TeacherSpotlightBlock } from "@/lib/schemas/page-blocks"

// Mock data - in production this would come from the database
const mockInstructors = [
  {
    id: "inst_123",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    crafts: ["Pottery", "Ceramics"],
    bio: "Award-winning potter with 10+ years teaching experience. I love introducing children to the magic of clay!",
    rating: 4.9,
    reviewCount: 87,
    classCount: 156,
    verified: true,
    specialties: ["Wheel throwing", "Hand building", "Glazing techniques"],
  },
  {
    id: "inst_456",
    name: "Maria Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    crafts: ["Painting", "Mixed Media"],
    bio: "Professional artist and educator specializing in fun, messy art experiences that spark creativity.",
    rating: 4.8,
    reviewCount: 92,
    classCount: 203,
    verified: true,
    specialties: ["Watercolors", "Acrylics", "Collage"],
  },
  {
    id: "inst_789",
    name: "Tom Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    crafts: ["Woodworking", "Nature Crafts"],
    bio: "Former carpenter turned craft educator. I help kids build confidence through hands-on projects.",
    rating: 4.9,
    reviewCount: 64,
    classCount: 98,
    verified: true,
    specialties: ["Wood carving", "Nature materials", "Tool safety"],
  },
]

export default function TeacherSpotlight({
  title = "Meet Our Instructors",
  instructorIds,
  autoRotate = false,
  layout = "carousel",
  maxItems = 3,
}: TeacherSpotlightBlock) {
  // In production, fetch specific instructors or top-rated ones
  const instructors = instructorIds 
    ? mockInstructors.filter(i => instructorIds.includes(i.id))
    : mockInstructors.slice(0, maxItems)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our instructors are passionate artisans who love sharing their craft with the next generation
          </p>
        </div>

        <div className={
          layout === "carousel" 
            ? "flex overflow-x-auto snap-x gap-6 pb-4 -mx-4 px-4" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }>
          {instructors.map((instructor) => (
            <Card 
              key={instructor.id} 
              className={`${layout === "carousel" ? "flex-none w-80 snap-start" : ""} hover:shadow-lg transition-shadow`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <Image
                      src={instructor.avatar}
                      alt={instructor.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                    {instructor.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{instructor.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {instructor.crafts.map((craft) => (
                        <Badge key={craft} variant="secondary" className="text-xs">
                          {craft}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {instructor.bio}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{instructor.rating}</span>
                      <span className="text-gray-500">({instructor.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{instructor.classCount} classes taught</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-1">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {instructor.specialties.map((specialty) => (
                      <span key={specialty} className="text-xs text-gray-600">
                        {specialty} •
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" asChild>
                    <Link href={`/instructor/${instructor.id}`}>View Profile</Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/classes?instructor=${instructor.id}`}>See Classes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/instructors">Meet All Instructors</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
