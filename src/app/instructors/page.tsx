import Link from "next/link"
import Image from "next/image"
import { Star, MapPin, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Static instructor data
const instructors = [
  { id: "inst_123", name: "Sarah Chen", location: "Montecito, CA", craft: "Pottery", rating: 4.9, reviews: 87 },
  { id: "inst_456", name: "Maria Rodriguez", location: "Santa Barbara, CA", craft: "Painting", rating: 4.8, reviews: 92 },
  { id: "inst_789", name: "Tom Wilson", location: "East Beach, Santa Barbara, CA", craft: "Woodworking", rating: 4.7, reviews: 65 },
  { id: "inst_101", name: "Emily Johnson", location: "Mesa, Santa Barbara, CA", craft: "Jewelry Making", rating: 4.9, reviews: 103 },
  { id: "inst_102", name: "Michael Chang", location: "Riviera, Santa Barbara, CA", craft: "Sewing", rating: 4.6, reviews: 78 },
  { id: "inst_103", name: "Lisa Anderson", location: "Downtown Santa Barbara, CA", craft: "Mixed Media", rating: 4.8, reviews: 89 },
  { id: "inst_104", name: "David Martinez", location: "Upper State Street, Santa Barbara, CA", craft: "Glass Art", rating: 4.9, reviews: 94 },
  { id: "inst_105", name: "Jennifer Lee", location: "Coast Village Road, Montecito, CA", craft: "Printmaking", rating: 4.7, reviews: 71 },
  { id: "inst_106", name: "Robert Taylor", location: "San Ysidro Ranch, Montecito, CA", craft: "Drawing", rating: 4.8, reviews: 88 },
  { id: "inst_107", name: "Amanda White", location: "Butterfly Beach, Montecito, CA", craft: "Knitting", rating: 4.9, reviews: 96 },
  { id: "inst_108", name: "Carlos Gonzalez", location: "Montecito, CA", craft: "Ceramics", rating: 4.6, reviews: 82 },
  { id: "inst_109", name: "Rachel Green", location: "Santa Barbara, CA", craft: "Watercolor", rating: 4.8, reviews: 91 },
  { id: "inst_110", name: "Kevin Brown", location: "East Beach, Santa Barbara, CA", craft: "Wood Carving", rating: 4.7, reviews: 73 },
  { id: "inst_111", name: "Sophie Miller", location: "Mesa, Santa Barbara, CA", craft: "Beading", rating: 4.9, reviews: 108 },
  { id: "inst_112", name: "James Davis", location: "Riviera, Santa Barbara, CA", craft: "Art Education", rating: 4.8, reviews: 115 },
  { id: "inst_113", name: "Nicole Thompson", location: "Downtown Santa Barbara, CA", craft: "Collage", rating: 4.7, reviews: 69 },
  { id: "inst_114", name: "Brian Wilson", location: "Upper State Street, Santa Barbara, CA", craft: "Pottery", rating: 4.9, reviews: 98 },
  { id: "inst_115", name: "Catherine Kim", location: "Coast Village Road, Montecito, CA", craft: "Embroidery", rating: 4.8, reviews: 85 },
  { id: "inst_116", name: "Daniel Garcia", location: "San Ysidro Ranch, Montecito, CA", craft: "Sculpture", rating: 4.6, reviews: 77 },
  { id: "inst_117", name: "Olivia Harris", location: "Butterfly Beach, Montecito, CA", craft: "Painting", rating: 4.9, reviews: 104 },
  { id: "inst_118", name: "Mark Robinson", location: "Montecito, CA", craft: "Printmaking", rating: 4.7, reviews: 81 },
  { id: "inst_119", name: "Jessica Clark", location: "Santa Barbara, CA", craft: "Sewing", rating: 4.8, reviews: 93 },
  { id: "inst_120", name: "Paul Lewis", location: "East Beach, Santa Barbara, CA", craft: "Glass Fusion", rating: 4.9, reviews: 87 },
  { id: "inst_121", name: "Laura Martinez", location: "Mesa, Santa Barbara, CA", craft: "Drawing", rating: 4.7, reviews: 76 },
  { id: "inst_122", name: "Steven Walker", location: "Riviera, Santa Barbara, CA", craft: "Mixed Media", rating: 4.8, reviews: 90 },
]

export default function InstructorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Our Amazing Instructors</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Meet all our verified craft instructors in Montecito and Santa Barbara. 
            Each instructor is background-checked and passionate about teaching children.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">All Crafts</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">Pottery</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">Painting</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">Woodworking</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">Jewelry Making</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">Sewing</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">Mixed Media</Badge>
          </div>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {instructors.map((instructor) => (
            <Link key={instructor.id} href={`/instructor/${instructor.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${instructor.name}`}
                        alt={instructor.name}
                        fill
                        className="rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <Award className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{instructor.name}</h3>
                      <Badge variant="secondary" className="mt-1">{instructor.craft}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{instructor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{instructor.rating}</span>
                      </div>
                      <span className="text-gray-500">({instructor.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Teach?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of creative instructors
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/for-creators">Become an Instructor</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
