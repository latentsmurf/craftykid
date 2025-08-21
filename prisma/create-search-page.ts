import { prisma } from "../src/lib/prisma"

async function createSearchPage() {
  try {
    const searchPage = await prisma.page.create({
      data: {
        slug: "search",
        title: "Search Classes & Instructors",
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
        createdBy: "system",
        publishAt: new Date(),
        seo: {
          metaTitle: "Search Classes & Instructors | Crafty Kid",
          metaDescription: "Find the perfect craft class or instructor for you and your child. Search by location, craft type, age range, and more.",
          keywords: ["craft classes", "kids activities", "instructors", "search", "find classes"],
        },
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
