import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getPageBySlug, getSiteSettings } from "@/lib/services/page-service"
import { PageRenderer, extractSiteBlocks } from "@/lib/page-builder/renderer"

interface PageProps {
  params: {
    slug: string
  }
  searchParams: {
    preview?: string
    version?: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const page = await getPageBySlug(params.slug)
    
    if (!page) {
      return {
        title: "Page Not Found",
      }
    }

    return {
      title: page.seo.title,
      description: page.seo.description,
      openGraph: {
        title: page.seo.title,
        description: page.seo.description,
        images: page.seo.ogImage ? [page.seo.ogImage] : [],
      },
    }
  } catch (error) {
    console.error('Error fetching page metadata:', error)
    // Return default metadata if database is unavailable
    return {
      title: "Crafty Kid",
      description: "Discover local parent-and-kid craft classes",
    }
  }
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  try {
    const isPreview = searchParams.preview === "1"
    const page = await getPageBySlug(params.slug, isPreview)

    if (!page) {
      notFound()
    }

    const { navbar, footer, pageBlocks } = extractSiteBlocks(page.blocks)
    const siteSettings = await getSiteSettings()

    return (
      <>
        {/* Use page navbar if exists, otherwise site navbar */}
        {navbar || siteSettings.navbar ? (
          <header>
            <PageRenderer blocks={[navbar || siteSettings.navbar]} />
          </header>
        ) : null}

        <main className="flex-1">
          <PageRenderer blocks={pageBlocks} preview={isPreview} />
        </main>

        {/* Use page footer if exists, otherwise site footer */}
        {footer || siteSettings.footer ? (
          <footer>
            <PageRenderer blocks={[footer || siteSettings.footer]} />
          </footer>
        ) : null}
      </>
    )
  } catch (error) {
    console.error('Error loading page:', error)
    // Show a simple error page if database is unavailable
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Temporarily Unavailable</h1>
          <p className="text-muted-foreground">Please check back in a moment.</p>
        </div>
      </div>
    )
  }
}

// Disable static generation during build to avoid database errors
export const dynamic = 'force-dynamic'

// Static generation for known pages
export async function generateStaticParams() {
  // Skip during build if no database
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    return []
  }
  
  // In production, this would fetch all published pages
  // For now, return common marketing pages
  return [
    { slug: "home" },
    { slug: "for-parents" },
    { slug: "for-creators" },
    { slug: "about" },
  ]
}
