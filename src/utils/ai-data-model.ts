import { RecommendationAiModel } from "@/types/recommendation"

/**
 *
 * @param condition - The health condition to generate recommendations for title
 * @returns The data for the health condition
 */
export const getModel = (healthCondition: string, temperature: number) => {
  const data: RecommendationAiModel = {
    title: `${healthCondition || "Asthma"} recommendation based on a room temperature of ${temperature}°C from dht11 sensor`,
    recommendations: [
      {
        title: "Maintain a Healthy Lifestyle",
        description:
          "A healthy lifestyle is crucial for managing heart disease. This includes eating a balanced diet, engaging in regular physical activity, and maintaining a healthy weight."
      },
      {
        title: "Take Medications as Prescribed", // You can add a specific title for each recommendation if desired.
        description:
          "Adhering to your doctor's medication regimen is vital. Make sure to take your medications as prescribed and do not skip doses" // Description of the recommendation.
      }
      // Add more recommendation objects here...
    ]
  }
  return JSON.stringify(data)
}
