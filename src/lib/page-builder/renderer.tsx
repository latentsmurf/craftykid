import React from "react"
import dynamic from "next/dynamic"
import type { PageBlock } from "@/lib/schemas/page-blocks"

// Lazy load all block components
const blockComponents = {
  HeroSearch: dynamic(() => import("@/components/blocks/hero-search-modern")),
  FeaturedClasses: dynamic(() => import("@/components/blocks/featured-classes-modern")),
  TeacherSpotlight: dynamic(() => import("@/components/blocks/teacher-spotlight")),
  TrustBadges: dynamic(() => import("@/components/blocks/trust-badges-modern")),
  Testimonials: dynamic(() => import("@/components/blocks/testimonials-modern")),
  ContentSplit: dynamic(() => import("@/components/blocks/content-split")),
  FAQAccordion: dynamic(() => import("@/components/blocks/faq-accordion")),
  BlogTeasers: dynamic(() => import("@/components/blocks/blog-teasers")),
  CTASection: dynamic(() => import("@/components/blocks/cta-section-modern")),
  NavBar: dynamic(() => import("@/components/blocks/navbar-global")),
  Footer: dynamic(() => import("@/components/blocks/footer")),
}

interface BlockRendererProps {
  block: PageBlock
  index: number
}

export function BlockRenderer({ block, index }: BlockRendererProps) {
  const Component = blockComponents[block.type]
  
  if (!Component) {
    console.warn(`Unknown block type: ${block.type}`)
    return null
  }

  return (
    <div key={block.id || `block-${index}`} className={block.className}>
      <Component {...block} />
    </div>
  )
}

interface PageRendererProps {
  blocks: PageBlock[]
  preview?: boolean
}

export function PageRenderer({ blocks, preview = false }: PageRendererProps) {
  return (
    <>
      {preview && (
        <div className="bg-yellow-100 border-b border-yellow-300 p-2 text-center text-sm">
          <strong>Preview Mode:</strong> This is a preview of unpublished changes
        </div>
      )}
      {blocks.map((block, index) => (
        <BlockRenderer key={block.id || index} block={block} index={index} />
      ))}
    </>
  )
}

// Helper to extract site-wide blocks (navbar, footer)
export function extractSiteBlocks(blocks: PageBlock[]) {
  const navbar = blocks.find(b => b.type === "NavBar")
  const footer = blocks.find(b => b.type === "Footer")
  const pageBlocks = blocks.filter(b => b.type !== "NavBar" && b.type !== "Footer")
  
  return { navbar, footer, pageBlocks }
}

// Alias for backward compatibility
export const PageBuilder = PageRenderer
