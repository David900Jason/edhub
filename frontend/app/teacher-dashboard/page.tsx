"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  FileText,
  Upload,
  User,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  TrendingUp,
  DollarSign,
  MessageSquare,
  BarChart3,
} from "lucide-react"
import { useRouter } from "next/navigation"

const sidebarItems = [
  { href: "/teacher-dashboard", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard", active: true },
  { href: "/teacher-dashboard/courses", icon: <BookOpen className="h-5 w-5" />, label: "Courses" },
  { href: "/teacher-dashboard/upload", icon: <Upload className="h-5 w-5" />, label: "Upload Content" },
  { href: "/teacher-dashboard/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments" },
  { href: "/teacher-dashboard/students", icon: <Users className="h-5 w-5" />, label: "Students" },
  { href: "/teacher-dashboard/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

export default function TeacherDashboard() {
  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const router = useRouter()

  const handleCreateCourse = () => {
    router.push("/teacher-dashboard/courses/create")
  }

  const handleUploadVideo = () => {
    router.push("/teacher-dashboard/upload")
  }

  const handleNewAssignment = () => {
    router.push("/teacher-dashboard/assignments/create")
  }

  const handleViewAnalytics = () => {
    router.push("/teacher-dashboard/analytics")
  }

  const handleEditCourse = (courseId: number) => {
    router.push(`/teacher-dashboard/courses/${courseId}/edit`)
  }

  const handleViewCourse = (courseId: number) => {
    router.push(`/teacher-dashboard/courses/${courseId}`)
  }

  const handleDeleteCourse = (courseId: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      console.log(`Deleting course ${courseId}`)
      // Implement delete logic
    }
  }

  const handleMessageStudent = (studentId: number) => {
    router.push(`/teacher-dashboard/messages/${studentId}`)
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="teacher" userName="Dr. Sarah Johnson">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#1f4e89] to-[#38b2ac] rounded-2xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. Johnson!</h1>
          <p className="text-blue-100">Ready to inspire and educate your students today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-[#1f4e89]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">248</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#38b2ac]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Assignments</p>
                  <p className="text-3xl font-bold text-gray-900">15</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#1f4e89]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">$2,840</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-[#38b2ac]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="rounded-2xl shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                className="h-20 bg-[#1f4e89] hover:bg-[#1a4077] text-white rounded-lg flex flex-col gap-2"
                onClick={handleCreateCourse}
              >
                <Plus className="h-6 w-6" />
                <span>Create Course</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-[#38b2ac] text-[#38b2ac] hover:bg-[#38b2ac] hover:text-white rounded-lg flex flex-col gap-2 bg-transparent"
                onClick={handleUploadVideo}
              >
                <Upload className="h-6 w-6" />
                <span>Upload Video</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-[#1f4e89] text-[#1f4e89] hover:bg-[#1f4e89] hover:text-white rounded-lg flex flex-col gap-2 bg-transparent"
                onClick={handleNewAssignment}
              >
                <FileText className="h-6 w-6" />
                <span>New Assignment</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg flex flex-col gap-2 bg-transparent"
                onClick={handleViewAnalytics}
              >
                <BarChart3 className="h-6 w-6" />
                <span>View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Recent Courses</CardTitle>
              <CardDescription>Your latest course content</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { id: 1, title: "Advanced Mathematics", students: 45, videos: 12, status: "Active", rating: 4.8 },
                  { id: 2, title: "Physics Fundamentals", students: 38, videos: 8, status: "Active", rating: 4.9 },
                  { id: 3, title: "Chemistry Basics", students: 52, videos: 15, status: "Draft", rating: 4.7 },
                ].map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1f4e89] rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{course.students} students</span>
                          <span>{course.videos} videos</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={course.status === "Active" ? "default" : "secondary"}>{course.status}</Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => handleViewCourse(course.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleEditCourse(course.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
              <CardDescription>Latest student interactions</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    action: "New submission",
                    student: "Alice Johnson",
                    course: "Advanced Math",
                    time: "2 hours ago",
                    type: "submission",
                  },
                  {
                    id: 2,
                    action: "Course enrolled",
                    student: "Bob Smith",
                    course: "Physics Fund.",
                    time: "4 hours ago",
                    type: "enrollment",
                  },
                  {
                    id: 3,
                    action: "Assignment completed",
                    student: "Carol Davis",
                    course: "Chemistry",
                    time: "6 hours ago",
                    type: "completion",
                  },
                  {
                    id: 4,
                    action: "Video watched",
                    student: "David Wilson",
                    course: "Advanced Math",
                    time: "8 hours ago",
                    type: "video",
                  },
                ].map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-[#38b2ac] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{activity.student.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">
                        {activity.student} • {activity.course}
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => handleMessageStudent(activity.id)}>
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card className="rounded-2xl shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Performance Overview</CardTitle>
            <CardDescription>Your teaching metrics and insights</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-xs text-green-600 mt-1">+0.2 this month</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">87%</h3>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-xs text-green-600 mt-1">+5% this month</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">$12,450</h3>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-xs text-green-600 mt-1">+18% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
