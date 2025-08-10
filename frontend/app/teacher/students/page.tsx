"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookOpen, Users, FileText, Upload, User, Search, Eye, MessageCircle, Mail, Phone } from "lucide-react"

const sidebarItems = [
  { href: "/teacher", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard" },
  { href: "/teacher/courses", icon: <BookOpen className="h-5 w-5" />, label: "Courses" },
  { href: "/teacher/upload", icon: <Upload className="h-5 w-5" />, label: "Upload Content" },
  { href: "/teacher/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments" },
  { href: "/teacher/students", icon: <Users className="h-5 w-5" />, label: "Students", active: true },
  { href: "/teacher/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1234567890",
    courses: ["Advanced Mathematics", "Physics Fundamentals"],
    progress: 85,
    lastActive: "2 hours ago",
    assignments: { completed: 8, pending: 2 },
    avatar: "/placeholder.svg?height=40&width=40&text=AJ",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1234567891",
    courses: ["Advanced Mathematics"],
    progress: 72,
    lastActive: "1 day ago",
    assignments: { completed: 6, pending: 4 },
    avatar: "/placeholder.svg?height=40&width=40&text=BS",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+1234567892",
    courses: ["Chemistry Basics", "Biology Essentials"],
    progress: 91,
    lastActive: "30 minutes ago",
    assignments: { completed: 12, pending: 1 },
    avatar: "/placeholder.svg?height=40&width=40&text=CD",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1234567893",
    courses: ["Physics Fundamentals", "Advanced Mathematics"],
    progress: 68,
    lastActive: "3 hours ago",
    assignments: { completed: 5, pending: 5 },
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
  },
]

export default function TeacherStudents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "all" || student.courses.includes(selectedCourse)
    return matchesSearch && matchesCourse
  })

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student)
    setIsViewModalOpen(true)
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600 bg-green-100"
    if (progress >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="teacher" userName="Dr. Sarah Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">Manage and track your students' progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{students.length}</p>
                </div>
                <Users className="h-8 w-8 text-[#1f4e89]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Today</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {students.filter((s) => s.lastActive.includes("hour") || s.lastActive.includes("minute")).length}
                  </p>
                </div>
                <User className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
                  </p>
                </div>
                <FileText className="h-8 w-8 text-[#38b2ac]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Assignments</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {students.reduce((sum, s) => sum + s.assignments.pending, 0)}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-yellow-500" />
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
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="Advanced Mathematics">Advanced Mathematics</SelectItem>
                  <SelectItem value="Physics Fundamentals">Physics Fundamentals</SelectItem>
                  <SelectItem value="Chemistry Basics">Chemistry Basics</SelectItem>
                  <SelectItem value="Biology Essentials">Biology Essentials</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <div className="grid gap-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="rounded-2xl shadow-md border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={student.avatar || "/placeholder.svg"}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {student.email}
                        </span>
                        <span>Last active: {student.lastActive}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {student.courses.map((course, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#1f4e89]/10 text-[#1f4e89] rounded-full text-xs font-medium"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(student.progress)}`}
                      >
                        {student.progress}%
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Progress</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">
                        {student.assignments.completed}/{student.assignments.completed + student.assignments.pending}
                      </p>
                      <p className="text-xs text-gray-500">Assignments</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewStudent(student)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Student Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedStudent?.name}</DialogTitle>
              <DialogDescription>Student Details and Progress</DialogDescription>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedStudent.avatar || "/placeholder.svg"}
                    alt={selectedStudent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {selectedStudent.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {selectedStudent.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Enrolled Courses</h4>
                    <div className="space-y-2">
                      {selectedStudent.courses.map((course: string, index: number) => (
                        <div key={index} className="p-2 bg-gray-50 rounded-lg">
                          {course}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Assignment Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Completed:</span>
                        <span className="font-medium text-green-600">{selectedStudent.assignments.completed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pending:</span>
                        <span className="font-medium text-yellow-600">{selectedStudent.assignments.pending}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Progress:</span>
                        <span className={`font-medium ${getProgressColor(selectedStudent.progress).split(" ")[0]}`}>
                          {selectedStudent.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                    Close
                  </Button>
                  <Button className="bg-[#1f4e89] hover:bg-[#1a4077]">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
