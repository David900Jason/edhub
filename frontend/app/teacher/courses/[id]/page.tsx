"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Users,
  FileText,
  Upload,
  User,
  Play,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Star,
  Clock,
  Calendar,
} from "lucide-react"
import Link from "next/link"

const sidebarItems = [
  { href: "/teacher", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard" },
  { href: "/teacher/courses", icon: <BookOpen className="h-5 w-5" />, label: "Courses", active: true },
  { href: "/teacher/upload", icon: <Upload className="h-5 w-5" />, label: "Upload Content" },
  { href: "/teacher/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments" },
  { href: "/teacher/students", icon: <Users className="h-5 w-5" />, label: "Students" },
  { href: "/teacher/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

const courseData = {
  id: 1,
  title: "Advanced Mathematics",
  description: "Comprehensive course covering calculus, algebra, and statistics for advanced students",
  students: 45,
  rating: 4.8,
  price: "$99",
  status: "Active",
  thumbnail: "/placeholder.svg?height=300&width=500&text=Advanced+Mathematics",
  videos: [
    { id: 1, title: "Introduction to Calculus", duration: "45:30", views: 42, uploadDate: "2024-01-15" },
    { id: 2, title: "Derivatives and Applications", duration: "52:15", views: 38, uploadDate: "2024-01-18" },
    { id: 3, title: "Integration Techniques", duration: "48:20", views: 35, uploadDate: "2024-01-22" },
    { id: 4, title: "Differential Equations", duration: "55:45", views: 32, uploadDate: "2024-01-25" },
  ],
  pdfs: [
    { id: 1, title: "Calculus Fundamentals", size: "2.5 MB", downloads: 40, uploadDate: "2024-01-15" },
    { id: 2, title: "Practice Problems Set 1", size: "1.8 MB", downloads: 35, uploadDate: "2024-01-18" },
    { id: 3, title: "Integration Formulas", size: "1.2 MB", downloads: 38, uploadDate: "2024-01-22" },
    { id: 4, title: "Exam Preparation Guide", size: "3.1 MB", downloads: 42, uploadDate: "2024-01-25" },
  ],
  assignments: [
    {
      id: 1,
      title: "Calculus Problem Set",
      dueDate: "2024-02-01",
      submissions: 35,
      totalStudents: 45,
      status: "Active",
    },
    {
      id: 2,
      title: "Integration Project",
      dueDate: "2024-02-08",
      submissions: 28,
      totalStudents: 45,
      status: "Active",
    },
    { id: 3, title: "Midterm Preparation", dueDate: "2024-02-15", submissions: 0, totalStudents: 45, status: "Draft" },
  ],
  exams: [
    { id: 1, title: "Calculus Midterm", date: "2024-02-10", duration: "120 min", attempts: 42, status: "Scheduled" },
    { id: 2, title: "Integration Quiz", date: "2024-02-03", duration: "60 min", attempts: 38, status: "Completed" },
    { id: 3, title: "Final Exam", date: "2024-03-15", duration: "180 min", attempts: 0, status: "Draft" },
  ],
}

export default function CourseDetail() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="teacher" userName="Dr. Sarah Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-6">
          <img
            src={courseData.thumbnail || "/placeholder.svg"}
            alt={courseData.title}
            className="w-32 h-24 object-cover rounded-lg shadow-md"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{courseData.title}</h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  courseData.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {courseData.status}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{courseData.description}</p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{courseData.students} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>{courseData.rating} rating</span>
              </div>
              <div className="font-medium text-[#1f4e89]">{courseData.price}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/teacher/upload">
              <Button className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </Link>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Course
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="pdfs">PDFs</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-2xl shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Videos</p>
                      <p className="text-3xl font-bold text-gray-900">{courseData.videos.length}</p>
                    </div>
                    <Play className="h-8 w-8 text-[#1f4e89]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">PDF Materials</p>
                      <p className="text-3xl font-bold text-gray-900">{courseData.pdfs.length}</p>
                    </div>
                    <Download className="h-8 w-8 text-[#38b2ac]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Assignments</p>
                      <p className="text-3xl font-bold text-gray-900">{courseData.assignments.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-[#1f4e89]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Exams</p>
                      <p className="text-3xl font-bold text-gray-900">{courseData.exams.length}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-[#38b2ac]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-2xl shadow-md border-0">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">New assignment submitted</p>
                      <p className="text-sm text-gray-600">Alice Johnson submitted "Calculus Problem Set"</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Play className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Video watched</p>
                      <p className="text-sm text-gray-600">Bob Smith completed "Introduction to Calculus"</p>
                    </div>
                    <span className="text-sm text-gray-500">4 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Course Videos</h2>
              <Link href="/teacher/upload">
                <Button className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {courseData.videos.map((video) => (
                <Card key={video.id} className="rounded-lg shadow-md border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Play className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{video.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {video.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {video.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {video.uploadDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pdfs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">PDF Materials</h2>
              <Link href="/teacher/upload">
                <Button className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload PDF
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {courseData.pdfs.map((pdf) => (
                <Card key={pdf.id} className="rounded-lg shadow-md border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Download className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{pdf.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>{pdf.size}</span>
                          <span>{pdf.downloads} downloads</span>
                          <span>{pdf.uploadDate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
              <Link href="/teacher/assignments">
                <Button className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {courseData.assignments.map((assignment) => (
                <Card key={assignment.id} className="rounded-lg shadow-md border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>Due: {assignment.dueDate}</span>
                            <span>
                              {assignment.submissions}/{assignment.totalStudents} submitted
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                assignment.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {assignment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exams" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Exams</h2>
              <Button className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Exam
              </Button>
            </div>

            <div className="grid gap-4">
              {courseData.exams.map((exam) => (
                <Card key={exam.id} className="rounded-lg shadow-md border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>Date: {exam.date}</span>
                            <span>Duration: {exam.duration}</span>
                            <span>{exam.attempts} attempts</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                exam.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : exam.status === "Scheduled"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {exam.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
