import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calendar, CreditCard, Heart } from "lucide-react"
import Link from "next/link"
import NavbarGlobal from "@/components/blocks/navbar-global"
import Footer from "@/components/blocks/footer"

export default function HowItWorksPage() {
  return (
    <>
      <NavbarGlobal />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How It Works
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Getting started with Crafty Kid is easy. Book your first class in minutes!
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Search,
                  title: "1. Find a Class",
                  description: "Browse our curated selection of craft classes. Filter by location, age range, and activity type."
                },
                {
                  icon: Calendar,
                  title: "2. Book Your Spot",
                  description: "Choose a time that works for you. See real availability and book instantly with just a few clicks."
                },
                {
                  icon: CreditCard,
                  title: "3. Secure Payment",
                  description: "Pay safely through our platform. Get instant confirmation and all the details you need via email."
                },
                {
                  icon: Heart,
                  title: "4. Enjoy Together",
                  description: "Show up and have fun! All materials included. Create memories and crafts you'll treasure forever."
                }
              ].map((step, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <step.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Crafty Kid?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Vetted Instructors</h3>
                    <p className="text-gray-600">All instructors are background checked and experienced with children.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">★</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
                    <p className="text-gray-600">Read reviews from other families and book with confidence.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Flexible Booking</h3>
                    <p className="text-gray-600">Cancel up to 24 hours before class for a full refund.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💝</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">All Materials Included</h3>
                    <p className="text-gray-600">Just show up! We provide everything you need for a great experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Find your perfect class today!
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/search">Browse Classes</Link>
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

