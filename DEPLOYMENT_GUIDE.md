# 🚀 Vercel Deployment Guide

## Overview
Deploy your Crafty Kid marketplace to Vercel for production hosting with automatic deployments from GitHub.

## Prerequisites
✅ Project pushed to GitHub: https://github.com/latentsmurf/craftykid
✅ Vercel configuration file created
✅ Environment variables documented

## Deployment Steps

### 1. Deploy to Vercel

Run the deployment command:
```bash
npx vercel --prod
```

You'll be prompted to:
1. **Login to Vercel**: Follow the authentication flow
2. **Link to existing project**: Choose "Link to existing project" 
3. **Select GitHub repo**: Choose `latentsmurf/craftykid`
4. **Confirm settings**: Accept the default build settings

### 2. Set Up Environment Variables

After deployment, you'll need to add environment variables in the Vercel dashboard:

**Go to**: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

**Add these variables:**

#### Database (Supabase)
```
DATABASE_URL=postgresql://postgres:password@host:5432/postgres
DIRECT_URL=postgresql://postgres:password@host:5432/postgres
```

#### Authentication (Clerk)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

#### Payments (Stripe) - Optional for MVP
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Database Setup

#### Option A: Use Existing Supabase Database
1. Update connection strings to use production URLs
2. Run migrations: `npx prisma migrate deploy`
3. Seed data: `npx prisma db seed`

#### Option B: New Production Database
1. Create new Supabase project for production
2. Copy database URL from Supabase dashboard
3. Run migrations and seeding

### 4. Configure Services for Production

#### Clerk Authentication
1. Go to Clerk dashboard → Your app → Domains
2. Add your Vercel domain (e.g., `craftykid.vercel.app`)
3. Update redirect URLs in Clerk settings

#### Stripe Payments (if using)
1. Switch to live mode in Stripe dashboard
2. Update webhook endpoint to your Vercel domain
3. Add webhook URL: `https://your-domain.vercel.app/api/webhooks/stripe`

## 🔧 Vercel Configuration

### Build Settings
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Performance Optimizations
- **Edge Functions**: API routes optimized for global performance
- **Image Optimization**: Automatic image optimization and WebP conversion
- **Static Generation**: Pages cached at edge locations
- **Bundle Analysis**: Automatic bundle size optimization

## 🌐 Custom Domain (Optional)

### Add Custom Domain
1. Go to Vercel dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `craftykid.com`)
3. Configure DNS records as instructed
4. SSL certificate will be automatically provisioned

### DNS Configuration
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## 📊 Monitoring & Analytics

### Built-in Features
- **Real-time Analytics**: Page views, performance metrics
- **Error Monitoring**: Automatic error tracking and alerts
- **Performance Insights**: Core Web Vitals monitoring
- **Deployment History**: Complete deployment log and rollback capability

### Additional Monitoring (Recommended)
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and debugging
- **Mixpanel**: User analytics and behavior tracking

## 🔒 Security Considerations

### Production Checklist
- [ ] Use live API keys (not test keys)
- [ ] Enable HTTPS only
- [ ] Configure proper CORS settings
- [ ] Set up rate limiting
- [ ] Enable security headers (already configured in vercel.json)
- [ ] Review and test all payment flows

### Environment Security
- [ ] Never commit API keys to Git
- [ ] Use environment variables for all secrets
- [ ] Rotate keys periodically
- [ ] Monitor for unauthorized access

## 🚀 Continuous Deployment

### Automatic Deployments
Once connected to GitHub:
- **Main Branch**: Automatically deploys to production
- **Feature Branches**: Creates preview deployments
- **Pull Requests**: Generates preview URLs for testing

### Deployment Workflow
1. Push code to GitHub
2. Vercel automatically builds and deploys
3. Preview URL provided for testing
4. Merge to main for production deployment

## 📋 Post-Deployment Tasks

### Immediate Tasks
1. **Test Core Flows**: Registration, booking, payment
2. **Verify Integrations**: Clerk auth, Stripe payments, database
3. **Check Mobile Experience**: Test on actual devices
4. **Monitor Performance**: Check Core Web Vitals

### Ongoing Maintenance
1. **Monitor Analytics**: Track user engagement and performance
2. **Update Dependencies**: Keep packages up to date
3. **Backup Database**: Regular database backups
4. **Security Updates**: Monitor and apply security patches

## 🎯 Success Metrics

### Technical Metrics
- **Performance**: Core Web Vitals in green
- **Uptime**: 99.9% availability target
- **Load Time**: < 3 seconds first contentful paint
- **Mobile Score**: 90+ on PageSpeed Insights

### Business Metrics
- **User Registrations**: Track signup conversion
- **Booking Completion**: Monitor booking funnel
- **Instructor Applications**: Track instructor growth
- **Revenue**: Monitor transaction volume and value

## 🆘 Troubleshooting

### Common Issues
- **Build Failures**: Check environment variables and dependencies
- **Database Errors**: Verify connection strings and migrations
- **Auth Issues**: Check Clerk domain configuration
- **Payment Errors**: Verify Stripe webhook configuration

### Support Resources
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Clerk Support**: https://clerk.com/support
- **Stripe Support**: https://support.stripe.com

---

Your Crafty Kid marketplace is ready for production! 🎨✨
