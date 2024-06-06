"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { firestoreDb } from "@/lib/firebase"
import { Loader2Icon, Thermometer } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { timestampToDate } from "@/utils/timestamp-to-date"
import { Skeleton } from "@/components/ui/skeleton"

const getTemperatureColor = (temperature: number) => {
  if (temperature <= 0) {
    return "stroke-blue-500 text-blue-500 bg-blue-100"
  } else if (temperature <= 10) {
    return "stroke-blue-300  text-blue-300 bg-blue-100"
  } else if (temperature <= 20) {
    return "stroke-green-500 text-green-500 bg-green-100"
  } else if (temperature <= 30) {
    return "stroke-orange-500 text-orange-500 bg-orange-100"
  } else {
    return "stroke-red-500 text-red-500  bg-red-100"
  }
}

export const History = ({
  email,
  history,
}: {
  email: string
  history: any
}) => {
  const [newHistory, setNewHistory] = useState<any>()

  useEffect(() => {
    ;(async () => {
      const q = query(
        collection(firestoreDb, "recommendations"),
        where("email", "==", email),
        orderBy("date", "desc"),
      )

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const historyList = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
            date: timestampToDate(doc.data().date),
          }
        })

        setNewHistory(historyList)

        return () => unsubscribe()
      })
    })()
  }, [email])

  // useEffect(() => {
  //   const temperatureRef = ref(realtimeDb, "DHT11")
  //   onValue(temperatureRef, (_) => {
  //     getRecommendationHistory(email).then((history) => {
  //       setNewHistory(history)
  //     })
  //   })

  //   return () => {
  //     off(temperatureRef)
  //   }
  // }, [email])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Temperature Log</CardTitle>
        <CardDescription>
          Your room temperature history and recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-screen overflow-auto">
        <div className="space-y-4">
          {history &&
            newHistory?.length > 0 &&
            newHistory.map((item: any) => (
              <div
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg dark:bg-gray-800"
                key={item.id}
              >
                <div
                  className={`rounded-full ${getTemperatureColor(item.temperature)} p-2`}
                >
                  <Thermometer
                    className={`${getTemperatureColor(item.temperature)} stroke-2`}
                    size={15}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.temperature}°C</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.date}
                  </p>
                </div>
                <Link
                  href={`/dashboard/history/${item.id}`}
                  className={`${cn(buttonVariants({ variant: "default", size: "sm" }))}`}
                >
                  {/* <ExternalLink className="stroke-primary" size={20} /> */}
                  View
                </Link>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
