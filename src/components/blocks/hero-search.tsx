"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Calendar, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { HeroSearchBlock } from "@/lib/schemas/page-blocks"

export default function HeroSearch({
  headline,
  subheadline,
  bgImage,
  searchFields,
}: HeroSearchBlock) {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [ageRange, setAgeRange] = useState("")
  const [activity, setActivity] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (ageRange) params.append("age", ageRange)
    if (activity) params.append("activity", activity)
    
    router.push(`/classes?${params.toString()}`)
  }

  return (
    <div 
      className="relative bg-gradient-to-br from-craft-soft via-white to-craft-paint/10 py-20 lg:py-32"
      style={bgImage ? {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } : undefined}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {subheadline}
            </p>
          )}

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-3 py-1">
              <span className="text-sm">✓ Background-checked instructors</span>
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <span className="text-sm">✓ Age-appropriate activities</span>
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <span className="text-sm">✓ Materials included</span>
            </Badge>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {searchFields.location && (
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="City or ZIP code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              )}

              {searchFields.ageRange && (
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="w-full h-12 pl-10 pr-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Child's age</option>
                    <option value="1-3">1-3 years</option>
                    <option value="4-6">4-6 years</option>
                    <option value="7-9">7-9 years</option>
                    <option value="10-12">10-12 years</option>
                    <option value="13+">13+ years</option>
                  </select>
                </div>
              )}

              {searchFields.activity && (
                <div className="relative">
                  <Palette className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full h-12 pl-10 pr-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Activity type</option>
                    <option value="pottery">Pottery & Ceramics</option>
                    <option value="painting">Painting & Drawing</option>
                    <option value="crafts">Arts & Crafts</option>
                    <option value="jewelry">Jewelry Making</option>
                    <option value="woodworking">Woodworking</option>
                    <option value="textiles">Sewing & Textiles</option>
                  </select>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full md:w-auto mt-6 px-8"
            >
              <Search className="mr-2 h-5 w-5" />
              Find Classes
            </Button>
          </form>

          {/* Popular searches */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Pottery near me", "Weekend classes", "Toddler crafts", "Birthday parties"].map((term) => (
                <Button
                  key={term}
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/classes?q=${encodeURIComponent(term)}`)}
                  className="text-sm"
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
