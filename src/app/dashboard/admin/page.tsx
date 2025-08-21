"use client"

import { useEffect, useState } from "react"
import { useClerkAuth } from "@/lib/hooks/useClerkAuth"
import { PageBuilder } from "@/lib/page-builder/renderer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  BookOpen, 
  MapPin, 
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardStats {
  totalUsers: number
  totalInstructors: number
  totalClasses: number
  totalBookings: number
  totalRevenue: number
  pendingVerifications: number
}

interface PendingInstructor {
  id: string
  name: string
  email: string
  crafts: string[]
  status: string
  submittedAt: string
}

export default function AdminDashboardPage() {
  const { user, isLoading } = useClerkAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [pendingInstructors, setPendingInstructors] = useState<PendingInstructor[]>([])

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "ADMIN")) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, instructorsResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/instructors/pending')
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      if (instructorsResponse.ok) {
        const instructorsData = await instructorsResponse.json()
        setPendingInstructors(instructorsData)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    }
  }

  const handleInstructorAction = async (instructorId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`/api/admin/instructors/${instructorId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action })
      })

      if (response.ok) {
        fetchDashboardData() // Refresh data
      }
    } catch (error) {
      console.error('Failed to update instructor status:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <>
      <PageBuilder 
        blocks={[
          {
            type: "NavBar",
            props: { id: "navbar" }
          }
        ]}
      />

      <main className="min-h-screen bg-background py-8 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your Crafty Kid platform</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </div>

          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
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
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Instructors</p>
                      <p className="text-3xl font-bold text-foreground">{stats.totalInstructors}</p>
                    </div>
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                      <p className="text-3xl font-bold text-foreground">{stats.totalClasses}</p>
                    </div>
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                      <p className="text-3xl font-bold text-foreground">
                        ${(stats.totalRevenue / 100).toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                      <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content Tabs */}
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending Reviews
                {stats?.pendingVerifications > 0 && (
                  <Badge variant="destructive" className="ml-1">
                    {stats.pendingVerifications}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Pending Reviews */}
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    Instructor Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingInstructors.length > 0 ? (
                    <div className="space-y-4">
                      {pendingInstructors.map((instructor) => (
                        <div
                          key={instructor.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {instructor.name}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {instructor.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {instructor.email}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {instructor.crafts.map((craft) => (
                                <Badge key={craft} variant="secondary" className="text-xs">
                                  {craft}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              Submitted: {new Date(instructor.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleInstructorAction(instructor.id, 'approve')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleInstructorAction(instructor.id, 'reject')}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <p className="text-gray-600">No pending instructor applications</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Management */}
            <TabsContent value="content">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Page Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-24 flex-col">
                        <BookOpen className="h-8 w-8 mb-2" />
                        <span>Manage Pages</span>
                      </Button>
                      <Button variant="outline" className="h-24 flex-col">
                        <Edit className="h-8 w-8 mb-2" />
                        <span>Edit Content</span>
                      </Button>
                      <Button variant="outline" className="h-24 flex-col">
                        <MapPin className="h-8 w-8 mb-2" />
                        <span>Manage Venues</span>
                      </Button>
                      <Button variant="outline" className="h-24 flex-col">
                        <Plus className="h-8 w-8 mb-2" />
                        <span>Create Category</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Management */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">User management interface coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Analytics dashboard coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <PageBuilder 
        blocks={[
          {
            type: "Footer",
            props: { id: "footer" }
          }
        ]}
      />
    </>
  )
}