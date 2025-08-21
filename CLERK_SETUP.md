# Setting up Clerk Authentication

## 1. Get your Clerk API Keys

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Sign up or log in
3. Create a new application
4. Name it "Crafty Kid"
5. Enable "Google" as a social provider
6. Copy your API keys

## 2. Add Environment Variables

Add these to your `.env.local` file:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_publishable_key_here"
CLERK_SECRET_KEY="your_secret_key_here"

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/auth/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/auth/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
```

## 3. Configure Admin Users in Clerk Dashboard

1. In Clerk Dashboard, go to "Users"
2. Create users for:
   - latentsmurf@gmail.com
   - ladan.cher@gmail.com
3. Add custom metadata to mark them as admins:
   - Go to each user's details
   - Add to "Public metadata": `{ "role": "ADMIN" }`

## 4. Enable Google OAuth

1. In Clerk Dashboard, go to "User & Authentication" → "Social connections"
2. Enable Google
3. Follow the setup instructions to configure Google OAuth

## 5. Database Sync (Optional)

If you want to sync Clerk users with your database:
1. Set up a webhook in Clerk Dashboard
2. Point it to `/api/clerk/webhook`
3. This will automatically create/update users in your database when they sign up via Clerk

## 6. Test the Integration

1. Restart your dev server: `npm run dev`
2. Try logging in with Google at `/auth/sign-in`
3. Admin users should be redirected to `/dashboard/admin`
4. Regular users go to `/dashboard/parent` or `/dashboard/instructor`
