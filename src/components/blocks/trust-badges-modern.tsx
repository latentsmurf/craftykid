"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  Star, 
  Users, 
  Award,
  Heart,
  CheckCircle,
  TrendingUp,
  Clock
} from "lucide-react"

interface TrustBadge {
  icon: string
  label: string
  value: string
  description?: string
  color?: string
}

interface TrustBadgesModernProps {
  items?: TrustBadge[]
  layout?: "horizontal" | "grid"
  title?: string
}

const iconMap = {
  shield: Shield,
  star: Star,
  users: Users,
  award: Award,
  heart: Heart,
  check: CheckCircle,
  trending: TrendingUp,
  clock: Clock,
}

const defaultBadges: TrustBadge[] = [
  {
    icon: "shield",
    label: "Background-checked instructors",
    value: "100%",
    description: "Every instructor passes our comprehensive verification",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: "star",
    label: "Average rating",
    value: "4.8/5",
    description: "Based on 2,500+ verified reviews",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: "users",
    label: "Happy families",
    value: "5,000+",
    description: "Families who've created memories with us",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: "award",
    label: "Classes completed",
    value: "10,000+",
    description: "Successful creative sessions delivered",
    color: "from-purple-500 to-pink-500"
  },
]

export default function TrustBadgesModern({
  items = defaultBadges,
  layout = "grid",
  title = "Trusted by Families Everywhere"
}: TrustBadgesModernProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="container mx-auto px-4">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            layout === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
              : "flex flex-wrap justify-center gap-6 lg:gap-8"
          )}
        >
          {items.map((badge, index) => {
            const IconComponent = iconMap[badge.icon as keyof typeof iconMap] || Shield

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <div className="relative bg-card rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-purple-200 dark:hover:border-purple-400">
                  {/* Gradient Background */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl",
                    badge.color || "from-purple-500 to-pink-500"
                  )} />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 sm:mb-6 mx-auto",
                      badge.color || "from-purple-500 to-pink-500"
                    )}
                  >
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </motion.div>

                  {/* Value */}
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {badge.value}
                    </h3>
                    <p className="text-foreground/80 font-medium mb-2">
                      {badge.label}
                    </p>
                    {badge.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {badge.description}
                      </p>
                    )}
                  </motion.div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ boxShadow: "0 0 0 0 rgba(168, 85, 247, 0)" }}
                    whileHover={{ 
                      boxShadow: "0 0 0 2px rgba(168, 85, 247, 0.1)" 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>All classes include materials and safety equipment</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
