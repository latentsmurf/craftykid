"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"

// Mock data for charts
const pageViewsData = [
  { date: "Jan 1", views: 4231, users: 1843 },
  { date: "Jan 7", views: 5123, users: 2156 },
  { date: "Jan 14", views: 4756, users: 1998 },
  { date: "Jan 21", views: 6234, users: 2543 },
  { date: "Jan 28", views: 5876, users: 2387 },
  { date: "Feb 4", views: 6543, users: 2765 },
  { date: "Feb 11", views: 7234, users: 3012 },
]

const topPagesData = [
  { page: "Home", views: 15234, percentage: 25.4 },
  { page: "Find Classes", views: 8932, percentage: 14.9 },
  { page: "Instructor Profile", views: 7654, percentage: 12.8 },
  { page: "Class Details", views: 6543, percentage: 10.9 },
  { page: "About Us", views: 4521, percentage: 7.5 },
]

const deviceData = [
  { device: "Desktop", value: 45, color: "#8B5CF6" },
  { device: "Mobile", value: 38, color: "#EC4899" },
  { device: "Tablet", value: 17, color: "#F59E0B" },
]

const trafficSourcesData = [
  { source: "Organic Search", visits: 8543, percentage: 35.2 },
  { source: "Direct", visits: 5432, percentage: 22.4 },
  { source: "Social Media", visits: 4321, percentage: 17.8 },
  { source: "Referral", visits: 3210, percentage: 13.2 },
  { source: "Email", visits: 2765, percentage: 11.4 },
]

const userEngagementData = [
  { metric: "Avg. Session Duration", value: "3:24", change: 12.5, trend: "up" },
  { metric: "Bounce Rate", value: "42.3%", change: -5.2, trend: "down" },
  { metric: "Pages per Session", value: "4.7", change: 8.1, trend: "up" },
  { metric: "Conversion Rate", value: "3.2%", change: 15.3, trend: "up" },
]

