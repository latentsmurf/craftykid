import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Define protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/dashboard/parent",
  "/dashboard/instructor", 
  "/dashboard/admin",
  "/instructor/onboarding",
  "/settings",
  "/api/protected",
];

// Define admin-only routes
const adminRoutes = [
  "/dashboard/admin",
  "/api/admin",
];

// Define instructor-only routes
const instructorRoutes = [
  "/dashboard/instructor",
  "/instructor/onboarding",
  "/api/instructor",
];

export async function checkAuth(pathname: string) {
  const { userId, sessionClaims } = auth();
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/auth/sign-in", process.env.NEXT_PUBLIC_APP_URL));
  }
  
  // Check admin routes
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  if (isAdminRoute) {
    const userEmail = sessionClaims?.email as string;
    const adminEmails = ["latentsmurf@gmail.com", "ladan.cher@gmail.com"];
    const isAdmin = adminEmails.includes(userEmail) || sessionClaims?.metadata?.role === "ADMIN";
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL));
    }
  }
  
  // Check instructor routes
  const isInstructorRoute = instructorRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  if (isInstructorRoute) {
    const role = sessionClaims?.metadata?.role;
    if (role !== "INSTRUCTOR" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL));
    }
  }
  
  return NextResponse.next();
}
