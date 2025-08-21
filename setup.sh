#!/bin/bash

echo "🚀 Crafty Kid Setup Script"
echo "========================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js first from: https://nodejs.org/"
    echo ""
    echo "For macOS, you can:"
    echo "1. Download from https://nodejs.org/ (recommended)"
    echo "2. Or install Homebrew first, then run: brew install node"
    echo "3. Or use nvm (Node Version Manager)"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Create .env.local file
echo "📝 Creating .env.local file..."
cat > .env.local << 'EOF'
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/crafty_kid?schema=public"

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

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Crafty Kid"

# Feature Flags
ENABLE_WISHLISTS="false"
ENABLE_PHOTO_MEMORIES="false"
ENABLE_BLOG="true"
EOF

echo "✅ Created .env.local"
echo ""
echo "⚠️  IMPORTANT: Edit .env.local with your actual database credentials and API keys!"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🗄️  Database Setup"
echo "================="
echo "Before running database commands, make sure you have PostgreSQL running with:"
echo "  - Database name: crafty_kid"
echo "  - Update DATABASE_URL in .env.local with your credentials"
echo ""
echo "Press Enter to continue with database setup, or Ctrl+C to exit and configure first..."
read

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Run migrations
echo "🔄 Running database migrations..."
npm run db:migrate

# Seed the database
echo "🌱 Seeding database with sample data..."
npm run db:seed

echo ""
echo "✅ Setup Complete!"
echo "=================="
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "The app will be available at: http://localhost:3000"
echo ""
echo "Other useful commands:"
echo "  npm run db:studio    # Open Prisma Studio to view/edit data"
echo "  npm run build        # Build for production"
echo "  npm run lint         # Run linter"
echo ""
echo "Don't forget to update .env.local with your actual API keys!"
