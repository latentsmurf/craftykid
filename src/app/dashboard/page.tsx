"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"

export default function DashboardRouter() {
  const { user, isLoading } = useClerkAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/auth/sign-in")
      } else {
        // Redirect based on role
        switch (user.role) {
          case "ADMIN":
            router.push("/dashboard/admin")
            break
          case "INSTRUCTOR":
            router.push("/dashboard/instructor")
            break
          default:
            router.push("/dashboard/parent")
        }
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}
