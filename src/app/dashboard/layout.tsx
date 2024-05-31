"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()
  const router = useRouter()

  console.log(session)

  return <div>{children}</div>
}

export default LayoutPage
