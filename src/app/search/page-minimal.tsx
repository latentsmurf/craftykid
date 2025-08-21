"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import NavbarGlobal from "@/components/blocks/navbar-global"
import Footer from "@/components/blocks/footer"
import { 
  Star, 
  MapPin, 
  Crown,
  Sparkles,
  Award,
  ChevronRight,
  Filter,
  Search
} from "lucide-react"

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default function SearchPage() {
  return (
    <>
      {/* Navigation */}
      <NavbarGlobal />

      <main className="min-h-screen bg-background transition-colors duration-300">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 lg:mb-8">
              Search Classes & Instructors
            </h1>
            
            {/* Simple Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <div className="relative flex items-center rounded-lg border border-border bg-card shadow-sm">
                  <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for classes, instructors, or crafts..."
                    className="w-full bg-transparent pl-10 pr-4 py-3 text-base outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Featured Content */}
            <div className="space-y-12">
              {/* Popular Searches */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">Popular Searches</h2>
                <div className="flex flex-wrap gap-2">
                  {["Pottery", "Painting", "Jewelry Making", "Woodworking", "Kids Crafts", "Family Art"].map((search) => (
                    <Badge 
                      key={search}
                      variant="outline" 
                      className="px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 transition-colors cursor-pointer"
                    >
                      <Filter className="h-3 w-3 mr-1" />
                      {search}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Featured Instructors */}
              <section>
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
                  {[
                    { 
                      name: "Sarah Chen", 
                      specialty: "Pottery & Ceramics", 
                      rating: 4.9, 
                      reviews: 127, 
                      location: "Montecito, CA",
                      badge: "Super Host",
                      badgeColor: "bg-gradient-to-r from-yellow-400 to-orange-500"
                    },
                    { 
                      name: "Michael Rodriguez", 
                      specialty: "Watercolor & Mixed Media", 
                      rating: 4.8, 
                      reviews: 89, 
                      location: "Santa Barbara, CA",
                      badge: "New Instructor",
                      badgeColor: "bg-gradient-to-r from-green-400 to-emerald-500"
                    },
                    { 
                      name: "Emma Glass", 
                      specialty: "Glass Blowing", 
                      rating: 4.7, 
                      reviews: 56, 
                      location: "Santa Barbara, CA",
                      badge: "Unique Craft",
                      badgeColor: "bg-gradient-to-r from-purple-400 to-indigo-500"
                    },
                  ].map((instructor, index) => (
                    <motion.div
                      key={instructor.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <Link href={`/instructor/inst_${index + 123}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                          <div className="relative">
                            <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {instructor.name[0]}
                              </div>
                            </div>
                            
                            {/* Badge */}
                            <div className="absolute top-3 left-3">
                              <Badge className={`${instructor.badgeColor} text-white border-0`}>
                                <Crown className="h-3 w-3 mr-1" />
                                {instructor.badge}
                              </Badge>
                            </div>
                          </div>

                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <h3 className="font-bold text-foreground text-lg group-hover:text-purple-600 transition-colors">
                                  {instructor.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {instructor.specialty}
                                </p>
                              </div>

                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{instructor.rating}</span>
                                  <span className="text-muted-foreground">({instructor.reviews})</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{instructor.location}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Call to Action */}
              <section className="text-center py-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl">
                <div className="max-w-2xl mx-auto space-y-6">
                  <h3 className="text-2xl font-bold text-foreground">
                    Discover Your Perfect Creative Experience
                  </h3>
                  <p className="text-muted-foreground">
                    Use our search above to find classes by craft type, instructor name, location, or age group.
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
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer 
        columns={[]}
        copyright="© 2024 Crafty Kid. All rights reserved."
        socialLinks={[]}
      />
    </>
  )
}
