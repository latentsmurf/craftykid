import { prisma } from "./src/lib/db"

const crafts = [
  ["Pottery", "Ceramics", "Clay Sculpture"],
  ["Painting", "Watercolor", "Acrylics"],
  ["Jewelry Making", "Beading", "Wire Wrapping"],
  ["Woodworking", "Carving", "Wood Burning"],
  ["Sewing", "Embroidery", "Quilting"],
  ["Drawing", "Sketching", "Illustration"],
  ["Mixed Media", "Collage", "Art Journaling"],
  ["Glass Art", "Stained Glass", "Fused Glass"],
  ["Printmaking", "Screen Printing", "Block Printing"],
  ["Knitting", "Crochet", "Fiber Arts"],
]

const locations = [
  "Montecito, CA",
  "Santa Barbara, CA",
  "East Beach, Santa Barbara, CA",
  "Mesa, Santa Barbara, CA",
  "Riviera, Santa Barbara, CA",
  "Downtown Santa Barbara, CA",
  "Upper State Street, Santa Barbara, CA",
  "Coast Village Road, Montecito, CA",
  "San Ysidro Ranch, Montecito, CA",
  "Butterfly Beach, Montecito, CA",
]

const instructorData = [
  { name: "Sarah Chen", email: "sarah.chen@example.com", bio: "Award-winning potter with over 10 years of experience teaching children and families. I believe in nurturing creativity through hands-on exploration with clay." },
  { name: "Maria Rodriguez", email: "maria.rodriguez@example.com", bio: "Professional artist specializing in vibrant paintings that inspire joy. I love teaching kids to express themselves through color and imagination." },
  { name: "Tom Wilson", email: "tom.wilson@example.com", bio: "Former carpenter turned craft educator. I help kids build confidence through hands-on woodworking projects in a safe, fun environment." },
  { name: "Emily Johnson", email: "emily.johnson@example.com", bio: "Jewelry designer and patient teacher who loves introducing children to the art of creating beautiful, wearable treasures." },
  { name: "Michael Chang", email: "michael.chang@example.com", bio: "Textile artist passionate about sustainable crafting. I teach kids to sew, embroider, and create their own unique fabric projects." },
  { name: "Lisa Anderson", email: "lisa.anderson@example.com", bio: "Mixed media artist who believes every child is creative. My classes combine various materials and techniques for endless possibilities." },
  { name: "David Martinez", email: "david.martinez@example.com", bio: "Glass artist bringing the magic of stained glass to young creators. Safety-first approach with stunning results." },
  { name: "Jennifer Lee", email: "jennifer.lee@example.com", bio: "Printmaking specialist who makes art accessible and fun. Kids love creating their own prints to take home." },
  { name: "Robert Taylor", email: "robert.taylor@example.com", bio: "Professional illustrator teaching drawing fundamentals through fun, engaging projects that kids love." },
  { name: "Amanda White", email: "amanda.white@example.com", bio: "Fiber arts enthusiast sharing the joy of knitting and crochet with the next generation of makers." },
  { name: "Carlos Gonzalez", email: "carlos.gonzalez@example.com", bio: "Ceramics expert specializing in hand-building techniques perfect for young artists exploring 3D art." },
  { name: "Rachel Green", email: "rachel.green@example.com", bio: "Watercolor artist creating magical experiences where kids discover the flow and beauty of paint on paper." },
  { name: "Kevin Brown", email: "kevin.brown@example.com", bio: "Wood carving instructor focused on teaching traditional skills in a modern, kid-friendly way." },
  { name: "Sophie Miller", email: "sophie.miller@example.com", bio: "Bead artist helping children create stunning jewelry while developing fine motor skills and patience." },
  { name: "James Davis", email: "james.davis@example.com", bio: "Art educator with 15 years experience making creativity accessible to children of all abilities." },
  { name: "Nicole Thompson", email: "nicole.thompson@example.com", bio: "Collage artist who turns everyday materials into extraordinary art projects that kids can be proud of." },
  { name: "Brian Wilson", email: "brian.wilson@example.com", bio: "Potter specializing in wheel throwing for beginners. I make clay fun and approachable for all ages." },
  { name: "Catherine Kim", email: "catherine.kim@example.com", bio: "Embroidery expert teaching traditional and modern stitching techniques in a relaxed, encouraging environment." },
  { name: "Daniel Garcia", email: "daniel.garcia@example.com", bio: "Sculpture artist helping kids bring their imaginations to life through various modeling materials." },
  { name: "Olivia Harris", email: "olivia.harris@example.com", bio: "Painting instructor who believes art should be joyful. My classes are full of laughter and creativity." },
  { name: "Mark Robinson", email: "mark.robinson@example.com", bio: "Printmaking enthusiast introducing kids to the satisfaction of creating multiples of their original artwork." },
  { name: "Jessica Clark", email: "jessica.clark@example.com", bio: "Sewing teacher making fashion fun and accessible. Kids love designing and creating their own clothes and accessories." },
  { name: "Paul Lewis", email: "paul.lewis@example.com", bio: "Glass fusion artist creating colorful projects in a safe, controlled environment perfect for young artists." },
  { name: "Laura Martinez", email: "laura.martinez@example.com", bio: "Drawing instructor helping kids develop observation skills and artistic confidence through structured lessons." },
  { name: "Steven Walker", email: "steven.walker@example.com", bio: "Mixed media artist encouraging experimentation and creative problem-solving in every class." },
]

