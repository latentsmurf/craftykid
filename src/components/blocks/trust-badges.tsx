import { Shield, Star, Users, Award, CheckCircle, Heart } from "lucide-react"
import type { TrustBadgesBlock } from "@/lib/schemas/page-blocks"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  star: Star,
  users: Users,
  award: Award,
  check: CheckCircle,
  heart: Heart,
}

export default function TrustBadges({
  items,
  layout = "horizontal",
}: TrustBadgesBlock) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={
          layout === "grid" 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
            : "flex flex-wrap justify-center items-center gap-8 md:gap-12"
        }>
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || Shield
            
            return (
              <div 
                key={index} 
                className={`
                  ${layout === "grid" ? "text-center" : "flex items-center gap-3"}
                  group
                `}
              >
                <div className={`
                  ${layout === "grid" ? "mx-auto mb-3" : ""}
                  bg-white rounded-full p-3 shadow-sm group-hover:shadow-md transition-shadow
                `}>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className={layout === "grid" ? "" : "text-left"}>
                  {item.value && (
                    <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                  )}
                  <p className={`
                    ${item.value ? "text-sm" : "text-base font-medium"} 
                    text-gray-600
                  `}>
                    {item.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
