import { Button } from "@/components/ui/button"
import { Shield, Star, Users, Heart } from "lucide-react"
import Link from "next/link"
import NavbarGlobal from "@/components/blocks/navbar-global"
import Footer from "@/components/blocks/footer"

export default function AboutPage() {
  return (
    <>
      <NavbarGlobal />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About Crafty Kid
              </h1>
              <p className="text-xl text-gray-600">
                Building connections through creative experiences
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Crafty Kid was born from a simple observation: in our digital age, families crave real, hands-on experiences together. We started in 2024 with a mission to make creative activities accessible to every family.
                    </p>
                    <p>
                      Today, we connect thousands of families with talented local artisans who share their crafts in fun, engaging classes designed for parents and kids to enjoy together.
                    </p>
                    <p>
                      Whether it's pottery, painting, woodworking, or jewelry making, we believe that making things with your hands brings people together in ways that screens never can.
                    </p>
                  </div>
                </div>
                <div className="h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">
                  <Heart className="h-32 w-32 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">5,000+</div>
                <div className="text-gray-600">Families Served</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">4.8/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
                <div className="text-gray-600">Verified Instructors</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
                <div className="text-gray-600">Classes Completed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="font-semibold text-lg mb-2">Foster Creativity</h3>
                  <p className="text-gray-600">Inspire families to explore their creative potential through hands-on experiences.</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                  <h3 className="font-semibold text-lg mb-2">Build Community</h3>
                  <p className="text-gray-600">Connect families with local artisans and create lasting memories together.</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">💪</div>
                  <h3 className="font-semibold text-lg mb-2">Support Artists</h3>
                  <p className="text-gray-600">Help talented instructors grow their businesses and share their passion.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Safety First</h3>
                    <p className="text-gray-600">All instructors are background checked and verified. We maintain the highest safety standards.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Quality Experiences</h3>
                    <p className="text-gray-600">We curate every class to ensure it meets our standards for engagement and value.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Inclusive Community</h3>
                    <p className="text-gray-600">Everyone is welcome. We celebrate diversity and create spaces where all families feel at home.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Fair Partnerships</h3>
                    <p className="text-gray-600">We treat our instructors as partners, ensuring they're fairly compensated for their expertise.</p>
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
              Join Our Community
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're a parent looking for activities or an instructor ready to teach, we'd love to have you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/search">Find Classes</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" asChild>
                <Link href="/for-creators">Become an Instructor</Link>
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

