"use server"
import { hash } from "bcryptjs"

import { createUser, getUserByEmail } from "@/services/user"

import { RegisterSchema, RegisterType } from "@/types/register"

export const register = async (data: RegisterType) => {
  const parsedData = RegisterSchema.safeParse(data)

  if (!parsedData.success) {
    return { error: "Invalid fields" }
  }

  const {
    email,
    password,
    firstName,
    lastName,
    // address,
    // age,
    gender,
    healthCondition,
  } = parsedData.data

  const hashedPassword = await hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) return { error: "User already exists" }

  const user = await createUser({
    email,
    password: hashedPassword,
    name: `${firstName} ${lastName}`,
    // address,
    // age,
    gender,
    healthCondition,
  })

  /**
   * @todo Send email to user
   */

  return { success: "User created" }
}

// export const sigInWithGoogle = async () => await signIn("google");
