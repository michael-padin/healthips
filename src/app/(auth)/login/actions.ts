"use server"
import { AuthError } from "next-auth"
import { z } from "zod"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/types/login"

export const signInWithCredentials = async (
  data: z.infer<typeof LoginSchema>,
) => {
  try {
    const validatedFields = LoginSchema.safeParse(data)

    if (!validatedFields.success) {
      return { error: "Invalid fields", success: "" }
    }

    const { email, password } = validatedFields.data

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return { success: "Logged in", error: "" }
  } catch (error) {
    // @TODO: handle error
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials", success: "" }
        default:
          return { error: "Something went wrong", success: "" }
      }
    }

    throw error
  }
}

// export const sigInWithGoogle = async () => await signIn("google");
