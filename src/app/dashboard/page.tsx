import { auth } from "@/auth"
import Header from "./_components/header"
import SampleUI from "./_components/sample-ui"
import { generateRecommendations } from "./actions"
import { redirect } from "next/navigation"
import { uniqueHealthConditions } from "@/data/dummy-health-conditions"
import { Metadata } from "next"

const data: any = {
  title: "",
  recommendations: [
    {
      title: "Maintain a Healthy Lifestyle",
      description:
        "A healthy lifestyle is crucial for managing heart disease. This includes eating a balanced diet, engaging in regular physical activity, and maintaining a healthy weight.",
    },
    {
      title: "Take Medications as Prescribed", // You can add a specific title for each recommendation if desired.
      description:
        "Adhering to your doctor's medication regimen is vital. Make sure to take your medications as prescribed and do not skip doses", // Description of the recommendation.
    },
    // Add more recommendation objects here...
  ],
}

export const metadata: Metadata = {
  title: "Health Recommendations",
  description:
    "Generate health recommendations based on a user's health condition and temperature",
}

interface HealthCondition {
  label: string
}

export default async function Dashboard() {
  const session = await auth()
  const healthCondition = session?.user.healthCondition
  const foundCondition = healthCondition
    ? uniqueHealthConditions.find(
        (condition) => condition.value === healthCondition,
      )
    : { label: "Asthma", value: "asthma" }

  const temperature = 36
  console.log({ data: JSON.stringify(data) })

  const prompt = `Generate health recommendations for an individual with ${foundCondition?.label || "Asthma"} based on a temperature of ${temperature}°C. Provide the recommendations in the following schema: ${JSON.stringify(data)}`
  const response = await generateRecommendations(prompt)

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <>
      <Header />
      <main>
        <SampleUI
          recommendation={response.recommendation}
          temperature={temperature}
          prompt={prompt}
        />
      </main>
    </>
  )
}
