import { prisma } from "./src/lib/db"

async function checkNavbarAndPages() {
  try {
    // Get the settings page which contains navbar
    const settings = await prisma.page.findUnique({
      where: { slug: "_settings" }
    })
    
    if (settings) {
      const blocks = settings.blocks as any[]
      const navbar = blocks.find(b => b.type === "NavBar")
      
      console.log("Navbar links:")
      navbar?.links?.forEach((link: any) => {
        console.log(`- ${link.label}: ${link.href}`)
      })
    }
    
    console.log("\nExisting pages in database:")
    const pages = await prisma.page.findMany({
      select: { slug: true, title: true, status: true }
    })
    
    pages.forEach(page => {
      console.log(`- /${page.slug} (${page.status})`)
    })
    
  } catch (error) {
    console.error("Error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

checkNavbarAndPages()
