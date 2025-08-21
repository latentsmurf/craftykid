import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getCookie, setCookie, deleteCookie } from "cookies-next"
import { prisma } from "@/lib/db"
import type { User, Role } from "@prisma/client"
import { cookies } from "next/headers"

// JWT secret - in production, use a strong secret from env
const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key-here-change-this-in-production"

// Session expiry - 7 days
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

export interface SessionPayload {
  userId: string
  email: string
  role: Role
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// JWT token management
export function generateToken(payload: SessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload
  } catch {
    return null
  }
}

// Session management
export async function createSession(user: User): Promise<string> {
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  })

  // Store session in database
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY)
  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  })

  return token
}

export async function deleteSession(token: string): Promise<void> {
  await prisma.session.delete({
    where: { token },
  }).catch(() => {
    // Ignore if session doesn't exist
  })
}

// Get current user from request (for API routes)
export async function getCurrentUser(request: Request): Promise<User | null> {
  const token = getCookie("auth-token", { req: request })
  
  if (!token || typeof token !== "string") {
    return null
  }

  const payload = verifyToken(token)
  if (!payload) {
    return null
  }

  // Check if session exists and is valid
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return session.user
}

// Get current user from server component
export async function getCurrentUserServer(): Promise<User | null> {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value
  
  if (!token) {
    return null
  }

  const payload = verifyToken(token)
  if (!payload) {
    return null
  }

  // Check if session exists and is valid
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return session.user
}

// Clean up expired sessions (can be run as a cron job)
export async function cleanupExpiredSessions(): Promise<void> {
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  })
}
