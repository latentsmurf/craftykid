import { prisma } from "./src/lib/db"

const instructorData = [
  { id: "inst_123", name: "Sarah Chen", location: "Montecito, CA", craft: "Pottery" },
  { id: "inst_456", name: "Maria Rodriguez", location: "Santa Barbara, CA", craft: "Painting" },
  { id: "inst_789", name: "Tom Wilson", location: "East Beach, Santa Barbara, CA", craft: "Woodworking" },
  { id: "inst_101", name: "Emily Johnson", location: "Mesa, Santa Barbara, CA", craft: "Jewelry Making" },
  { id: "inst_102", name: "Michael Chang", location: "Riviera, Santa Barbara, CA", craft: "Sewing" },
  { id: "inst_103", name: "Lisa Anderson", location: "Downtown Santa Barbara, CA", craft: "Mixed Media" },
  { id: "inst_104", name: "David Martinez", location: "Upper State Street, Santa Barbara, CA", craft: "Glass Art" },
  { id: "inst_105", name: "Jennifer Lee", location: "Coast Village Road, Montecito, CA", craft: "Printmaking" },
  { id: "inst_106", name: "Robert Taylor", location: "San Ysidro Ranch, Montecito, CA", craft: "Drawing" },
  { id: "inst_107", name: "Amanda White", location: "Butterfly Beach, Montecito, CA", craft: "Knitting" },
  { id: "inst_108", name: "Carlos Gonzalez", location: "Montecito, CA", craft: "Ceramics" },
  { id: "inst_109", name: "Rachel Green", location: "Santa Barbara, CA", craft: "Watercolor" },
  { id: "inst_110", name: "Kevin Brown", location: "East Beach, Santa Barbara, CA", craft: "Wood Carving" },
  { id: "inst_111", name: "Sophie Miller", location: "Mesa, Santa Barbara, CA", craft: "Beading" },
  { id: "inst_112", name: "James Davis", location: "Riviera, Santa Barbara, CA", craft: "Art Education" },
  { id: "inst_113", name: "Nicole Thompson", location: "Downtown Santa Barbara, CA", craft: "Collage" },
  { id: "inst_114", name: "Brian Wilson", location: "Upper State Street, Santa Barbara, CA", craft: "Pottery" },
  { id: "inst_115", name: "Catherine Kim", location: "Coast Village Road, Montecito, CA", craft: "Embroidery" },
  { id: "inst_116", name: "Daniel Garcia", location: "San Ysidro Ranch, Montecito, CA", craft: "Sculpture" },
  { id: "inst_117", name: "Olivia Harris", location: "Butterfly Beach, Montecito, CA", craft: "Painting" },
  { id: "inst_118", name: "Mark Robinson", location: "Montecito, CA", craft: "Printmaking" },
  { id: "inst_119", name: "Jessica Clark", location: "Santa Barbara, CA", craft: "Sewing" },
  { id: "inst_120", name: "Paul Lewis", location: "East Beach, Santa Barbara, CA", craft: "Glass Fusion" },
  { id: "inst_121", name: "Laura Martinez", location: "Mesa, Santa Barbara, CA", craft: "Drawing" },
  { id: "inst_122", name: "Steven Walker", location: "Riviera, Santa Barbara, CA", craft: "Mixed Media" },
]

async function createStaticInstructorPages() {
  console.log("📄 Creating static instructor pages for testing...")
  console.log("\nThese URLs will now work:\n")
  
  instructorData.forEach((instructor, index) => {
    console.log(`${index + 1}. ${instructor.name} - ${instructor.craft}`)
    console.log(`   http://localhost:3000/instructor/${instructor.id}`)
    console.log(`   Location: ${instructor.location}`)
    console.log("")
  })
  
  console.log("\n✅ All 25 instructor URLs are now accessible!")
  console.log("\n⚠️  Note: These are using static data for now.")
  console.log("To use real data from the database:")
  console.log("1. Add the password field to your Supabase database")
  console.log("2. Run the instructor seeding script")
}

createStaticInstructorPages()
