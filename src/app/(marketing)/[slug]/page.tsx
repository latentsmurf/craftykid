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
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
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
}

// Static generation for known pages
export async function generateStaticParams() {
  // In production, this would fetch all published pages
  // For now, return common marketing pages
  return [
    { slug: "home" },
    { slug: "for-parents" },
    { slug: "for-creators" },
    { slug: "about" },
  ]
}
