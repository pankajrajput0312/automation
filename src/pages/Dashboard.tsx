import { Button } from "@/components/ui/button"
import { Calendar, List, Users, BarChart2, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Posts",
    value: "245",
    description: "Posts scheduled this month",
    icon: List,
  },
  {
    title: "Active Campaigns",
    value: "12",
    description: "Running campaigns",
    icon: BarChart2,
  },
  {
    title: "Team Members",
    value: "5",
    description: "Active members",
    icon: Users,
  },
] as const;

export function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Post
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <RecentActivity />
    </div>
  )
}

function RecentActivity() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Recent Activity</h2>
      <Card>
        <CardContent className="p-6 space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="flex-1">
                <h3 className="font-medium">New post scheduled</h3>
                <p className="text-sm text-muted-foreground">
                  "Product Update v2.0" scheduled for next week
                </p>
              </div>
              <span className="text-sm text-muted-foreground">2h ago</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
