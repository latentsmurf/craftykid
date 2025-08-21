import { prisma } from "./src/lib/db"

async function listInstructors() {
  console.log("📋 Fetching all instructors...\n")
  
  try {
    const instructors = await prisma.instructorProfile.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            address: true,
          }
        },
        _count: {
          select: {
            classes: true,
            reviews: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    if (instructors.length === 0) {
      console.log("No instructors found in the database.")
      console.log("\n⚠️  Note: You need to add the password field to your database first.")
      console.log("In your Supabase dashboard:")
      console.log("1. Go to the SQL Editor")
      console.log('2. Run this command: ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT;')
      console.log("3. Then run: npm run db:generate")
      console.log("4. Finally run the seed script again")
    } else {
      console.log(`Found ${instructors.length} instructors:\n`)
      
      instructors.forEach((instructor, index) => {
        console.log(`${index + 1}. ${instructor.user.name}`)
        console.log(`   URL: http://localhost:3000/instructor/${instructor.id}`)
        console.log(`   Location: ${instructor.user.address}`)
        console.log(`   Classes: ${instructor._count.classes}`)
        console.log(`   Reviews: ${instructor._count.reviews}`)
        console.log(`   Rating: ${instructor.ratingAvg ? `${instructor.ratingAvg.toFixed(1)} ⭐` : 'No ratings yet'}`)
        console.log("")
      })
    }
    
  } catch (error: any) {
    if (error.code === 'P2022') {
      console.log("⚠️  Database schema mismatch detected!")
      console.log("The password field needs to be added to your database.")
      console.log("\nTo fix this:")
      console.log("1. Go to your Supabase dashboard")
      console.log("2. Navigate to the SQL Editor")
      console.log('3. Run: ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT;')
      console.log("4. Come back here and run: npm run db:generate")
      console.log("5. Then you can seed the instructors")
    } else {
      console.error("Error fetching instructors:", error)
    }
  }
  
  await prisma.$disconnect()
}

listInstructors()
