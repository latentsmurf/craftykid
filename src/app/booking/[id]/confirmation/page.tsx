import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { PageBuilder } from "@/lib/page-builder/renderer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle,
  Calendar, 
  Clock, 
  MapPin, 
  User,
  Download,
  Share,
  Mail
} from "lucide-react"
import Link from "next/link"

interface ConfirmationPageProps {
  params: {
    id: string
  }
}

async function getBooking(bookingId: string, userId: string) {
  try {
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) return null

    const booking = await prisma.booking.findUnique({
      where: { 
        id: bookingId,
        parentId: user.id // Ensure user owns this booking
      },
      include: {
        schedule: {
          include: {
            class: {
              include: {
                instructor: {
                  include: {
                    user: true
                  }
                },
                venue: true,
                category: true
              }
            }
          }
        }
      }
    })

    return booking
  } catch (error) {
    console.error('Error fetching booking:', error)
    return null
  }
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/auth/sign-in')
  }

  const booking = await getBooking(params.id, userId)
  
  if (!booking) {
    notFound()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(date))
  }

  // For demo purposes, mark as paid if not already
  if (booking.status !== 'PAID') {
    await prisma.booking.update({
      where: { id: booking.id },
      data: { status: 'PAID' }
    })
  }

  return (
    <>
      <PageBuilder 
        blocks={[
          {
            type: "NavBar",
            props: { id: "navbar" }
          }
        ]}
      />

      <main className="min-h-screen bg-background py-8 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Your class has been successfully booked. We've sent you a confirmation email with all the details.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Class Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Your Class</span>
                    <Badge variant="default" className="bg-green-600">Confirmed</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {booking.schedule.class.title}
                    </h3>
                    <p className="text-gray-600">
                      {booking.schedule.class.category.name}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span>{formatDate(booking.schedule.startsAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <span>
                        {formatTime(booking.schedule.startsAt)} - {formatTime(booking.schedule.endsAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-600" />
                      <span>{booking.schedule.class.instructor.user.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span>{booking.schedule.class.venue.name}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">Venue Address</h4>
                    <p className="text-sm text-gray-600">
                      {booking.schedule.class.venue.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* What to Expect */}
              <Card>
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">What to Bring</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Just yourself and your creativity!</li>
                        <li>• Comfortable clothes that can get messy</li>
                        <li>• Closed-toe shoes recommended</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">We Provide</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• All materials and tools</li>
                        <li>• Aprons and protective equipment</li>
                        <li>• Light refreshments</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">Arrival Instructions</h4>
                    <p className="text-sm text-gray-600">
                      Please arrive 10 minutes before the start time to check in and get settled. 
                      Look for the Crafty Kid sign at the venue entrance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID</span>
                      <span className="font-mono">{booking.id.slice(-8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Paid</span>
                      <span className="font-semibold">${(booking.amountCents / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Date</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Confirmation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/dashboard/parent">
                      View All Bookings
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/classes">
                      Book Another Class
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/instructor/${booking.schedule.class.instructor.id}`}>
                      View Instructor Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-gray-600">
                    If you have any questions about your booking, please contact us:
                  </p>
                  <div className="space-y-1">
                    <p><strong>Email:</strong> support@craftykid.com</p>
                    <p><strong>Phone:</strong> (555) 123-4567</p>
                    <p><strong>Hours:</strong> Mon-Fri 9AM-6PM PST</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Check Your Email</h3>
                <p className="text-sm text-gray-600">
                  We've sent you a confirmation with all class details
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Add to Calendar</h3>
                <p className="text-sm text-gray-600">
                  Don't forget to add your class to your calendar
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Share className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Share the Fun</h3>
                <p className="text-sm text-gray-600">
                  Tell your friends about your upcoming creative adventure
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PageBuilder 
        blocks={[
          {
            type: "Footer",
            props: { id: "footer" }
          }
        ]}
      />
    </>
  )
}
