# Migration Guide: From JWT Auth to Clerk

This guide explains how we're transitioning from our custom JWT authentication to Clerk for better security and Google OAuth support.

## What's Changing

1. **Authentication Method**: From custom JWT to Clerk's managed authentication
2. **Login/Signup Pages**: From `/auth/login` and `/auth/signup` to `/auth/sign-in` and `/auth/sign-up`
3. **User Management**: From local password storage to Clerk's secure user management
4. **OAuth Support**: Adding Google login via Clerk

## Admin Users

The following users have admin access:
- latentsmurf@gmail.com
- ladan.cher@gmail.com

## Migration Steps

### For Development

1. **Get Clerk API Keys**:
   - Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
   - Create a new application called "Crafty Kid"
   - Enable Google as a social provider

2. **Update Environment Variables**:
   ```bash
   # Add to .env.local
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_publishable_key"
   CLERK_SECRET_KEY="your_secret_key"
   CLERK_WEBHOOK_SECRET="your_webhook_secret"
   ```

3. **Database Migration**:
   ```bash
   # Generate Prisma client with new clerkId field
   npm run db:generate
   
   # Run migration to add clerkId column
   npm run db:migrate
   ```

4. **Configure Admin Users in Clerk**:
   - In Clerk Dashboard, manually create users for the admin emails
   - Add `{ "role": "ADMIN" }` to their public metadata

### For Production

1. **Set up Webhook**:
   - In Clerk Dashboard, create a webhook endpoint
   - Point it to `https://yourdomain.com/api/clerk/webhook`
   - This syncs Clerk users with your database

2. **Update DNS** (if using custom domain):
   - Follow Clerk's instructions for custom domain setup

## Code Changes

### Old Auth Flow
```typescript
// Before
import { useAuth } from "@/lib/hooks/useAuth"
const { user, login, logout } = useAuth()
```

### New Auth Flow
```typescript
// After
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
const { user, logout } = useClerkAuth()
// Login is handled by Clerk's UI components
```

### Protected Routes
Routes are now protected via `middleware.ts` using Clerk's authMiddleware.

## Backward Compatibility

During the transition:
- Old login/signup pages redirect to new Clerk pages
- Both auth systems work simultaneously
- User data syncs between Clerk and database via webhook

## Testing

1. Test Google OAuth login
2. Verify admin users can access `/dashboard/admin`
3. Check that role-based redirects work correctly
4. Ensure webhook syncs user data properly

## Rollback Plan

If issues arise:
1. Remove ClerkProvider from layout.tsx
2. Disable middleware.ts
3. Revert to original auth pages
4. Remove Clerk dependencies

## Benefits of Migration

1. **Enhanced Security**: Clerk handles password storage and session management
2. **OAuth Support**: Easy integration with Google, GitHub, etc.
3. **Better UX**: Pre-built, customizable auth UI components
4. **Compliance**: Built-in GDPR, SOC 2 compliance
5. **Analytics**: User analytics and insights dashboard
6. **Passwordless**: Support for magic links and OTP
