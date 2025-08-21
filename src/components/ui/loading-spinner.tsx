"use client"

import { motion } from "framer-motion"
import { Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "gradient" | "dots"
  text?: string
  className?: string
}

export function LoadingSpinner({ 
  size = "md", 
  variant = "default",
  text,
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
        {text && (
          <span className="ml-3 text-gray-600 font-medium">{text}</span>
        )}
      </div>
    )
  }

  if (variant === "gradient") {
    return (
      <div className={cn("flex flex-col items-center gap-4", className)}>
        <motion.div
          className={cn(
            "rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-1",
            size === "sm" ? "w-8 h-8" : size === "md" ? "w-12 h-12" : "w-16 h-16"
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <Sparkles className={cn(
              "text-purple-600",
              size === "sm" ? "h-3 w-3" : size === "md" ? "h-5 w-5" : "h-7 w-7"
            )} />
          </div>
        </motion.div>
        {text && (
          <motion.p 
            className="text-gray-600 font-medium text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className={cn(
        "animate-spin text-purple-600",
        sizeClasses[size]
      )} />
      {text && (
        <span className="ml-3 text-gray-600 font-medium">{text}</span>
      )}
    </div>
  )
}
