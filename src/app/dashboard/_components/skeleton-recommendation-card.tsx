import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonRecommendationCard = () => {
  return (
    <Card>
      <CardHeader>
        <ul className="w-full flex-1 space-y-4 text-lg">
          {Array.from({ length: 5 }).map((_, idx) => (
            <li className="flex w-full items-start" key={idx}>
              <Skeleton className="mr-2 h-7 w-4 rounded-full"></Skeleton>
              <div className="w-full space-y-2">
                <Skeleton className="h-5 w-32 rounded-md" />
                <div className="w-full space-y-2">
                  <Skeleton className="h-3 w-full rounded-md" />
                  <Skeleton className="h-3 w-full rounded-md" />
                  <Skeleton className="h-3 w-full rounded-md" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardHeader>
    </Card>
  )
}

export default SkeletonRecommendationCard
