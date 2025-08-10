"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BookOpen,
  Users,
  FileText,
  Upload,
  User,
  Plus,
  Play,
  Download,
  Eye,
  Edit,
  Trash2,
  Search,
  Star,
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

const courses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    description: "Comprehensive course covering calculus, algebra, and statistics",
    students: 45,
    videos: 12,
    pdfs: 8,
    assignments: 5,
    exams: 3,
    status: "Active",
    price: "$99",
    rating: 4.8,
    thumbnail: "/placeholder.svg?height=200&width=300&text=Math+Course",
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    description: "Introduction to classical mechanics, thermodynamics, and waves",
    students: 38,
    videos: 8,
    pdfs: 6,
    assignments: 3,
    exams: 2,
    status: "Active",
    price: "$79",
    rating: 4.6,
    thumbnail: "/placeholder.svg?height=200&width=300&text=Physics+Course",
  },
  {
    id: 3,
    title: "Chemistry Basics",
    description: "Essential chemistry concepts for beginners",
    students: 52,
    videos: 15,
    pdfs: 12,
    assignments: 7,
    exams: 4,
    status: "Draft",
    price: "$89",
    rating: 4.9,
    thumbnail: "/placeholder.svg?height=200&width=300&text=Chemistry+Course",
  },
  {
    id: 4,
    title: "Biology Essentials",
    description: "Cell biology, genetics, and human anatomy",
    students: 29,
    videos: 10,
    pdfs: 9,
    assignments: 4,
    exams: 2,
    status: "Active",
    price: "$85",
    rating: 4.7,
    thumbnail: "/placeholder.svg?height=200&width=300&text=Biology+Course",
  },
]

export default function TeacherCourses() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: "",
  })

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || course.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesFilter
  })

  const handleCreateCourse = () => {
    console.log("Creating course:", newCourse)
    setIsCreateModalOpen(false)
    setNewCourse({ title: "", description: "", price: "" })
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="teacher" userName="Dr. Sarah Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600">Manage your course content and track student progress</p>
          </div>

          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>Add a new course to your teaching portfolio</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter course title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your course content and objectives"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    placeholder="$99"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, price: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCourse} className="bg-[#1f4e89] hover:bg-[#1a4077]">
                  Create Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <Card className="rounded-2xl shadow-md border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-lg border-gray-300 focus:border-[#1f4e89] focus:ring-[#1f4e89]"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                  className={filterStatus === "all" ? "bg-[#1f4e89] hover:bg-[#1a4077]" : ""}
                >
                  All Courses
                </Button>
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("active")}
                  className={filterStatus === "active" ? "bg-[#1f4e89] hover:bg-[#1a4077]" : ""}
                >
                  Active
                </Button>
                <Button
                  variant={filterStatus === "draft" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("draft")}
                  className={filterStatus === "draft" ? "bg-[#1f4e89] hover:bg-[#1a4077]" : ""}
                >
                  Draft
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{course.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students} students
                    </span>
                    <span className="font-medium text-[#1f4e89]">{course.price}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-sm">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <Play className="h-4 w-4" />
                        <span>{course.videos}</span>
                      </div>
                      <p className="text-xs text-gray-500">Videos</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <Download className="h-4 w-4" />
                        <span>{course.pdfs}</span>
                      </div>
                      <p className="text-xs text-gray-500">PDFs</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>{course.assignments}</span>
                      </div>
                      <p className="text-xs text-gray-500">Tasks</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.exams}</span>
                      </div>
                      <p className="text-xs text-gray-500">Exams</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Link href={`/teacher/courses/${course.id}`} className="flex-1">
                      <Button size="sm" className="w-full bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                        <Eye className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" className="border-gray-300 bg-transparent">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
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
              <p className="text-gray-600 mb-6">
                {searchTerm ? "Try adjusting your search terms" : "Create your first course to get started"}
              </p>
              <Button className="bg-[#1f4e89] hover:bg-[#1a4077] text-white" onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
