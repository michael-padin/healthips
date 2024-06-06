import { Timestamp } from "firebase/firestore"

export interface BulletRecommendation {
  title: string
  description: string
}

export interface RecommendationAiModel {
  title: string
  recommendations: BulletRecommendation[]
}

export interface Recommendation extends RecommendationAiModel {
  temperature: number
  healthCondition: string
  email: string
}
export interface RecommendationResponse extends Recommendation {
  id: string
  date: string
  recommendation?: Recommendation
}
