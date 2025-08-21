import { z } from "zod"

// Base block schema
const BaseBlock = z.object({
  id: z.string().optional(),
  className: z.string().optional(),
})

// HeroSearch block
export const HeroSearchBlock = BaseBlock.extend({
  type: z.literal("HeroSearch"),
  headline: z.string().max(120),
  subheadline: z.string().max(200).optional(),
  bgImage: z.string().url().optional(),
  searchFields: z.object({
    location: z.boolean().default(true),
    ageRange: z.boolean().default(true),
    activity: z.boolean().default(true),
  }),
})

// FeaturedClasses block
export const FeaturedClassesBlock = BaseBlock.extend({
  type: z.literal("FeaturedClasses"),
  title: z.string().optional(),
  query: z.object({
    mode: z.enum(["manual", "auto"]),
    classIds: z.array(z.string()).optional(),
    filters: z.object({
      city: z.string().optional(),
      categoryId: z.string().optional(),
      ageMin: z.number().optional(),
      ageMax: z.number().optional(),
    }).optional(),
  }),
  maxItems: z.number().min(1).max(12).default(6),
  layout: z.enum(["grid", "carousel"]).default("grid"),
})

// TeacherSpotlight block
export const TeacherSpotlightBlock = BaseBlock.extend({
  type: z.literal("TeacherSpotlight"),
  title: z.string().default("Meet Our Instructors"),
  instructorIds: z.array(z.string()).optional(),
  autoRotate: z.boolean().default(false),
  layout: z.enum(["carousel", "grid"]).default("carousel"),
  maxItems: z.number().min(1).max(6).default(3),
})

// TrustBadges block
export const TrustBadgesBlock = BaseBlock.extend({
  type: z.literal("TrustBadges"),
  items: z.array(z.object({
    icon: z.string(),
    label: z.string(),
    value: z.string().optional(),
  })),
  layout: z.enum(["horizontal", "grid"]).default("horizontal"),
})

// Testimonials block
export const TestimonialsBlock = BaseBlock.extend({
  type: z.literal("Testimonials"),
  title: z.string().default("What Parents Are Saying"),
  items: z.array(z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string().optional(),
    avatar: z.string().url().optional(),
    rating: z.number().min(1).max(5).optional(),
  })),
  layout: z.enum(["carousel", "grid"]).default("carousel"),
})

// ContentSplit block
export const ContentSplitBlock = BaseBlock.extend({
  type: z.literal("ContentSplit"),
  image: z.string().url(),
  imageAlt: z.string(),
  imageSide: z.enum(["left", "right"]).default("left"),
  title: z.string(),
  content: z.string(), // Rich text content
  cta: z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(["primary", "secondary", "outline"]).default("primary"),
  }).optional(),
})

// FAQAccordion block
export const FAQAccordionBlock = BaseBlock.extend({
  type: z.literal("FAQAccordion"),
  title: z.string().default("Frequently Asked Questions"),
  items: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
})

// BlogTeasers block
export const BlogTeasersBlock = BaseBlock.extend({
  type: z.literal("BlogTeasers"),
  title: z.string().default("From Our Blog"),
  maxItems: z.number().min(1).max(6).default(3),
  categoryFilter: z.string().optional(),
})

// CTASection block
export const CTASectionBlock = BaseBlock.extend({
  type: z.literal("CTASection"),
  title: z.string(),
  body: z.string().optional(),
  bgColor: z.enum(["primary", "secondary", "accent", "muted"]).default("primary"),
  primary: z.object({
    label: z.string(),
    href: z.string(),
  }),
  secondary: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),
})

// NavBar block (site-wide)
export const NavBarBlock = BaseBlock.extend({
  type: z.literal("NavBar"),
  logo: z.string().url().optional(),
  links: z.array(z.object({
    label: z.string(),
    href: z.string(),
    highlight: z.boolean().default(false),
  })).max(6),
})

// Footer block (site-wide)
export const FooterBlock = BaseBlock.extend({
  type: z.literal("Footer"),
  columns: z.array(z.object({
    title: z.string(),
    links: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),
  })).max(4),
  copyright: z.string(),
  socialLinks: z.array(z.object({
    platform: z.enum(["facebook", "instagram", "twitter", "youtube"]),
    url: z.string().url(),
  })).optional(),
})

// Union of all block types
export const PageBlock = z.discriminatedUnion("type", [
  HeroSearchBlock,
  FeaturedClassesBlock,
  TeacherSpotlightBlock,
  TrustBadgesBlock,
  TestimonialsBlock,
  ContentSplitBlock,
  FAQAccordionBlock,
  BlogTeasersBlock,
  CTASectionBlock,
  NavBarBlock,
  FooterBlock,
])

// Page schema
export const PageSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED"]),
  seo: z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    ogImage: z.string().url().optional(),
  }),
  blocks: z.array(PageBlock),
  publishAt: z.string().datetime().nullable().optional(),
})

// Type exports
export type PageBlock = z.infer<typeof PageBlock>
export type Page = z.infer<typeof PageSchema>
export type HeroSearchBlock = z.infer<typeof HeroSearchBlock>
export type FeaturedClassesBlock = z.infer<typeof FeaturedClassesBlock>
export type TeacherSpotlightBlock = z.infer<typeof TeacherSpotlightBlock>
export type TrustBadgesBlock = z.infer<typeof TrustBadgesBlock>
export type TestimonialsBlock = z.infer<typeof TestimonialsBlock>
export type ContentSplitBlock = z.infer<typeof ContentSplitBlock>
export type FAQAccordionBlock = z.infer<typeof FAQAccordionBlock>
export type BlogTeasersBlock = z.infer<typeof BlogTeasersBlock>
export type CTASectionBlock = z.infer<typeof CTASectionBlock>
export type NavBarBlock = z.infer<typeof NavBarBlock>
export type FooterBlock = z.infer<typeof FooterBlock>