async function seedInstructors() {
  console.log("🎨 Creating 25 instructors in Montecito/Santa Barbara...")
  console.log("⚠️  Note: Creating instructors without passwords. They won't be able to log in until passwords are set.")
  
  for (let i = 0; i < instructorData.length; i++) {
    const instructor = instructorData[i]
    const location = locations[i % locations.length]
    const craftSet = crafts[i % crafts.length]
    
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: instructor.email }
      })
      
      if (existingUser) {
        console.log(`✓ Instructor ${instructor.name} already exists`)
        continue
      }
      
      // Create user without password
      const user = await prisma.user.create({
        data: {
          email: instructor.email,
          name: instructor.name,
          role: "INSTRUCTOR",
          address: location,
          phone: `805-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        },
      })
      
      // Create instructor profile
      const instructorProfile = await prisma.instructorProfile.create({
        data: {
          userId: user.id,
          bio: instructor.bio,
          crafts: craftSet,
          verificationStatus: "CLEAR",
          ratingAvg: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
          ratingCount: Math.floor(Math.random() * 150) + 20, // Random count between 20-170
          portfolioMedia: {
            images: [
              `https://images.unsplash.com/photo-${1565193566173 + i * 1000000}-7a0ee3dbe261?w=800&q=80`,
              `https://images.unsplash.com/photo-${1578749556568 + i * 1000000}-bc2c40e68b61?w=800&q=80`,
              `https://images.unsplash.com/photo-${1622008885853 + i * 1000000}-91e3ae301d32?w=800&q=80`,
            ]
          },
        },
      })
      
      // Create a venue for this instructor
      const venue = await prisma.venue.create({
        data: {
          name: `${instructor.name.split(' ')[0]}'s Studio`,
          address: `${Math.floor(Math.random() * 900) + 100} ${location === "Montecito, CA" ? "Coast Village Rd" : "State St"}, ${location}`,
          lat: location.includes("Montecito") ? 34.4208 + (Math.random() * 0.01) : 34.4208 - (Math.random() * 0.05),
          lng: -119.6982 + (Math.random() * 0.05),
          capacity: Math.floor(Math.random() * 8) + 8, // 8-15 capacity
          contact: user.email,
          photos: {
            images: [
              `https://images.unsplash.com/photo-${1556909114 + i * 1000000}-f6e7ad7d3136?w=800&q=80`,
            ]
          },
        },
      })
      
      // Create 2-3 classes for each instructor
      const numClasses = Math.floor(Math.random() * 2) + 2
      const categories = await prisma.category.findMany()
      
      for (let j = 0; j < numClasses; j++) {
        const ageMin = Math.floor(Math.random() * 5) + 3 // 3-7
        const ageMax = ageMin + Math.floor(Math.random() * 5) + 2 // +2 to +6 years
        const category = categories.find(c => craftSet[0].toLowerCase().includes(c.slug)) || categories[0]
        
        const class_ = await prisma.class.create({
          data: {
            title: `${craftSet[j % craftSet.length]} for ${ageMin}-${ageMax} Year Olds`,
            categoryId: category.id,
            ageMin,
            ageMax,
            description: `Join ${instructor.name.split(' ')[0]} for an exciting ${craftSet[j % craftSet.length].toLowerCase()} adventure! This class is specially designed for children ages ${ageMin}-${ageMax} and their parents. We'll explore basic techniques, create beautiful projects, and most importantly, have fun together!`,
            instructorId: instructorProfile.id,
            venueId: venue.id,
            capacity: venue.capacity,
            priceCents: (Math.floor(Math.random() * 4) + 3) * 1000, // $30-$60
            materialsProvided: true,
            images: {
              urls: [
                `https://images.unsplash.com/photo-${1513364776144 + i * 1000000 + j * 100000}-60967b0f800f?w=800&q=80`,
              ]
            },
          },
        })
        
        // Create 3-5 schedules for each class
        const numSchedules = Math.floor(Math.random() * 3) + 3
        for (let k = 0; k < numSchedules; k++) {
          const daysAhead = k * 7 + Math.floor(Math.random() * 5) + 2
          const hour = Math.floor(Math.random() * 4) + 14 // 2pm-6pm
          const startsAt = new Date()
          startsAt.setDate(startsAt.getDate() + daysAhead)
          startsAt.setHours(hour, 0, 0, 0)
          
          const endsAt = new Date(startsAt)
          endsAt.setHours(hour + 1, 30) // 1.5 hour classes
          
          await prisma.classSchedule.create({
            data: {
              classId: class_.id,
              startsAt,
              endsAt,
              timezone: "America/Los_Angeles",
              seatsTotal: class_.capacity,
              seatsRemaining: class_.capacity - Math.floor(Math.random() * 5), // Some bookings
            },
          })
        }
      }
      
      console.log(`✅ Created instructor: ${instructor.name} (${instructorProfile.id}) in ${location}`)
      
    } catch (error) {
      console.error(`Error creating instructor ${instructor.name}:`, error)
    }
  }
  
  console.log("\n✨ All instructors created successfully!")
  await prisma.$disconnect()
}

seedInstructors()
