"use client"
import {
  addRecommendation,
  findRecommendations,
  generateRecommendations
} from "../actions"
import { useCallback, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { ref, onValue, off } from "firebase/database"
import { getModel } from "@/utils/ai-data-model"
import { realtimeDb } from "@/lib/firebase"
import SkeletonRecommendationCard from "./skeleton-recommendation-card"
import RecommendationCard from "./recommendation-card"
import DemoTemperatureSlider from "./demo-temperature-slider"

export default function SampleUI({
  initialRecommendation,
  foundCondition,
  email
}: {
  initialRecommendation: any
  foundCondition: string
  email: string
}) {
  const [isPending, startTransition] = useTransition()
  const [newRecommendation, setNewRecommendation] = useState<any>()
  const [temperature, setTemperature] = useState<number>()
  const [prompt, setPrompt] = useState<string>()

  const handleGenerateRecommendations = useCallback(async () => {
    startTransition(async () => {
      if (temperature && foundCondition) {
        const recommendation = await findRecommendations(
          temperature,
          foundCondition
        )
        if (recommendation) {
          setNewRecommendation(recommendation)
          return
        }
        if (prompt) {
          const res = await generateRecommendations(prompt)
          if (res?.success) {
            const newRecommended = await addRecommendation({
              ...res.recommendation,
              healthCondition: foundCondition,
              temperature,
              email: email
            })
            setNewRecommendation(newRecommended)
            toast.success(res?.success)
          } else {
            toast.error(res?.error)
          }
        }
      }
    })
  }, [foundCondition, temperature, prompt, email])

  useEffect(() => {
    ;(async () => {
      const temperatureRef = ref(realtimeDb, "DHT11")
      onValue(temperatureRef, (snapshot) => {
        setNewRecommendation(null)
        const temperature = snapshot.val().Temperature
        setPrompt(
          `Generate health recommendations for an individual with ${foundCondition} based on a temperature of ${temperature}°C. Provide the recommendations in the following schema: ${getModel(foundCondition, temperature)}`
        )
        setTemperature(temperature)
      })
      await handleGenerateRecommendations()

      return () => {
        off(temperatureRef)
      }
    })()
  }, [foundCondition, handleGenerateRecommendations])

  return (
    <div className="">
      <DemoTemperatureSlider
        currentTemperature={newRecommendation?.temperature}
        date={newRecommendation?.date}
      />
      <h3 className="mb-3 mt-5 font-bold text-secondary-foreground">
        Your recommendations
      </h3>
      <div className="">
        {initialRecommendation && newRecommendation ? (
          <RecommendationCard
            recommendations={newRecommendation?.recommendations}
          />
        ) : (
          <SkeletonRecommendationCard />
        )}
      </div>
    </div>
  )
}
