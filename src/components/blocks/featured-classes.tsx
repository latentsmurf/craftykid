import { Star, Clock, Users, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FeaturedClassesBlock } from "@/lib/schemas/page-blocks"
import { formatCurrency } from "@/lib/utils"

// Mock data - in production this would come from the database
const mockClasses = [
  {
    id: "1",
    title: "Little Hands Pottery",
    instructor: { name: "Sarah Chen", avatar: "/avatars/sarah.jpg" },
    category: "Pottery",
    ageRange: "4-8",
    price: 4500,
    duration: 90,
    capacity: 8,
    seatsRemaining: 3,
    rating: 4.8,
    reviewCount: 23,
    image: "https://images.unsplash.com/photo-1498075702571-ecb018f3752d?w=800&q=80",
    venue: { name: "Sunny Side Studio", city: "Brooklyn" },
    nextSession: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Paint & Giggle",
    instructor: { name: "Maria Rodriguez", avatar: "/avatars/maria.jpg" },
    category: "Painting",
    ageRange: "3-6",
    price: 3500,
    duration: 60,
    capacity: 10,
    seatsRemaining: 5,
    rating: 4.9,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    venue: { name: "Art Haven", city: "Manhattan" },
    nextSession: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Nature Crafts Adventure",
    instructor: { name: "Tom Wilson", avatar: "/avatars/tom.jpg" },
    category: "Crafts",
    ageRange: "5-10",
    price: 3000,
    duration: 120,
    capacity: 12,
    seatsRemaining: 7,
    rating: 4.7,
    reviewCount: 18,
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    venue: { name: "Green Space", city: "Queens" },
    nextSession: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
]

export default function FeaturedClasses({
  title,
  query,
  maxItems = 6,
  layout = "grid",
}: FeaturedClassesBlock) {
  // In production, this would fetch from the database based on query
  const classes = mockClasses.slice(0, maxItems)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        )}

        <div className={
          layout === "carousel" 
            ? "flex overflow-x-auto snap-x gap-6 pb-4 -mx-4 px-4" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }>
          {classes.map((cls) => (
            <Link
              key={cls.id}
              href={`/class/${cls.id}`}
              className={layout === "carousel" ? "flex-none w-80 snap-start" : ""}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={cls.image}
                    alt={cls.title}
                    fill
                    className="object-cover"
                  />
                  {cls.seatsRemaining <= 3 && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      Only {cls.seatsRemaining} spots left!
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">{cls.title}</h3>
                    <Badge variant="secondary">{cls.category}</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{cls.rating}</span>
                      <span>({cls.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Ages {cls.ageRange}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{cls.venue.name}, {cls.venue.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{cls.duration} minutes</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm text-gray-600">
                      with {cls.instructor.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Next: {cls.nextSession.toLocaleDateString("en-US", { 
                        weekday: "short", 
                        month: "short", 
                        day: "numeric" 
                      })}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-2xl font-bold">{formatCurrency(cls.price)}</p>
                      <p className="text-xs text-gray-500">per child</p>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {classes.length === maxItems && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/classes">View All Classes</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
