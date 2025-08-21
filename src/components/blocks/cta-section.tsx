import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { CTASectionBlock } from "@/lib/schemas/page-blocks"
import { cn } from "@/lib/utils"

export default function CTASection({
  title,
  body,
  bgColor = "primary",
  primary,
  secondary,
}: CTASectionBlock) {
  const bgClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    muted: "bg-muted text-muted-foreground",
  }

  return (
    <section className={cn("py-16", bgClasses[bgColor])}>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          
          {body && (
            <p className="text-lg mb-8 opacity-90">{body}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant={bgColor === "primary" ? "secondary" : "default"}
              asChild
            >
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
            
            {secondary && (
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  bgColor === "primary" && "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                )}
                asChild
              >
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
