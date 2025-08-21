"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { MapPin, Star, Users, Clock, Calendar, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Class {
  id: string
  name: string
  description: string
  minAge: number
  maxAge: number
  duration: number
  price: number
  instructor: {
    id: string
    user: {
      id: string
      name: string
      address: string
    }
  }
}

interface Instructor {
  id: string
  bio: string
  crafts: string[]
  ratingAvg: number
  ratingCount: number
  user: {
    id: string
    name: string
    address: string
  }
}

interface SearchResponse {
  classes: Class[]
  instructors: Instructor[]
  totalClasses: number
  totalInstructors: number
  query: string
  type: string
  page: number
  limit: number
  hasMore: boolean
}

export function SearchResults() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<"all" | "classes" | "instructors">("all")

  const query = searchParams.get("query") || ""
  const location = searchParams.get("location") || ""
  const craft = searchParams.get("craft") || ""

  const fetchResults = useCallback(async () => {
    if (!query.trim()) {
      setResults(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        query,
        type: selectedType,
        ...(location && { location }),
        ...(craft && { craft }),
      })

      const response = await fetch(`/api/search?${params}`)
      if (!response.ok) throw new Error("Search failed")

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError("Failed to search. Please try again.")
      console.error("Search error:", err)
    } finally {
      setLoading(false)
    }
  }, [query, location, craft, selectedType])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  if (!query) {
    return null // Let FeaturedSearchContent handle the empty state
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex flex-col items-center gap-4">
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
          <span className="text-gray-600 font-medium">Searching for amazing classes...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!results || (results.totalClasses === 0 && results.totalInstructors === 0)) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No results found for "{query}"</p>
        <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search Type Tabs */}
      <div className="flex gap-2 sm:gap-4 border-b overflow-x-auto">
        <button
          onClick={() => setSelectedType("all")}
          className={cn(
            "pb-3 px-2 sm:px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
            selectedType === "all"
              ? "text-purple-600 border-purple-600"
              : "text-muted-foreground border-transparent hover:text-foreground"
          )}
        >
          All Results ({results.totalClasses + results.totalInstructors})
        </button>
        <button
          onClick={() => setSelectedType("classes")}
          className={cn(
            "pb-3 px-2 sm:px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
            selectedType === "classes"
              ? "text-purple-600 border-purple-600"
              : "text-muted-foreground border-transparent hover:text-foreground"
          )}
        >
          Classes ({results.totalClasses})
        </button>
        <button
          onClick={() => setSelectedType("instructors")}
          className={cn(
            "pb-3 px-2 sm:px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
            selectedType === "instructors"
              ? "text-purple-600 border-purple-600"
              : "text-muted-foreground border-transparent hover:text-foreground"
          )}
        >
          Instructors ({results.totalInstructors})
        </button>
      </div>

      {/* Instructors Section */}
      {(selectedType === "all" || selectedType === "instructors") && results.instructors.length > 0 && (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Instructors</h2>
          <div className="space-y-3 sm:space-y-4">
            {results.instructors.map((instructor) => (
              <Link
                key={instructor.id}
                href={`/instructor/${instructor.id}`}
                className="block bg-card p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-border"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-purple-600 transition-colors">
                      {instructor.user.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {instructor.user.address}
                      </span>
                      {instructor.ratingAvg > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {instructor.ratingAvg.toFixed(1)} ({instructor.ratingCount})
                        </span>
                      )}
                    </div>
                    <p className="text-foreground/70 line-clamp-2">{instructor.bio}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {instructor.crafts.map((craft) => (
                        <span
                          key={craft}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                        >
                          {craft}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Classes Section */}
      {(selectedType === "all" || selectedType === "classes") && results.classes.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Classes</h2>
          <div className="space-y-4">
            {results.classes.map((cls) => (
              <Link
                key={cls.id}
                href={`/class/${cls.id}`}
                className="block bg-card p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-border"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {cls.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      by {cls.instructor.user.name}
                    </p>
                    <p className="text-gray-600 line-clamp-2 mb-3">{cls.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Ages {cls.minAge}-{cls.maxAge}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {cls.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {cls.instructor.user.address}
                      </span>
                      <span className="font-semibold text-purple-600">
                        ${cls.price}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Load More */}
      {results.hasMore && selectedType !== "all" && (
        <div className="text-center pt-4">
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Load More Results
          </button>
        </div>
      )}
    </div>
  )
}
