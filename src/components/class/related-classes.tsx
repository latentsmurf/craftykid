import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users, DollarSign } from "lucide-react"

interface RelatedClass {
  id: string
  title: string
  ageMin: number
  ageMax: number
  priceCents: number
  images: any
  instructor: {
    user: {
      name: string | null
    }
    ratingAvg: number
    ratingCount: number
  }
  venue: {
    name: string
  }
  schedules: Array<{
    startsAt: Date
    seatsRemaining: number
  }>
}

interface RelatedClassesProps {
  classes: RelatedClass[]
  categoryName: string
}

export function RelatedClasses({ classes, categoryName }: RelatedClassesProps) {
  if (classes.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        More {categoryName} Classes
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classes.map((classItem) => {
          const nextSchedule = classItem.schedules[0]
          const hasAvailableSpots = nextSchedule && nextSchedule.seatsRemaining > 0

          return (
            <Link key={classItem.id} href={`/class/${classItem.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  {classItem.images?.gallery?.[0] ? (
                    <img
                      src={classItem.images.gallery[0]}
                      alt={classItem.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No image</span>
                    </div>
                  )}
                  
                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-900">
                      ${(classItem.priceCents / 100).toFixed(0)}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                      {classItem.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      by {classItem.instructor.user.name || 'Instructor'}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Ages {classItem.ageMin}-{classItem.ageMax}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{classItem.venue.name}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>
                        {classItem.instructor.ratingAvg.toFixed(1)} ({classItem.instructor.ratingCount})
                      </span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="pt-2">
                    {hasAvailableSpots ? (
                      <Badge variant="secondary" className="text-xs">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Check Dates
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
