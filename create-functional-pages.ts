import { prisma } from "./src/lib/db"
import type { Page } from "@/lib/schemas/page-blocks"

const functionalPages: Page[] = [
  {
    slug: "instructors",
    title: "All Instructors",
    status: "PUBLISHED",
    seo: {
      title: "Browse All Instructors | Crafty Kid",
      description: "Meet all our verified craft instructors and find the perfect teacher for your family.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&q=80",
        imageAlt: "Our instructors",
        imageSide: "right",
        title: "Meet Our Amazing Instructors",
        content: `<p>All our instructors are passionate artisans who love sharing their craft with families. Each instructor is background-checked and verified for your peace of mind.</p>
        <p>Browse by craft type, location, or rating to find the perfect instructor for your family's creative journey.</p>`,
      },
      {
        type: "TeacherSpotlight",
        title: "Featured Instructors",
        autoRotate: false,
        layout: "grid",
        maxItems: 6,
      },
      {
        type: "CTASection",
        title: "Want to teach?",
        body: "Join our community of creative instructors",
        bgColor: "primary",
        primary: {
          label: "Become an Instructor",
          href: "/for-creators",
        },
      },
    ],
  },
  {
    slug: "admin",
    title: "Admin Dashboard",
    status: "PUBLISHED",
    seo: {
      title: "Admin Dashboard | Crafty Kid",
      description: "Admin dashboard for Crafty Kid platform management.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        imageAlt: "Admin dashboard",
        imageSide: "left",
        title: "Admin Access Required",
        content: `<p>This page is restricted to Crafty Kid administrators.</p>
        <p>If you are an administrator, please sign in with your admin credentials to access the dashboard.</p>
        <p>The admin dashboard allows you to:</p>
        <ul>
          <li>Manage pages and content</li>
          <li>Review and approve instructors</li>
          <li>Monitor platform activity</li>
          <li>Handle support requests</li>
          <li>Generate reports</li>
        </ul>`,
        cta: {
          label: "Admin Login",
          href: "/auth/login",
          variant: "primary",
        },
      },
    ],
  },
]

async function createFunctionalPages() {
  console.log("Creating functional pages...")
  
  for (const page of functionalPages) {
    try {
      const existing = await prisma.page.findUnique({
        where: { slug: page.slug }
      })
      
      if (existing) {
        console.log(`✓ Page /${page.slug} already exists`)
      } else {
        await prisma.page.create({
          data: {
            slug: page.slug,
            title: page.title,
            status: page.status,
            seo: page.seo,
            blocks: page.blocks as any,
          },
        })
        console.log(`✅ Created page: /${page.slug}`)
      }
    } catch (error) {
      console.error(`Error creating page ${page.slug}:`, error)
    }
  }
  
  console.log("\nDone!")
  await prisma.$disconnect()
}

createFunctionalPages()
