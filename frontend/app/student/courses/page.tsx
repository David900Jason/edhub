"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileText, Search, User, Play, Download, Star, Clock } from "lucide-react"
import Link from "next/link"

const sidebarItems = [
  { href: "/student", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard" },
  { href: "/student/courses", icon: <BookOpen className="h-5 w-5" />, label: "My Courses", active: true },
  { href: "/student/browse", icon: <Search className="h-5 w-5" />, label: "Browse Courses" },
  { href: "/student/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments" },
  { href: "/student/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

const enrolledCourses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    instructor: "Dr. Sarah Johnson",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    nextLesson: "Calculus - Derivatives",
    rating: 4.8,
    thumbnail: "/placeholder.svg?height=200&width=300&text=Math+Course",
    lastAccessed: "2 hours ago",
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    instructor: "Prof. Michael Chen",
    progress: 45,
    totalLessons: 20,
    completedLessons: 9,
    nextLesson: "Newton's Laws of Motion",
    rating: 4.6,
    thumbnail: "/placeholder.svg?height=200&width=300&text=Physics+Course",
    lastAccessed: "1 day ago",
  },
  {
    id: 3,
    title: "Chemistry Basics",
    instructor: "Dr. Emily Davis",
    progress: 90,
    totalLessons: 18,
    completedLessons: 16,
    nextLesson: "Organic Chemistry Intro",
    rating: 4.9,
    thumbnail: "/placeholder.svg?height=200&width=300&text=Chemistry+Course",
    lastAccessed: "30 minutes ago",
  },
  {
    id: 4,
    title: "Biology Essentials",
    instructor: "Dr. James Wilson",
    progress: 60,
    totalLessons: 22,
    completedLessons: 13,
    nextLesson: "Cell Division",
    rating: 4.7,
    thumbnail: "/placeholder.svg?height=200&width=300&text=Biology+Course",
    lastAccessed: "3 hours ago",
  },
]

export default function StudentCourses() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = enrolledCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="student" userName="Alex Thompson">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Search */}
        <Card className="rounded-2xl shadow-md border-0">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search your courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="rounded-2xl shadow-md border-0 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{course.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-xs text-gray-500">
                      {course.completedLessons} of {course.totalLessons} lessons completed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Next Lesson:</p>
                    <p className="text-sm text-gray-600">{course.nextLesson}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last accessed {course.lastAccessed}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Link href={`/student/courses/${course.id}`} className="flex-1">
                      <Button className="w-full bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or browse new courses</p>
              <Link href="/student/browse">
                <Button className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
