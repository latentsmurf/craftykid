# 🚀 Crafty Kid Quick Start Guide

Follow these steps to get Crafty Kid running on your machine.

## Prerequisites Check

Run this command to see what you need to install:

```bash
ls -la
```

You should see:
- `install-node.sh` - Helper to install Node.js
- `setup.sh` - Main setup script
- `database-setup.md` - Database installation guide

## Step 1: Install Node.js

Run the installation helper:

```bash
./install-node.sh
```

Choose option 3 (direct download) for the simplest installation.

## Step 2: Set Up Database

You have two options:

### Option A: Cloud Database (Easiest - No Installation Required)

1. Sign up for [Neon](https://neon.tech/) (free tier)
2. Create a new database
3. Copy the connection string
4. You'll add this to `.env.local` in the next step

### Option B: Local PostgreSQL

See `database-setup.md` for detailed instructions.

## Step 3: Run Setup Script

Once Node.js is installed, run:

```bash
./setup.sh
```

This script will:
1. ✅ Check Node.js is installed
2. ✅ Create `.env.local` file
3. ✅ Install all dependencies
4. ✅ Set up the database
5. ✅ Seed sample data

**Important**: When prompted, make sure to update the `DATABASE_URL` in `.env.local` with your actual database connection string!

## Step 4: Start the Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## What You'll See

- **Homepage** at `/home` - Dynamic page with search, featured classes, and more
- **Admin-managed content** - All page content comes from the database
- **Sample data** - Pre-populated classes, instructors, and testimonials

## Useful Commands

```bash
npm run dev          # Start development server
npm run db:studio    # View/edit database (opens at http://localhost:5555)
npm run build        # Build for production
npm run db:migrate   # Run database migrations
npm run db:seed      # Re-seed sample data
```

## Next Steps

1. **Explore the Admin System** - Check out `/src/app/admin` (to be implemented)
2. **Try the Page Builder** - Pages are stored in the database as JSON
3. **Customize Blocks** - Add new block types in `/src/components/blocks`
4. **Set Up Stripe** - Add your Stripe keys to `.env.local` for payments

## Troubleshooting

- **"command not found: npm"** - Node.js isn't installed yet. Run `./install-node.sh`
- **Database connection errors** - Check your `DATABASE_URL` in `.env.local`
- **Port 3000 in use** - Change the port: `PORT=3001 npm run dev`

## Architecture Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                 │
│  Page Builder   │────▶│  Block Renderer  │────▶│  Dynamic Pages  │
│  (Admin-managed)│     │  (11 block types)│     │  (Marketing)    │
│                 │     │                  │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │                         │
         └───────────────────────┴─────────────────────────┘
                                 │
                          ┌──────▼────────┐
                          │               │
                          │  PostgreSQL   │
                          │  (Prisma ORM) │
                          │               │
                          └───────────────┘
```

Ready to get creative? Let's build something amazing! 🎨
