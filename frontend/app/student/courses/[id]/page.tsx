"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  FileText,
  Search,
  User,
  Play,
  Download,
  Star,
  Clock,
  CheckCircle,
  Lock,
  FileIcon,
} from "lucide-react"

const sidebarItems = [
  { href: "/student", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard" },
  { href: "/student/courses", icon: <BookOpen className="h-5 w-5" />, label: "My Courses", active: true },
  { href: "/student/browse", icon: <Search className="h-5 w-5" />, label: "Browse Courses" },
  { href: "/student/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments" },
  { href: "/student/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

const courseData = {
  id: 1,
  title: "Advanced Mathematics",
  instructor: "Dr. Sarah Johnson",
  description: "Comprehensive course covering calculus, algebra, and statistics for advanced students",
  progress: 75,
  rating: 4.8,
  totalStudents: 248,
  thumbnail: "/placeholder.svg?height=300&width=500&text=Advanced+Mathematics",
  videos: [
    { id: 1, title: "Introduction to Calculus", duration: "45:30", completed: true, locked: false },
    { id: 2, title: "Derivatives and Applications", duration: "52:15", completed: true, locked: false },
    { id: 3, title: "Integration Techniques", duration: "48:20", completed: true, locked: false },
    { id: 4, title: "Differential Equations", duration: "55:45", completed: false, locked: false },
    { id: 5, title: "Advanced Integration", duration: "42:30", completed: false, locked: true },
  ],
  pdfs: [
    { id: 1, title: "Calculus Fundamentals", size: "2.5 MB", downloaded: true },
    { id: 2, title: "Practice Problems Set 1", size: "1.8 MB", downloaded: false },
    { id: 3, title: "Integration Formulas", size: "1.2 MB", downloaded: true },
    { id: 4, title: "Exam Preparation Guide", size: "3.1 MB", downloaded: false },
  ],
  assignments: [
    { id: 1, title: "Calculus Problem Set", dueDate: "2024-02-01", status: "Submitted", grade: "A" },
    { id: 2, title: "Integration Project", dueDate: "2024-02-08", status: "Pending", grade: null },
    { id: 3, title: "Midterm Preparation", dueDate: "2024-02-15", status: "Not Started", grade: null },
  ],
  exams: [
    { id: 1, title: "Calculus Midterm", date: "2024-02-10", duration: "120 min", status: "Upcoming" },
    { id: 2, title: "Integration Quiz", date: "2024-02-03", duration: "60 min", status: "Completed", score: "85%" },
  ],
}

export default function StudentCourseDetail() {
  const [activeTab, setActiveTab] = useState("overview")

  const handleVideoClick = (video: any) => {
    if (!video.locked) {
      // Navigate to video player
      console.log("Playing video:", video.title)
    }
  }

  const handleDownloadPDF = (pdf: any) => {
    console.log("Downloading PDF:", pdf.title)
  }

  const handleStartExam = (exam: any) => {
    if (exam.status === "Upcoming") {
      // Navigate to exam page
      console.log("Starting exam:", exam.title)
    }
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="student" userName="Alex Thompson">
      <div className="space-y-6">
        {/* Course Header */}
        <div className="flex items-start gap-6">
          <img
            src={courseData.thumbnail || "/placeholder.svg"}
            alt={courseData.title}
            className="w-32 h-24 object-cover rounded-lg shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
            <p className="text-gray-600 mb-4">by {courseData.instructor}</p>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>{courseData.rating} rating</span>
              </div>
              <span>{courseData.totalStudents} students</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Course Progress</span>
                <span className="font-medium">{courseData.progress}%</span>
              </div>
              <Progress value={courseData.progress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="rounded-2xl shadow-md border-0">
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{courseData.description}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-2xl shadow-md border-0">
                <CardHeader>
                  <CardTitle>Recent Videos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {courseData.videos.slice(0, 3).map((video) => (
                    <div key={video.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-[#1f4e89] rounded-full flex items-center justify-center">
                        {video.completed ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : (
                          <Play className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{video.title}</p>
                        <p className="text-xs text-gray-500">{video.duration}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md border-0">
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {courseData.assignments
                    .filter((a) => a.status !== "Submitted")
                    .map((assignment) => (
                      <div key={assignment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <FileText className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{assignment.title}</p>
                          <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="grid gap-4">
              {courseData.videos.map((video) => (
                <Card key={video.id} className="rounded-lg shadow-md border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          video.locked ? "bg-gray-200" : video.completed ? "bg-green-500" : "bg-[#1f4e89]"
                        }`}
                      >
                        {video.locked ? (
                          <Lock className="h-6 w-6 text-gray-500" />
                        ) : video.completed ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          <Play className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{video.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {video.duration}
                          </span>
                          {video.completed && <span className="text-green-600">Completed</span>}
                          {video.locked && <span className="text-gray-500">Locked</span>}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleVideoClick(video)}
                        disabled={video.locked}
                        className={video.locked ? "opacity-50 cursor-not-allowed" : "bg-[#1f4e89] hover:bg-[#1a4077]"}
                      >
                        {video.completed ? "Rewatch" : "Watch"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <div className="grid gap-4">
              {courseData.pdfs.map((pdf) => (
                <Card key={pdf.id} className="rounded-lg shadow-md border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileIcon className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{pdf.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>{pdf.size}</span>
                          {pdf.downloaded && <span className="text-green-600">Downloaded</span>}
                        </div>
                      </div>
                      <Button onClick={() => handleDownloadPDF(pdf)} variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        {pdf.downloaded ? "Re-download" : "Download"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="grid gap-4">
              {courseData.assignments.map((assignment) => (
                <Card key={assignment.id} className="rounded-lg shadow-md border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            assignment.status === "Submitted"
                              ? "bg-green-500"
                              : assignment.status === "Pending"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                          }`}
                        >
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>Due: {assignment.dueDate}</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                assignment.status === "Submitted"
                                  ? "bg-green-100 text-green-800"
                                  : assignment.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {assignment.status}
                            </span>
                            {assignment.grade && (
                              <span className="font-medium text-green-600">Grade: {assignment.grade}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        className={
                          assignment.status === "Submitted"
                            ? "bg-gray-500"
                            : assignment.status === "Pending"
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-[#1f4e89] hover:bg-[#1a4077]"
                        }
                      >
                        {assignment.status === "Submitted"
                          ? "View Submission"
                          : assignment.status === "Pending"
                            ? "Continue"
                            : "Start"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exams" className="space-y-6">
            <div className="grid gap-4">
              {courseData.exams.map((exam) => (
                <Card key={exam.id} className="rounded-lg shadow-md border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            exam.status === "Completed"
                              ? "bg-green-500"
                              : exam.status === "Upcoming"
                                ? "bg-blue-500"
                                : "bg-gray-500"
                          }`}
                        >
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>Date: {exam.date}</span>
                            <span>Duration: {exam.duration}</span>
                            {exam.score && <span className="font-medium text-green-600">Score: {exam.score}</span>}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleStartExam(exam)}
                        disabled={exam.status === "Completed"}
                        className={
                          exam.status === "Completed"
                            ? "bg-gray-500 opacity-50 cursor-not-allowed"
                            : "bg-[#1f4e89] hover:bg-[#1a4077]"
                        }
                      >
                        {exam.status === "Completed" ? "View Results" : "Start Exam"}
                      </Button>
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
