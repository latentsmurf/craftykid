import { prisma } from "../src/lib/prisma"

async function seedInstructors() {
  console.log("👩‍🎨 Seeding instructors...")

  const instructorData = [
    {
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      address: "Montecito, CA",
      bio: "Award-winning potter with over 10 years of experience teaching children and families. I believe in nurturing creativity through hands-on exploration with clay.",
      crafts: ["Pottery", "Ceramics", "Sculpture"],
      ratingAvg: 4.8,
      ratingCount: 127
    },
    {
      name: "Michael Rodriguez",
      email: "michael.rodriguez@example.com",
      address: "Santa Barbara, CA",
      bio: "Professional watercolor artist and art educator. I love helping families discover the joy of painting together through color and creativity.",
      crafts: ["Watercolor", "Painting", "Drawing"],
      ratingAvg: 4.9,
      ratingCount: 98
    },
    {
      name: "Emma Thompson",
      email: "emma.thompson@example.com",
      address: "Montecito, CA",
      bio: "Jewelry designer and metalsmith specializing in family-friendly crafting. My workshops focus on building fine motor skills while creating beautiful keepsakes.",
      crafts: ["Jewelry Making", "Beading", "Wire Work"],
      ratingAvg: 4.7,
      ratingCount: 156
    },
    {
      name: "David Park",
      email: "david.park@example.com",
      address: "Santa Barbara, CA",
      bio: "Woodworker and furniture maker with a passion for teaching traditional crafts. I emphasize safety and patience in all my family workshops.",
      crafts: ["Woodworking", "Wood Burning", "Carving"],
      ratingAvg: 4.6,
      ratingCount: 89
    },
    {
      name: "Lisa Martinez",
      email: "lisa.martinez@example.com",
      address: "Montecito, CA",
      bio: "Textile artist and fashion designer who loves exploring color and pattern with families. My classes are energetic, fun, and always result in wearable art!",
      crafts: ["Tie-Dye", "Fabric Painting", "Sewing"],
      ratingAvg: 4.8,
      ratingCount: 203
    },
    {
      name: "James Wilson",
      email: "james.wilson@example.com",
      address: "Santa Barbara, CA",
      bio: "Paper artist and origami master. I've been teaching the meditative art of paper folding for 15 years and love seeing families create together.",
      crafts: ["Origami", "Paper Crafts", "Bookbinding"],
      ratingAvg: 4.9,
      ratingCount: 134
    }
  ]

  try {
    let createdCount = 0

    for (const instructor of instructorData) {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: instructor.email }
      })

      let user
      if (existingUser) {
        user = existingUser
        console.log(`✓ User exists: ${instructor.name}`)
      } else {
        // Create user
        user = await prisma.user.create({
          data: {
            email: instructor.email,
            name: instructor.name,
            address: instructor.address,
            role: "INSTRUCTOR",
            marketingOptIn: true
          }
        })
        console.log(`✅ Created user: ${instructor.name}`)
      }

      // Check if instructor profile exists
      const existingProfile = await prisma.instructorProfile.findUnique({
        where: { userId: user.id }
      })

      if (!existingProfile) {
        // Create instructor profile
        await prisma.instructorProfile.create({
          data: {
            userId: user.id,
            bio: instructor.bio,
            crafts: instructor.crafts,
            verificationStatus: "CLEAR",
            ratingAvg: instructor.ratingAvg,
            ratingCount: instructor.ratingCount,
            portfolioMedia: {
              images: [
                "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
                "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
                "https://images.unsplash.com/photo-1622008885853-91e3ae301d32?w=800&q=80"
              ]
            }
          }
        })
        createdCount++
        console.log(`✅ Created instructor profile: ${instructor.name}`)
      } else {
        console.log(`✓ Instructor profile exists: ${instructor.name}`)
      }
    }

    console.log(`\n🎉 Successfully processed ${instructorData.length} instructors (${createdCount} new profiles created)`)

  } catch (error) {
    console.error("Error seeding instructors:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedInstructors()
