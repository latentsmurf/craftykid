import { prisma } from "./src/lib/db"

async function listAllPages() {
  const pages = await prisma.page.findMany({
    select: { slug: true, title: true, status: true },
    orderBy: { slug: "asc" }
  })
  
  console.log(`Total pages in database: ${pages.length}\n`)
  
  console.log("Available pages:")
  pages.forEach(page => {
    if (!page.slug.startsWith("_")) {
      console.log(`✅ /${page.slug} - ${page.title}`)
    }
  })
  
  await prisma.$disconnect()
}

listAllPages()
