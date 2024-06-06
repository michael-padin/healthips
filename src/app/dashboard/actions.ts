"use server"

import { firestoreDb } from "@/lib/firebase"
import { Recommendation, RecommendationResponse } from "@/types/recommendation"
import { getModel } from "@/utils/ai-data-model"
import { timestampToDate } from "@/utils/timestamp-to-date"
// export const generateRecommendations = async (prompt: string) => {
//   try {
//     const response = await chatModel.invoke(prompt)
//     console.log(JSON.parse(response.content as string))
//   } catch (error) {
//     console.error("Error fetching recommendations:", error)
//   }
// }
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from "@google/generative-ai"
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from "firebase/firestore"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain"
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  }
]

export const generateRecommendations = async (prompt: string) => {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings
  })

  try {
    const result = await chatSession.sendMessage(prompt)
    const text = result.response.text()

    const cleanedString: string = text.replace(/```json\n?|```/g, "")
    return {
      recommendation: JSON.parse(cleanedString.trim()),
      success: "Updated"
    }
  } catch (error) {
    console.error("error at generateRecommendations", error)
    return { error: error as string }
  }
}

export const findRecommendations = async (
  temperature: number,
  condition: string
) => {
  console.log({
    temperature,
    condition
  })

  try {
    const q = query(
      collection(firestoreDb, "recommendations"),
      where("temperature", "==", temperature),
      where("healthCondition", "==", condition)
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const response = await addRecommendation({
      ...(querySnapshot.docs[0].data() as Recommendation)
    })
    return response
  } catch (error) {
    console.error("error at findRecommendations", error)
    console.log(error)
  }
}

/**
 * This function adds a new recommendation to the database
 * @param data
 */

export const addRecommendation = async (data: Recommendation) => {
  try {
    const docRef = await addDoc(collection(firestoreDb, "recommendations"), {
      ...data,
      date: serverTimestamp()
    })

    const docSnap = await getDoc(doc(firestoreDb, "recommendations", docRef.id))

    if (!docSnap.exists) {
      console.log("Document does not exist")
    }

    return { ...docSnap.data(), date: timestampToDate(docSnap.data()?.date) }
  } catch (error) {
    console.error("error at addRecommendation", error)
    console.log(error)
    return false
  }
}

export const getDummyRecommendation = async (
  email: string,
  foundCondition: string
) => {
  try {
    const temperature = 25
    const prompt = `Generate health recommendations for an individual with ${foundCondition} based on a temperature of room temperature ${temperature}°C and do not use shortened word. Provide the recommendations in the following schema: ${getModel(foundCondition, temperature)}`

    if (!email) {
      return null
    }

    const generated = await generateRecommendations(prompt)

    if (!generated) {
      return null
    }

    const docRef = await addDoc(collection(firestoreDb, "recommendations"), {
      ...generated.recommendation,
      email: email,
      temperature,
      healthCondition: foundCondition,
      date: serverTimestamp()
    })

    const docSnap = await getDoc(doc(firestoreDb, "recommendations", docRef.id))

    if (!docSnap.exists) {
      console.log("Document does not exist")
    }

    return { ...docSnap.data(), date: timestampToDate(docSnap.data()?.date) }
  } catch (error) {
    console.error("error at getDummyRecommendation", error)
    console.log(error)
  }
}

export const getRecentRecommendation = async (email: string) => {
  try {
    if (!email) {
      return null
    }

    const q = query(
      collection(firestoreDb, "recommendations"),
      where("email", "==", email),
      orderBy("date", "desc")
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const recommendation = {
      ...querySnapshot.docs[0].data(),
      date: timestampToDate(querySnapshot.docs[0].data().date),
      id: querySnapshot.docs[0].id
    }

    return { ...recommendation }
  } catch (error) {
    console.error("error at getCurrentTemperature", error)
    console.log(error)
  }
}

export const getRecommendationById = async (id: string) => {
  try {
    const q = doc(firestoreDb, "recommendations", id)

    const querySnapshot = await getDoc(q)

    if (!querySnapshot.exists()) {
      return null
    }

    const {
      recommendations,
      date,
      title,
      email,
      healthCondition,
      temperature
    } = querySnapshot.data()

    const recommendation = {
      id: querySnapshot.id,
      title,
      email,
      healthCondition,
      date: timestampToDate(date),
      recommendations,
      temperature
    }

    return { ...recommendation }
  } catch (error) {
    console.error("error at getRecommendationById", error)
    console.log(error)
  }
}

export const getRecommendationHistory = async (email: string) => {
  try {
    if (!email) {
      return null
    }

    const q = query(
      collection(firestoreDb, "recommendations"),
      where("email", "==", email)
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const history = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      date: timestampToDate(doc.data().date)
    }))

    return history
  } catch (error) {
    console.error("error at getRecommendationHistory", error)
    console.log(error)
  }
}