const revenueData = [
  { month: "Jan", revenue: 18543, bookings: 142 },
  { month: "Feb", revenue: 22456, bookings: 178 },
  { month: "Mar", revenue: 25678, bookings: 203 },
  { month: "Apr", revenue: 28901, bookings: 225 },
  { month: "May", revenue: 31234, bookings: 248 },
  { month: "Jun", revenue: 29876, bookings: 232 },
]

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState("last30days")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your platform's performance and user behavior
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Page Views</p>
                <p className="text-2xl font-bold">52,831</p>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+15.7%</span>
                  <span className="text-muted-foreground ml-1">vs last period</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Unique Visitors</p>
                <p className="text-2xl font-bold">18,492</p>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+12.3%</span>
                  <span className="text-muted-foreground ml-1">vs last period</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                <p className="text-2xl font-bold">3:24</p>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+8.5%</span>
                  <span className="text-muted-foreground ml-1">vs last period</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">3.2%</p>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+15.3%</span>
                  <span className="text-muted-foreground ml-1">vs last period</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Traffic Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Page views and unique visitors over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={pageViewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stackId="1"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stackId="1"
                      stroke="#EC4899"
                      fill="#EC4899"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages on your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPagesData.map((page, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{page.page}</span>
                        <span className="text-sm text-muted-foreground">
                          {page.views.toLocaleString()} views
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={page.percentage} className="h-2" />
                        <span className="text-xs text-muted-foreground w-12 text-right">
                          {page.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Engagement Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Key metrics about how users interact with your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userEngagementData.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-sm text-muted-foreground">{metric.metric}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center text-sm">
                      {metric.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-green-600 mr-1" />
                      )}
                      <span className={metric.trend === "up" ? "text-green-600" : "text-green-600"}>
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Traffic by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: device.color }}
                        />
                        <span className="text-sm">{device.device}</span>
                      </div>
                      <span className="text-sm font-medium">{device.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors come from</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trafficSourcesData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="source" type="category" />
                    <Tooltip />
                    <Bar dataKey="visits" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Top locations of your visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold">Top Countries</h4>
                  {[
                    { country: "United States", visitors: 12543, percentage: 67.8 },
                    { country: "Canada", visitors: 2156, percentage: 11.6 },
                    { country: "United Kingdom", visitors: 1543, percentage: 8.3 },
                    { country: "Australia", visitors: 987, percentage: 5.3 },
                    { country: "Others", visitors: 1263, percentage: 6.8 },
                  ].map((location, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{location.country}</span>
                        <span className="text-muted-foreground">
                          {location.visitors.toLocaleString()} ({location.percentage}%)
                        </span>
                      </div>
                      <Progress value={location.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold">Top Cities</h4>
                  {[
                    { city: "Los Angeles, CA", visitors: 3421, percentage: 18.5 },
                    { city: "New York, NY", visitors: 2876, percentage: 15.5 },
                    { city: "San Francisco, CA", visitors: 2345, percentage: 12.7 },
                    { city: "Chicago, IL", visitors: 1876, percentage: 10.1 },
                    { city: "Houston, TX", visitors: 1654, percentage: 8.9 },
                  ].map((location, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{location.city}</span>
                        <span className="text-muted-foreground">
                          {location.visitors.toLocaleString()} ({location.percentage}%)
                        </span>
                      </div>
                      <Progress value={location.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Behavior Tab */}
        <TabsContent value="behavior" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* User Flow */}
            <Card>
              <CardHeader>
                <CardTitle>User Flow</CardTitle>
                <CardDescription>Common paths users take through your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { path: "Home → Find Classes → Class Details → Book", users: 3421, rate: "28%" },
                    { path: "Home → Instructors → Profile → Contact", users: 2156, rate: "18%" },
                    { path: "Search → Class Details → Book", users: 1876, rate: "15%" },
                    { path: "Home → About → Contact", users: 1234, rate: "10%" },
                    { path: "Blog → Related Class → Book", users: 987, rate: "8%" },
                  ].map((flow, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{flow.path}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {flow.users.toLocaleString()} users
                        </p>
                      </div>
                      <Badge variant="secondary">{flow.rate}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>How users interact with your content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Scroll Depth</span>
                      <span className="text-sm text-muted-foreground">Avg: 68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Video Completion</span>
                      <span className="text-sm text-muted-foreground">Avg: 72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Form Completion</span>
                      <span className="text-sm text-muted-foreground">Avg: 45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">CTA Click Rate</span>
                      <span className="text-sm text-muted-foreground">Avg: 12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Revenue Overview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue & Bookings</CardTitle>
                <CardDescription>Monthly revenue and booking trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="bookings"
                      stroke="#EC4899"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Revenue</span>
                    <span className="text-lg font-bold">$154,637</span>
                  </div>
                  <Progress value={78} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">78% of monthly goal</p>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Average Order Value</span>
                    <span className="font-medium">$68.50</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Bookings</span>
                    <span className="font-medium">1,428</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Conversion Rate</span>
                    <span className="font-medium">3.2%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Refund Rate</span>
                    <span className="font-medium">1.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Revenue Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Top Revenue Sources</CardTitle>
              <CardDescription>Classes generating the most revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { class: "Pottery for Beginners", instructor: "Sarah Chen", revenue: 12456, bookings: 234 },
                  { class: "Kids Watercolor Workshop", instructor: "Michael Rodriguez", revenue: 9876, bookings: 187 },
                  { class: "Family Craft Sessions", instructor: "Emma Wilson", revenue: 8765, bookings: 156 },
                  { class: "Advanced Ceramics", instructor: "Lisa Park", revenue: 7654, bookings: 98 },
                  { class: "Jewelry Making 101", instructor: "David Kim", revenue: 6543, bookings: 134 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.class}</p>
                      <p className="text-xs text-muted-foreground">
                        by {item.instructor} • {item.bookings} bookings
                      </p>
                    </div>
                    <span className="text-sm font-bold">${item.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
