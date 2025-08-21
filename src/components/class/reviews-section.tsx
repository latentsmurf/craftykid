import { Star } from "lucide-react"

interface Review {
  id: string
  rating: number
  title: string
  body: string
  verified: boolean
  createdAt: Date
  parent: {
    name: string | null
  }
}

interface ReviewsSectionProps {
  reviews: Review[]
  averageRating: number
}

export function ReviewsSection({ reviews, averageRating }: ReviewsSectionProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  if (reviews.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No reviews yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Be the first to review this class!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
          <span className="text-gray-600">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {review.parent.name || 'Anonymous'}
                  </span>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-700 leading-relaxed">{review.body}</p>
          </div>
        ))}
      </div>

      {reviews.length >= 10 && (
        <div className="mt-6 text-center">
          <button className="text-purple-600 hover:text-purple-700 font-medium">
            View All Reviews
          </button>
        </div>
      )}
    </section>
  )
}
