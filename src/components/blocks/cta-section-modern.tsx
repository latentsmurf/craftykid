"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Heart, Star } from "lucide-react"
import Link from "next/link"

interface CTASectionModernProps {
  title?: string
  body?: string
  bgColor?: "primary" | "secondary" | "gradient"
  primary?: {
    label: string
    href: string
  }
  secondary?: {
    label: string
    href: string
  }
}

export default function CTASectionModern({
  title = "Ready to Create Amazing Memories?",
  body = "Join thousands of families discovering their creativity together",
  bgColor = "gradient",
  primary = { label: "Find Classes", href: "/classes" },
  secondary = { label: "Become an Instructor", href: "/for-creators" }
}: CTASectionModernProps) {
  const backgroundClasses = {
    primary: "bg-purple-600",
    secondary: "bg-gray-100",
    gradient: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500"
  }

  const textColorClasses = {
    primary: "text-white",
    secondary: "text-gray-900",
    gradient: "text-white"
  }

  const floatingIcons = [
    { icon: "🎨", delay: 0, x: 10, y: 20 },
    { icon: "✨", delay: 0.5, x: 90, y: 30 },
    { icon: "🌟", delay: 1, x: 15, y: 80 },
    { icon: "💝", delay: 1.5, x: 85, y: 70 },
  ]

  return (
    <section className={`relative py-20 overflow-hidden ${backgroundClasses[bgColor]}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.05, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Floating Icons */}
        {floatingIcons.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay,
            }}
          >
            {element.icon}
          </motion.div>
        ))}

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-2 border-white/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 border-2 border-white/20 rotate-45"
          animate={{ rotate: [45, 225, 45] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Join the Creative Community</span>
            </motion.div>

            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${textColorClasses[bgColor]}`}>
              {title.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`text-xl mb-12 ${
                bgColor === "gradient" ? "text-white/90" : 
                bgColor === "primary" ? "text-purple-100" : "text-gray-600"
              }`}
            >
              {body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  asChild 
                  className="group bg-white text-purple-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl px-8 py-4 text-lg font-semibold"
                >
                  <Link href={primary.href}>
                    {primary.label}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>

              {secondary && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    asChild 
                    className="group border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
                  >
                    <Link href={secondary.href}>
                      {secondary.label}
                      <Heart className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-8 mt-16"
            >
              {[
                { value: "5,000+", label: "Happy Families" },
                { value: "200+", label: "Expert Instructors" },
                { value: "10,000+", label: "Classes Completed" },
                { value: "4.9★", label: "Average Rating" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <p className={`text-2xl font-bold ${textColorClasses[bgColor]}`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm ${
                    bgColor === "gradient" ? "text-white/80" : 
                    bgColor === "primary" ? "text-purple-200" : "text-gray-500"
                  }`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      {bgColor === "gradient" && (
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
              className="fill-white"
            />
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
              className="fill-white"
            />
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-white"
            />
          </svg>
        </div>
      )}
    </section>
  )
}
