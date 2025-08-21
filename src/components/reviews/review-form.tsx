"use client"

import { useState } from "react"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReviewFormProps {
  targetType: 'Class' | 'Instructor' | 'Venue'
  targetId: string
  targetName: string
  bookingId?: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function ReviewForm({ 
  targetType, 
  targetId, 
  targetName, 
  bookingId, 
  onSuccess, 
  onCancel 
}: ReviewFormProps) {
  const { user } = useClerkAuth()
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    body: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user || formData.rating === 0 || !formData.title.trim() || !formData.body.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetType,
          targetId,
          rating: formData.rating,
          title: formData.title.trim(),
          body: formData.body.trim(),
          ...(bookingId && { bookingId })
        })
      })

      if (response.ok) {
        setFormData({ rating: 0, title: "", body: "" })
        onSuccess?.()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to submit review')
      }
    } catch (error) {
      console.error('Review submission error:', error)
      alert('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600 mb-4">Sign in to write a review</p>
          <Button asChild>
            <a href="/auth/sign-in">Sign In</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <p className="text-sm text-gray-600">
          Share your experience with {targetName}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-base font-medium">Overall Rating *</Label>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-colors",
                      star <= (hoveredRating || formData.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {formData.rating > 0 && (
                  <>
                    {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Review Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Summarize your experience..."
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.title.length}/100 characters
            </p>
          </div>

          {/* Body */}
          <div>
            <Label htmlFor="body">Your Review *</Label>
            <Textarea
              id="body"
              value={formData.body}
              onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
              placeholder="Tell others about your experience. What did you like? What could be improved?"
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.body.length}/1000 characters
            </p>
          </div>

          {/* Guidelines */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Review Guidelines</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Be honest and constructive</li>
              <li>• Focus on your experience with the class or instructor</li>
              <li>• Avoid personal attacks or inappropriate language</li>
              <li>• Reviews are moderated and may be removed if they violate our guidelines</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={
                isSubmitting || 
                formData.rating === 0 || 
                !formData.title.trim() || 
                !formData.body.trim()
              }
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
