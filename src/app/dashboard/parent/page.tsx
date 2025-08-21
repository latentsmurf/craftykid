"use client"

import { useEffect, useState } from "react"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
import { PageBuilder } from "@/lib/page-builder/renderer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User,
  Star,
  Download,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Eye
} from "lucide-react"
import Link from "next/link"
import { ReviewForm } from "@/components/reviews/review-form"

interface Booking {
  id: string
  status: string
  amountCents: number
  createdAt: string
  class: {
    id: string
    title: string
    instructor: string
    venue: string
    images?: { gallery?: string[] }
  }
  schedule: {
    startsAt: string
    endsAt: string
  }
}

export default function ParentDashboardPage() {
  const { user, isLoading } = useClerkAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState("upcoming")
  const [showReviewForm, setShowReviewForm] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchBookings()
    }
  }, [user])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PAID: { variant: "default" as const, label: "Confirmed", icon: CheckCircle },
      RESERVED: { variant: "secondary" as const, label: "Reserved", icon: Clock },
      CANCELLED: { variant: "destructive" as const, label: "Cancelled", icon: XCircle },
      REFUNDED: { variant: "outline" as const, label: "Refunded", icon: AlertCircle },
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.RESERVED
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date()
  }

  const isPast = (dateString: string) => {
    return new Date(dateString) < new Date()
  }

  const upcomingBookings = bookings.filter(booking => 
    isUpcoming(booking.schedule.startsAt) && booking.status === 'PAID'
  )
  
  const pastBookings = bookings.filter(booking => 
    isPast(booking.schedule.startsAt) && booking.status === 'PAID'
  )
  
  const pendingBookings = bookings.filter(booking => 
    booking.status === 'RESERVED'
  )

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
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
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Bookings</h1>
              <p className="text-muted-foreground mt-1">Manage your class bookings and reviews</p>
            </div>
            <Button asChild>
              <Link href="/classes">
                <Plus className="h-4 w-4 mr-2" />
                Book New Class
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming Classes</p>
                    <p className="text-3xl font-bold text-foreground">{upcomingBookings.length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Classes Completed</p>
                    <p className="text-3xl font-bold text-foreground">{pastBookings.length}</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Payment</p>
                    <p className="text-3xl font-bold text-foreground">{pendingBookings.length}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past ({pastBookings.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingBookings.length})
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Bookings */}
            <TabsContent value="upcoming" className="mt-6">
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4 flex-1">
                            {/* Class Image */}
                            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              {booking.class.images?.gallery?.[0] ? (
                                <img
                                  src={booking.class.images.gallery[0]}
                                  alt={booking.class.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <Calendar className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>

                            {/* Class Details */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                                              <h3 className="font-semibold text-foreground text-lg">
                                {booking.class.title}
                              </h3>
                                {getStatusBadge(booking.status)}
                              </div>
                              
                              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  <span>{booking.class.instructor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{booking.class.venue}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(booking.schedule.startsAt)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    {formatTime(booking.schedule.startsAt)} - {formatTime(booking.schedule.endsAt)}
                                  </span>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={`/class/${booking.class.id}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Class
                                  </Link>
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-1" />
                                  Ticket
                                </Button>
                                <Button size="sm" variant="outline">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  Contact
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming classes</h3>
                    <p className="text-gray-600 mb-6">
                      Discover amazing craft classes and book your next creative adventure!
                    </p>
                    <Button asChild>
                      <Link href="/classes">Browse Classes</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Past Bookings */}
            <TabsContent value="past" className="mt-6">
              {pastBookings.length > 0 ? (
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4 flex-1">
                            {/* Class Image */}
                            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              {booking.class.images?.gallery?.[0] ? (
                                <img
                                  src={booking.class.images.gallery[0]}
                                  alt={booking.class.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <Calendar className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>

                            {/* Class Details */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                                              <h3 className="font-semibold text-foreground text-lg">
                                {booking.class.title}
                              </h3>
                                {getStatusBadge(booking.status)}
                              </div>
                              
                              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  <span>{booking.class.instructor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(booking.schedule.startsAt)}</span>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={`/class/${booking.class.id}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Class
                                  </Link>
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setShowReviewForm(booking.id)}
                                >
                                  <Star className="h-4 w-4 mr-1" />
                                  Write Review
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-1" />
                                  Receipt
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Review Form */}
                        {showReviewForm === booking.id && (
                          <div className="mt-6 pt-6 border-t">
                            <ReviewForm
                              targetType="Class"
                              targetId={booking.class.id}
                              targetName={booking.class.title}
                              bookingId={booking.id}
                              onSuccess={() => {
                                setShowReviewForm(null)
                                // Optionally show success message
                              }}
                              onCancel={() => setShowReviewForm(null)}
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No completed classes yet</h3>
                    <p className="text-gray-600">
                      Your completed classes will appear here after you attend them.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Pending Bookings */}
            <TabsContent value="pending" className="mt-6">
              {pendingBookings.length > 0 ? (
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <Card key={booking.id} className="border-yellow-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4 flex-1">
                            {/* Class Image */}
                            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              {booking.class.images?.gallery?.[0] ? (
                                <img
                                  src={booking.class.images.gallery[0]}
                                  alt={booking.class.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <Calendar className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>

                            {/* Class Details */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                                              <h3 className="font-semibold text-foreground text-lg">
                                {booking.class.title}
                              </h3>
                                {getStatusBadge(booking.status)}
                              </div>
                              
                              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  <span>{booking.class.instructor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(booking.schedule.startsAt)}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg mb-4">
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                                <span className="text-sm text-yellow-800">
                                  Payment required to confirm your spot
                                </span>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button size="sm" asChild>
                                  <Link href={`/booking/${booking.id}/payment`}>
                                    Complete Payment
                                  </Link>
                                </Button>
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={`/class/${booking.class.id}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Class
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending payments</h3>
                    <p className="text-gray-600">
                      All your bookings are up to date!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
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