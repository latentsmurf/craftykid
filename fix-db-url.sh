#!/bin/bash

# Update .env with SSL mode
sed -i '' 's|postgres?pgbouncer=true&connection_limit=1"|postgres?pgbouncer=true\&connection_limit=1\&sslmode=require"|g' .env
sed -i '' 's|postgres"|postgres?sslmode=require"|g' .env

echo "✅ Updated database URLs with SSL mode"
cat .env | grep URL
