-- Add password field to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT;

-- Update the updated_at timestamp
UPDATE "User" SET "updatedAt" = NOW();
