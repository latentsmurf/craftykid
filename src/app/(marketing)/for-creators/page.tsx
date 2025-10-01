import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Calendar, Star, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"
import NavbarGlobal from "@/components/blocks/navbar-global"
import Footer from "@/components/blocks/footer"

export default function ForCreatorsPage() {
  return (
    <>
      <NavbarGlobal />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Share Your Craft, Build Your Business
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join hundreds of artisan instructors earning income doing what they love
              </p>
              <Button size="lg" asChild>
                <Link href="/instructor/onboarding">Become an Instructor</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Teach on Crafty Kid?
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to grow your creative business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: DollarSign,
                  title: "Earn More",
                  description: "Set your own prices and keep 80% of what you earn. Average instructors make $500+ per month."
                },
                {
                  icon: Users,
                  title: "Reach New Students",
                  description: "Tap into our network of 10,000+ families actively looking for creative experiences."
                },
                {
                  icon: Calendar,
                  title: "Your Schedule",
                  description: "Teach when it works for you. Full control over your availability and class schedule."
                },
                {
                  icon: Shield,
                  title: "Protected Payments",
                  description: "Get paid on time, every time. We handle all payment processing and bookings securely."
                },
                {
                  icon: TrendingUp,
                  title: "Grow Your Brand",
                  description: "Build your reputation with reviews and ratings. Market yourself to the right audience."
                },
                {
                  icon: Star,
                  title: "Free Marketing",
                  description: "We promote your classes through our platform, email campaigns, and social media."
                }
              ].map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <benefit.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Getting Started is Easy</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Create Your Profile</h3>
                    <p className="text-gray-600">Tell us about your craft and experience. Upload photos of your work.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">List Your Classes</h3>
                    <p className="text-gray-600">Set your schedule, pricing, and class details. We'll help you get started.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Start Teaching</h3>
                    <p className="text-gray-600">Accept bookings, teach your classes, and get paid. It's that simple!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
                <div className="text-gray-600">Active Instructors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600">Classes Taught</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">4.8★</div>
                <div className="text-gray-600">Avg Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">80%</div>
                <div className="text-gray-600">Your Earnings</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Teaching?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community of creative instructors today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/instructor/onboarding">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
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

