"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  FileText,
  Image,
  BookOpen,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus
} from "lucide-react"

// Mock data for demonstration
const mockStats = {
  totalUsers: 1284,
  userGrowth: 12.5,
  totalClasses: 156,
  classGrowth: 8.3,
  totalRevenue: 24563,
  revenueGrowth: 23.1,
  totalPageViews: 52831,
  pageViewGrowth: 15.7,
  activeInstructors: 47,
  pendingReviews: 8,
  avgRating: 4.8,
  totalReviews: 842
}

const recentActivities = [
  { id: 1, type: "booking", user: "Sarah Johnson", class: "Pottery for Beginners", time: "5 minutes ago", amount: 45 },
  { id: 2, type: "review", user: "Michael Chen", class: "Watercolor Workshop", rating: 5, time: "1 hour ago" },
  { id: 3, type: "signup", user: "Emma Wilson", role: "parent", time: "2 hours ago" },
  { id: 4, type: "class", instructor: "Lisa Park", title: "Kids Jewelry Making", time: "3 hours ago" },
  { id: 5, type: "booking", user: "James Brown", class: "Family Art Session", time: "4 hours ago", amount: 120 }
]

const contentStats = [
  { name: "Published Pages", count: 24, icon: FileText, color: "text-blue-600" },
  { name: "Blog Posts", count: 18, icon: BookOpen, color: "text-purple-600" },
  { name: "Media Files", count: 156, icon: Image, color: "text-green-600" },
  { name: "Categories", count: 12, icon: Calendar, color: "text-orange-600" }
]

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+{mockStats.userGrowth}%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Active Classes</p>
                <p className="text-2xl font-bold">{mockStats.totalClasses}</p>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+{mockStats.classGrowth}%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">${mockStats.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+{mockStats.revenueGrowth}%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold">{mockStats.totalPageViews.toLocaleString()}</p>
                <div className="flex items-center text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+{mockStats.pageViewGrowth}%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <Eye className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Management Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Content Overview</CardTitle>
          <CardDescription>Manage your website content and media</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contentStats.map((stat) => (
              <Link
                key={stat.name}
                href={`/admin/${stat.name.toLowerCase().replace(' ', '-')}`}
                className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <p className="text-2xl font-bold">{stat.count}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/activity">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-4">
                      {activity.type === "booking" && (
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                      )}
                      {activity.type === "review" && (
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                          <Activity className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        </div>
                      )}
                      {activity.type === "signup" && (
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                      {activity.type === "class" && (
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                          <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {activity.type === "booking" && `${activity.user} booked ${activity.class}`}
                          {activity.type === "review" && `${activity.user} reviewed ${activity.class}`}
                          {activity.type === "signup" && `${activity.user} signed up as ${activity.role}`}
                          {activity.type === "class" && `${activity.instructor} created "${activity.title}"`}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <div>
                      {activity.amount && (
                        <span className="text-sm font-medium">${activity.amount}</span>
                      )}
                      {activity.rating && (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < activity.rating ? "text-yellow-500" : "text-gray-300"}>
                              ★
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Status */}
        <div className="space-y-6">
          {/* Platform Status */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">System Status</span>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">API Response</span>
                </div>
                <span className="text-sm font-medium">45ms</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Pending Reviews</span>
                </div>
                <Badge variant="outline">{mockStats.pendingReviews}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Storage Used</span>
                  <span className="font-medium">2.4 GB / 10 GB</span>
                </div>
                <Progress value={24} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start" asChild>
                <Link href="/admin/pages/new">
                  <FileText className="h-4 w-4 mr-2" />
                  New Page
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="justify-start" asChild>
                <Link href="/admin/blog/new">
                  <BookOpen className="h-4 w-4 mr-2" />
                  New Post
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="justify-start" asChild>
                <Link href="/admin/media">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Media
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="justify-start" asChild>
                <Link href="/admin/analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}