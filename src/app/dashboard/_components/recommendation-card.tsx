import { Card, CardHeader } from "@/components/ui/card"
import { BulletRecommendation } from "@/types/recommendation"

interface RecommendationProps {
  recommendations: BulletRecommendation[]
}

const RecommendationCard = ({ recommendations }: RecommendationProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <ol className="list-outside list-decimal space-y-4 ps-5 text-primary">
          {recommendations &&
            recommendations.map(
              (item: { title: string; description: string }, idx: number) => (
                <li className="" key={idx}>
                  {/* <Circle
                    className="h-4 w-4 flex-shrink-0 text-primary"
                    stroke="#d62b71"
                  /> */}
                  <span className="font-medium">{item.title}</span>
                  <ul className="">
                    <li className="">
                      <span className="text-sm text-gray-500 dark:text-gray-400 lg:text-base">
                        {item.description}
                      </span>
                    </li>
                  </ul>
                </li>
              ),
            )}
        </ol>
      </CardHeader>
    </Card>
  )
}

export default RecommendationCard
