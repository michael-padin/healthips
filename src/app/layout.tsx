import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import SessionProvider from "@/components/session-provider"
import { auth } from "@/auth"

import ogImage from "../../public/opengraph-image.jpg"

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
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  twitter: {
    title: "HealthTips",
    description:
      "Generate health recommendations using AI tailored to user health conditions and room temperature.",
    card: "summary_large_image",
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
