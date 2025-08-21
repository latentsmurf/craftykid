#!/bin/bash

# Script to add Clerk environment variables
echo "🔐 Setting up Clerk environment variables..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    touch .env.local
fi

# Add Clerk variables if they don't exist
if ! grep -q "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" .env.local; then
    echo "" >> .env.local
    echo "# Clerk Authentication" >> .env.local
    echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=\"pk_test_ZmFjdHVhbC1wYW50aGVyLTU5LmNsZXJrLmFjY291bnRzLmRldiQ\"" >> .env.local
    echo "CLERK_SECRET_KEY=\"sk_test_YedBtdlVPX0xf6EpQCHT5LbcaXrbyrcIhv2Jw9CkJN\"" >> .env.local
    echo "" >> .env.local
    echo "# Clerk URLs" >> .env.local
    echo "NEXT_PUBLIC_CLERK_SIGN_IN_URL=\"/auth/sign-in\"" >> .env.local
    echo "NEXT_PUBLIC_CLERK_SIGN_UP_URL=\"/auth/sign-up\"" >> .env.local
    echo "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=\"/dashboard\"" >> .env.local
    echo "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=\"/dashboard\"" >> .env.local
    echo "✅ Clerk environment variables added to .env.local"
else
    echo "⚠️  Clerk variables already exist in .env.local"
fi

# Copy to .env for Prisma
cp .env.local .env

echo ""
echo "✨ Clerk setup complete!"
echo ""
echo "Next steps:"
echo "1. Restart your dev server: npm run dev"
echo "2. Visit http://localhost:3000/auth/sign-in"
echo "3. Try signing up with Google!"
echo ""
echo "Admin emails that will have admin access:"
echo "- latentsmurf@gmail.com"
echo "- ladan.cher@gmail.com"
