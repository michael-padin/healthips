import { auth } from "@/auth"
import Header from "./_components/header"
import SampleUI from "./_components/sample-ui"
import {
  findRecommendations,
  generateRecommendations,
  getDummyRecommendation,
  getRecentRecommendation,
  getRecommendationHistory,
} from "./actions"
import { redirect } from "next/navigation"
import { uniqueHealthConditions } from "@/data/dummy-health-conditions"
import { Metadata } from "next"

import ogImage from "../opengraph-image.png"
import { onValue, ref } from "firebase/database"
import { History } from "./_components/history"
import { Suspense } from "react"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: "Health Recommendations",
  description:
    "Generate health recommendations based on a user's health condition and temperature",

  openGraph: {
    title: "HealthTips",
    description:
      "Generate health recommendations using AI tailored to user health conditions and room temperature.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "HealthTips",
    type: "website",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: "HealthTips",
      },
    ],
  },

  twitter: {
    title: "HealthTips",
    description:
      "Generate health recommendations using AI tailored to user health conditions and room temperature.",
    card: "summary_large_image",
    site: "@HealthTips",
    creator: "@MichaelPadin",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: "HealthTips",
      },
    ],
  },
}

/**
 *
 * @param healthCondition - The health condition to find in the database or dummy data
 * @returns  object of { label, value } for the health condition
 */
const getCondition = (healthCondition: string) => {
  return healthCondition
    ? uniqueHealthConditions.find(
        (condition) => condition.value === healthCondition,
      )
    : { label: "Asthma", value: "asthma" }
}

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }
  const { healthCondition } = session.user
  const foundCondition = getCondition(healthCondition || "Asthma")

  const [recentRecommendation] = await Promise.all([
    await getRecentRecommendation(session.user.email!),
  ])

  const dummyRecommendation =
    !recentRecommendation &&
    (await getDummyRecommendation(session.user.email!, foundCondition?.label!))

  return (
    <>
      {recentRecommendation ? (
        <SampleUI
          initialRecommendation={recentRecommendation}
          foundCondition={foundCondition!.label}
          email={session.user.email!}
        />
      ) : (
        <SampleUI
          initialRecommendation={dummyRecommendation}
          foundCondition={foundCondition!.label}
          email={session.user.email!}
        />
      )}
    </>
  )
}
