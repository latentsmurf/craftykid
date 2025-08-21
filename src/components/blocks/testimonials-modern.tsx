"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  quote: string
  author: string
  role: string
  rating: number
  image?: string
  location?: string
}

interface TestimonialsModernProps {
  title?: string
  items?: Testimonial[]
  autoPlay?: boolean
  interval?: number
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "My daughter absolutely loved the pottery class! The instructor was patient and encouraging, and we both learned so much. The studio was beautiful and well-equipped. We can't wait to go back for another class together!",
    author: "Sarah Martinez",
    role: "Mom of 2",
    rating: 5,
    location: "Montecito, CA"
  },
  {
    quote: "Finally found a weekend activity we both enjoy! The painting class was perfect for my 4-year-old's attention span, and I was surprised by how much I enjoyed it too. The instructor made it fun for both of us.",
    author: "David Chen",
    role: "Dad of 1",
    rating: 5,
    location: "Santa Barbara, CA"
  },
  {
    quote: "As a busy mom, I was looking for quality time with my kids. These craft classes are perfect - educational, fun, and we create beautiful memories together. The instructors are amazing with children!",
    author: "Emma Rodriguez",
    role: "Mom of 3",
    rating: 5,
    location: "Montecito, CA"
  },
  {
    quote: "The jewelry making class was incredible! My 8-year-old daughter felt so proud of her creations, and I loved seeing her confidence grow. The instructor was knowledgeable and made everyone feel welcome.",
    author: "Michael Thompson",
    role: "Dad of 2",
    rating: 5,
    location: "Santa Barbara, CA"
  }
]

export default function TestimonialsModern({
  title = "What Parents Are Saying",
  items = defaultTestimonials,
  autoPlay = true,
  interval = 6000
}: TestimonialsModernProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  useEffect(() => {
    if (!isPlaying || items.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isPlaying, interval, items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-pink-900/10 relative overflow-hidden transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="testimonial-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonial-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div className="relative min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full"
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-border/20 relative">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center"
                  >
                    <Quote className="h-6 w-6 text-white" />
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex items-center gap-1 mb-6"
                  >
                    {renderStars(items[currentIndex].rating)}
                  </motion.div>

                  {/* Quote */}
                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-lg sm:text-xl lg:text-2xl text-foreground leading-relaxed mb-6 sm:mb-8 font-medium"
                  >
                    "{items[currentIndex].quote}"
                  </motion.blockquote>

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {items[currentIndex].author[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">
                        {items[currentIndex].author}
                      </p>
                      <p className="text-muted-foreground">
                        {items[currentIndex].role}
                        {items[currentIndex].location && ` • ${items[currentIndex].location}`}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {items.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card/80 backdrop-blur-sm hover:bg-card shadow-lg rounded-full"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card/80 backdrop-blur-sm hover:bg-card shadow-lg rounded-full"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>

          {/* Indicators */}
          {items.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex justify-center gap-3 mt-8"
            >
              {items.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          )}

          {/* Auto-play Control */}
          {autoPlay && items.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-center mt-6"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-gray-600 hover:text-gray-800"
              >
                {isPlaying ? "Pause" : "Play"} slideshow
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
