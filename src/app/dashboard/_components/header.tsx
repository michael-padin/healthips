"use client"
/* eslint-disable @next/next/no-img-element */
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Gdg9cI55JHn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ClockIcon,
  LogOutIcon,
  MountainIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()
  return (
    <div className="flex flex-col">
      <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6">
        <Link
          href="#"
          className="mr-6 flex items-center gap-2"
          prefetch={false}
        >
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold text-[#d62b71]">
            HealthTips
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>JP</AvatarFallback>
                <span className="sr-only">Toggle user menu</span>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClockIcon className="mr-2 h-4 w-4" />
                History
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  signOut({ redirect: true, callbackUrl: "/login" })
                }
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  )
}
