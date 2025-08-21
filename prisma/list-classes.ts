import { prisma } from "../src/lib/prisma"

async function listClasses() {
  try {
    const classes = await prisma.class.findMany({
      include: {
        instructor: {
          include: {
            user: true
          }
        },
        venue: true,
        schedules: {
          where: {
            startsAt: {
              gte: new Date()
            }
          },
          take: 1,
          orderBy: {
            startsAt: 'asc'
          }
        }
      },
      take: 10
    })

    console.log("🎨 Available Classes:")
    console.log("=" .repeat(60))

    classes.forEach((classItem) => {
      const nextSchedule = classItem.schedules[0]
      console.log(`
📚 ${classItem.title}
   ID: ${classItem.id}
   Instructor: ${classItem.instructor.user.name}
   Venue: ${classItem.venue.name}
   Price: $${(classItem.priceCents / 100).toFixed(0)}
   Next class: ${nextSchedule ? new Date(nextSchedule.startsAt).toLocaleDateString() : 'No upcoming dates'}
   URL: http://localhost:3000/class/${classItem.id}
      `)
    })

    console.log("=" .repeat(60))
    console.log(`Total classes: ${classes.length}`)

  } catch (error) {
    console.error("Error listing classes:", error)
  } finally {
    await prisma.$disconnect()
  }
}

listClasses()
