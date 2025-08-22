import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding homepage...')

  // First, check if admin user exists
  let adminUser = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  })

  if (!adminUser) {
    // Create a default admin user
    adminUser = await prisma.user.create({
      data: {
        email: 'admin@craftykid.com',
        name: 'Admin',
        role: 'ADMIN',
        clerkId: 'system_admin',
      }
    })
    console.log('Created admin user')
  }

  // Check if homepage already exists
  const existingHome = await prisma.page.findUnique({
    where: { slug: 'home' }
  })

  if (existingHome) {
    console.log('Homepage already exists, updating...')
    await prisma.page.update({
      where: { slug: 'home' },
      data: {
        title: 'Home',
        seo: {
          title: 'Crafty Kid - Where creativity meets community',
          description: 'Discover local parent-and-kid craft classes. Connect with talented artisan instructors in your community.',
          keywords: ['craft classes', 'kids activities', 'parent child classes', 'art classes'],
        },
        blocks: [
          {
            id: 'hero-1',
            type: 'HeroSearch',
            props: {
              title: 'Where creativity meets community',
              subtitle: 'Find the perfect craft class for you and your little one. Connect with talented local artisans who love teaching.',
              backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
            }
          },
          {
            id: 'featured-1',
            type: 'FeaturedClasses',
            props: {
              title: 'Popular Classes This Week',
              subtitle: 'Hand-picked experiences for every interest',
              classes: []
            }
          },
          {
            id: 'teachers-1',
            type: 'TeacherSpotlight',
            props: {
              title: 'Meet Our Amazing Instructors',
              subtitle: 'Passionate artisans dedicated to nurturing creativity',
              autoRotate: true,
              teachers: []
            }
          },
          {
            id: 'trust-1',
            type: 'TrustBadges',
            props: {
              badges: [
                {
                  icon: 'shield',
                  title: 'Background Checked',
                  description: 'All instructors verified'
                },
                {
                  icon: 'star',
                  title: '5-Star Reviews',
                  description: 'Trusted by 10,000+ families'
                },
                {
                  icon: 'clock',
                  title: 'Flexible Booking',
                  description: 'Cancel up to 24h before'
                },
                {
                  icon: 'heart',
                  title: 'Satisfaction Guaranteed',
                  description: 'Love it or your money back'
                }
              ]
            }
          },
          {
            id: 'testimonials-1',
            type: 'Testimonials',
            props: {
              title: 'What Parents Are Saying',
              subtitle: 'Real stories from our community',
              testimonials: [
                {
                  id: '1',
                  name: 'Sarah M.',
                  location: 'Montecito, CA',
                  rating: 5,
                  text: 'My daughter absolutely loves the pottery classes! The instructor is patient and encouraging. We\'ve made so many beautiful pieces together.',
                  classTitle: 'Parent & Child Pottery'
                },
                {
                  id: '2',
                  name: 'Michael L.',
                  location: 'Santa Barbara, CA',
                  rating: 5,
                  text: 'The watercolor workshop was perfect for my 6-year-old. The small class size meant lots of individual attention. Highly recommend!',
                  classTitle: 'Watercolor for Beginners'
                },
                {
                  id: '3',
                  name: 'Emma W.',
                  location: 'Goleta, CA',
                  rating: 5,
                  text: 'We\'ve tried several classes and each one has been fantastic. The instructors really know how to engage with kids while teaching real skills.',
                  classTitle: 'Mixed Media Art'
                }
              ]
            }
          },
          {
            id: 'cta-1',
            type: 'CTASection',
            props: {
              title: 'Ready to Create Something Amazing?',
              subtitle: 'Join thousands of families discovering the joy of creating together',
              primaryButton: {
                text: 'Find Classes Near You',
                link: '/classes'
              },
              secondaryButton: {
                text: 'Become an Instructor',
                link: '/for-creators'
              },
              backgroundImage: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1600&q=80'
            }
          }
        ],
        status: 'published',
        authorId: adminUser.id,
      }
    })
  } else {
    await prisma.page.create({
      data: {
        title: 'Home',
        slug: 'home',
        seo: {
          title: 'Crafty Kid - Where creativity meets community',
          description: 'Discover local parent-and-kid craft classes. Connect with talented artisan instructors in your community.',
          keywords: ['craft classes', 'kids activities', 'parent child classes', 'art classes'],
        },
        blocks: [
          {
            id: 'hero-1',
            type: 'HeroSearch',
            props: {
              title: 'Where creativity meets community',
              subtitle: 'Find the perfect craft class for you and your little one. Connect with talented local artisans who love teaching.',
              backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
            }
          },
          {
            id: 'featured-1',
            type: 'FeaturedClasses',
            props: {
              title: 'Popular Classes This Week',
              subtitle: 'Hand-picked experiences for every interest',
              classes: []
            }
          },
          {
            id: 'teachers-1',
            type: 'TeacherSpotlight',
            props: {
              title: 'Meet Our Amazing Instructors',
              subtitle: 'Passionate artisans dedicated to nurturing creativity',
              autoRotate: true,
              teachers: []
            }
          },
          {
            id: 'trust-1',
            type: 'TrustBadges',
            props: {
              badges: [
                {
                  icon: 'shield',
                  title: 'Background Checked',
                  description: 'All instructors verified'
                },
                {
                  icon: 'star',
                  title: '5-Star Reviews',
                  description: 'Trusted by 10,000+ families'
                },
                {
                  icon: 'clock',
                  title: 'Flexible Booking',
                  description: 'Cancel up to 24h before'
                },
                {
                  icon: 'heart',
                  title: 'Satisfaction Guaranteed',
                  description: 'Love it or your money back'
                }
              ]
            }
          },
          {
            id: 'testimonials-1',
            type: 'Testimonials',
            props: {
              title: 'What Parents Are Saying',
              subtitle: 'Real stories from our community',
              testimonials: [
                {
                  id: '1',
                  name: 'Sarah M.',
                  location: 'Montecito, CA',
                  rating: 5,
                  text: 'My daughter absolutely loves the pottery classes! The instructor is patient and encouraging. We\'ve made so many beautiful pieces together.',
                  classTitle: 'Parent & Child Pottery'
                },
                {
                  id: '2',
                  name: 'Michael L.',
                  location: 'Santa Barbara, CA',
                  rating: 5,
                  text: 'The watercolor workshop was perfect for my 6-year-old. The small class size meant lots of individual attention. Highly recommend!',
                  classTitle: 'Watercolor for Beginners'
                },
                {
                  id: '3',
                  name: 'Emma W.',
                  location: 'Goleta, CA',
                  rating: 5,
                  text: 'We\'ve tried several classes and each one has been fantastic. The instructors really know how to engage with kids while teaching real skills.',
                  classTitle: 'Mixed Media Art'
                }
              ]
            }
          },
          {
            id: 'cta-1',
            type: 'CTASection',
            props: {
              title: 'Ready to Create Something Amazing?',
              subtitle: 'Join thousands of families discovering the joy of creating together',
              primaryButton: {
                text: 'Find Classes Near You',
                link: '/classes'
              },
              secondaryButton: {
                text: 'Become an Instructor',
                link: '/for-creators'
              },
              backgroundImage: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1600&q=80'
            }
          }
        ],
        status: 'published',
        authorId: adminUser.id,
      }
    })
    console.log('Created homepage')
  }

  // Also create site settings if they don't exist
  const siteSettings = await prisma.page.findUnique({
    where: { slug: '_site_settings' }
  })

  if (!siteSettings) {
    await prisma.page.create({
      data: {
        title: 'Site Settings',
        slug: '_site_settings',
        seo: {
          title: 'Site Settings',
          description: 'Global site configuration',
        },
        blocks: [
          {
            id: 'navbar',
            type: 'NavBar',
            props: {
              logo: '/logo.png',
              links: [
                { label: 'Find Classes', href: '/classes', highlight: false },
                { label: 'Search', href: '/search', highlight: false },
                { label: 'How It Works', href: '/how-it-works', highlight: false },
                { label: 'For Creators', href: '/for-creators', highlight: true },
                { label: 'About', href: '/about', highlight: false }
              ]
            }
          },
          {
            id: 'footer',
            type: 'Footer',
            props: {
              columns: [
                {
                  title: 'For Parents',
                  links: [
                    { label: 'Find Classes', href: '/classes' },
                    { label: 'How It Works', href: '/how-it-works' },
                    { label: 'Gift Cards', href: '/gift-cards' },
                    { label: 'FAQ', href: '/faq' }
                  ]
                },
                {
                  title: 'For Creators',
                  links: [
                    { label: 'Become an Instructor', href: '/for-creators' },
                    { label: 'Instructor Resources', href: '/instructor-resources' },
                    { label: 'Success Stories', href: '/success-stories' },
                    { label: 'Instructor FAQ', href: '/instructor-faq' }
                  ]
                },
                {
                  title: 'Company',
                  links: [
                    { label: 'About Us', href: '/about' },
                    { label: 'Blog', href: '/blog' },
                    { label: 'Careers', href: '/careers' },
                    { label: 'Contact', href: '/contact' }
                  ]
                },
                {
                  title: 'Support',
                  links: [
                    { label: 'Help Center', href: '/help' },
                    { label: 'Safety', href: '/safety' },
                    { label: 'Terms of Service', href: '/terms' },
                    { label: 'Privacy Policy', href: '/privacy' }
                  ]
                }
              ],
              socialLinks: [
                { platform: 'facebook', url: 'https://facebook.com/craftykid' },
                { platform: 'instagram', url: 'https://instagram.com/craftykid' },
                { platform: 'twitter', url: 'https://twitter.com/craftykid' },
                { platform: 'youtube', url: 'https://youtube.com/craftykid' }
              ],
              copyright: '© 2024 Crafty Kid. All rights reserved.'
            }
          }
        ],
        status: 'published',
        authorId: adminUser.id,
      }
    })
    console.log('Created site settings')
  }

  console.log('Homepage seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding homepage:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
