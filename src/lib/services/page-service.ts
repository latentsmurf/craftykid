import { prisma } from "@/lib/db"
import { PageSchema, type Page } from "@/lib/schemas/page-blocks"
import { cache } from "react"

// Cache page fetching using React cache
export const getPageBySlug = cache(async (slug: string, preview = false) => {
  try {
    const page = await prisma.page.findUnique({
      where: { slug },
    })

    if (!page) {
      return null
    }

    // If preview mode, return draft version regardless of status
    if (preview) {
      return PageSchema.parse({
        ...page,
        blocks: page.blocks as any,
        seo: page.seo as any,
      })
    }

    // Check if page is published or scheduled to be published
    if (page.status === "PUBLISHED") {
      return PageSchema.parse({
        ...page,
        blocks: page.blocks as any,
        seo: page.seo as any,
      })
    }

    if (page.status === "SCHEDULED" && page.publishAt && new Date(page.publishAt) <= new Date()) {
      // Auto-publish scheduled pages that are due
      await prisma.page.update({
        where: { id: page.id },
        data: { status: "PUBLISHED" },
      })
      
      return PageSchema.parse({
        ...page,
        status: "PUBLISHED",
        blocks: page.blocks as any,
        seo: page.seo as any,
      })
    }

    return null
  } catch (error) {
    console.error("Error fetching page:", error)
    return null
  }
})

export async function getSiteSettings() {
  // Fetch site-wide settings (navbar, footer, theme)
  const settings = await prisma.page.findUnique({
    where: { slug: "_settings" },
  })

  if (!settings) {
    return {
      navbar: null,
      footer: null,
      theme: null,
    }
  }

  const blocks = settings.blocks as any[]
  return {
    navbar: blocks.find(b => b.type === "NavBar"),
    footer: blocks.find(b => b.type === "Footer"),
    theme: settings.seo as any,
  }
}

export async function createPage(data: Page) {
  const validated = PageSchema.parse(data)
  
  return prisma.page.create({
    data: {
      slug: validated.slug,
      title: validated.title,
      status: validated.status,
      seo: validated.seo,
      blocks: validated.blocks as any,
      publishAt: validated.publishAt ? new Date(validated.publishAt) : null,
    },
  })
}

export async function updatePage(slug: string, data: Partial<Page>) {
  const existing = await prisma.page.findUnique({ where: { slug } })
  if (!existing) throw new Error("Page not found")

  // Create a version backup
  await prisma.pageVersion.create({
    data: {
      pageId: existing.id,
      version: existing.version,
      title: existing.title,
      status: existing.status,
      seo: existing.seo as any,
      blocks: existing.blocks as any,
    },
  })

  // Update the page
  return prisma.page.update({
    where: { slug },
    data: {
      ...data,
      blocks: data.blocks as any,
      seo: data.seo as any,
      version: { increment: 1 },
    },
  })
}

export async function getPageVersions(slug: string) {
  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      versions: {
        orderBy: { version: "desc" },
        take: 10,
      },
    },
  })

  return page?.versions || []
}

export async function restorePageVersion(slug: string, versionId: string) {
  const version = await prisma.pageVersion.findUnique({
    where: { id: versionId },
    include: { page: true },
  })

  if (!version) throw new Error("Version not found")

  return updatePage(slug, {
    title: version.title,
    status: version.status,
    seo: version.seo as any,
    blocks: version.blocks as any,
  })
}
