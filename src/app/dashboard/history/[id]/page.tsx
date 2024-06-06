import { Loader2 } from "lucide-react"
import DemoTemperatureSlider from "../../_components/demo-temperature-slider"
import RecommendationCard from "../../_components/recommendation-card"
import SkeletonRecommendationCard from "../../_components/skeleton-recommendation-card"
import { getRecommendationById } from "../../actions"
import { Suspense } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const History = async ({ params }: { params: { id: string } }) => {
  const history = await getRecommendationById(params.id)

  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "History", href: "/history" },
    { label: history?.id, href: `/history/${history?.id}` },
  ]

  if (!history) {
    return <Loader2 className="animate-spin stroke-primary" size={30} />
  }

  return (
    <div className="">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          {breadcrumbs.map((item, idx) => (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense
        fallback={<Loader2 className="animate-spin stroke-primary" size={30} />}
      >
        <DemoTemperatureSlider
          disabled
          currentTemperature={history?.temperature}
          date={history?.date}
        />
      </Suspense>
      <h3 className="mb-3 mt-5 font-bold text-secondary-foreground">
        Your recommendations
      </h3>
      <div className="">
        {history ? (
          <RecommendationCard recommendations={history?.recommendations!} />
        ) : (
          <SkeletonRecommendationCard />
        )}
      </div>
    </div>
  )
}

export default History
