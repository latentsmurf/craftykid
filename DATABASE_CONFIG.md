# 🗄️ Database Configuration Guide

## Supabase Connection Strings

Your Supabase project has **two** different connection methods:

### 1. Transaction Pooler (Port 6543) - **USE THIS FOR VERCEL**
```
postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:6543/postgres
```

**When to use:**
- ✅ Vercel deployments (serverless functions)
- ✅ Production environment
- ✅ Any serverless/edge computing platform
- ✅ Applications with many concurrent connections

**Why:**
- Optimized for serverless environments
- Connection pooling reduces overhead
- Better performance with short-lived connections
- Prevents "too many connections" errors

### 2. Direct Connection (Port 5432) - **USE FOR MIGRATIONS**
```
postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:5432/postgres
```

**When to use:**
- ✅ Database migrations (`prisma migrate`)
- ✅ Database seeding
- ✅ Local development (optional)
- ✅ Admin tasks and backups

**Why:**
- Direct access to PostgreSQL
- Required for schema changes
- Better for long-running operations

---

## Configuration in Your Project

### Local Development (.env.local)
```bash
# Transaction Pooler for app connections
DATABASE_URL="postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:6543/postgres"

# Direct connection for migrations
DIRECT_URL="postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:5432/postgres"
```

### Vercel Production
Add both variables in **Vercel Dashboard** → **Settings** → **Environment Variables**:

```
DATABASE_URL = postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:6543/postgres
DIRECT_URL = postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:5432/postgres
```

---

## How Prisma Uses These

In your `prisma/schema.prisma`:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")      // Uses port 6543 (pooler)
  directUrl = env("DIRECT_URL")        // Uses port 5432 (direct)
}
```

**Prisma automatically:**
- Uses `DATABASE_URL` (port 6543) for app queries
- Uses `DIRECT_URL` (port 5432) for migrations

---

## Testing the Connection

### Test Transaction Pooler (Port 6543):
```bash
npx prisma db pull
```

### Test Direct Connection (Port 5432):
```bash
npx prisma migrate dev
```

---

## Troubleshooting

### "Can't reach database server"
**Problem:** Connection timeout or refused

**Solutions:**
1. Check if Supabase project is paused (free tier pauses after inactivity)
2. Verify password is correct: `qwasopkl12ZX`
3. Check Supabase dashboard for project status
4. Ensure network allows outbound connections on ports 5432 and 6543

### "Too many connections"
**Problem:** Exceeded connection limit

**Solution:** Use Transaction Pooler (port 6543) instead of direct connection

### "SSL connection required"
**Problem:** Some environments require SSL

**Solution:** Add `?sslmode=require` to connection string:
```
postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:6543/postgres?sslmode=require
```

---

## Connection Pooling Benefits

### Without Pooler (Port 5432):
- Each request = new database connection
- Serverless functions create many connections
- Hit connection limits quickly
- Slower response times

### With Pooler (Port 6543):
- Reuses existing connections
- Handles thousands of concurrent requests
- No connection limit issues
- Faster response times (20-30% improvement)

---

## Security Notes

🔒 **Never commit database credentials to Git!**

- ✅ Use `.env.local` for local development (gitignored)
- ✅ Use Vercel environment variables for production
- ✅ Rotate passwords periodically
- ❌ Never hardcode credentials in source code
- ❌ Never commit `.env.local` file

---

## Quick Reference

| Connection Type | Port | Environment Variable | Use Case |
|----------------|------|---------------------|----------|
| **Transaction Pooler** | 6543 | `DATABASE_URL` | Vercel, Production, App Queries |
| **Direct Connection** | 5432 | `DIRECT_URL` | Migrations, Seeding, Admin Tasks |

---

**Your database is ready for production deployment!** 🚀


