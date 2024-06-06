"use client"

import { useEffect, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardHeader } from "@/components/ui/card"
import { Thermometer } from "lucide-react"

import { ref, set } from "firebase/database"
import { realtimeDb } from "@/lib/firebase"

interface DemoTemperatureSliderProps {
  currentTemperature: number
  date: string
  disabled?: boolean
}

export default function DemoTemperatureSlider({
  disabled,
  currentTemperature,
  date
}: DemoTemperatureSliderProps) {
  const [temperature, setTemperature] = useState(20)
  const [newDate, setNewDate] = useState("")
  const getTemperatureColor = () => {
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
  const getTemperatureLabel = () => {
    if (temperature <= 0) {
      return "Freezing"
    } else if (temperature <= 10) {
      return "Cold"
    } else if (temperature <= 20) {
      return "Mild"
    } else if (temperature <= 30) {
      return "Warm"
    } else {
      return "Hot"
    }
  }

  useEffect(() => {
    if (currentTemperature) {
      setTemperature(currentTemperature)
    }
  }, [currentTemperature, date])

  useEffect(() => {
    if (date) {
      setNewDate(date)
    }
  }, [date])

  const handleUpdateTemperature = (value: number) => {
    set(ref(realtimeDb, "DHT11/"), {
      Temperature: value
    })
  }

  return (
    <Card className="background border-none shadow-none">
      <CardHeader>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex w-full">
            <div className="flex flex-col text-xs">
              <span className="font-bold">Current room temperature</span>
              <span>{newDate}</span>
            </div>
          </div>
          <div className="w-full">
            <div className="mb-4 flex items-center gap-3">
              <div
                className={`relative rounded-full ${getTemperatureColor()} p-4`}
              >
                <div className="absolute -right-2 -top-2 font-bold">
                  <span className="text-[10px]">{getTemperatureLabel()}</span>
                </div>
                <Thermometer
                  className={`${getTemperatureColor()} stroke-2`}
                  size={40}
                />
              </div>
              <span className={`text-5xl font-medium`}>
                {temperature}
                <sup>°C</sup>
              </span>
              {/* <div className={`rounded-full ${getTemperatureColor()}`}>
                {getTemperatureLabel()}
              </div> */}
            </div>
            <Slider
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
              min={-10}
              max={50}
              step={1}
              className={`w-full`}
              onValueCommit={(value) => handleUpdateTemperature(value[0])}
              disabled={disabled}
            />

            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span className="text-muted-foreground">-10°C</span>
              <span className="text-muted-foreground">20°C</span>
              <span className="text-muted-foreground">50°C</span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
