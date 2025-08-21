import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Phone, ExternalLink } from "lucide-react"

interface VenueInfoProps {
  venue: {
    id: string
    name: string
    address: string
    lat: number
    lng: number
    capacity: number
    contact: string | null
    photos: any
  }
}

export function VenueInfo({ venue }: VenueInfoProps) {
  const openInMaps = () => {
    const encodedAddress = encodeURIComponent(venue.address)
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Venue Name */}
        <div>
          <h3 className="font-semibold text-gray-900">{venue.name}</h3>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-gray-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">{venue.address}</p>
          </div>
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>Capacity: {venue.capacity} people</span>
        </div>

        {/* Contact */}
        {venue.contact && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{venue.contact}</span>
          </div>
        )}

        {/* Map Link */}
        <div className="pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={openInMaps}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Maps
          </Button>
        </div>

        {/* Venue Photo */}
        {venue.photos?.images?.[0] && (
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={venue.photos.images[0]}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
