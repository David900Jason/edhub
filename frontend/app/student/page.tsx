"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Search, User, Play, Download, Award, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const sidebarItems = [
  { href: "/student", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard", active: true },
  { href: "/student/courses", icon: <BookOpen className="h-5 w-5" />, label: "My Courses" },
  { href: "/student/browse", icon: <Search className="h-5 w-5" />, label: "Browse Courses" },
  { href: "/student/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments" },
  { href: "/student/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

export default function StudentDashboard() {
  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="student" userName="Alex Thompson">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#2b6cb0] to-[#38b2ac] rounded-2xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
          <p className="text-blue-100">Continue your learning journey and achieve your goals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                  <p className="text-3xl font-bold text-gray-900">5</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-[#2b6cb0]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Lessons</p>
                  <p className="text-3xl font-bold text-gray-900">42</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <Play className="h-6 w-6 text-[#38b2ac]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Assignments</p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#2b6cb0]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Study Streak</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-500">days</p>
                </div>
                <div className="w-12 h-12 bg-[#edf2f7] rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-[#38b2ac]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning Section */}
        <Card className="rounded-2xl shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                {
                  title: "Advanced Mathematics",
                  lesson: "Calculus - Derivatives",
                  progress: 75,
                  timeLeft: "15 min left",
                  thumbnail: "/placeholder.svg?height=80&width=120",
                },
                {
                  title: "Physics Fundamentals",
                  lesson: "Newton's Laws of Motion",
                  progress: 45,
                  timeLeft: "25 min left",
                  thumbnail: "/placeholder.svg?height=80&width=120",
                },
                {
                  title: "Chemistry Basics",
                  lesson: "Atomic Structure",
                  progress: 90,
                  timeLeft: "5 min left",
                  thumbnail: "/placeholder.svg?height=80&width=120",
                },
              ].map((course, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-20 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.lesson}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Progress value={course.progress} className="flex-1 h-2" />
                      <span className="text-xs text-gray-500">{course.progress}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-2">{course.timeLeft}</p>
                    <Button size="sm" className="bg-[#2b6cb0] hover:bg-[#2c5282] text-white">
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Upcoming Assignments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
              <CardDescription>Your learning progress</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    action: "Completed lesson",
                    subject: "Advanced Mathematics",
                    time: "2 hours ago",
                    icon: <Award className="h-4 w-4 text-green-600" />,
                  },
                  {
                    action: "Downloaded PDF",
                    subject: "Physics Fundamentals",
                    time: "4 hours ago",
                    icon: <Download className="h-4 w-4 text-blue-600" />,
                  },
                  {
                    action: "Submitted assignment",
                    subject: "Chemistry Basics",
                    time: "1 day ago",
                    icon: <FileText className="h-4 w-4 text-purple-600" />,
                  },
                  {
                    action: "Watched video",
                    subject: "Biology Essentials",
                    time: "2 days ago",
                    icon: <Play className="h-4 w-4 text-red-600" />,
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.subject}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Upcoming Assignments</CardTitle>
              <CardDescription>Don't miss these deadlines</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    title: "Calculus Problem Set",
                    course: "Advanced Mathematics",
                    due: "Due in 2 days",
                    priority: "high",
                  },
                  { title: "Lab Report", course: "Physics Fundamentals", due: "Due in 5 days", priority: "medium" },
                  {
                    title: "Chemical Equations Quiz",
                    course: "Chemistry Basics",
                    due: "Due in 1 week",
                    priority: "low",
                  },
                ].map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                      <p className="text-sm text-gray-600">{assignment.course}</p>
                      <p
                        className={`text-xs font-medium mt-1 ${
                          assignment.priority === "high"
                            ? "text-red-600"
                            : assignment.priority === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {assignment.due}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#2b6cb0] text-[#2b6cb0] hover:bg-[#2b6cb0] hover:text-white bg-transparent"
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="rounded-2xl shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
            <CardDescription>Common tasks to help you learn</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 bg-[#2b6cb0] hover:bg-[#2c5282] text-white rounded-lg flex flex-col gap-2">
                <Search className="h-6 w-6" />
                <span>Browse Courses</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-[#38b2ac] text-[#38b2ac] hover:bg-[#38b2ac] hover:text-white rounded-lg flex flex-col gap-2 bg-transparent"
              >
                <FileText className="h-6 w-6" />
                <span>View Assignments</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-[#2b6cb0] text-[#2b6cb0] hover:bg-[#2b6cb0] hover:text-white rounded-lg flex flex-col gap-2 bg-transparent"
              >
                <Download className="h-6 w-6" />
                <span>Download Materials</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg flex flex-col gap-2 bg-transparent"
              >
                <User className="h-6 w-6" />
                <span>Update Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
