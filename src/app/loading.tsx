import { Loader2Icon } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center text-primary">
      <Loader2Icon className="animate-spin" size={30} />
    </div>
  )
}
