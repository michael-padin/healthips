import { Metadata } from "next"
import { SignUpForm } from "./_components/signup-form"
import Link from "next/link"
export const metadata: Metadata = {
  title: "Sign up  - Healthtips",
  description: "Login to your account",
}
export default function SignUpPage() {
  return (
    <div>
      <header className="p7-8 mt-6 flex h-16 w-full shrink-0 justify-center text-center md:px-6">
        <Link
          href="#"
          className="mr-6 flex items-center gap-2"
          prefetch={false}
        >
          <h1 className="text-2xl font-bold text-[#d62b71]">HealthTips</h1>
        </Link>
      </header>
      <SignUpForm />
    </div>
  )
}
