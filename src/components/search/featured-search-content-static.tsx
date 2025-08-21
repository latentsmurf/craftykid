"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageCarousel } from "@/components/ui/image-carousel"
import { 
  Star, 
  MapPin, 
  Crown,
  Sparkles,
  Award,
  ChevronRight,
  Calendar,
  Filter
} from "lucide-react"

const featuredInstructors = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    specialty: "Pottery & Ceramics",
    rating: 4.9,
    reviewCount: 127,
    location: "Montecito, CA",
    badge: "super-host",
    description: "Award-winning potter with a magical touch for teaching families",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80"
    ],
    yearsExperience: 12
  },
  {
    id: "michael-rodriguez",
    name: "Michael Rodriguez",
    specialty: "Watercolor & Mixed Media",
    rating: 4.8,
    reviewCount: 89,
    location: "Santa Barbara, CA",
    badge: "newcomer",
    description: "Fresh perspective on family art with innovative techniques",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80"
    ],
    yearsExperience: 3
  },
  {
    id: "emma-glass",
    name: "Emma Glass",
    specialty: "Glass Blowing",
    rating: 4.7,
    reviewCount: 56,
    location: "Santa Barbara, CA",
    badge: "unique",
    description: "One of the few instructors offering family-safe glass art",
    images: [
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80"
    ],
    yearsExperience: 8
  }
]

const popularSearches = [
  "Pottery", "Painting", "Jewelry Making", "Woodworking", 
  "Kids Crafts", "Family Art", "Beginner Friendly", "Weekend Classes"
]

export function FeaturedSearchContent() {
  const getBadgeInfo = (badge: string) => {
    switch (badge) {
      case "super-host":
        return { icon: Crown, label: "Super Host", color: "bg-gradient-to-r from-yellow-400 to-orange-500" }
      case "newcomer":
        return { icon: Sparkles, label: "New Instructor", color: "bg-gradient-to-r from-green-400 to-emerald-500" }
      case "unique":
        return { icon: Award, label: "Unique Craft", color: "bg-gradient-to-r from-purple-400 to-indigo-500" }
      default:
        return { icon: Star, label: "Featured", color: "bg-gradient-to-r from-blue-400 to-cyan-500" }
    }
  }

  return (
    <div className="space-y-12">
      {/* Popular Searches */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-4">Popular Searches</h2>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <motion.div
              key={search}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link href={`/search?query=${encodeURIComponent(search)}`}>
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 transition-colors cursor-pointer"
                >
                  <Filter className="h-3 w-3 mr-1" />
                  {search}
                </Badge>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Instructors */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Featured Instructors</h2>
          <Button variant="outline" asChild>
            <Link href="/instructors">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredInstructors.map((instructor, index) => {
            const badgeInfo = getBadgeInfo(instructor.badge)
            const BadgeIcon = badgeInfo.icon

            return (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/instructor/${instructor.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative">
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                        <img
                          src={instructor.images[0]}
                          alt={instructor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className={`${badgeInfo.color} text-white border-0`}>
                          <BadgeIcon className="h-3 w-3 mr-1" />
                          {badgeInfo.label}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Name & Specialty */}
                        <div>
                          <h3 className="font-bold text-foreground text-lg group-hover:text-purple-600 transition-colors">
                            {instructor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {instructor.specialty}
                          </p>
                        </div>

                        {/* Rating & Experience */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{instructor.rating}</span>
                            <span className="text-muted-foreground">({instructor.reviewCount})</span>
                          </div>
                          <span className="text-muted-foreground">
                            {instructor.yearsExperience} years exp.
                          </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{instructor.location}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-foreground/70 line-clamp-2">
                          {instructor.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Categories to Explore */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-6">Explore by Category</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "Pottery", emoji: "🏺", count: 12, color: "from-orange-400 to-red-500" },
            { name: "Painting", emoji: "🎨", count: 18, color: "from-blue-400 to-cyan-500" },
            { name: "Jewelry", emoji: "💍", count: 8, color: "from-pink-400 to-purple-500" },
            { name: "Woodwork", emoji: "🪵", count: 6, color: "from-green-400 to-emerald-500" },
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={`/search?query=${encodeURIComponent(category.name)}`}>
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{category.emoji}</span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.count} classes
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
