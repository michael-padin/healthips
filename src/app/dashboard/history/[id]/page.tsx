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
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

//create function that would truncate the title to fit in the breadcrumb
const truncateTitle = (title: string) => {
  if (title.length > 20) {
    return `${title.slice(0, 20)}...`
  }
  return title
}

const History = async ({ params }: { params: { id: string } }) => {
  const history = await getRecommendationById(params.id)

  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "History", href: "/history" },
    { label: history?.title, href: `/history/${history?.id}` }
  ]

  return (
    <div className="">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          {breadcrumbs.map((item, idx) => (
            <>
              <BreadcrumbItem key={idx}>
                <BreadcrumbLink
                  href={item.label === "History" ? "#" : item.href}
                >
                  {idx === breadcrumbs.length - 1
                    ? truncateTitle(item.label)
                    : item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {idx !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
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
          date={history?.date!}
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
