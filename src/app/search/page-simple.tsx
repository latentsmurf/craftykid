"use client"

import { Suspense } from "react"
import { SearchBar } from "@/components/search/search-bar"
import { FeaturedSearchContent } from "@/components/search/featured-search-content"
import NavbarGlobal from "@/components/blocks/navbar-global"
import Footer from "@/components/blocks/footer"

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
            
            {/* Search Bar */}
            <div className="mb-6 lg:mb-8">
              <SearchBar variant="default" />
            </div>

            {/* Featured Content */}
            <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading featured content...</div>}>
              <FeaturedSearchContent />
            </Suspense>
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
