import { auth } from "@/auth"
import Header from "./_components/header"
import { History } from "./_components/history"
import { getRecommendationHistory } from "./actions"
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  const history = await getRecommendationHistory(session?.user?.email!)

  return (
    <div className="bg-muted">
      <Header />
      <main className="container p-4 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">{children}</div>
          <div className="lg:col-span-2">
            <History email={session?.user.email!} history={history} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
