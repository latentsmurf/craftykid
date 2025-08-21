"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  Search,
  Loader2,
  Users,
  Calendar,
  Clock
} from "lucide-react"

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

interface ClassResult {
  id: string
  title: string
  instructor: {
    user: {
      name: string
    }
  }
  price: number
  duration: number
  venue: {
    name: string
    address: string
  }
  ageRange: {
    min: number
    max: number
  }
  description: string
}

interface InstructorResult {
  id: string
  user: {
    name: string
    address: string
  }
  bio: string
  crafts: string[]
  ratingAvg: number
  ratingCount: number
}

export default function SearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<{
    classes: ClassResult[]
    instructors: InstructorResult[]
  } | null>(null)

  // Handle search
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null)
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Search error:", error)
      setResults({ classes: [], instructors: [] })
    } finally {
      setIsSearching(false)
    }
  }

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Handle popular search click
  const handlePopularSearch = (search: string) => {
    setQuery(search)
  }

  const hasResults = results && (results.classes.length > 0 || results.instructors.length > 0)
  const showFeaturedContent = !query.trim() && !isSearching

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
            
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <div className="relative flex items-center rounded-lg border border-border bg-card shadow-sm focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all">
                  <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for classes, instructors, or crafts..."
                    className="w-full bg-transparent pl-10 pr-4 py-3 text-base outline-none rounded-lg"
                  />
                  {isSearching && (
                    <div className="absolute right-3">
                      <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search Results */}
            <AnimatePresence mode="wait">
              {hasResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Instructor Results */}
                  {results.instructors.length > 0 && (
                    <section>
                      <h2 className="text-xl font-bold text-foreground mb-4">
                        Instructors ({results.instructors.length})
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {results.instructors.map((instructor) => (
                          <motion.div
                            key={instructor.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -2 }}
                          >
                            <Link href={`/instructor/${instructor.id}`}>
                              <Card className="hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                                      {instructor.user.name[0]}
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="font-bold text-foreground hover:text-purple-600 transition-colors">
                                        {instructor.user.name}
                                      </h3>
                                      <p className="text-sm text-muted-foreground mb-2">
                                        {instructor.crafts.join(", ")}
                                      </p>
                                      <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                          <span>{instructor.ratingAvg.toFixed(1)}</span>
                                          <span className="text-muted-foreground">({instructor.ratingCount})</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                          <MapPin className="h-4 w-4" />
                                          <span>{instructor.user.address}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Class Results */}
                  {results.classes.length > 0 && (
                    <section>
                      <h2 className="text-xl font-bold text-foreground mb-4">
                        Classes ({results.classes.length})
                      </h2>
                      <div className="space-y-4">
                        {results.classes.map((classItem) => (
                          <motion.div
                            key={classItem.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ x: 4 }}
                          >
                            <Link href={`/class/${classItem.id}`}>
                              <Card className="hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-4 sm:p-6">
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="flex-1">
                                      <h3 className="font-bold text-lg text-foreground hover:text-purple-600 transition-colors mb-2">
                                        {classItem.title}
                                      </h3>
                                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                        {classItem.description}
                                      </p>
                                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                          <Users className="h-4 w-4" />
                                          <span>By {classItem.instructor.user.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <MapPin className="h-4 w-4" />
                                          <span>{classItem.venue.address}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Clock className="h-4 w-4" />
                                          <span>{classItem.duration} mins</span>
                                        </div>
                                        <Badge variant="outline">
                                          Ages {classItem.ageRange.min}-{classItem.ageRange.max}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-purple-600">
                                        ${(classItem.price / 100).toFixed(0)}
                                      </div>
                                      <div className="text-sm text-muted-foreground">per session</div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* No Results */}
                  {results.classes.length === 0 && results.instructors.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        No results found for "{query}". Try a different search term.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Featured Content - Shown when not searching */}
              {showFeaturedContent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  {/* Popular Searches */}
                  <section>
                    <h2 className="text-xl font-bold text-foreground mb-4">Popular Searches</h2>
                    <div className="flex flex-wrap gap-2">
                      {["Pottery", "Painting", "Jewelry Making", "Woodworking", "Kids Crafts", "Family Art"].map((search) => (
                        <Badge 
                          key={search}
                          variant="outline" 
                          className="px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 transition-colors cursor-pointer"
                          onClick={() => handlePopularSearch(search)}
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
                </motion.div>
              )}
            </AnimatePresence>
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