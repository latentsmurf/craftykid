"use client"

import { useUser, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface ClerkUser {
  id: string
  email: string
  name?: string | null
  role: "PARENT" | "INSTRUCTOR" | "ADMIN"
}

export function useClerkAuth() {
  const [hasError, setHasError] = useState(false)
  
  let user, isLoaded, isSignedIn, clerk
  
  try {
    const userHook = useUser()
    const clerkHook = useClerk()
    user = userHook.user
    isLoaded = userHook.isLoaded
    isSignedIn = userHook.isSignedIn
    clerk = clerkHook
  } catch (error) {
    console.error("Clerk initialization error:", error)
    setHasError(true)
    // Return safe defaults when Clerk is not properly configured
    return {
      user: null,
      isLoading: false,
      isSignedIn: false,
      logout: async () => {},
    }
  }

  const router = useRouter()

  // Get role from Clerk metadata or default to PARENT
  const getRole = (): "PARENT" | "INSTRUCTOR" | "ADMIN" => {
    if (!user) return "PARENT"
    
    // Check if user is admin by email
    const adminEmails = ["latentsmurf@gmail.com", "ladan.cher@gmail.com"]
    if (user.primaryEmailAddress?.emailAddress && adminEmails.includes(user.primaryEmailAddress.emailAddress)) {
      return "ADMIN"
    }
    
    // Check public metadata for role
    const role = user.publicMetadata?.role as string
    if (role === "ADMIN" || role === "INSTRUCTOR") {
      return role
    }
    
    return "PARENT"
  }

  const clerkUser: ClerkUser | null = user ? {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress || "",
    name: user.fullName || user.firstName || null,
    role: getRole(),
  } : null

  const logout = async () => {
    try {
      await clerk.signOut()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return {
    user: clerkUser,
    isLoading: !isLoaded,
    isSignedIn: isSignedIn || false,
    logout,
  }
}
