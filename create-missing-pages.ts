import { prisma } from "./src/lib/db"
import type { Page } from "@/lib/schemas/page-blocks"

const missingPages: Page[] = [
  {
    slug: "classes",
    title: "Find Classes",
    status: "PUBLISHED",
    seo: {
      title: "Find Parent-Kid Craft Classes | Crafty Kid",
      description: "Discover creative craft classes for parents and children in your area.",
    },
    blocks: [
      {
        type: "HeroSearch",
        headline: "Find Your Next Creative Adventure",
        subheadline: "Browse hundreds of parent-kid craft classes near you",
        searchFields: {
          location: true,
          ageRange: true,
          activity: true,
        },
      },
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80",
        imageAlt: "Parent and child crafting together",
        imageSide: "right",
        title: "Classes for Every Interest",
        content: `<p>From pottery and painting to woodworking and jewelry making, we have classes for every creative interest. All our classes are designed for parents and children to enjoy together.</p>`,
      },
      {
        type: "CTASection",
        title: "Can't find what you're looking for?",
        body: "Let us know what kind of class you'd like to see!",
        bgColor: "secondary",
        primary: {
          label: "Contact Us",
          href: "/contact",
        },
      },
    ],
  },
  {
    slug: "how-it-works",
    title: "How It Works",
    status: "PUBLISHED",
    seo: {
      title: "How Crafty Kid Works | Simple Steps to Creative Fun",
      description: "Learn how easy it is to find and book parent-kid craft classes on Crafty Kid.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
        imageAlt: "Search for classes",
        imageSide: "left",
        title: "1. Search for Classes",
        content: `<p>Use our simple search to find classes by location, age group, and craft type. Filter by date, price, and more to find the perfect fit.</p>`,
      },
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        imageAlt: "Book your spot",
        imageSide: "right",
        title: "2. Book Your Spot",
        content: `<p>Found a class you love? Book your spot in seconds with our secure checkout. We accept all major credit cards.</p>`,
      },
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1498075702571-ecb018f3752d?w=800&q=80",
        imageAlt: "Create together",
        imageSide: "left",
        title: "3. Create Together",
        content: `<p>Show up and have fun! All materials are provided unless otherwise noted. Our instructors make sure everyone has a great time.</p>`,
      },
      {
        type: "FAQAccordion",
        title: "Common Questions",
        items: [
          {
            question: "How far in advance can I book?",
            answer: "Most classes can be booked up to 2 months in advance. Popular classes fill up quickly, so we recommend booking early!",
          },
          {
            question: "What if I need to cancel?",
            answer: "You can cancel up to 24 hours before the class for a full refund. Cancellations within 24 hours receive a 50% credit.",
          },
          {
            question: "Are materials included?",
            answer: "Yes! Most classes include all materials. If you need to bring anything special, it will be clearly noted in the class description.",
          },
        ],
      },
    ],
  },
  {
    slug: "for-creators",
    title: "For Creators",
    status: "PUBLISHED",
    seo: {
      title: "Teach Craft Classes | Become a Crafty Kid Instructor",
      description: "Share your creative skills and earn money teaching parent-kid craft classes.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        imageAlt: "Instructor teaching pottery",
        imageSide: "right",
        title: "Share Your Craft, Build Your Business",
        content: `<p>Turn your creative passion into income by teaching parent-kid craft classes. Set your own schedule, prices, and class sizes.</p>
        <ul>
          <li>Keep 80% of your earnings</li>
          <li>We handle all payments and bookings</li>
          <li>Free marketing and promotion</li>
          <li>Supportive instructor community</li>
        </ul>`,
        cta: {
          label: "Apply to Teach",
          href: "/auth/signup",
          variant: "primary",
        },
      },
      {
        type: "TeacherSpotlight",
        title: "Success Stories",
        maxItems: 3,
        layout: "grid",
        autoRotate: false,
      },
      {
        type: "FAQAccordion",
        title: "Instructor FAQ",
        items: [
          {
            question: "What qualifications do I need?",
            answer: "You need expertise in your craft and experience working with children. Teaching experience is helpful but not required - we provide training!",
          },
          {
            question: "How much can I earn?",
            answer: "Instructors typically charge $30-60 per child per class. You keep 80% of the revenue. Top instructors earn $2,000+ per month.",
          },
          {
            question: "Do I need insurance?",
            answer: "We provide liability insurance for all classes booked through our platform. You'll need to pass a background check.",
          },
          {
            question: "Where can I teach?",
            answer: "You can teach from your own studio, partner venues, or even outdoors. We help you find suitable spaces if needed.",
          },
        ],
      },
      {
        type: "CTASection",
        title: "Ready to inspire young creators?",
        body: "Join our community of passionate instructors",
        bgColor: "primary",
        primary: {
          label: "Start Your Application",
          href: "/auth/signup",
        },
      },
    ],
  },
  {
    slug: "about",
    title: "About Crafty Kid",
    status: "PUBLISHED",
    seo: {
      title: "About Crafty Kid | Our Story and Mission",
      description: "Learn about Crafty Kid's mission to connect families through creative experiences.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1514621166532-aa7eb1a3a2f4?w=800&q=80",
        imageAlt: "Families crafting together",
        imageSide: "right",
        title: "Our Story",
        content: `<p>Crafty Kid was born from a simple observation: in our digital age, families crave real, hands-on experiences together. We started in 2024 with a mission to make creative activities accessible to every family.</p>
        <p>Today, we connect thousands of families with talented local artisans who share their crafts in fun, engaging classes designed for parents and kids to enjoy together.</p>`,
      },
      {
        type: "TrustBadges",
        items: [
          {
            icon: "users",
            label: "Families Served",
            value: "5,000+",
          },
          {
            icon: "star",
            label: "Average Rating",
            value: "4.8/5",
          },
          {
            icon: "award",
            label: "Verified Instructors",
            value: "200+",
          },
          {
            icon: "heart",
            label: "Classes Completed",
            value: "10,000+",
          },
        ],
        layout: "horizontal",
      },
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&q=80",
        imageAlt: "Our values",
        imageSide: "left",
        title: "Our Values",
        content: `<h3>Creativity First</h3>
        <p>We believe everyone is creative. Our classes help families discover and nurture their creative spirits together.</p>
        
        <h3>Safety & Trust</h3>
        <p>All instructors are background-checked and verified. We maintain the highest safety standards in every class.</p>
        
        <h3>Community Connection</h3>
        <p>We're building a community where families connect, create, and grow together through shared experiences.</p>`,
      },
      {
        type: "CTASection",
        title: "Join the Crafty Kid Community",
        body: "Whether you're looking for classes or want to teach, we'd love to have you!",
        bgColor: "primary",
        primary: {
          label: "Find Classes",
          href: "/classes",
        },
        secondary: {
          label: "Become an Instructor",
          href: "/for-creators",
        },
      },
    ],
  },
]

async function createMissingPages() {
  console.log("Creating missing pages...")
  
  for (const page of missingPages) {
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
  
  console.log("\nDone! All pages should now be accessible.")
  await prisma.$disconnect()
}

createMissingPages()
