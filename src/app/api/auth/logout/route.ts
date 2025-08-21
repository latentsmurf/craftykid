import { NextRequest, NextResponse } from "next/server"
import { getCookie, deleteCookie } from "cookies-next"
import { deleteSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = getCookie("auth-token", { req: request })
    
    if (token && typeof token === "string") {
      // Delete session from database
      await deleteSession(token)
    }
    
    // Delete cookie
    const response = NextResponse.json({ success: true })
    
    deleteCookie("auth-token", {
      req: request,
      res: response,
      path: "/",
    })
    
    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
