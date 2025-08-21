import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Award } from "lucide-react"

interface InstructorCardProps {
  instructor: {
    id: string
    bio: string | null
    crafts: string[]
    ratingAvg: number
    ratingCount: number
    verificationStatus: string
    user: {
      id: string
      name: string | null
      email: string
      address: string | null
    }
  }
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Instructor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instructor Info */}
        <div className="flex items-start gap-3">
          <div className="relative w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">
              {instructor.user.name?.[0] || instructor.user.email[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {instructor.user.name || 'Instructor'}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{instructor.ratingAvg.toFixed(1)}</span>
              <span>({instructor.ratingCount} reviews)</span>
            </div>
            {instructor.user.address && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{instructor.user.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Verification Badge */}
        {instructor.verificationStatus === 'CLEAR' && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded-lg">
            <Award className="h-4 w-4" />
            <span>Background Verified</span>
          </div>
        )}

        {/* Crafts */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Specializes in:</h4>
          <div className="flex flex-wrap gap-1">
            {instructor.crafts.map((craft) => (
              <Badge key={craft} variant="secondary" className="text-xs">
                {craft}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bio */}
        {instructor.bio && (
          <div>
            <p className="text-sm text-gray-700 line-clamp-3">
              {instructor.bio}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={`/instructor/${instructor.id}`}>
              View Full Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
