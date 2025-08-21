import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "@/styles/globals.css"
import { Providers } from "@/components/providers"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileBottomNav } from "@/components/ui/mobile-bottom-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Crafty Kid — Where creativity meets community",
    template: "%s | Crafty Kid",
  },
  description: "Discover local parent-and-kid craft classes. Connect with talented artisan instructors in your community.",
  keywords: ["craft classes", "kids activities", "parent child classes", "art classes", "creative activities"],
  authors: [{ name: "Crafty Kid" }],
  creator: "Crafty Kid",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://craftykid.com",
    siteName: "Crafty Kid",
    title: "Crafty Kid — Where creativity meets community",
    description: "Discover local parent-and-kid craft classes. Connect with talented artisan instructors in your community.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crafty Kid — Where creativity meets community",
    description: "Discover local parent-and-kid craft classes",
    creator: "@craftykid",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange={false}
          >
            <Providers>
              <div className="relative flex min-h-screen flex-col pb-16 lg:pb-0">
                {children}
                <MobileBottomNav />
              </div>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
