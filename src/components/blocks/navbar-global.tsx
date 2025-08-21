"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
import { 
  Menu, 
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Settings,
  HelpCircle,
  Search
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { SearchBar } from "@/components/search/search-bar"
import { siteConfig } from "@/lib/config/site"
import { SimpleThemeToggle } from "@/components/ui/theme-toggle"
import { MobileNavbar } from "@/components/blocks/mobile-navbar"

interface NavbarGlobalProps {
  id?: string
  className?: string
}

export default function NavbarGlobal({ id, className }: NavbarGlobalProps) {
  const { user, isLoading, logout } = useClerkAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden lg:block sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/20 shadow-lg transition-colors duration-300 ${className || ""}`}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group flex-shrink-0 mr-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                {siteConfig.title}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6 flex-shrink-0">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-foreground/80 hover:text-purple-600 transition-colors duration-200 font-medium group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden xl:block flex-1 max-w-sm mx-4">
              <SearchBar variant="navbar" />
            </div>

            {/* Search Button for Medium Screens */}
            <div className="hidden lg:block xl:hidden">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/search">
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex lg:items-center lg:space-x-3 flex-shrink-0">
              <SimpleThemeToggle />
              {isLoading ? (
                <div className="h-8 w-8 animate-pulse bg-gray-200 rounded-full" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{user.name || user.email}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name || "User"}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className="text-xs text-primary capitalize">{user.role.toLowerCase()}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardLink()} className="flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/help" className="flex items-center">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Help
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/auth/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/sign-up">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNavbar />
    </>
  )
}
