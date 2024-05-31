"use client"
import { Button } from "@/components/ui/button"
import { Circle, Loader2 } from "lucide-react"
import { generateRecommendations } from "../actions"
import { use, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"

export default function SampleUI({
  recommendation,
  temperature,
  prompt,
}: {
  recommendation: any
  temperature: number
  prompt: string
}) {
  const [isPending, startTransition] = useTransition()
  const [newRecommendation, setNewRecommendation] = useState<any>()

  useEffect(() => {
    if (recommendation) {
      setNewRecommendation(recommendation)
    }
  }, [recommendation])

  const onSubmit = async () => {
    startTransition(() => {
      generateRecommendations(prompt).then((res) => {
        generateRecommendations
        if (res?.success) {
          toast.success(res?.success)
          setNewRecommendation(res.recommendation)
        } else {
          toast.error(res?.error)
        }
      })
    })
  }

  return (
    <div className="bg-gray-100 py-12 dark:bg-gray-800 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Your Health Tips
            </h1>
            <div className="">
              <p className="text-lg text-gray-500">Current temperature</p>
              <h1 className="align-middle text-4xl font-black text-[#39847f]">
                {temperature}°C
              </h1>
            </div>
            <Button type="submit" size="lg" onClick={onSubmit}>
              {isPending ? <Loader2 className="animate-spin" /> : "Refresh"}
            </Button>
          </div>
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-900 md:p-8">
              <h2 className="mb-4 text-2xl font-bold">
                {newRecommendation?.title}
              </h2>
              <ul className="space-y-4 text-lg">
                {newRecommendation?.recommendations.map(
                  (
                    item: { title: string; description: string },
                    idx: number,
                  ) => (
                    <li className="flex items-start" key={idx}>
                      <Circle
                        className="mr-4 h-6 w-6 text-primary"
                        stroke="#d62b71"
                      />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
