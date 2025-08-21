"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
import { SearchBar } from "@/components/search/search-bar"
import { SimpleThemeToggle } from "@/components/ui/theme-toggle"
import { siteConfig } from "@/lib/config/site"
import { 
  Menu, 
  X,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
  HelpCircle,
  Search,
  Home,
  ChevronRight
} from "lucide-react"

interface MobileNavbarProps {
  className?: string
}

export function MobileNavbar({ className }: MobileNavbarProps) {
  const { user, isLoading, logout } = useClerkAuth()
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false)
    // Listen for route changes if needed
    return () => {}
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const getDashboardLink = () => {
    if (!user) return "/dashboard"
    switch (user.role) {
      case "ADMIN":
        return "/dashboard/admin"
      case "INSTRUCTOR":
        return "/dashboard/instructor"
      default:
        return "/dashboard/parent"
    }
  }

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  }

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  }

  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <>
      {/* Mobile Header */}
      <header className={`lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm transition-colors duration-300 ${className || ""}`}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {siteConfig.title}
              </span>
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <SimpleThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                className="w-10 h-10"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay & Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-background border-l border-border shadow-2xl lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Menu
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex flex-col h-full">
                <motion.div
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                  className="flex-1 overflow-y-auto p-6 space-y-6"
                >
                  {/* Search */}
                  <motion.div variants={itemVariants}>
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Search
                      </h3>
                      <SearchBar variant="default" placeholder="Find classes, instructors..." />
                    </div>
                  </motion.div>

                  {/* Navigation Links */}
                  <motion.div variants={itemVariants}>
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Explore
                      </h3>
                      <div className="space-y-1">
                        <Link href="/" className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group">
                          <div className="flex items-center gap-3">
                            <Home className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">Home</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </Link>
                        {siteConfig.navLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <Search className="h-5 w-5 text-muted-foreground" />
                              <span className="font-medium">{link.label}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* User Section */}
                  {!isLoading && (
                    <motion.div variants={itemVariants}>
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          Account
                        </h3>
                        {user ? (
                          <div className="space-y-1">
                            {/* User Info */}
                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name?.[0] || user.email[0].toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate">
                                  {user.name || "User"}
                                </p>
                                <p className="text-sm text-muted-foreground truncate">
                                  {user.email}
                                </p>
                                <p className="text-xs text-purple-600 font-medium capitalize">
                                  {user.role.toLowerCase()}
                                </p>
                              </div>
                            </div>

                            {/* User Actions */}
                            <Link 
                              href={getDashboardLink()}
                              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-center gap-3">
                                <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Dashboard</span>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link 
                              href="/settings"
                              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-center gap-3">
                                <Settings className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Settings</span>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link 
                              href="/help"
                              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-center gap-3">
                                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Help</span>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <button
                              onClick={() => {
                                logout()
                                setIsOpen(false)
                              }}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 w-full text-left"
                            >
                              <LogOut className="h-5 w-5" />
                              <span className="font-medium">Sign Out</span>
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Button asChild className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                              <Link href="/auth/sign-up" onClick={() => setIsOpen(false)}>
                                Get Started
                              </Link>
                            </Button>
                            <Button variant="outline" asChild className="w-full h-12 text-base font-medium">
                              <Link href="/auth/sign-in" onClick={() => setIsOpen(false)}>
                                Sign In
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Footer */}
                <motion.div 
                  variants={itemVariants}
                  className="p-6 border-t border-border bg-muted/20"
                >
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      © 2024 Crafty Kid
                    </p>
                    <div className="flex justify-center gap-4 text-xs">
                      <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                        Terms
                      </Link>
                      <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                        Privacy
                      </Link>
                      <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                        Help
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
