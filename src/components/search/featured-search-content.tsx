"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageCarousel } from "@/components/ui/image-carousel"
import { 
  Star, 
  MapPin, 
  Users, 
  Clock, 
  Crown,
  Sparkles,
  TrendingUp,
  Award,
  Heart,
  ChevronRight,
  Calendar,
  Filter
} from "lucide-react"

interface FeaturedInstructor {
  id: string
  name: string
  specialty: string
  rating: number
  reviewCount: number
  location: string
  badge: "super-host" | "newcomer" | "trending" | "unique"
  description: string
  images: string[]
  yearsExperience: number
}

interface FeaturedClass {
  id: string
  title: string
  instructor: string
  category: string
  price: number
  rating: number
  isUnique: boolean
  isPopular: boolean
  spotsLeft: number
  nextDate: string
  images: string[]
  uniqueFeature: string
}

const featuredInstructors: FeaturedInstructor[] = [
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
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&q=80"
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

const featuredClasses: FeaturedClass[] = [
  {
    id: "glow-pottery",
    title: "Glow-in-the-Dark Pottery Workshop",
    instructor: "Sarah Chen",
    category: "Pottery",
    price: 75,
    rating: 4.9,
    isUnique: true,
    isPopular: false,
    spotsLeft: 2,
    nextDate: "2024-08-29",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80"
    ],
    uniqueFeature: "Special glow pigments included"
  },
  {
    id: "family-blacksmithing",
    title: "Family Blacksmithing Basics",
    instructor: "Tom Wilson",
    category: "Metalwork",
    price: 95,
    rating: 4.8,
    isUnique: true,
    isPopular: false,
    spotsLeft: 4,
    nextDate: "2024-09-02",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80"
    ],
    uniqueFeature: "Safe forge techniques for families"
  },
  {
    id: "watercolor-magic",
    title: "Watercolor Magic for Families",
    instructor: "Michael Rodriguez",
    category: "Painting",
    price: 45,
    rating: 4.8,
    isUnique: false,
    isPopular: true,
    spotsLeft: 8,
    nextDate: "2024-08-26",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80"
    ],
    uniqueFeature: "Most booked class this month"
  }
]

const popularSearches = [
  "Pottery", "Painting", "Jewelry Making", "Woodworking", 
  "Kids Crafts", "Family Art", "Beginner Friendly", "Weekend Classes"
]

function FeaturedSearchContentInner() {
  // Always show featured content for now (search results will be handled separately)
  // This avoids the useSearchParams issue during static generation

  const getBadgeInfo = (badge: string) => {
    switch (badge) {
      case "super-host":
        return { icon: Crown, label: "Super Host", color: "bg-gradient-to-r from-yellow-400 to-orange-500" }
      case "newcomer":
        return { icon: Sparkles, label: "New Instructor", color: "bg-gradient-to-r from-green-400 to-emerald-500" }
      case "trending":
        return { icon: TrendingUp, label: "Trending", color: "bg-gradient-to-r from-pink-400 to-red-500" }
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
                      <ImageCarousel
                        images={instructor.images}
                        autoPlay={false}
                        showControls={false}
                        showIndicators={instructor.images.length > 1}
                        aspectRatio="video"
                        className="rounded-t-lg"
                      />
                      
                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className={`${badgeInfo.color} text-white border-0`}>
                          <BadgeIcon className="h-3 w-3 mr-1" />
                          {badgeInfo.label}
                        </Badge>
                      </div>

                      {/* Heart Icon */}
                      <motion.div
                        className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="h-4 w-4 text-gray-600" />
                      </motion.div>
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

      {/* Unique & Popular Classes */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Unique & Popular Classes</h2>
          <Button variant="outline" asChild>
            <Link href="/classes">
              Browse All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredClasses.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Link href={`/class/${classItem.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative">
                    <ImageCarousel
                      images={classItem.images}
                      autoPlay={false}
                      showControls={false}
                      showIndicators={false}
                      aspectRatio="video"
                      className="rounded-t-lg"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {classItem.isUnique && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0">
                          <Award className="h-3 w-3 mr-1" />
                          Unique
                        </Badge>
                      )}
                      {classItem.isPopular && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                          🔥 Popular
                        </Badge>
                      )}
                    </div>

                    {/* Price */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-bold text-gray-900">
                      ${classItem.price}
                    </div>

                    {/* Spots Left */}
                    {classItem.spotsLeft <= 3 && (
                      <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Only {classItem.spotsLeft} spots left!
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Category */}
                      <Badge variant="secondary" className="text-xs">
                        {classItem.category}
                      </Badge>

                      {/* Title */}
                      <h3 className="font-bold text-foreground text-lg group-hover:text-purple-600 transition-colors line-clamp-2">
                        {classItem.title}
                      </h3>

                      {/* Instructor & Rating */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          by {classItem.instructor}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{classItem.rating}</span>
                        </div>
                      </div>

                      {/* Unique Feature */}
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
                        <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                          ✨ {classItem.uniqueFeature}
                        </p>
                      </div>

                      {/* Next Date */}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Next: {new Date(classItem.nextDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Categories to Explore */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
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
              transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
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

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center py-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-foreground">Can't find what you're looking for?</span>
          </div>
          
          <h3 className="text-2xl font-bold text-foreground">
            Discover Your Perfect Creative Experience
          </h3>
          <p className="text-muted-foreground">
            Use our search above to find classes by craft type, instructor name, location, or age group.
            We have something special for every family!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Link href="/classes">
                Browse All Classes
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/for-creators">
                Become an Instructor
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export function FeaturedSearchContent() {
  return (
    <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading featured content...</div>}>
      <FeaturedSearchContentInner />
    </Suspense>
  )
}
