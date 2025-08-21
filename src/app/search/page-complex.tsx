"use client"

import { Suspense } from "react"

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'
import { SearchResults } from "@/components/search/search-results"
import { SearchBar } from "@/components/search/search-bar"
import { FeaturedSearchContent } from "@/components/search/featured-search-content"
import NavbarGlobal from "@/components/blocks/navbar-global"
import Footer from "@/components/blocks/footer"

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
            
            {/* Search Bar */}
            <div className="mb-6 lg:mb-8">
              <SearchBar variant="default" />
            </div>

            {/* Search Results & Featured Content */}
            <div className="relative">
              <Suspense fallback={<SearchResultsSkeleton />}>
                <SearchResults />
              </Suspense>
              
              {/* Featured Content - Shows when no search is active */}
              <Suspense fallback={<div>Loading featured content...</div>}>
                <FeaturedSearchContent />
              </Suspense>
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

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="animate-pulse">
        <div className="h-6 bg-muted rounded w-48 mb-4"></div>
        <div className="space-y-3 lg:space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card p-4 lg:p-6 rounded-lg shadow border border-border">
              <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
