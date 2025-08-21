#!/bin/bash

# Create .env with correct Supabase pooler connection
cat > .env << 'EOF'
# Database - Supabase (Pooler connection)
DATABASE_URL="postgresql://postgres.zcldjvbejigmqycfsjzb:qwasopkl12ZX@aws-1-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.zcldjvbejigmqycfsjzb:qwasopkl12ZX@aws-1-us-east-2.pooler.supabase.com:5432/postgres"

# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (Resend)
RESEND_API_KEY="re_..."

# File Storage (Vercel Blob)
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

# Also update .env.local
cp .env .env.local

echo "✅ Updated database connection with correct Supabase pooler"
echo ""
echo "Running database setup..."
echo ""

# Run migrations
echo "🗄️ Creating database tables..."
npx prisma migrate dev --name init

# Generate Prisma client
echo ""
echo "🔧 Generating Prisma client..."
npm run db:generate

# Seed the database
echo ""
echo "🌱 Seeding database with sample data..."
npm run db:seed

echo ""
echo "✅ Database setup complete!"
echo ""
echo "🚀 Starting the development server..."
npm run dev
