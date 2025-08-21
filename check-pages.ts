import { prisma } from "./src/lib/db"

async function checkPages() {
  try {
    console.log("Checking pages in database...")
    
    const pages = await prisma.page.findMany({
      select: {
        slug: true,
        title: true,
        status: true,
      }
    })
    
    console.log("\nFound pages:")
    pages.forEach(page => {
      console.log(`- /${page.slug} - "${page.title}" (${page.status})`)
    })
    
    const homePage = await prisma.page.findUnique({
      where: { slug: "home" }
    })
    
    if (homePage) {
      console.log("\n✅ Homepage exists in database!")
      console.log(`   Status: ${homePage.status}`)
      console.log(`   Has ${(homePage.blocks as any[]).length} blocks`)
    } else {
      console.log("\n❌ Homepage NOT found in database!")
      console.log("   Run: npm run db:seed")
    }
    
  } catch (error) {
    console.error("Error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

checkPages()
