# Crafty Kid - Parent-Kid Craft Class Marketplace

A Care.com-inspired marketplace for parent-kid craft classes with a robust admin-managed page builder system.

## Features

- **Dynamic Page Builder**: Admin-managed content system with schema-driven blocks
- **Class Marketplace**: Search, filter, and book craft classes
- **Instructor Onboarding**: Background checks and profile management
- **Payment Integration**: Stripe for secure payments and instructor payouts
- **Review System**: Authenticated reviews for classes and instructors
- **Responsive Design**: Mobile-first, accessible UI built with Tailwind CSS and shadcn/ui

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Authentication**: Session-based (ready for Clerk/Auth0 integration)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd crafty-kid
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Update `.env.local` with your database credentials and API keys.

4. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed the database with initial data
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (marketing)/       # Public marketing pages
│   ├── classes/           # Class search and listings
│   ├── dashboard/         # User dashboards
│   └── admin/            # Admin interface
├── components/
│   ├── blocks/           # Page builder blocks
│   └── ui/              # Reusable UI components
├── lib/
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # Business logic
│   └── utils/          # Helper functions
└── styles/             # Global styles
```

## Page Builder System

The admin-managed page builder allows non-technical users to:

- Create and edit pages without code
- Reorder content blocks via drag-and-drop
- Preview changes before publishing
- Schedule page publications
- Manage site-wide navigation and footer

### Available Blocks

- **HeroSearch**: Homepage hero with search functionality
- **FeaturedClasses**: Curated or auto-generated class listings
- **TeacherSpotlight**: Instructor highlights
- **TrustBadges**: Trust indicators and statistics
- **Testimonials**: Customer reviews
- **ContentSplit**: Image + content sections
- **FAQAccordion**: Frequently asked questions
- **BlogTeasers**: Recent blog posts
- **CTASection**: Call-to-action banners

## Database Schema

Key entities include:

- **User**: Parents, Instructors, and Admins
- **Class**: Class definitions with schedules
- **Booking**: Class reservations and payments
- **Review**: Ratings and feedback
- **Page**: Dynamic page content
- **InstructorProfile**: Instructor details and verification

## Development

### Database Management

```bash
# View database in Prisma Studio
npm run db:studio

# Create a new migration
npm run db:migrate

# Reset database (caution: deletes all data)
npx prisma migrate reset
```

### Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e
```

## Deployment

The application is optimized for deployment on:

- **Vercel**: For the Next.js frontend
- **Neon/Supabase**: For PostgreSQL database
- **Vercel Blob/S3**: For file storage

## Security Considerations

- All user inputs are validated with Zod schemas
- CSRF protection on all mutations
- Role-based access control (RBAC)
- Background checks for instructors
- PCI compliance via Stripe Checkout

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
