# 🔗 Getting Your Supabase Connection String

Since you're already in your Supabase project, here's exactly where to find your connection string:

## Quick Steps:

1. **Go to Settings** (⚙️ icon in the left sidebar)

2. **Click on "Database"** in the settings menu

3. **Scroll down to "Connection string"** section

4. **Click the "URI" tab** (not "PSQL" or others)

5. **You'll see a string like this:**
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.zcldjvbejigmqycfsjzb.supabase.co:5432/postgres
   ```

6. **IMPORTANT**: Replace `[YOUR-PASSWORD]` with the database password you chose when creating the project

## Your Connection String Should Look Like:

```
postgresql://postgres:your-actual-password-here@db.zcldjvbejigmqycfsjzb.supabase.co:5432/postgres
```

## Ready to Setup?

Once you have your connection string with the password replaced, run:

```bash
./setup-supabase.sh
```

The script will:
- ✅ Automatically add the required parameters for Prisma
- ✅ Configure your Supabase API keys (already included!)
- ✅ Set up your entire database
- ✅ Seed it with sample data

## Can't Find Your Password?

If you forgot your database password:
1. Go to Settings → Database
2. Click "Reset database password"
3. Choose a new password
4. Update your connection string with the new password
