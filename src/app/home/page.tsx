import { Suspense } from "react"
import { SearchBar } from "@/components/search/search-bar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Palette, Star, Users, Shield, Clock, Heart } from "lucide-react"
import Link from "next/link"
import NavbarGlobal from "@/components/blocks/navbar-global"
import Footer from "@/components/blocks/footer"

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <NavbarGlobal />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Where creativity meets community
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Find trusted parent-and-kid craft classes near you
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <SearchBar 
                  variant="default" 
                  className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm"
                  placeholder="Search pottery, painting, jewelry making..."
                />
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/search">
                    <MapPin className="h-5 w-5 mr-2" />
                    Browse by Location
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/search">
                    <Calendar className="h-5 w-5 mr-2" />
                    This Weekend
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/search">
                    <Palette className="h-5 w-5 mr-2" />
                    Popular Crafts
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Background Checked</h3>
                <p className="text-sm text-gray-600">All instructors verified</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">5-Star Reviews</h3>
                <p className="text-sm text-gray-600">Trusted by 10,000+ families</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Flexible Booking</h3>
                <p className="text-sm text-gray-600">Cancel up to 24h before</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Satisfaction Guaranteed</h3>
                <p className="text-sm text-gray-600">Love it or your money back</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Classes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Classes This Week
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
                  image: "/images/pottery.jpg",
                  ageRange: "5-12 years"
                },
                {
                  title: "Watercolor Painting",
                  instructor: "Mike Chen",
                  price: "$35",
                  duration: "1.5 hours",
                  rating: 4.8,
                  reviews: 89,
                  image: "/images/watercolor.jpg",
                  ageRange: "6-14 years"
                },
                {
                  title: "Jewelry Making",
                  instructor: "Emma Davis",
                  price: "$55",
                  duration: "2.5 hours",
                  rating: 4.9,
                  reviews: 156,
                  image: "/images/jewelry.jpg",
                  ageRange: "8-16 years"
                }
              ].map((classItem, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                    <Palette className="h-16 w-16 text-purple-600" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{classItem.ageRange}</Badge>
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
                      <Link href="/search">Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/search">View All Classes</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Creative?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of families discovering the joy of crafting together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/search">Find Classes</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" asChild>
                <Link href="/instructors">Become an Instructor</Link>
              </Button>
            </div>
          </div>
        </section>
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

