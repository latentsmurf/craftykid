# 🚀 Supabase Setup for Crafty Kid

## Step 1: Create Your Supabase Account

1. Go to [https://supabase.com/](https://supabase.com/)
2. Click "Start your project" 
3. Sign up with GitHub or email

## Step 2: Create a New Project

1. Click "New project"
2. Fill in:
   - **Project name**: `crafty-kid`
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest to you
   - **Pricing Plan**: Free tier is fine

3. Click "Create new project" (takes ~2 minutes to provision)

## Step 3: Get Your Database Connection String

Once your project is ready:

1. Go to **Settings** (gear icon in sidebar)
2. Click **Database** in the settings menu
3. Scroll to **Connection string**
4. Click **URI** tab
5. Copy the connection string

It will look like this:
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

## Step 4: Update Your Connection String

The connection string from Supabase needs a small modification for Prisma:

1. Replace `[YOUR-PASSWORD]` with the password you chose
2. Add `?pgbouncer=true&connection_limit=1` at the end

Your final `DATABASE_URL` should look like:
```
postgresql://postgres:your-password-here@db.xxxxxxxxxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

## Step 5: Configure Your Project

Create or update `.env.local`:

```bash
DATABASE_URL="postgresql://postgres:your-password-here@db.xxxxxxxxxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"

# If you want to use the direct connection for migrations (optional but recommended):
DIRECT_URL="postgresql://postgres:your-password-here@db.xxxxxxxxxxxx.supabase.co:5432/postgres"
```

## Step 6: Update Prisma Schema (Optional but Recommended)

Add this to your `prisma/schema.prisma` if you want to use both pooled and direct connections:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

## Supabase Features You Get

- ✅ **Free PostgreSQL database** (500 MB)
- ✅ **Database UI** - View and edit data visually
- ✅ **SQL Editor** - Run queries directly
- ✅ **Automatic backups** (7 days on free tier)
- ✅ **Row Level Security** (RLS) - Optional extra security
- ✅ **Realtime subscriptions** - For live updates (future feature)

## Viewing Your Data in Supabase

After running migrations and seeding:

1. Go to your Supabase project
2. Click **Table Editor** in the sidebar
3. You'll see all your tables (Page, User, Class, etc.)
4. Click any table to view/edit data

## Troubleshooting

### "Connection timeout" error
- Make sure you added `?pgbouncer=true&connection_limit=1`
- Check that your password is correct

### "SSL required" error
- Add `&sslmode=require` to your connection string

### Migrations are slow
- Use the DIRECT_URL for migrations (see Step 6)
- This bypasses the connection pooler for better performance

## Next Steps

Once your database URL is configured:

```bash
# Run the setup script
./setup.sh

# When prompted about database setup, press Enter
# The script will handle everything else!
```

## Useful Supabase Links

- **Dashboard**: https://app.supabase.com/project/[your-project-ref]
- **Table Editor**: View and edit your data
- **SQL Editor**: Run custom queries
- **Database Settings**: Connection strings and configuration
