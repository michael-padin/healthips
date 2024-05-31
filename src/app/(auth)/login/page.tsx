import { Metadata } from "next"
import { LoginForm } from "./_components/login-form"
import Header from "@/app/dashboard/_components/header"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login - HealthTips",
  description: "Login to your account",
}

export default async function LoginPage() {
  return (
    <div className="flex h-screen flex-col items-center px-2 align-middle lg:px-0">
      <header className="mt-6 flex h-16 w-full shrink-0 justify-center px-4 text-center md:px-6">
        <Link
          href="#"
          className="mr-6 flex items-center gap-2"
          prefetch={false}
        >
          <h1 className="text-2xl font-bold text-[#d62b71]">HealthTips</h1>
        </Link>
      </header>
      <LoginForm />
    </div>
  )
}
