# Database Setup Guide for Crafty Kid

## Option 1: Local PostgreSQL

### Install PostgreSQL on macOS:

```bash
# Using Homebrew (if you have it installed)
brew install postgresql@15
brew services start postgresql@15

# Create the database
createdb crafty_kid
```

### Using Postgres.app:
1. Download from [https://postgresapp.com/](https://postgresapp.com/)
2. Install and start the app
3. Create database: `createdb crafty_kid`

## Option 2: Cloud PostgreSQL (Recommended for Easy Setup)

### Using Neon (Free tier available):
1. Sign up at [https://neon.tech/](https://neon.tech/)
2. Create a new project
3. Copy the connection string
4. Update `DATABASE_URL` in `.env.local`

Example Neon connection string:
```
DATABASE_URL="postgresql://username:password@ep-example.us-east-2.aws.neon.tech/crafty_kid?sslmode=require"
```

### Using Supabase (Free tier available):
1. Sign up at [https://supabase.com/](https://supabase.com/)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Update `DATABASE_URL` in `.env.local`

## Verify Your Database Connection

After setting up your database, test the connection:

```bash
# This will be run automatically by setup.sh
npm run db:generate
npm run db:migrate
```

## Troubleshooting

### Common Issues:

1. **"Connection refused"** - Make sure PostgreSQL is running
2. **"Database does not exist"** - Create it with `createdb crafty_kid`
3. **"Authentication failed"** - Check your username/password in the connection string
4. **SSL issues with cloud databases** - Make sure to include `?sslmode=require` in the connection string

### View Your Data:

Once the database is set up, you can view and edit data using Prisma Studio:

```bash
npm run db:studio
```

This will open a web interface at http://localhost:5555
