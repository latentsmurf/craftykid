# 🚀 Supabase Quick Start for Crafty Kid

## What You'll Get

- ✅ Free PostgreSQL database (500 MB)
- ✅ Beautiful database UI
- ✅ Automatic backups
- ✅ No local database installation needed!

## 3 Simple Steps

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up and create a new project:
   - **Project name**: `crafty-kid`
   - **Database Password**: Choose a strong one (save it!)
   - **Region**: Pick the closest to you

### Step 2: Get Your Connection String

Once your project is ready (takes ~2 minutes):

1. Click **Settings** → **Database**
2. Find **Connection string** section
3. Click **URI** tab
4. Copy the entire string

### Step 3: Run Setup

```bash
# Make sure Node.js is installed first
# If not, run: ./install-node.sh

# Run the Supabase setup
./setup-supabase.sh
```

When prompted, paste your connection string. The script handles everything else!

## That's It! 🎉

After setup completes:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## Viewing Your Data

### Option 1: Supabase Dashboard (Recommended)
- Go to your Supabase project
- Click **Table Editor**
- Browse all your tables with a nice UI!

### Option 2: Prisma Studio
```bash
npm run db:studio
```
Opens at http://localhost:5555

## What Gets Created

The setup script creates these tables in your Supabase database:

- **Page** - Dynamic page content
- **User** - Parents, instructors, admins  
- **Class** - Craft class definitions
- **Venue** - Class locations
- **Category** - Activity types
- **And more!**

Plus sample data including a complete homepage!

## Troubleshooting

### "Connection failed"
Make sure you replaced `[YOUR-PASSWORD]` in the connection string with your actual password.

### "SSL required"
The setup script adds this automatically, but if you have issues, add `&sslmode=require` to your connection string.

### Need to start over?
```bash
# Drop all tables (careful!)
npx prisma migrate reset

# Re-run setup
npm run db:migrate
npm run db:seed
```

## Next Steps

1. **Explore the homepage** at `/home`
2. **Check your data** in Supabase Table Editor  
3. **Try the page builder** - All content is database-driven!
4. **Add Stripe keys** to `.env.local` when ready

Happy crafting! 🎨
