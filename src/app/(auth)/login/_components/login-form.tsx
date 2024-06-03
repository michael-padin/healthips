"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { zodResolver } from "@hookform/resolvers/zod"
import React, { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { LoginSchema, LoginType } from "@/types/login"
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signInWithCredentials } from "../actions"

export function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginType) => {
    startTransition(() => {
      signInWithCredentials(data).then((res) => {
        if (res?.error) {
          toast.error(res?.error)
        }
      })
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto">
        <fieldset disabled={isPending}>
          <Card className="">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
                            {...field}
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid">
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        {/* <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link> */}
                      </div>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {isPending ? <Loader2 className="animate-spin" /> : "Log in"}
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </fieldset>
      </form>
    </Form>
  )
}
