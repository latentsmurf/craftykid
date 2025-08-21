import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface InstructorPageProps {
  params: {
    id: string
  }
}

// Simple static data for testing
const mockInstructors: Record<string, any> = {
  "inst_123": { 
    name: "Sarah Chen", 
    location: "Montecito, CA", 
    craft: "Pottery", 
    bio: "Award-winning potter with over 10 years of experience teaching children and families.",
    rating: 4.9,
    reviews: 127
  },
  "inst_456": { 
    name: "Maria Rodriguez", 
    location: "Santa Barbara, CA", 
    craft: "Painting", 
    bio: "Professional artist specializing in vibrant paintings that inspire joy.",
    rating: 4.8,
    reviews: 98
  },
  "inst_789": { 
    name: "Tom Wilson", 
    location: "Santa Barbara, CA", 
    craft: "Woodworking", 
    bio: "Former carpenter turned craft educator helping kids build confidence.",
    rating: 4.7,
    reviews: 156
  },
}

export async function generateMetadata({ params }: InstructorPageProps): Promise<Metadata> {
  const instructor = mockInstructors[params.id]
  
  if (!instructor) {
    return {
      title: "Instructor Not Found",
    }
  }

  return {
    title: `${instructor.name} - Craft Instructor | Crafty Kid`,
    description: instructor.bio,
  }
}

export default async function InstructorProfilePage({ params }: InstructorPageProps) {
  const instructor = mockInstructors[params.id]

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
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${instructor.name}`}
                alt={instructor.name}
                fill
                className="rounded-full object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {instructor.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{instructor.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{instructor.rating}</span>
                  <span>({instructor.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>Verified Instructor</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{instructor.craft}</Badge>
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
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>About {instructor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 leading-relaxed">{instructor.bio}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
