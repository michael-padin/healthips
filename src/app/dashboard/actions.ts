"use server"

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
  HarmBlockThreshold,
} from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

export async function generateRecommendations(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
  })

  try {
    const result = await chatSession.sendMessage(prompt)
    const text = result.response.text()

    const cleanedString: string = text.replace(/```json\n?|```/g, "")
    return {
      recommendation: JSON.parse(cleanedString.trim()),
      success: "Updated",
    }
  } catch (error) {
    return { error: error as string }
  }
}
