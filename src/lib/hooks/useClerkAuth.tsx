"use client"

import { useUser, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

interface ClerkUser {
  id: string
  email: string
  name?: string | null
  role: "PARENT" | "INSTRUCTOR" | "ADMIN"
}

export function useClerkAuth() {
  const { user, isLoaded, isSignedIn } = useUser()
  const { signOut } = useClerk()
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
    await signOut()
    router.push("/")
  }

  return {
    user: clerkUser,
    isLoading: !isLoaded,
    isSignedIn,
    logout,
  }
}
