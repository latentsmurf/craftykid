import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { PageBuilder } from "@/lib/page-builder/renderer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CreditCard,
  CheckCircle,
  AlertCircle 
} from "lucide-react"
import { StripePaymentForm } from "@/components/payment/stripe-payment-form"

interface PaymentPageProps {
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

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/auth/sign-in')
  }

  const booking = await getBooking(params.id, userId)
  
  if (!booking) {
    notFound()
  }

  // If already paid, redirect to confirmation
  if (booking.status === 'PAID') {
    redirect(`/booking/${booking.id}/confirmation`)
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Complete Your Booking</h1>
            <p className="text-muted-foreground mt-2">Review your class details and complete payment</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Class Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Class Details</span>
                    <Badge variant="outline">Reserved</Badge>
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
                    <p className="text-sm text-gray-600">
                      <strong>Venue Address:</strong><br />
                      {booking.schedule.class.venue.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Important Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Before You Pay</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900">All materials included</p>
                      <p className="text-blue-700">We provide all necessary supplies and tools for the class.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-green-900">Free cancellation</p>
                      <p className="text-green-700">Cancel up to 24 hours before class for a full refund.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-900">Parent participation required</p>
                      <p className="text-amber-700">Children under 10 must be accompanied by a participating adult.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Class fee</span>
                      <span>${(booking.amountCents / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing fee</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${(booking.amountCents / 100).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stripe Payment Form */}
                  <div className="pt-4">
                    <StripePaymentForm 
                      bookingId={booking.id}
                      amount={booking.amountCents}
                      onSuccess={() => {
                        window.location.href = `/booking/${booking.id}/confirmation`
                      }}
                      onError={(error) => {
                        console.error('Payment error:', error)
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Booking Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID</span>
                    <span className="font-mono">{booking.id.slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge variant="outline" className="text-xs">
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reserved</span>
                    <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
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
