import { auth } from "@/auth"
import { redirect } from "next/navigation"

const HomePage = async () => {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  redirect("/dashboard")
}

export default HomePage
