"use server"
import { AuthError } from "next-auth"
import { z } from "zod"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/types/login"

export const signInWithCredentials = async (
  data: z.infer<typeof LoginSchema>,
) => {
  const validatetFields = LoginSchema.safeParse(data)

  if (!validatetFields.success) {
    return { error: "Invalid fields", success: null }
  }

  const { email, password } = validatetFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return { success: "Logged in", error: null }
  } catch (error) {
    // @TODO: handle error
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials", success: null }
        default:
          return { error: "Something went wrong", success: null }
      }
    }

    throw error
  }
}

// export const sigInWithGoogle = async () => await signIn("google");
