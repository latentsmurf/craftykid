import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { BlogTeasersBlock } from "@/lib/schemas/page-blocks"

// Mock data - in production this would come from the database
const mockPosts = [
  {
    id: "1",
    title: "5 Benefits of Craft Activities for Child Development",
    excerpt: "Discover how hands-on craft activities boost creativity, fine motor skills, and emotional growth in children.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    author: "Dr. Sarah Johnson",
    publishedAt: new Date("2024-01-15"),
    readTime: 5,
    category: "Child Development",
  },
  {
    id: "2",
    title: "Choosing the Right Art Class for Your Toddler",
    excerpt: "A parent's guide to finding age-appropriate creative activities that match your child's interests and abilities.",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80",
    author: "Emily Chen",
    publishedAt: new Date("2024-01-10"),
    readTime: 3,
    category: "Parenting Tips",
  },
  {
    id: "3",
    title: "DIY Craft Ideas for Rainy Days",
    excerpt: "Keep your kids entertained with these simple, mess-free craft projects using materials you already have at home.",
    image: "https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?w=800&q=80",
    author: "Maria Rodriguez",
    publishedAt: new Date("2024-01-05"),
    readTime: 4,
    category: "Activities",
  },
]

export default function BlogTeasers({
  title = "From Our Blog",
  maxItems = 3,
  categoryFilter,
}: BlogTeasersBlock) {
  // In production, fetch posts from database with filters
  const posts = categoryFilter 
    ? mockPosts.filter(p => p.category === categoryFilter).slice(0, maxItems)
    : mockPosts.slice(0, maxItems)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tips, insights, and inspiration for creative parenting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {post.publishedAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <p className="text-sm text-gray-500">
                  By {post.author}
                </p>
              </CardContent>

              <CardFooter className="px-6 pb-6">
                <Button variant="ghost" className="group" asChild>
                  <Link href={`/blog/${post.id}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">Visit Our Blog</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
