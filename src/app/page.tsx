"use client"
import { auth } from "@/auth"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const HomePage = () => {
  const user = useSession()
  const router = useRouter()
  useEffect(() => {
    if (user) router.push("/dashboard")
    else router.push("/login")
  }, [])
  return null
}

export default HomePage
