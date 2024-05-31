import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import SessionProvider from "@/components/session-provider"
import { auth } from "@/auth"

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "HealthTips",
  description:
    "Generate health recommendations using AI tailored to user health conditions and room temperature.",
  openGraph: {
    title: "HealthTips",
    description:
      "Generate health recommendations using AI tailored to user health conditions and room temperature.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "HealthTips",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "HealthTips - Generate health recommendations using AI tailored to user health conditions and room temperature.",
      },
    ],
  },
  twitter: {
    title: "HealthTips",
    description:
      "Generate health recommendations using AI tailored to user health conditions and room temperature.",
    card: "summary_large_image",
    images: [
      {
        width: 1200,
        height: 630,
        url: "/twitter-image.png",
        alt: "HealthTips - Generate health recommendations using AI tailored to user health conditions and room temperature.",
      },
    ],
    site: "@HealthTips",
    creator: "@MichaelPadin",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
