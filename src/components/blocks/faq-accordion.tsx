import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FAQAccordionBlock } from "@/lib/schemas/page-blocks"

export default function FAQAccordion({
  title = "Frequently Asked Questions",
  items,
}: FAQAccordionBlock) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="font-medium pr-4">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
