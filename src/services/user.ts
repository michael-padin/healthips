// utils/getUserByEmail.js

import { firestore } from "@/lib/firestore"

export const getUserByEmail = async (email: string) => {
  try {
    const usersRef = firestore.collection("users")
    const userQuery = usersRef.where("email", "==", email).limit(1)
    const userSnapshot = await userQuery.get()

    if (userSnapshot.empty) {
      return null
    }

    const userDoc = userSnapshot.docs[0]
    const userData = userDoc.data()

    return {
      id: userDoc.id,
      email: userData.email,
      name: userData.name,
      password: userData.password,
      emailVerified: userData.emailVerified,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      profile: userData.profile,
      address: userData.address,
      role: userData.role,
      healthCondition: userData.healthCondition,
      // Include other user data properties as needed
    }
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

interface CreateUserType {
  email: string
  password: string
  name: string
  // address: string
  // role: string
  gender: string
  healthCondition: string
  emailVerified?: boolean
}

/**
 *
 * @param userData - Object containing user data
 * @returns - Promise that resolves to the created user object
 */
export const createUser = async (userData: CreateUserType) => {
  try {
    const usersRef = firestore.collection("users")
    const userDoc = await usersRef.add(userData)
    return {
      id: userDoc.id,
      email: userData.email,
      name: userData.name,
      password: userData.password,
      emailVerified: userData.emailVerified || false,
      role: "USER",
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}
