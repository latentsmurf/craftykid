"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
import { Calendar, Clock, Users, AlertCircle, Sparkles, CreditCard } from "lucide-react"
import Link from "next/link"

interface ClassSchedule {
  id: string
  startsAt: Date
  endsAt: Date
  seatsTotal: number
  seatsRemaining: number
}

interface ClassBookingSectionProps {
  classId: string
  schedules: ClassSchedule[]
  price: number
}

export function ClassBookingSection({ classId, schedules, price }: ClassBookingSectionProps) {
  const { user, isLoading } = useClerkAuth()
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null)
  const [isBooking, setIsBooking] = useState(false)

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

  const handleBooking = async () => {
    if (!selectedSchedule || !user) return
    
    setIsBooking(true)
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scheduleId: selectedSchedule,
          classId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create booking')
      }

      const booking = await response.json()
      window.location.href = `/booking/${booking.id}/payment`
      
    } catch (error) {
      console.error('Booking error:', error)
      alert('Failed to create booking. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  if (schedules.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              This class doesn't have any upcoming sessions scheduled.
            </p>
            <p className="text-sm text-muted-foreground">
              Check back later or contact us to request new dates.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-card to-purple-50/30 dark:to-purple-900/10">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>Book Your Session</span>
            </div>
            <motion.span 
              className="text-2xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              ${(price / 100).toFixed(0)}
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {/* Schedule Selection */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Choose a Date & Time</h4>
            {schedules.map((schedule) => {
              const isSelected = selectedSchedule === schedule.id
              const isFull = schedule.seatsRemaining === 0
              const isAlmostFull = schedule.seatsRemaining <= 2 && schedule.seatsRemaining > 0

              return (
                <motion.div
                  key={schedule.id}
                  className={`p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    isFull 
                      ? 'border-border bg-muted cursor-not-allowed'
                      : isSelected
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 shadow-lg'
                      : 'border-border hover:border-purple-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
                  }`}
                  onClick={() => !isFull && setSelectedSchedule(schedule.id)}
                  whileHover={!isFull ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isFull ? { scale: 0.98 } : {}}
                  layout
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">
                          {formatDate(schedule.startsAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {formatTime(schedule.startsAt)} - {formatTime(schedule.endsAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>
                          {schedule.seatsRemaining} of {schedule.seatsTotal} spots available
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {isFull && <Badge variant="destructive">Full</Badge>}
                      {isAlmostFull && !isFull && <Badge variant="outline">Almost Full</Badge>}
                      {isSelected && <Badge variant="default">Selected</Badge>}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Booking Button */}
          <motion.div 
            className="pt-6 border-t border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {!user ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Sign in to book this class
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/auth/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/auth/sign-up">Sign Up</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={handleBooking}
                  disabled={!selectedSchedule || isBooking}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  {isBooking ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Book Now - ${(price / 100).toFixed(0)}</span>
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Additional Info */}
            <div className="pt-4 text-xs text-muted-foreground space-y-1">
              <p>• Free cancellation up to 24 hours before class</p>
              <p>• All materials included (unless noted otherwise)</p>
              <p>• Parent participation required for children under 10</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
