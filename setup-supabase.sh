#!/bin/bash

echo "🚀 Crafty Kid - Supabase Setup Assistant"
echo "========================================"
echo ""
echo "This script will help you set up Crafty Kid with Supabase."
echo ""
echo "📋 Prerequisites:"
echo "1. A Supabase account (free at https://supabase.com)"
echo "2. A Supabase project created"
echo "3. Your database connection string"
echo ""
echo "Press Enter to continue or Ctrl+C to exit..."
read

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please run ./install-node.sh first"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo ""

# Create .env.local with Supabase configuration
echo "📝 Let's configure your Supabase connection..."
echo ""
echo "To find your connection string:"
echo "1. Go to your Supabase project"
echo "2. Click Settings → Database"
echo "3. Copy the URI from Connection String section"
echo ""
echo "Enter your Supabase connection string:"
echo "(It starts with: postgresql://postgres:...)"
read -r db_url

# Add required parameters for Prisma
if [[ ! "$db_url" == *"?"* ]]; then
    db_url="${db_url}?pgbouncer=true&connection_limit=1"
else
    db_url="${db_url}&pgbouncer=true&connection_limit=1"
fi

# Extract the direct URL (without pgbouncer)
direct_url="${db_url//?pgbouncer=true&connection_limit=1/}"

# Create .env.local
cat > .env.local << EOF
# Database - Supabase
DATABASE_URL="${db_url}"
DIRECT_URL="${direct_url}"

# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Stripe (add your keys when ready)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (Resend - add your key when ready)
RESEND_API_KEY="re_..."

# File Storage (Vercel Blob - add your token when ready)
BLOB_READ_WRITE_TOKEN="vercel_blob_..."

# Background Checks Provider
CHECKS_PROVIDER_KEY="..."
CHECKS_PROVIDER_URL="https://api.checkr.com"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://zcldjvbejigmqycfsjzb.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjbGRqdmJlamlnbXF5Y2ZzanpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NTI4NDMsImV4cCI6MjA3MTMyODg0M30.E8KaSsF4SjEcRX38oKmR78WBXqoBrb0HwIlSHlQWKhM"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Crafty Kid"

# Feature Flags
ENABLE_WISHLISTS="false"
ENABLE_PHOTO_MEMORIES="false"
ENABLE_BLOG="true"
EOF

echo "✅ Created .env.local with Supabase configuration"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Test database connection
echo "🔍 Testing database connection..."
npx prisma db pull --force > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Successfully connected to Supabase!"
else
    echo "❌ Could not connect to database. Please check your connection string."
    echo "   Make sure you replaced [YOUR-PASSWORD] with your actual password."
    exit 1
fi

echo ""
echo "🗄️  Setting up database schema..."

# Run migrations
echo "Running migrations..."
npm run db:migrate

if [ $? -ne 0 ]; then
    echo "❌ Migration failed. This might be a connection issue."
    echo "   Try adding '&sslmode=require' to your DATABASE_URL"
    exit 1
fi

# Seed the database
echo "🌱 Seeding database with sample data..."
npm run db:seed

echo ""
echo "✅ Supabase Setup Complete!"
echo "=========================="
echo ""
echo "🎉 Your database is ready with:"
echo "   - Page builder schema"
echo "   - Sample homepage"
echo "   - Categories"
echo "   - Site settings"
echo ""
echo "📊 View your data in Supabase:"
echo "   1. Go to your Supabase project"
echo "   2. Click 'Table Editor' in the sidebar"
echo "   3. Browse your tables!"
echo ""
echo "🚀 To start the development server:"
echo "   npm run dev"
echo ""
echo "📝 Other useful commands:"
echo "   npm run db:studio    # Prisma Studio (local data viewer)"
echo "   npm run build        # Build for production"
echo ""
echo "🔗 Your app will be available at: http://localhost:3000"
