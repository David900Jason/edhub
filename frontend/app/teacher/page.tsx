"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, FileText, Upload, User, Plus, Eye } from "lucide-react"

const sidebarItems = [
  { href: "/teacher", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard", active: true },
  { href: "/teacher/courses", icon: <BookOpen className="h-5 w-5" />, label: "Courses" },
  { href: "/teacher/upload", icon: <Upload className="h-5 w-5" />, label: "Upload Content" },
  { href: "/teacher/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments" },
  { href: "/teacher/students", icon: <Users className="h-5 w-5" />, label: "Students" },
  { href: "/teacher/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

export default function TeacherDashboard() {
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
                  <Upload className="h-6 w-6 text-[#38b2ac]" />
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
              <Button className="h-20 bg-[#1f4e89] hover:bg-[#1a4077] text-white rounded-lg flex flex-col gap-2">
                <Plus className="h-6 w-6" />
                <span>Create Course</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-[#38b2ac] text-[#38b2ac] hover:bg-[#38b2ac] hover:text-white rounded-lg flex flex-col gap-2 bg-transparent"
              >
                <Upload className="h-6 w-6" />
                <span>Upload Video</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-[#1f4e89] text-[#1f4e89] hover:bg-[#1f4e89] hover:text-white rounded-lg flex flex-col gap-2 bg-transparent"
              >
                <FileText className="h-6 w-6" />
                <span>New Assignment</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg flex flex-col gap-2 bg-transparent"
              >
                <Eye className="h-6 w-6" />
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
                  { title: "Advanced Mathematics", students: 45, videos: 12, status: "Active" },
                  { title: "Physics Fundamentals", students: 38, videos: 8, status: "Active" },
                  { title: "Chemistry Basics", students: 52, videos: 15, status: "Draft" },
                ].map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1f4e89] rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                        <p className="text-sm text-gray-600">
                          {course.students} students • {course.videos} videos
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {course.status}
                    </span>
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
                  { action: "New submission", student: "Alice Johnson", course: "Advanced Math", time: "2 hours ago" },
                  { action: "Course enrolled", student: "Bob Smith", course: "Physics Fund.", time: "4 hours ago" },
                  { action: "Assignment completed", student: "Carol Davis", course: "Chemistry", time: "6 hours ago" },
                  { action: "Video watched", student: "David Wilson", course: "Advanced Math", time: "8 hours ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
