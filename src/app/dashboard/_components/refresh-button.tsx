"use client"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

interface RefreshButtonProps {
  handleGenerateRecommendations: () => void
  isPending: boolean
}

const RefreshButton = ({
  handleGenerateRecommendations,
  isPending,
}: RefreshButtonProps) => (
  <Button size="icon" onClick={() => handleGenerateRecommendations()}>
    <RefreshCcw className={`${isPending ? "animate-spin" : "animate-none"}`} />
  </Button>
)

export default RefreshButton
