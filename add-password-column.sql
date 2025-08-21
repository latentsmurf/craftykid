-- Add password field to User table if it doesn't exist
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT;
