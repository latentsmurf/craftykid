import { prisma } from "../src/lib/prisma"

async function seedClasses() {
  console.log("🎨 Seeding classes...")

  try {
    // First, let's get some instructors to assign classes to
    const instructors = await prisma.instructorProfile.findMany({
      take: 5,
      include: { user: true }
    })

    if (instructors.length === 0) {
      console.log("No instructors found. Please seed instructors first.")
      return
    }

    // Create categories first
    const categories = [
      { name: "Pottery & Ceramics", slug: "pottery", icon: "🏺" },
      { name: "Painting & Drawing", slug: "painting", icon: "🎨" },
      { name: "Jewelry Making", slug: "jewelry", icon: "💍" },
      { name: "Woodworking", slug: "woodworking", icon: "🪵" },
      { name: "Textile Arts", slug: "textiles", icon: "🧵" },
      { name: "Paper Crafts", slug: "paper", icon: "📄" },
    ]

    const createdCategories = []
    for (const category of categories) {
      const existing = await prisma.category.findUnique({
        where: { slug: category.slug }
      })
      
      if (!existing) {
        const created = await prisma.category.create({
          data: category
        })
        createdCategories.push(created)
        console.log(`✅ Created category: ${category.name}`)
      } else {
        createdCategories.push(existing)
        console.log(`✓ Category exists: ${category.name}`)
      }
    }

    // Create venues
    const venues = [
      {
        name: "Montecito Art Studio",
        address: "1234 Coast Village Rd, Montecito, CA 93108",
        lat: 34.4208,
        lng: -119.6982,
        capacity: 12,
        contact: "info@montecitoart.com",
        photos: {
          images: [
            "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80"
          ]
        }
      },
      {
        name: "Santa Barbara Creative Space",
        address: "567 State St, Santa Barbara, CA 93101",
        lat: 34.4208,
        lng: -119.6982,
        capacity: 16,
        contact: "hello@sbcreative.com",
        photos: {
          images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
            "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80"
          ]
        }
      },
      {
        name: "Coastal Craft Workshop",
        address: "890 Garden St, Santa Barbara, CA 93101",
        lat: 34.4208,
        lng: -119.6982,
        capacity: 8,
        contact: "workshops@coastalcraft.com",
        photos: {
          images: [
            "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
          ]
        }
      }
    ]

    const createdVenues = []
    for (const venue of venues) {
      const existing = await prisma.venue.findFirst({
        where: { name: venue.name }
      })
      
      if (!existing) {
        const created = await prisma.venue.create({
          data: venue
        })
        createdVenues.push(created)
        console.log(`✅ Created venue: ${venue.name}`)
      } else {
        createdVenues.push(existing)
        console.log(`✓ Venue exists: ${venue.name}`)
      }
    }

    // Create classes
    const classTemplates = [
      {
        title: "Parent & Child Pottery Workshop",
        description: "Create beautiful ceramic pieces together! This hands-on workshop introduces families to the art of pottery. You'll learn basic techniques like pinch pots, coil building, and glazing. All skill levels welcome - we'll guide you through each step. Take home 2-3 finished pieces per family.",
        categorySlug: "pottery",
        ageMin: 4,
        ageMax: 12,
        capacity: 8,
        priceCents: 6500, // $65
        materialsProvided: true,
        images: {
          gallery: [
            "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
            "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
            "https://images.unsplash.com/photo-1622008885853-91e3ae301d32?w=800&q=80"
          ]
        }
      },
      {
        title: "Watercolor Magic for Families",
        description: "Discover the joy of watercolor painting in this beginner-friendly class! Parents and kids will learn color mixing, brush techniques, and create beautiful nature-inspired paintings. We provide all supplies including professional watercolor paints, brushes, and paper.",
        categorySlug: "painting",
        ageMin: 5,
        ageMax: 14,
        capacity: 10,
        priceCents: 4500, // $45
        materialsProvided: true,
        images: {
          gallery: [
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
            "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80"
          ]
        }
      },
      {
        title: "Make Your Own Friendship Bracelets",
        description: "Learn traditional bracelet-making techniques using colorful threads, beads, and charms. This class covers basic braiding, macramé knots, and bead weaving. Perfect for building fine motor skills while creating gifts for friends and family!",
        categorySlug: "jewelry",
        ageMin: 6,
        ageMax: 16,
        capacity: 12,
        priceCents: 3500, // $35
        materialsProvided: true,
        images: {
          gallery: [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
            "https://images.unsplash.com/photo-1506629905607-46c0f9c7b7e5?w=800&q=80"
          ]
        }
      },
      {
        title: "Wood Burning Art Workshop",
        description: "Create stunning pyrography art on wood! Learn safe wood burning techniques to create decorative signs, coasters, and artwork. We provide all safety equipment and teach proper handling of tools. Parents must actively participate with children under 10.",
        categorySlug: "woodworking",
        ageMin: 8,
        ageMax: 16,
        capacity: 6,
        priceCents: 5500, // $55
        materialsProvided: true,
        images: {
          gallery: [
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
            "https://images.unsplash.com/photo-1609205807107-e6ec2648c72c?w=800&q=80"
          ]
        }
      },
      {
        title: "Tie-Dye T-Shirt Fun",
        description: "Create groovy tie-dye masterpieces! Learn different folding techniques to create spirals, stripes, and unique patterns. Each participant can dye 2 t-shirts using eco-friendly dyes. Bring your own shirts or purchase from us for $5 each.",
        categorySlug: "textiles",
        ageMin: 4,
        ageMax: 18,
        capacity: 14,
        priceCents: 4000, // $40
        materialsProvided: false,
        images: {
          gallery: [
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
          ]
        }
      },
      {
        title: "Origami & Paper Sculpture",
        description: "Explore the ancient art of paper folding! Start with simple animals and flowers, then progress to complex geometric designs. Learn about different paper types and create a mini sculpture garden to take home.",
        categorySlug: "paper",
        ageMin: 6,
        ageMax: 14,
        capacity: 10,
        priceCents: 3000, // $30
        materialsProvided: true,
        images: {
          gallery: [
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
            "https://images.unsplash.com/photo-1594736797933-d0d5ad2d0b6c?w=800&q=80"
          ]
        }
      }
    ]

    let classCount = 0
    for (const classTemplate of classTemplates) {
      const category = createdCategories.find(c => c.slug === classTemplate.categorySlug)
      if (!category) continue

      // Create 2-3 classes per template with different instructors and venues
      const numClasses = Math.floor(Math.random() * 2) + 2 // 2-3 classes
      
      for (let i = 0; i < numClasses; i++) {
        const instructor = instructors[Math.floor(Math.random() * instructors.length)]
        const venue = createdVenues[Math.floor(Math.random() * createdVenues.length)]

        const classData = {
          title: classTemplate.title,
          description: classTemplate.description,
          categoryId: category.id,
          instructorId: instructor.id,
          venueId: venue.id,
          ageMin: classTemplate.ageMin,
          ageMax: classTemplate.ageMax,
          capacity: Math.min(classTemplate.capacity, venue.capacity),
          priceCents: classTemplate.priceCents + (Math.floor(Math.random() * 1000) - 500), // ±$5 variation
          materialsProvided: classTemplate.materialsProvided,
          images: classTemplate.images
        }

        const createdClass = await prisma.class.create({
          data: classData
        })

        // Create 3-4 class schedules for each class
        const numSchedules = Math.floor(Math.random() * 2) + 3 // 3-4 schedules
        for (let j = 0; j < numSchedules; j++) {
          const daysFromNow = Math.floor(Math.random() * 30) + 5 // 5-35 days from now
          const startDate = new Date()
          startDate.setDate(startDate.getDate() + daysFromNow)
          startDate.setHours(10 + Math.floor(Math.random() * 6), 0, 0, 0) // 10 AM - 4 PM

          const endDate = new Date(startDate)
          endDate.setHours(startDate.getHours() + 2) // 2-hour classes

          const seatsTotal = createdClass.capacity
          const seatsRemaining = seatsTotal - Math.floor(Math.random() * Math.floor(seatsTotal * 0.6)) // 0-60% booked

          await prisma.classSchedule.create({
            data: {
              classId: createdClass.id,
              startsAt: startDate,
              endsAt: endDate,
              seatsTotal,
              seatsRemaining,
              timezone: "America/Los_Angeles"
            }
          })
        }

        classCount++
        console.log(`✅ Created class: ${classData.title} (${classCount})`)
      }
    }

    console.log(`\n🎉 Successfully created ${classCount} classes with schedules!`)
    console.log("Classes are now available for booking.")

  } catch (error) {
    console.error("Error seeding classes:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedClasses()
