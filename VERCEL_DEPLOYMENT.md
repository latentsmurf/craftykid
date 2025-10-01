# 🚀 CraftyKid Deployment to Vercel with Custom Domain

## Quick Start - Deploy Now!

### Step 1: Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy to Production
```bash
vercel --prod
```

---

## 🌐 Custom Domain Setup: www.crftykid.com

### Part A: Configure Vercel

1. **After deployment, go to your Vercel dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your `craftykid` project
   - Click on **Settings** → **Domains**

2. **Add your domain:**
   - Click **Add Domain**
   - Enter: `crftykid.com`
   - Click **Add**
   - Also add: `www.crftykid.com`

### Part B: Configure Namecheap DNS

1. **Login to Namecheap:**
   - Go to: https://namecheap.com
   - Navigate to **Domain List** → **Manage** (for crftykid.com)

2. **Update DNS Records:**
   - Click on **Advanced DNS** tab
   - Add/Update these records:

   **For the root domain (crftykid.com):**
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   TTL: Automatic
   ```

   **For www subdomain (www.crftykid.com):**
   ```
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```

3. **Remove conflicting records:**
   - Delete any existing A records for @ or www
   - Delete any CNAME records that conflict

4. **Save changes**

### DNS Propagation
- DNS changes can take 24-48 hours to fully propagate
- Most changes show up within 1-2 hours
- Check status: https://dnschecker.org

---

## 🔐 Environment Variables for Vercel

After deployment, you MUST add these environment variables in Vercel:

### How to Add Environment Variables:
1. Go to: https://vercel.com/dashboard
2. Select your project → **Settings** → **Environment Variables**
3. Add each variable below

### Required Variables:

#### Database (Supabase)
```bash
# Use Transaction Pooler (port 6543) for serverless/Vercel deployments
DATABASE_URL=postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:6543/postgres
# Use Direct Connection (port 5432) for migrations and direct operations
DIRECT_URL=postgresql://postgres:qwasopkl12ZX@db.zcldjvbejigmqycfsjzb.supabase.co:5432/postgres
```

#### Authentication (Clerk) - Optional for now
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

#### App Configuration
```bash
NEXT_PUBLIC_APP_URL=https://www.crftykid.com
```

#### Stripe (Optional - for payments)
```bash
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

**Important:** After adding environment variables, trigger a redeployment:
```bash
vercel --prod
```

---

## ✅ Pre-Deployment Checklist

- [ ] All code committed to Git
- [ ] Database connection tested
- [ ] Environment variables documented
- [ ] Build tested locally: `npm run build`
- [ ] No sensitive data in code

---

## 🔧 Troubleshooting

### Build Fails on Vercel
**Issue:** Database connection errors during build
**Solution:** Make sure `DATABASE_URL` and `DIRECT_URL` are set in Vercel environment variables

### Domain Not Working
**Issue:** "This site can't be reached"
**Solution:** 
1. Check DNS records in Namecheap
2. Wait for DNS propagation (up to 48 hours)
3. Clear browser cache
4. Try: https://www.crftykid.com (with https://)

### SSL Certificate Issues
**Issue:** "Not Secure" warning
**Solution:** Vercel automatically provisions SSL certificates. Wait 5-10 minutes after adding domain.

### Database Connection Issues
**Issue:** Can't reach database server
**Solution:**
1. Check Supabase is running
2. Verify connection strings are correct
3. Check Supabase firewall rules allow Vercel IPs

---

## 📊 After Deployment

### Verify Everything Works:
1. **Homepage:** https://www.crftykid.com
2. **Search:** https://www.crftykid.com/search
3. **Instructors:** https://www.crftykid.com/instructors
4. **Auth:** https://www.crftykid.com/auth/sign-in

### Monitor Your Site:
- **Vercel Analytics:** Built-in analytics dashboard
- **Vercel Logs:** Real-time function logs
- **Performance:** Check Core Web Vitals

### Next Steps:
1. Set up Clerk authentication (get API keys from https://dashboard.clerk.com)
2. Configure Stripe for payments (if needed)
3. Add content to your database
4. Test booking flow end-to-end
5. Set up monitoring/analytics

---

## 🚀 Continuous Deployment

Once deployed, every push to your `main` branch will automatically deploy to production!

**Workflow:**
1. Make changes locally
2. Commit: `git commit -m "Your changes"`
3. Push: `git push origin main`
4. Vercel automatically deploys
5. Check deployment at: https://vercel.com/dashboard

---

## 📞 Support

- **Vercel Support:** https://vercel.com/support
- **Vercel Docs:** https://vercel.com/docs
- **Domain Issues:** https://namecheap.com/support

---

**Your CraftyKid marketplace will be live at https://www.crftykid.com! 🎨✨**

