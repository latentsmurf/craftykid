import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { ContentSplitBlock } from "@/lib/schemas/page-blocks"

export default function ContentSplit({
  image,
  imageAlt,
  imageSide = "left",
  title,
  content,
  cta,
}: ContentSplitBlock) {
  const imageComponent = (
    <div className="relative h-64 md:h-full min-h-[400px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
      />
    </div>
  )

  const contentComponent = (
    <div className="flex items-center p-8 md:p-12 lg:p-16">
      <div className="max-w-xl">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <div 
          className="prose prose-gray mb-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {cta && (
          <Button
            variant={cta.variant || "primary"}
            size="lg"
            asChild
          >
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {imageSide === "left" ? (
          <>
            {imageComponent}
            {contentComponent}
          </>
        ) : (
          <>
            {contentComponent}
            {imageComponent}
          </>
        )}
      </div>
    </section>
  )
}
