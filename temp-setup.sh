#!/bin/bash

# Create .env.local with the correct connection string
cat > .env.local << 'EOF'
# Database - Supabase
DATABASE_URL="postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:5432/postgres"

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

echo "✅ Updated .env.local with your connection string"

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Run migrations
echo "🗄️ Running database migrations..."
npm run db:migrate

# Seed the database
echo "🌱 Seeding database with sample data..."
npm run db:seed

echo ""
echo "✅ Setup Complete!"
echo "Start the server with: npm run dev"
