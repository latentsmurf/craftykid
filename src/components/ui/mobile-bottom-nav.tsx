"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Search, 
  Calendar, 
  User,
  Heart
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/classes", icon: Calendar, label: "Classes" },
  { href: "/dashboard/parent", icon: User, label: "Account", requiresAuth: true },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const { user } = useClerkAuth()

  // Don't show on certain pages
  const hiddenPaths = ["/auth/sign-in", "/auth/sign-up", "/onboarding"]
  if (hiddenPaths.some(path => pathname.startsWith(path))) {
    return null
  }

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-t border-border shadow-lg"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          // Skip auth-required items if user not logged in
          if (item.requiresAuth && !user) {
            return (
              <Link
                key="auth"
                href="/auth/sign-in"
                className="flex flex-col items-center justify-center p-3 rounded-xl transition-colors min-w-0"
              >
                <div className="relative">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground mt-1 truncate">
                  Sign In
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 min-w-0 relative",
                isActive 
                  ? "text-purple-600" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <motion.div
                className="relative"
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="h-6 w-6" />
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -inset-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.div>
              <span className={cn(
                "text-xs mt-1 truncate transition-colors",
                isActive ? "text-purple-600 font-medium" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom" />
    </motion.nav>
  )
}
