import { SearchBar } from "@/components/search/search-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Clock, Users, Star } from "lucide-react"
import Link from "next/link"
import NavbarGlobal from "@/components/blocks/navbar-global"
import Footer from "@/components/blocks/footer"

export default function ClassesPage() {
  return (
    <>
      <NavbarGlobal />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Find Your Next Creative Adventure
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Browse hundreds of parent-kid craft classes near you
              </p>
              
              <div className="max-w-2xl mx-auto mb-8">
                <SearchBar 
                  variant="default" 
                  className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm"
                  placeholder="Search pottery, painting, jewelry making..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Classes */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Classes
              </h2>
              <p className="text-lg text-gray-600">
                Hand-picked experiences for every interest
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Pottery for Beginners",
                  instructor: "Sarah Johnson",
                  price: "$45",
                  duration: "2 hours",
                  rating: 4.9,
                  reviews: 127,
                  ageRange: "5-12 years"
                },
                {
                  title: "Watercolor Painting",
                  instructor: "Mike Chen",
                  price: "$35",
                  duration: "1.5 hours",
                  rating: 4.8,
                  reviews: 89,
                  ageRange: "6-14 years"
                },
                {
                  title: "Jewelry Making",
                  instructor: "Emma Davis",
                  price: "$55",
                  duration: "2.5 hours",
                  rating: 4.9,
                  reviews: 156,
                  ageRange: "8-16 years"
                },
                {
                  title: "Wood Crafting",
                  instructor: "Tom Anderson",
                  price: "$50",
                  duration: "2 hours",
                  rating: 4.7,
                  reviews: 98,
                  ageRange: "7-15 years"
                },
                {
                  title: "Mosaic Art",
                  instructor: "Lisa Martinez",
                  price: "$40",
                  duration: "1.5 hours",
                  rating: 4.9,
                  reviews: 112,
                  ageRange: "6-13 years"
                },
                {
                  title: "Paper Crafts",
                  instructor: "Amy Wilson",
                  price: "$30",
                  duration: "1 hour",
                  rating: 4.8,
                  reviews: 145,
                  ageRange: "5-11 years"
                }
              ].map((classItem, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                    <Palette className="h-16 w-16 text-purple-600" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-secondary px-2 py-1 rounded">{classItem.ageRange}</span>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {classItem.rating} ({classItem.reviews})
                      </div>
                    </div>
                    <CardTitle className="text-xl">{classItem.title}</CardTitle>
                    <CardDescription>with {classItem.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {classItem.duration}
                      </span>
                      <span className="text-2xl font-bold text-gray-900">{classItem.price}</span>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/search">View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/search">View All Classes</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let us know what kind of class you'd like to see!
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer 
        columns={[]}
        copyright="© 2024 Crafty Kid. All rights reserved."
        socialLinks={[]}
      />
    </>
  )
}

