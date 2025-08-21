import { prisma } from "./src/lib/db"
import bcrypt from "bcryptjs"

const adminUsers = [
  {
    email: "latentsmurf@gmail.com",
    name: "Admin User 1",
    password: "admin",
  },
  {
    email: "ladan.cher@gmail.com", 
    name: "Admin User 2",
    password: "admin",
  },
]

async function seedAdminUsers() {
  console.log("🔐 Creating admin users...")
  
  for (const adminUser of adminUsers) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: adminUser.email }
      })
      
      if (existingUser) {
        // Update to admin role and set password
        const hashedPassword = await bcrypt.hash(adminUser.password, 10)
        await prisma.user.update({
          where: { email: adminUser.email },
          data: {
            role: "ADMIN",
            name: adminUser.name,
            password: hashedPassword,
          }
        })
        console.log(`✅ Updated ${adminUser.email} to admin role`)
      } else {
        // Create new admin user
        const hashedPassword = await bcrypt.hash(adminUser.password, 10)
        await prisma.user.create({
          data: {
            email: adminUser.email,
            name: adminUser.name,
            password: hashedPassword,
            role: "ADMIN",
          },
        })
        console.log(`✅ Created admin user: ${adminUser.email}`)
      }
    } catch (error: any) {
      if (error.code === 'P2022' && error.meta?.column === 'User.password') {
        console.error(`\n⚠️  Cannot create admin users: password field missing in database`)
        console.log("\nTo fix this:")
        console.log("1. Go to your Supabase dashboard")
        console.log("2. Navigate to SQL Editor")
        console.log('3. Run: ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT;')
        console.log("4. Come back and run: npm run db:generate")
        console.log("5. Then run this script again")
        break
      } else {
        console.error(`Error creating admin ${adminUser.email}:`, error)
      }
    }
  }
  
  console.log("\n✨ Admin setup complete!")
  console.log("\nYou can now login at /auth/login with:")
  console.log("Email: latentsmurf@gmail.com or ladan.cher@gmail.com")
  console.log("Password: admin")
  
  await prisma.$disconnect()
}

seedAdminUsers()
