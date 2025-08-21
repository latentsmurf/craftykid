import { PrismaClient } from "@prisma/client"
import type { Page } from "@/lib/schemas/page-blocks"

const prisma = new PrismaClient()

const homePage: Page = {
  slug: "home",
  title: "Home",
  status: "PUBLISHED",
  seo: {
    title: "Crafty Kid — Where creativity meets community",
    description: "Discover local parent-and-kid craft classes. Connect with talented artisan instructors in your community.",
    ogImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
  },
  blocks: [
    {
      type: "HeroSearch",
      headline: "Where creativity meets community",
      subheadline: "Find trusted parent-and-kid craft classes near you",
      searchFields: {
        location: true,
        ageRange: true,
        activity: true,
      },
    },
    {
      type: "FeaturedClasses",
      title: "Popular Classes This Week",
      query: {
        mode: "auto",
        filters: {
          city: "any",
        },
      },
      maxItems: 6,
      layout: "grid",
    },
    {
      type: "TeacherSpotlight",
      title: "Meet Our Star Instructors",
      instructorIds: ["inst_123", "inst_456", "inst_789"],
      layout: "carousel",
      maxItems: 3,
      autoRotate: false,
    },
    {
      type: "TrustBadges",
      items: [
        {
          icon: "shield",
          label: "Background-checked instructors",
          value: "100%",
        },
        {
          icon: "star",
          label: "Average rating",
          value: "4.8/5",
        },
        {
          icon: "users",
          label: "Happy families",
          value: "5,000+",
        },
        {
          icon: "award",
          label: "Classes completed",
          value: "10,000+",
        },
      ],
      layout: "horizontal",
    },
    {
      type: "ContentSplit",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      imageAlt: "Parent and child doing pottery together",
      imageSide: "right",
      title: "Safe, Fun, and Educational",
      content: `<p>Every Crafty Kid class is designed with both parents and children in mind. Our instructors are not just talented artisans—they're experienced educators who know how to create engaging, age-appropriate activities.</p>
      <p>From pottery and painting to woodworking and jewelry making, we offer a wide range of creative experiences that help children develop fine motor skills, boost confidence, and express themselves through art.</p>`,
      cta: {
        label: "Learn More About Our Approach",
        href: "/about",
        variant: "primary",
      },
    },
    {
      type: "Testimonials",
      title: "What Parents Are Saying",
      items: [
        {
          quote: "My daughter absolutely loved the pottery class! The instructor was patient and encouraging. We can't wait to go back.",
          author: "Sarah M.",
          role: "Mom of 2",
          rating: 5,
        },
        {
          quote: "Finally found a weekend activity we both enjoy! The painting class was perfect for my 4-year-old's attention span.",
          author: "David L.",
          role: "Dad of 1",
          rating: 5,
        },
        {
          quote: "The instructors are amazing with kids. My son has special needs and they made him feel so welcome and capable.",
          author: "Jennifer K.",
          role: "Mom of 3",
          rating: 5,
        },
      ],
      layout: "carousel",
    },
    {
      type: "FAQAccordion",
      title: "Common Questions",
      items: [
        {
          question: "What age ranges do you serve?",
          answer: "We offer classes for children ages 1-17, with age-appropriate activities for each developmental stage. Each class listing shows the recommended age range.",
        },
        {
          question: "Do parents participate in the classes?",
          answer: "Yes! All our classes are designed for parent-child participation. It's a great bonding experience and helps younger children feel more comfortable.",
        },
        {
          question: "Are materials included?",
          answer: "Most classes include all necessary materials in the price. Some specialty classes may require you to bring specific items, which will be noted in the class description.",
        },
        {
          question: "What's your cancellation policy?",
          answer: "You can cancel up to 24 hours before the class for a full refund. Cancellations within 24 hours receive a 50% credit toward future classes.",
        },
        {
          question: "How are instructors vetted?",
          answer: "All instructors undergo background checks, provide references, and demonstrate their teaching experience. We also monitor reviews and feedback continuously.",
        },
      ],
    },
    {
      type: "CTASection",
      title: "Ready to get creative?",
      body: "Join thousands of families discovering the joy of creating together",
      bgColor: "primary",
      primary: {
        label: "Find Classes Near You",
        href: "/classes",
      },
      secondary: {
        label: "Become an Instructor",
        href: "/for-creators",
      },
    },
  ],
}

const siteSettings: Page = {
  slug: "_settings",
  title: "Site Settings",
  status: "PUBLISHED",
  seo: {
    title: "Site Settings",
    description: "Global site configuration",
  },
  blocks: [
    {
      type: "NavBar",
      links: [
        { label: "Find Classes", href: "/classes" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "For Creators", href: "/for-creators" },
        { label: "About", href: "/about" },
      ],
    },
    {
      type: "Footer",
      columns: [
        {
          title: "For Parents",
          links: [
            { label: "Browse Classes", href: "/classes" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "Gift Cards", href: "/gift-cards" },
            { label: "FAQ", href: "/faq" },
          ],
        },
        {
          title: "For Instructors",
          links: [
            { label: "Become an Instructor", href: "/for-creators" },
            { label: "Instructor Resources", href: "/instructor-resources" },
            { label: "Success Stories", href: "/success-stories" },
            { label: "Instructor FAQ", href: "/instructor-faq" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About Us", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Help Center", href: "/help" },
            { label: "Safety", href: "/safety" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
          ],
        },
      ],
      copyright: "© 2024 Crafty Kid. All rights reserved.",
      socialLinks: [
        { platform: "facebook", url: "https://facebook.com/craftykid" },
        { platform: "instagram", url: "https://instagram.com/craftykid" },
        { platform: "twitter", url: "https://twitter.com/craftykid" },
      ],
    },
  ],
}

const categories = [
  { name: "Pottery & Ceramics", slug: "pottery", icon: "🏺" },
  { name: "Painting & Drawing", slug: "painting", icon: "🎨" },
  { name: "Arts & Crafts", slug: "crafts", icon: "✂️" },
  { name: "Jewelry Making", slug: "jewelry", icon: "💎" },
  { name: "Woodworking", slug: "woodworking", icon: "🪵" },
  { name: "Sewing & Textiles", slug: "textiles", icon: "🧵" },
]

async function main() {
  console.log("🌱 Seeding database...")

  // Create categories
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  // Create pages
  await prisma.page.upsert({
    where: { slug: homePage.slug },
    update: {
      title: homePage.title,
      status: homePage.status,
      seo: homePage.seo,
      blocks: homePage.blocks as any,
    },
    create: {
      slug: homePage.slug,
      title: homePage.title,
      status: homePage.status,
      seo: homePage.seo,
      blocks: homePage.blocks as any,
    },
  })

  await prisma.page.upsert({
    where: { slug: siteSettings.slug },
    update: {
      title: siteSettings.title,
      status: siteSettings.status,
      seo: siteSettings.seo,
      blocks: siteSettings.blocks as any,
    },
    create: {
      slug: siteSettings.slug,
      title: siteSettings.title,
      status: siteSettings.status,
      seo: siteSettings.seo,
      blocks: siteSettings.blocks as any,
    },
  })

  console.log("✅ Seeding complete!")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
