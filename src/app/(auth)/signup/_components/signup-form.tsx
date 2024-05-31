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
import { RegisterSchema, RegisterType } from "@/types/register"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { register } from "../action"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { HTCombobox } from "@/components/ht/ht-combobox"
import { uniqueHealthConditions } from "@/data/dummy-health-conditions"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function SignUpForm() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      healthCondition: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: RegisterType) => {
    console.log(data)

    startTransition(() => {
      register(data).then((res) => {
        if (res.success) {
          toast.success(res.success)
        } else {
          toast.error(res.error)
        }
      })
    })
  }

  return (
    <Form {...form}>
      <div className="flex items-center px-2 align-middle lg:px-0">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-sm"
        >
          <fieldset disabled={isPending}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <Label>First name</Label>
                            <FormControl>
                              <Input placeholder="Max" {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="Max" required /> */}
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <Label>Last name</Label>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Robinson"
                                required
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {/* <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <Label>Age</Label>
                            <FormControl>
                              <Input placeholder="21" {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}
                    <div className="col-span-2 grid gap-2">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <Label>Gender</Label>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="healthCondition"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Health condition</Label>
                          <FormControl>
                            <HTCombobox
                              listOptions={uniqueHealthConditions?.map(
                                (category) => ({
                                  label: category.label,
                                  value: category.value,
                                }),
                              )}
                              onChange={field.onChange}
                              placeholder="Select condition"
                              value={field.value}
                              showOtherValue
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="maxrobinson@example.com"
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="CEP2b8MLfQbpMNwYkMnxk6TDe8G"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Create an account"
                    )}
                  </Button>
                  {/* <Button variant="outline" className="w-full">
                    Sign up with Google
                  </Button> */}
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </fieldset>
        </form>
      </div>
    </Form>
  )
}
