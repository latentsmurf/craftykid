"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageCarousel } from "@/components/ui/image-carousel"
import { 
  Star, 
  MapPin, 
  Users, 
  Clock, 
  Heart,
  ArrowRight,
  Calendar,
  DollarSign
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FeaturedClass {
  id: string
  title: string
  description: string
  instructor: {
    name: string
    rating: number
    reviewCount: number
  }
  venue: {
    name: string
    location: string
  }
  pricing: {
    amount: number
    currency: string
  }
  schedule: {
    nextDate: string
    duration: number
  }
  images: string[]
  ageRange: {
    min: number
    max: number
  }
  category: string
  spotsLeft: number
  isPopular?: boolean
  isNew?: boolean
}

interface FeaturedClassesModernProps {
  title?: string
  subtitle?: string
  maxItems?: number
  layout?: "grid" | "carousel"
}

// Mock data for demonstration
const mockClasses: FeaturedClass[] = [
  {
    id: "pottery-workshop",
    title: "Parent & Child Pottery Workshop",
    description: "Create beautiful ceramic pieces together in this hands-on pottery experience.",
    instructor: {
      name: "Sarah Chen",
      rating: 4.9,
      reviewCount: 127
    },
    venue: {
      name: "Montecito Art Studio",
      location: "Montecito, CA"
    },
    pricing: {
      amount: 65,
      currency: "USD"
    },
    schedule: {
      nextDate: "2024-08-29T10:00:00Z",
      duration: 120
    },
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
      "https://images.unsplash.com/photo-1622008885853-91e3ae301d32?w=800&q=80"
    ],
    ageRange: { min: 4, max: 12 },
    category: "Pottery",
    spotsLeft: 3,
    isPopular: true
  },
  {
    id: "watercolor-magic",
    title: "Watercolor Magic for Families",
    description: "Discover the joy of watercolor painting with your little artist.",
    instructor: {
      name: "Michael Rodriguez",
      rating: 4.8,
      reviewCount: 98
    },
    venue: {
      name: "Santa Barbara Creative Space",
      location: "Santa Barbara, CA"
    },
    pricing: {
      amount: 45,
      currency: "USD"
    },
    schedule: {
      nextDate: "2024-08-26T14:00:00Z",
      duration: 90
    },
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80"
    ],
    ageRange: { min: 5, max: 14 },
    category: "Painting",
    spotsLeft: 7,
    isNew: true
  },
  {
    id: "friendship-bracelets",
    title: "Make Your Own Friendship Bracelets",
    description: "Learn traditional bracelet-making techniques with colorful threads and beads.",
    instructor: {
      name: "Emma Thompson",
      rating: 4.7,
      reviewCount: 156
    },
    venue: {
      name: "Coastal Craft Workshop",
      location: "Santa Barbara, CA"
    },
    pricing: {
      amount: 35,
      currency: "USD"
    },
    schedule: {
      nextDate: "2024-08-27T11:00:00Z",
      duration: 75
    },
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1506629905607-46c0f9c7b7e5?w=800&q=80"
    ],
    ageRange: { min: 6, max: 16 },
    category: "Jewelry",
    spotsLeft: 5
  }
]

export default function FeaturedClassesModern({
  title = "Popular Classes This Week",
  subtitle = "Join thousands of families creating memories together",
  maxItems = 6,
  layout = "grid"
}: FeaturedClassesModernProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [likedClasses, setLikedClasses] = useState<Set<string>>(new Set())

  const toggleLike = (classId: string) => {
    setLikedClasses(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(classId)) {
        newLiked.delete(classId)
      } else {
        newLiked.add(classId)
      }
      return newLiked
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <section className="py-20 bg-background transition-colors duration-500">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mockClasses.slice(0, maxItems).map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredCard(classItem.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card">
                {/* Image Section */}
                <div className="relative">
                  <ImageCarousel
                    images={classItem.images}
                    autoPlay={hoveredCard === classItem.id}
                    showControls={false}
                    showIndicators={classItem.images.length > 1}
                    aspectRatio="video"
                    className="rounded-t-xl"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {classItem.isPopular && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        🔥 Popular
                      </Badge>
                    )}
                    {classItem.isNew && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        ✨ New
                      </Badge>
                    )}
                  </div>

                  {/* Like Button */}
                  <motion.button
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLike(classItem.id)}
                  >
                    <Heart 
                      className={cn(
                        "h-5 w-5 transition-colors",
                        likedClasses.has(classItem.id) 
                          ? "fill-red-500 text-red-500" 
                          : "text-gray-600"
                      )}
                    />
                  </motion.button>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full font-semibold">
                    ${classItem.pricing.amount}
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
                  {/* Category */}
                  <Badge variant="secondary" className="mb-3">
                    {classItem.category}
                  </Badge>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {classItem.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {classItem.description}
                  </p>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {classItem.instructor.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {classItem.instructor.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">
                          {classItem.instructor.rating} ({classItem.instructor.reviewCount})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Class Details */}
                  <div className="space-y-2 text-sm text-muted-foreground mb-4 sm:mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Ages {classItem.ageRange.min}-{classItem.ageRange.max}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{classItem.schedule.duration} min</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{classItem.venue.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(classItem.schedule.nextDate)} at {formatTime(classItem.schedule.nextDate)}
                      </span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        classItem.spotsLeft > 5 ? "bg-green-500" :
                        classItem.spotsLeft > 2 ? "bg-yellow-500" : "bg-red-500"
                      )} />
                      <span className="text-sm text-gray-600">
                        {classItem.spotsLeft} spots left
                      </span>
                    </div>
                    <Badge 
                      variant={classItem.spotsLeft <= 2 ? "destructive" : "outline"}
                      className="text-xs"
                    >
                      {classItem.spotsLeft <= 2 ? "Almost Full" : "Available"}
                    </Badge>
                  </div>

                  {/* Action Button */}
                  <Button asChild className="w-full group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Link href={`/class/${classItem.id}`}>
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" asChild className="group">
            <Link href="/classes">
              View All Classes
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
