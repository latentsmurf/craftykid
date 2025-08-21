# 🎨 Crafty Kid - Creative Marketplace Platform

> **Where creativity meets community** - A modern marketplace connecting families with local craft instructors.

![Crafty Kid Platform](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80)

## 🌟 Overview

Crafty Kid is a comprehensive marketplace platform that connects families with local craft instructors for engaging parent-child creative experiences. Built with modern web technologies and designed for scale, it provides a complete solution for discovering, booking, and managing craft classes.

## ✨ Key Features

### 🎯 **For Families**
- **Class Discovery**: Advanced search with filters for location, age, craft type
- **Featured Content**: Highlighted super hosts, unique classes, and trending activities
- **Easy Booking**: Streamlined booking flow with secure payment processing
- **Reviews & Ratings**: Verified reviews from real families
- **Mobile Optimized**: Beautiful responsive design with touch-friendly interactions

### 👨‍🎨 **For Instructors**
- **Comprehensive Onboarding**: 5-step verification process with background checks
- **Class Management**: Create and manage class schedules and pricing
- **Revenue Tracking**: 80% revenue share with automated payouts
- **Profile Showcase**: Portfolio display with image galleries and reviews
- **Professional Tools**: Instructor dashboard with booking management

### 🛠️ **For Administrators**
- **Platform Management**: Complete admin dashboard with analytics
- **Content Management**: Schema-driven page builder for marketing content
- **Instructor Approval**: Review and approve new instructor applications
- **User Management**: Comprehensive user oversight and support tools

## 🚀 Technology Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Smooth animations and micro-interactions
- **shadcn/ui** - Modern component library

### **Backend & Database**
- **Prisma ORM** - Type-safe database toolkit
- **PostgreSQL** - Robust relational database
- **Supabase** - Cloud database hosting and APIs
- **Server Actions** - Next.js server-side data mutations

### **Authentication & Payments**
- **Clerk** - User authentication with Google OAuth
- **Stripe** - Secure payment processing and subscriptions
- **Role-based Access** - Parent, Instructor, and Admin roles

### **Design & UX**
- **Dark Mode** - System-aware theme switching
- **Mobile-First** - Responsive design with touch optimization
- **Accessibility** - WCAG compliant with proper focus management
- **Performance** - Optimized images, lazy loading, and caching

## 🎨 Design System

### **Color Palette**
- **Primary**: Purple to Pink gradient (`from-purple-600 to-pink-600`)
- **Backgrounds**: Semantic color system with dark mode support
- **Accents**: Craft-specific color coding for categories

### **Typography**
- **Font**: Inter - Clean, readable, modern
- **Scale**: Responsive typography with mobile optimization
- **Hierarchy**: Clear information architecture

### **Components**
- **Glassmorphism**: Backdrop blur effects for modern feel
- **Animations**: Subtle motion design with Framer Motion
- **Cards**: Elevated design with hover effects and shadows

## 📱 Mobile Experience

### **Navigation**
- **Slide-out Menu**: Premium mobile navigation with smooth animations
- **Bottom Navigation**: Persistent access to key features
- **Touch Optimized**: 44px minimum touch targets

### **Responsive Design**
- **Breakpoints**: Mobile-first with progressive enhancement
- **Typography**: Optimized font sizes for mobile reading
- **Interactions**: Touch-friendly gestures and feedback

## 🔧 Getting Started

### **Prerequisites**
- Node.js 18+ 
- PostgreSQL database (Supabase recommended)
- Clerk account for authentication
- Stripe account for payments (optional for development)

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/latentsmurf/craftykid.git
   cd craftykid
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Add your database, Clerk, and Stripe keys
   ```

4. **Set up the database**:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

### **Environment Variables**

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Stripe Payments (Optional)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## 📊 Project Structure

```
crafty-kid/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (marketing)/        # Marketing pages with page builder
│   │   ├── api/                # API routes and webhooks
│   │   ├── auth/               # Authentication pages
│   │   ├── booking/            # Booking flow pages
│   │   ├── class/              # Class detail pages
│   │   ├── dashboard/          # User dashboards (parent, instructor, admin)
│   │   └── instructor/         # Instructor profiles and onboarding
│   ├── components/             # Reusable UI components
│   │   ├── blocks/             # Page builder blocks
│   │   ├── booking/            # Booking-specific components
│   │   ├── search/             # Search and discovery components
│   │   └── ui/                 # Base UI components
│   ├── lib/                    # Utilities and configurations
│   │   ├── config/             # Site configuration
│   │   ├── hooks/              # Custom React hooks
│   │   ├── page-builder/       # Page builder system
│   │   ├── schemas/            # Zod validation schemas
│   │   └── services/           # Business logic services
│   └── styles/                 # Global styles and CSS
├── prisma/                     # Database schema and migrations
├── Documentation/              # Setup guides and instructions
└── Configuration files         # Package.json, Tailwind, etc.
```

## 🎯 Core Features

### **Page Builder System**
- Schema-driven content management
- Dynamic block rendering
- SEO optimization
- Version control for pages

### **Booking Flow**
1. **Discovery**: Search and browse classes
2. **Selection**: Choose date, time, and participants
3. **Authentication**: Sign in with Google OAuth
4. **Payment**: Secure Stripe checkout
5. **Confirmation**: Receipt and calendar integration

### **User Roles**
- **Parents**: Book classes, manage children, leave reviews
- **Instructors**: Create classes, manage schedules, track earnings
- **Admins**: Platform management, content control, user oversight

## 🔒 Security & Privacy

- **Background Checks**: All instructors verified
- **Secure Payments**: PCI-compliant Stripe integration
- **Data Protection**: GDPR-compliant data handling
- **Role-based Access**: Proper authorization controls

## 📈 Performance & SEO

- **Core Web Vitals**: Optimized for Google's performance metrics
- **Image Optimization**: Next.js automatic image optimization
- **SEO**: Dynamic meta tags and structured data
- **Caching**: Efficient data fetching and caching strategies

## 🚀 Deployment

### **Recommended Stack**
- **Frontend**: Vercel (seamless Next.js deployment)
- **Database**: Supabase (PostgreSQL with APIs)
- **Authentication**: Clerk (managed auth service)
- **Payments**: Stripe (secure payment processing)
- **Media**: Cloudinary or similar CDN

### **Production Checklist**
- [ ] Set up production database
- [ ] Configure live Stripe keys
- [ ] Set up domain and SSL
- [ ] Configure email notifications
- [ ] Set up monitoring and analytics
- [ ] Test payment flows end-to-end

## 📝 License

This project is proprietary software developed for Crafty Kid marketplace.

## 🤝 Contributing

This is a private project. For questions or support, contact the development team.

---

**Built with ❤️ for creative families everywhere**

*Crafty Kid - Where creativity meets community* 🎨✨