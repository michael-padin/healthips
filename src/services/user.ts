// utils/getUserByEmail.js

import { firestoreDb } from "@/lib/firebase"
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore"

export const getUserByEmail = async (email: string) => {
  try {
    // const usersRef = firestoreDb.collection("users")
    // const userQuery = usersRef.where("email", "==", email).limit(1)
    // const userSnapshot = await userQuery.get()

    const q = query(
      collection(firestoreDb, "users"),
      where("email", "==", email),
      limit(1),
    )

    const userSnapshot = await getDocs(q)

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
    const userRef = await addDoc(collection(firestoreDb, "users"), {
      ...userData,
    })

    if (!userRef.id) {
      return null
    }

    return {
      id: userRef.id,
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
