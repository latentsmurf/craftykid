import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/home',
  '/classes',
  '/how-it-works',
  '/for-creators',
  '/about',
  '/instructors',
  '/instructor/(.*)',
  '/admin',
  '/auth/sign-in(.*)',
  '/auth/sign-up(.*)',
  '/auth/login',
  '/auth/signup',
  '/api/webhook/clerk',
  '/faq',
  '/gift-cards',
  '/instructor-resources',
  '/success-stories',
  '/instructor-faq',
  '/blog',
  '/careers',
  '/contact',
  '/help',
  '/safety',
  '/terms',
  '/privacy',
  '/test',
  '/debug',
  '/search(.*)',
  '/class/(.*)',
  '/booking/(.*)',
  '/dashboard(.*)',
  '/settings(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // Make all routes public until proper Clerk keys are configured
  const publicRoutes = isPublicRoute(req);
  
  // If not a public route, protect it (when Clerk is properly configured)
  // For now, we'll allow all routes to work without authentication
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
