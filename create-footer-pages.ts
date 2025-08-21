import { prisma } from "./src/lib/db"
import type { Page } from "@/lib/schemas/page-blocks"

const footerPages: Page[] = [
  {
    slug: "faq",
    title: "Frequently Asked Questions",
    status: "PUBLISHED",
    seo: {
      title: "FAQ - Frequently Asked Questions | Crafty Kid",
      description: "Find answers to common questions about Crafty Kid classes, bookings, and policies.",
    },
    blocks: [
      {
        type: "FAQAccordion",
        title: "General Questions",
        items: [
          {
            question: "What is Crafty Kid?",
            answer: "Crafty Kid is a marketplace that connects families with local artisan instructors for parent-kid craft classes. We offer pottery, painting, woodworking, and many other creative activities.",
          },
          {
            question: "How do I book a class?",
            answer: "Simply search for classes in your area, select one you like, choose your time slot, and complete the booking with your payment information. You'll receive an email confirmation immediately.",
          },
          {
            question: "What ages are the classes for?",
            answer: "We offer classes for children ages 1-17, with age-appropriate activities for each group. Each class listing shows the recommended age range.",
          },
          {
            question: "Do parents need to attend?",
            answer: "Yes! All our classes are designed for parent-child participation. It's a great bonding experience and helps younger children feel comfortable.",
          },
          {
            question: "What's included in the class price?",
            answer: "Most classes include all necessary materials. Some specialty classes may require you to bring specific items, which will be clearly noted in the description.",
          },
        ],
      },
      {
        type: "FAQAccordion",
        title: "Booking & Payments",
        items: [
          {
            question: "How far in advance can I book?",
            answer: "Most classes can be booked up to 2 months in advance. We recommend booking early as popular classes fill up quickly!",
          },
          {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, debit cards, and Apple Pay through our secure Stripe checkout.",
          },
          {
            question: "Can I book for multiple children?",
            answer: "Yes! During checkout, you can select multiple children. Each child requires a separate booking.",
          },
          {
            question: "Do you offer group discounts?",
            answer: "Some instructors offer group discounts for birthday parties or large groups. Contact the instructor directly for special arrangements.",
          },
        ],
      },
      {
        type: "FAQAccordion",
        title: "Cancellations & Refunds",
        items: [
          {
            question: "What's your cancellation policy?",
            answer: "You can cancel up to 24 hours before the class for a full refund. Cancellations within 24 hours receive a 50% credit toward future classes.",
          },
          {
            question: "What if the instructor cancels?",
            answer: "If an instructor cancels, you'll receive a full refund immediately and we'll help you find an alternative class if desired.",
          },
          {
            question: "Can I reschedule instead of canceling?",
            answer: "Yes! Contact us at least 24 hours before your class and we'll help you reschedule based on availability.",
          },
        ],
      },
    ],
  },
  {
    slug: "gift-cards",
    title: "Gift Cards",
    status: "PUBLISHED",
    seo: {
      title: "Gift Cards - Give the Gift of Creativity | Crafty Kid",
      description: "Purchase Crafty Kid gift cards for creative parent-kid experiences.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
        imageAlt: "Gift card",
        imageSide: "right",
        title: "Give the Gift of Creativity",
        content: `<p>Looking for the perfect gift? Crafty Kid gift cards let recipients choose their own creative adventure. Available in any amount from $25 to $500.</p>
        <ul>
          <li>Never expire</li>
          <li>Delivered instantly by email</li>
          <li>Can be used for any class</li>
          <li>Perfect for birthdays, holidays, or any occasion</li>
        </ul>`,
        cta: {
          label: "Coming Soon",
          href: "#",
          variant: "primary",
        },
      },
      {
        type: "FAQAccordion",
        title: "Gift Card FAQ",
        items: [
          {
            question: "How do gift cards work?",
            answer: "Purchase a gift card online and we'll email it to the recipient. They can use the code at checkout for any class.",
          },
          {
            question: "Do gift cards expire?",
            answer: "No! Our gift cards never expire, so recipients can use them whenever they're ready.",
          },
          {
            question: "Can I buy a physical gift card?",
            answer: "Currently we only offer digital gift cards delivered by email. Physical cards coming soon!",
          },
        ],
      },
    ],
  },
  {
    slug: "instructor-resources",
    title: "Instructor Resources",
    status: "PUBLISHED",
    seo: {
      title: "Instructor Resources - Teaching Tools & Support | Crafty Kid",
      description: "Resources, guides, and support for Crafty Kid instructors.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
        imageAlt: "Instructor teaching",
        imageSide: "left",
        title: "Everything You Need to Succeed",
        content: `<p>As a Crafty Kid instructor, you have access to resources that help you create amazing classes and grow your business.</p>
        <h3>Available Resources:</h3>
        <ul>
          <li>Class planning templates</li>
          <li>Safety guidelines and best practices</li>
          <li>Marketing materials and photos</li>
          <li>Instructor community forum</li>
          <li>Monthly webinars and training</li>
        </ul>`,
      },
      {
        type: "CTASection",
        title: "Ready to Start Teaching?",
        body: "Join our community of creative instructors",
        bgColor: "primary",
        primary: {
          label: "Apply Now",
          href: "/auth/signup",
        },
      },
    ],
  },
  {
    slug: "success-stories",
    title: "Success Stories",
    status: "PUBLISHED",
    seo: {
      title: "Instructor Success Stories | Crafty Kid",
      description: "Read inspiring stories from successful Crafty Kid instructors.",
    },
    blocks: [
      {
        type: "Testimonials",
        title: "Instructor Success Stories",
        items: [
          {
            quote: "Teaching on Crafty Kid has allowed me to turn my pottery passion into a thriving business. I now teach 15 classes a week and love every minute!",
            author: "Sarah Chen",
            role: "Pottery Instructor",
            rating: 5,
          },
          {
            quote: "The platform makes everything so easy - from scheduling to payments. I can focus on what I love: teaching kids to paint!",
            author: "Maria Rodriguez",
            role: "Art Instructor",
            rating: 5,
          },
          {
            quote: "I started with one woodworking class and now have a waiting list! The support from Crafty Kid has been incredible.",
            author: "Tom Wilson",
            role: "Woodworking Instructor",
            rating: 5,
          },
        ],
        layout: "grid",
      },
      {
        type: "TrustBadges",
        items: [
          {
            icon: "users",
            label: "Active Instructors",
            value: "200+",
          },
          {
            icon: "star",
            label: "Average Instructor Rating",
            value: "4.9/5",
          },
          {
            icon: "award",
            label: "Classes Taught Monthly",
            value: "1,500+",
          },
        ],
        layout: "horizontal",
      },
    ],
  },
  {
    slug: "instructor-faq",
    title: "Instructor FAQ",
    status: "PUBLISHED",
    seo: {
      title: "Instructor FAQ - Teaching on Crafty Kid | Crafty Kid",
      description: "Common questions about becoming and working as a Crafty Kid instructor.",
    },
    blocks: [
      {
        type: "FAQAccordion",
        title: "Getting Started",
        items: [
          {
            question: "How do I become an instructor?",
            answer: "Sign up for an instructor account, complete your profile, pass a background check, and submit your first class for approval. The process usually takes 3-5 days.",
          },
          {
            question: "What are the requirements?",
            answer: "You need expertise in your craft, experience working with children, and a safe space to teach. We provide training on our platform and best practices.",
          },
          {
            question: "Is there a fee to join?",
            answer: "No! It's completely free to become an instructor. We only take a 20% commission on bookings.",
          },
        ],
      },
      {
        type: "FAQAccordion",
        title: "Teaching & Logistics",
        items: [
          {
            question: "Where can I teach?",
            answer: "You can teach from your own studio, home, partner venues, or even parks. The space must be safe and appropriate for children.",
          },
          {
            question: "How do I set my schedule?",
            answer: "You have complete control over when you teach. Set recurring classes or one-time workshops based on your availability.",
          },
          {
            question: "What about supplies?",
            answer: "You can include supply costs in your class price or ask students to bring materials. Most instructors include basic supplies.",
          },
        ],
      },
      {
        type: "FAQAccordion",
        title: "Payments & Earnings",
        items: [
          {
            question: "How do payments work?",
            answer: "We handle all payments through Stripe. You receive payouts weekly for all classes completed in the previous week.",
          },
          {
            question: "What can I charge?",
            answer: "You set your own prices! Most classes range from $30-60 per child. Consider your costs, time, and local market rates.",
          },
          {
            question: "Are there any hidden fees?",
            answer: "No hidden fees! We take a straight 20% commission. You keep 80% of your class revenue.",
          },
        ],
      },
    ],
  },
  {
    slug: "blog",
    title: "Blog",
    status: "PUBLISHED",
    seo: {
      title: "Crafty Kid Blog - Creative Parenting Tips & Ideas",
      description: "Tips, ideas, and inspiration for creative family activities.",
    },
    blocks: [
      {
        type: "BlogTeasers",
        title: "Latest from Our Blog",
        maxItems: 6,
      },
      {
        type: "CTASection",
        title: "Want to contribute?",
        body: "We're always looking for guest posts from instructors and parents",
        bgColor: "secondary",
        primary: {
          label: "Contact Us",
          href: "/contact",
        },
      },
    ],
  },
  {
    slug: "careers",
    title: "Careers",
    status: "PUBLISHED",
    seo: {
      title: "Careers at Crafty Kid - Join Our Team",
      description: "Join the Crafty Kid team and help families discover creativity.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
        imageAlt: "Team meeting",
        imageSide: "right",
        title: "Join Our Growing Team",
        content: `<p>We're building something special at Crafty Kid - a platform that brings families together through creativity. If you're passionate about education, creativity, and making a difference, we'd love to hear from you!</p>
        <h3>Why Work at Crafty Kid?</h3>
        <ul>
          <li>Mission-driven company making a real impact</li>
          <li>Remote-first culture</li>
          <li>Competitive salary and equity</li>
          <li>Health, dental, and vision insurance</li>
          <li>Unlimited PTO</li>
          <li>Monthly craft class credits</li>
        </ul>`,
      },
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
        imageAlt: "Open positions",
        imageSide: "left",
        title: "Open Positions",
        content: `<p>We're currently hiring for the following roles:</p>
        <ul>
          <li><strong>Senior Full Stack Engineer</strong> - Build the future of creative education</li>
          <li><strong>Head of Instructor Success</strong> - Support and grow our instructor community</li>
          <li><strong>Content Marketing Manager</strong> - Tell our story and inspire families</li>
        </ul>
        <p>Don't see your role? We're always interested in meeting talented people who share our mission.</p>`,
        cta: {
          label: "View All Positions",
          href: "mailto:careers@craftykid.com",
          variant: "primary",
        },
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact Us",
    status: "PUBLISHED",
    seo: {
      title: "Contact Us | Crafty Kid",
      description: "Get in touch with the Crafty Kid team. We're here to help!",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&q=80",
        imageAlt: "Contact us",
        imageSide: "right",
        title: "We're Here to Help",
        content: `<h3>General Inquiries</h3>
        <p>Email: <a href="mailto:hello@craftykid.com">hello@craftykid.com</a></p>
        
        <h3>Instructor Support</h3>
        <p>Email: <a href="mailto:instructors@craftykid.com">instructors@craftykid.com</a></p>
        
        <h3>Press & Partnerships</h3>
        <p>Email: <a href="mailto:press@craftykid.com">press@craftykid.com</a></p>
        
        <p>We typically respond within 24 hours during business days.</p>`,
      },
      {
        type: "FAQAccordion",
        title: "Before You Contact Us",
        items: [
          {
            question: "How do I cancel a booking?",
            answer: "Log into your account, go to 'My Bookings', and click 'Cancel' next to the class. Remember our 24-hour cancellation policy.",
          },
          {
            question: "I'm having technical issues",
            answer: "Try clearing your browser cache and cookies. If issues persist, email us with your browser type and a description of the problem.",
          },
          {
            question: "How do I become an instructor?",
            answer: "Visit our 'For Creators' page and click 'Apply to Teach'. You'll need to create an instructor account and complete the application.",
          },
        ],
      },
    ],
  },
  {
    slug: "help",
    title: "Help Center",
    status: "PUBLISHED",
    seo: {
      title: "Help Center | Crafty Kid Support",
      description: "Find help and support for using Crafty Kid.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
        imageAlt: "Help center",
        imageSide: "left",
        title: "How Can We Help?",
        content: `<p>Find answers to common questions or contact our support team.</p>
        <h3>Popular Topics:</h3>
        <ul>
          <li><a href="/faq">Frequently Asked Questions</a></li>
          <li><a href="/how-it-works">How Crafty Kid Works</a></li>
          <li><a href="/safety">Safety Guidelines</a></li>
          <li><a href="/contact">Contact Support</a></li>
        </ul>`,
      },
      {
        type: "CTASection",
        title: "Can't find what you're looking for?",
        body: "Our support team is here to help",
        bgColor: "secondary",
        primary: {
          label: "Contact Support",
          href: "/contact",
        },
      },
    ],
  },
  {
    slug: "safety",
    title: "Safety",
    status: "PUBLISHED",
    seo: {
      title: "Safety Guidelines | Crafty Kid",
      description: "Learn about Crafty Kid's safety standards and guidelines for classes.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
        imageAlt: "Safe environment",
        imageSide: "right",
        title: "Your Safety is Our Priority",
        content: `<p>At Crafty Kid, we maintain the highest safety standards to ensure every class is a positive experience for families.</p>
        <h3>Our Safety Measures:</h3>
        <ul>
          <li><strong>Background Checks:</strong> All instructors pass comprehensive background checks</li>
          <li><strong>Verified Spaces:</strong> All teaching venues are inspected for safety</li>
          <li><strong>Age-Appropriate:</strong> Activities designed for specific age groups</li>
          <li><strong>Adult Supervision:</strong> Parents/guardians must attend all classes</li>
          <li><strong>Insurance:</strong> All classes are covered by liability insurance</li>
        </ul>`,
      },
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        imageAlt: "Safety guidelines",
        imageSide: "left",
        title: "Safety Guidelines for Classes",
        content: `<h3>For Parents:</h3>
        <ul>
          <li>Supervise your child at all times</li>
          <li>Follow instructor safety guidelines</li>
          <li>Inform instructor of any allergies or special needs</li>
          <li>Dress appropriately for messy activities</li>
        </ul>
        
        <h3>For Instructors:</h3>
        <ul>
          <li>Maintain a safe, clean environment</li>
          <li>Use age-appropriate tools and materials</li>
          <li>Have first aid supplies available</li>
          <li>Never be alone with a child</li>
        </ul>`,
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    status: "PUBLISHED",
    seo: {
      title: "Terms of Service | Crafty Kid",
      description: "Read Crafty Kid's terms of service and user agreement.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
        imageAlt: "Terms of service",
        imageSide: "right",
        title: "Terms of Service",
        content: `<p><em>Last updated: January 2024</em></p>
        <p>Welcome to Crafty Kid! These terms of service ("Terms") govern your use of our website and services.</p>
        
        <h3>1. Acceptance of Terms</h3>
        <p>By using Crafty Kid, you agree to these Terms. If you don't agree, please don't use our services.</p>
        
        <h3>2. User Accounts</h3>
        <p>You must provide accurate information when creating an account. You're responsible for maintaining the security of your account.</p>
        
        <h3>3. Booking and Payments</h3>
        <p>All bookings are subject to availability. Payments are processed securely through Stripe. Cancellations must follow our cancellation policy.</p>
        
        <h3>4. Instructor Responsibilities</h3>
        <p>Instructors must maintain appropriate licenses, insurance, and safety standards. They are independent contractors, not employees.</p>
        
        <h3>5. Limitation of Liability</h3>
        <p>Crafty Kid is a marketplace connecting families with instructors. We are not liable for the actions of instructors or participants.</p>
        
        <p>For the complete Terms of Service, please contact us at legal@craftykid.com</p>`,
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    status: "PUBLISHED",
    seo: {
      title: "Privacy Policy | Crafty Kid",
      description: "Learn how Crafty Kid protects your privacy and handles your data.",
    },
    blocks: [
      {
        type: "ContentSplit",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
        imageAlt: "Privacy policy",
        imageSide: "right",
        title: "Privacy Policy",
        content: `<p><em>Last updated: January 2024</em></p>
        <p>Crafty Kid is committed to protecting your privacy. This policy explains how we collect, use, and protect your information.</p>
        
        <h3>Information We Collect</h3>
        <ul>
          <li>Account information (name, email, phone)</li>
          <li>Booking and payment information</li>
          <li>Communications with instructors</li>
          <li>Usage data and analytics</li>
        </ul>
        
        <h3>How We Use Your Information</h3>
        <ul>
          <li>To facilitate bookings and payments</li>
          <li>To communicate about your classes</li>
          <li>To improve our services</li>
          <li>To ensure safety and prevent fraud</li>
        </ul>
        
        <h3>Data Protection</h3>
        <p>We use industry-standard security measures to protect your data. We never sell your personal information to third parties.</p>
        
        <h3>Your Rights</h3>
        <p>You have the right to access, update, or delete your personal information. Contact privacy@craftykid.com with any requests.</p>
        
        <p>For the complete Privacy Policy, please contact us at privacy@craftykid.com</p>`,
      },
    ],
  },
]

async function createFooterPages() {
  console.log("Creating footer pages...")
  
  for (const page of footerPages) {
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
  
  console.log("\nAll footer pages created!")
  await prisma.$disconnect()
}

createFooterPages()
