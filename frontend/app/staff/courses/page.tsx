"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Users,
  BookOpen,
  DollarSign,
  Flag,
  TrendingUp,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Play,
  FileText,
} from "lucide-react"

const sidebarItems = [
  { href: "/staff", icon: <TrendingUp className="h-5 w-5" />, label: "Dashboard" },
  { href: "/staff/users", icon: <Users className="h-5 w-5" />, label: "Users" },
  { href: "/staff/courses", icon: <BookOpen className="h-5 w-5" />, label: "Courses", active: true },
  { href: "/staff/payments", icon: <DollarSign className="h-5 w-5" />, label: "Payments" },
  { href: "/staff/flags", icon: <Flag className="h-5 w-5" />, label: "Moderation" },
]

const courses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    instructor: "Dr. Sarah Johnson",
    description: "Comprehensive course covering calculus, algebra, and statistics",
    students: 248,
    rating: 4.8,
    price: "$99",
    status: "Published",
    category: "Mathematics",
    createdDate: "2023-12-01",
    lastUpdated: "2024-01-15",
    videos: 12,
    pdfs: 8,
    assignments: 5,
    revenue: "$24,552",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Math+Course",
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    instructor: "Prof. Michael Chen",
    description: "Introduction to classical mechanics, thermodynamics, and waves",
    students: 156,
    rating: 4.6,
    price: "$79",
    status: "Published",
    category: "Physics",
    createdDate: "2023-11-15",
    lastUpdated: "2024-01-10",
    videos: 8,
    pdfs: 6,
    assignments: 3,
    revenue: "$12,324",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Physics+Course",
  },
  {
    id: 3,
    title: "Organic Chemistry Advanced",
    instructor: "Dr. Lisa Anderson",
    description: "Deep dive into organic chemistry mechanisms and synthesis",
    students: 89,
    rating: 4.9,
    price: "$129",
    status: "Under Review",
    category: "Chemistry",
    createdDate: "2024-01-20",
    lastUpdated: "2024-01-25",
    videos: 15,
    pdfs: 12,
    assignments: 7,
    revenue: "$11,481",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Chemistry+Course",
  },
  {
    id: 4,
    title: "Biology Essentials",
    instructor: "Dr. James Wilson",
    description: "Essential biology concepts for beginners",
    students: 203,
    rating: 4.7,
    price: "$85",
    status: "Published",
    category: "Biology",
    createdDate: "2023-10-01",
    lastUpdated: "2024-01-05",
    videos: 10,
    pdfs: 9,
    assignments: 4,
    revenue: "$17,255",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Biology+Course",
  },
]

export default function StaffCourses() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || course.status.toLowerCase().replace(" ", "-") === filterStatus
    const matchesCategory = filterCategory === "all" || course.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleViewCourse = (course: any) => {
    setSelectedCourse(course)
    setIsViewModalOpen(true)
  }

  const handleApproveCourse = (courseId: number) => {
    console.log("Approving course:", courseId)
  }

  const handleRejectCourse = (courseId: number) => {
    console.log("Rejecting course:", courseId)
  }

  const handleSuspendCourse = (courseId: number) => {
    console.log("Suspending course:", courseId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Suspended":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Published":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Under Review":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Suspended":
        return <XCircle className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="staff" userName="Admin User">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600">Review and manage platform courses</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-[#1f4e89]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {courses.filter((c) => c.status === "Published").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Under Review</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {courses.filter((c) => c.status === "Under Review").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">
                    $
                    {courses
                      .reduce((sum, c) => sum + Number.parseInt(c.revenue.replace(/[$,]/g, "")), 0)
                      .toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-[#38b2ac]" />
              </div>
            </CardContent>
          </Card>
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
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
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
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{course.rating}</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-2">{course.description}</p>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <Play className="h-4 w-4" />
                        <span>{course.videos}</span>
                      </div>
                      <p className="text-xs text-gray-500">Videos</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>{course.pdfs}</span>
                      </div>
                      <p className="text-xs text-gray-500">PDFs</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{course.students}</span>
                      </div>
                      <p className="text-xs text-gray-500">Students</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[#1f4e89]">{course.price}</span>
                    <span className="text-gray-600">Revenue: {course.revenue}</span>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button size="sm" variant="outline" onClick={() => handleViewCourse(course)} className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {course.status === "Under Review" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApproveCourse(course.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleRejectCourse(course.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {course.status === "Published" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSuspendCourse(course.id)}
                        className="text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        Suspend
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Course Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedCourse?.title}</DialogTitle>
              <DialogDescription>Course Details and Statistics</DialogDescription>
            </DialogHeader>
            {selectedCourse && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <img
                    src={selectedCourse.thumbnail || "/placeholder.svg"}
                    alt={selectedCourse.title}
                    className="w-24 h-18 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCourse.status)}`}
                      >
                        {selectedCourse.status}
                      </span>
                      <span className="text-sm text-gray-500">by {selectedCourse.instructor}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{selectedCourse.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        {selectedCourse.rating}
                      </span>
                      <span>{selectedCourse.students} students</span>
                      <span>{selectedCourse.price}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Course Content</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Videos:</span>
                        <span>{selectedCourse.videos}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PDFs:</span>
                        <span>{selectedCourse.pdfs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assignments:</span>
                        <span>{selectedCourse.assignments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span>{selectedCourse.category}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Students:</span>
                        <span>{selectedCourse.students}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span className="font-medium text-green-600">{selectedCourse.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Created:</span>
                        <span>{selectedCourse.createdDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Updated:</span>
                        <span>{selectedCourse.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                    Close
                  </Button>
                  {selectedCourse.status === "Under Review" && (
                    <>
                      <Button
                        onClick={() => handleRejectCourse(selectedCourse.id)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => handleApproveCourse(selectedCourse.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
