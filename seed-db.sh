#!/bin/bash

# Temporarily use direct URL for seeding (pooler doesn't support all operations)
export DATABASE_URL="postgresql://postgres.zcldjvbejigmqycfsjzb:qwasopkl12ZX@aws-1-us-east-2.pooler.supabase.com:5432/postgres"

echo "🌱 Seeding database with sample data..."
npm run db:seed

echo ""
echo "✅ Done! You can now run: npm run dev"
