import { prisma } from "../../lib/prisma"

async function createSearchPage() {
  try {
    const searchPage = await prisma.page.create({
      data: {
        slug: "search",
        title: "Search Classes & Instructors",
        description: "Find the perfect craft class or instructor for you and your child",
        blocks: [
          {
            type: "NavBar",
            props: {
              id: "navbar",
            }
          },
          {
            type: "Footer",
            props: {
              id: "footer",
            }
          }
        ],
        status: "PUBLISHED",
        author: "system",
        publishAt: new Date(),
      },
    })

    console.log("✅ Created search page:", searchPage.slug)
  } catch (error) {
    console.error("Error creating search page:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createSearchPage()
