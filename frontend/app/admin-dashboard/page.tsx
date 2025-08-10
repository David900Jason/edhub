"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  BookOpen,
  DollarSign,
  Flag,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

const sidebarItems = [
  { href: "/admin-dashboard", icon: <TrendingUp className="h-5 w-5" />, label: "Dashboard", active: true },
  { href: "/admin-dashboard/users", icon: <Users className="h-5 w-5" />, label: "Users" },
  { href: "/admin-dashboard/courses", icon: <BookOpen className="h-5 w-5" />, label: "Courses" },
  { href: "/admin-dashboard/payments", icon: <DollarSign className="h-5 w-5" />, label: "Payments" },
  { href: "/admin-dashboard/moderation", icon: <Flag className="h-5 w-5" />, label: "Moderation" },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const router = useRouter()

  const handleManageUsers = () => {
    router.push("/admin-dashboard/users")
  }

  const handleReviewCourses = () => {
    router.push("/admin-dashboard/courses")
  }

  const handleViewPayments = () => {
    router.push("/admin-dashboard/payments")
  }

  const handleModeration = () => {
    router.push("/admin-dashboard/moderation")
  }

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user ${userId}`)
  }

  const handleFlagAction = (flagId: number, action: string) => {
    console.log(`${action} flag ${flagId}`)
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="admin" userName="Admin User">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#2b6cb0] to-[#38b2ac] rounded-2xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-100">Monitor platform activity and manage users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">1,247</p>
                  <p className="text-xs text-green-600">+12% this month</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#2b6cb0]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-3xl font-bold text-gray-900">89</p>
                  <p className="text-xs text-green-600">+5 this week</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-[#38b2ac]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">$24,580</p>
                  <p className="text-xs text-green-600">+18% vs last month</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-[#2b6cb0]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Flags</p>
                  <p className="text-3xl font-bold text-gray-900">7</p>
                  <p className="text-xs text-red-600">Needs attention</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & User Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Recent User Activity</CardTitle>
              <CardDescription>Latest platform registrations and activity</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    action: "New teacher registered",
                    user: "Dr. Emily Chen",
                    time: "2 hours ago",
                    type: "teacher",
                    id: 1,
                  },
                  {
                    action: "Student enrolled",
                    user: "Michael Rodriguez",
                    time: "4 hours ago",
                    type: "student",
                    id: 2,
                  },
                  {
                    action: "Course published",
                    user: "Prof. James Wilson",
                    time: "6 hours ago",
                    type: "teacher",
                    id: 3,
                  },
                  { action: "Payment processed", user: "Sarah Johnson", time: "8 hours ago", type: "student", id: 4 },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "teacher" ? "bg-blue-100" : "bg-green-100"
                      }`}
                    >
                      <UserCheck
                        className={`h-4 w-4 ${activity.type === "teacher" ? "text-blue-600" : "text-green-600"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.user}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" onClick={() => handleUserAction(activity.id, "view")}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleUserAction(activity.id, "suspend")}>
                        <Ban className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Platform Overview</CardTitle>
              <CardDescription>Key metrics and statistics</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Students</p>
                    <p className="text-2xl font-bold text-gray-900">1,089</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+8.2%</p>
                    <p className="text-xs text-gray-500">vs last month</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Teachers</p>
                    <p className="text-2xl font-bold text-gray-900">158</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+12.5%</p>
                    <p className="text-xs text-gray-500">vs last month</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Course Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">73%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+2.1%</p>
                    <p className="text-xs text-gray-500">vs last month</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Session Time</p>
                    <p className="text-2xl font-bold text-gray-900">24m</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-red-600">-1.3%</p>
                    <p className="text-xs text-gray-500">vs last month</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Moderation Queue */}
        <Card className="rounded-2xl shadow-md border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">Moderation Queue</CardTitle>
                <CardDescription>Content and user reports requiring attention</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search flags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  type: "Inappropriate Content",
                  reporter: "Student User",
                  target: "Course: Advanced Math",
                  time: "2 hours ago",
                  priority: "high",
                },
                {
                  id: 2,
                  type: "Spam",
                  reporter: "Teacher User",
                  target: "User: john_doe",
                  time: "4 hours ago",
                  priority: "medium",
                },
                {
                  id: 3,
                  type: "Copyright Violation",
                  reporter: "Content Owner",
                  target: "Video: Physics Lesson 1",
                  time: "6 hours ago",
                  priority: "high",
                },
              ].map((flag) => (
                <div key={flag.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        flag.priority === "high"
                          ? "bg-red-500"
                          : flag.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    ></div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{flag.type}</h4>
                        <Badge variant={flag.priority === "high" ? "destructive" : "secondary"}>{flag.priority}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Reported by {flag.reporter}</p>
                      <p className="text-sm text-gray-600">Target: {flag.target}</p>
                      <p className="text-xs text-gray-400">{flag.time}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleFlagAction(flag.id, "review")}>
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleFlagAction(flag.id, "approve")}
                      className="text-green-600 border-green-300 hover:bg-green-50"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleFlagAction(flag.id, "reject")}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="rounded-2xl shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                className="h-20 bg-[#2b6cb0] hover:bg-[#2c5282] text-white rounded-lg flex flex-col gap-2"
                onClick={handleManageUsers}
              >
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-[#38b2ac] text-[#38b2ac] hover:bg-[#38b2ac] hover:text-white rounded-lg flex flex-col gap-2 bg-transparent"
                onClick={handleReviewCourses}
              >
                <BookOpen className="h-6 w-6" />
                <span>Review Courses</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-[#2b6cb0] text-[#2b6cb0] hover:bg-[#2b6cb0] hover:text-white rounded-lg flex flex-col gap-2 bg-transparent"
                onClick={handleViewPayments}
              >
                <DollarSign className="h-6 w-6" />
                <span>View Payments</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-red-300 text-red-600 hover:bg-red-50 rounded-lg flex flex-col gap-2 bg-transparent"
                onClick={handleModeration}
              >
                <Flag className="h-6 w-6" />
                <span>Handle Flags</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
