import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Webhook } from "svix"
import { WebhookEvent } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occured", {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, public_metadata } = evt.data

    const email = email_addresses[0]?.email_address
    if (!email) {
      return NextResponse.json({ error: "No email found" }, { status: 400 })
    }

    // Determine role
    let role: "PARENT" | "INSTRUCTOR" | "ADMIN" = "PARENT"
    
    // Check if admin by email
    const adminEmails = ["latentsmurf@gmail.com", "ladan.cher@gmail.com"]
    if (adminEmails.includes(email)) {
      role = "ADMIN"
    } else if (public_metadata?.role === "INSTRUCTOR") {
      role = "INSTRUCTOR"
    } else if (public_metadata?.role === "ADMIN") {
      role = "ADMIN"
    }

    try {
      // Upsert user in database
      const user = await prisma.user.upsert({
        where: { email },
        update: {
          name: `${first_name || ""} ${last_name || ""}`.trim() || null,
          role,
        },
        create: {
          email,
          name: `${first_name || ""} ${last_name || ""}`.trim() || null,
          role,
          clerkId: id,
        },
      })

      // If instructor, create instructor profile if doesn't exist
      if (role === "INSTRUCTOR") {
        const existingProfile = await prisma.instructorProfile.findUnique({
          where: { userId: user.id },
        })

        if (!existingProfile) {
          await prisma.instructorProfile.create({
            data: {
              userId: user.id,
              bio: "",
              crafts: [],
              verificationStatus: "PENDING",
            },
          })
        }
      }

      return NextResponse.json({ message: "User synced successfully" })
    } catch (error) {
      console.error("Error syncing user:", error)
      return NextResponse.json(
        { error: "Failed to sync user" },
        { status: 500 }
      )
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data

    try {
      // Soft delete or handle user deletion
      // For now, we'll keep the user but mark them as inactive
      // You might want to implement a different strategy
      console.log("User deleted in Clerk:", id)
      // await prisma.user.update({
      //   where: { clerkId: id },
      //   data: { deletedAt: new Date() }
      // })
    } catch (error) {
      console.error("Error handling user deletion:", error)
    }
  }

  return NextResponse.json({ message: "Webhook received" })
}
