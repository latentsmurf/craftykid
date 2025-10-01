# 🚀 Deploy CraftyKid to Vercel NOW!

## ✅ Pre-Flight Checklist
- [x] Build tested successfully
- [x] Environment variables documented  
- [x] Vercel configuration ready
- [x] Domain purchased (www.crftykid.com)
- [x] Stripe integration optional
- [x] Database connection configured

---

## 📦 Step 1: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

**Follow the prompts:**
1. Set up and deploy? **Yes**
2. Which scope? Select your account
3. Link to existing project? **No** (first time) or **Yes** (if exists)
4. Project name: `craftykid` or similar
5. Directory: `.` (current directory)
6. Override settings? **No**

### Option B: Deploy via Vercel Dashboard

1. Go to: https://vercel.com/new
2. Import your Git repository
3. Configure project:
   - Framework: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Click **Deploy**

---

## 🔐 Step 2: Add Environment Variables

**IMPORTANT:** Immediately after deployment, add these environment variables in Vercel:

### Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your project
3. Navigate to: **Settings** → **Environment Variables**

### Add These Variables (Required):

```bash
# Database (Transaction Pooler - Port 6543 for serverless/Vercel)
DATABASE_URL=postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:6543/postgres
DIRECT_URL=postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:5432/postgres

# Clerk Authentication (Get keys from: https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# App URL
NEXT_PUBLIC_APP_URL=https://www.crftykid.com

# Stripe (Optional - add when ready for payments)
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### After Adding Variables:
```bash
# Trigger a redeployment
vercel --prod
```

---

## 🌐 Step 3: Configure Custom Domain

### In Vercel Dashboard:

1. Go to your project → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter: `crftykid.com`
4. Click **Add**
5. Also add: `www.crftykid.com`

Vercel will provide DNS records to configure...

### In Namecheap Dashboard:

1. Login to: https://namecheap.com
2. Go to: **Domain List** → **Manage** (for crftykid.com)
3. Click: **Advanced DNS** tab

### Add These DNS Records:

**A Record (Root Domain):**
```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic
```

**CNAME Record (www subdomain):**
```
Type: CNAME Record  
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

**Important:** Delete any existing A or CNAME records for @ or www that conflict!

### DNS Propagation:
- Takes 5 minutes to 48 hours
- Usually works within 1-2 hours
- Check status: https://dnschecker.org

---

## 🎯 Step 4: Configure Clerk for Production

1. Go to: https://dashboard.clerk.com
2. Select your application (or create one)
3. Navigate to: **Domains**
4. Add your production domains:
   - `crftykid.com`
   - `www.crftykid.com`
   - `craftykid.vercel.app` (Vercel subdomain)

5. Get your Production API Keys:
   - Go to: **API Keys**
   - Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Copy `CLERK_SECRET_KEY`
   - Add these to Vercel environment variables (Step 2)

---

## 🔄 Step 5: Verify Deployment

### Check These URLs:
- ✅ https://www.crftykid.com
- ✅ https://crftykid.com (should redirect to www)
- ✅ https://www.crftykid.com/home
- ✅ https://www.crftykid.com/search
- ✅ https://www.crftykid.com/instructors

### Test Core Features:
1. Homepage loads
2. Search functionality works
3. Navigation works
4. Mobile responsive
5. Images load properly

---

## 📊 Post-Deployment Monitoring

### Vercel Dashboard:
- **Analytics:** Monitor page views and performance
- **Logs:** View real-time function logs
- **Deployments:** See deployment history
- **Performance:** Check Core Web Vitals

### Access Logs:
```bash
# View deployment logs
vercel logs

# View specific deployment
vercel logs [deployment-url]
```

---

## 🔧 Troubleshooting

### Build Fails
**Issue:** Environment variables not set  
**Solution:** Add all required env vars in Vercel dashboard, then redeploy

### Domain Not Working
**Issue:** DNS not propagated  
**Solution:** 
- Wait 1-2 hours for DNS propagation
- Check DNS records in Namecheap match Vercel requirements
- Clear browser cache
- Try incognito mode

### SSL Certificate Error
**Issue:** "Not Secure" warning  
**Solution:** Vercel automatically provisions SSL. Wait 5-10 minutes after adding domain.

### Database Connection Errors
**Issue:** Can't reach database  
**Solution:**
- Verify DATABASE_URL is correct in Vercel
- Check Supabase is running
- Verify Supabase allows connections from Vercel IPs

### Clerk Authentication Not Working
**Issue:** Auth errors in production  
**Solution:**
- Add production domains in Clerk dashboard
- Use production API keys (not test keys)
- Verify redirect URLs are correct

---

## 🎉 Success Checklist

- [ ] Site loads at https://www.crftykid.com
- [ ] SSL certificate shows secure (https)
- [ ] Homepage displays correctly
- [ ] Search functionality works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Database connected (if applicable)
- [ ] Authentication works (if configured)

---

## 🚀 Continuous Deployment

Every push to `main` branch automatically deploys to production!

**Workflow:**
```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel automatically:
# 1. Detects the push
# 2. Runs build
# 3. Deploys to production
# 4. Provides deployment URL
```

---

## 📞 Support Resources

- **Vercel Support:** https://vercel.com/support
- **Vercel Docs:** https://vercel.com/docs
- **Clerk Support:** https://clerk.com/support
- **Namecheap Support:** https://namecheap.com/support
- **Next.js Docs:** https://nextjs.org/docs

---

## 🎨 Your CraftyKid site will be live at:
# https://www.crftykid.com

**Let's make it happen!** 🚀✨

