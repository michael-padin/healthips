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
    url: "https://healthtips.com",
    images: [
      {
        url: "https://healthtips.com/dashboard.png",
        width: 1200,
        height: 630,
        alt: "HealthTips",
      },
    ],
    siteName: "HealthTips",
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
