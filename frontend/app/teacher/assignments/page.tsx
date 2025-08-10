"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
} from "lucide-react"

const sidebarItems = [
  { href: "/teacher", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard" },
  { href: "/teacher/courses", icon: <BookOpen className="h-5 w-5" />, label: "Courses" },
  { href: "/teacher/upload", icon: <Upload className="h-5 w-5" />, label: "Upload Content" },
  { href: "/teacher/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments", active: true },
  { href: "/teacher/students", icon: <Users className="h-5 w-5" />, label: "Students" },
  { href: "/teacher/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

const assignments = [
  {
    id: 1,
    title: "Calculus Problem Set",
    course: "Advanced Mathematics",
    dueDate: "2024-02-01",
    submissions: 35,
    totalStudents: 45,
    status: "Active",
    description: "Solve the given calculus problems focusing on derivatives and integrals",
  },
  {
    id: 2,
    title: "Integration Project",
    course: "Advanced Mathematics",
    dueDate: "2024-02-08",
    submissions: 28,
    totalStudents: 45,
    status: "Active",
    description: "Complete the integration techniques project with real-world applications",
  },
  {
    id: 3,
    title: "Physics Lab Report",
    course: "Physics Fundamentals",
    dueDate: "2024-02-15",
    submissions: 0,
    totalStudents: 38,
    status: "Draft",
    description: "Write a comprehensive lab report on Newton's laws experiment",
  },
  {
    id: 4,
    title: "Chemical Equations Quiz",
    course: "Chemistry Basics",
    dueDate: "2024-02-20",
    submissions: 15,
    totalStudents: 52,
    status: "Active",
    description: "Balance chemical equations and explain reaction mechanisms",
  },
]

const courses = [
  { id: 1, title: "Advanced Mathematics" },
  { id: 2, title: "Physics Fundamentals" },
  { id: 3, title: "Chemistry Basics" },
  { id: 4, title: "Biology Essentials" },
]

export default function TeacherAssignments() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    description: "",
    dueDate: "",
    instructions: "",
  })

  const handleCreateAssignment = () => {
    console.log("Creating assignment:", newAssignment)
    setIsCreateModalOpen(false)
    setNewAssignment({ title: "", course: "", description: "", dueDate: "", instructions: "" })
  }

  const handleViewAssignment = (assignment: any) => {
    setSelectedAssignment(assignment)
    setIsViewModalOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="teacher" userName="Dr. Sarah Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
            <p className="text-gray-600">Create and manage assignments for your courses</p>
          </div>

          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>Add a new assignment for your students</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assignment Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter assignment title"
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select
                      value={newAssignment.course}
                      onValueChange={(value) => setNewAssignment((prev) => ({ ...prev, course: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.title}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the assignment"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Detailed instructions for students"
                    value={newAssignment.instructions}
                    onChange={(e) => setNewAssignment((prev) => ({ ...prev, instructions: e.target.value }))}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment((prev) => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAssignment} className="bg-[#1f4e89] hover:bg-[#1a4077]">
                  Create Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                  <p className="text-3xl font-bold text-gray-900">{assignments.length}</p>
                </div>
                <FileText className="h-8 w-8 text-[#1f4e89]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {assignments.filter((a) => a.status === "Active").length}
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
                  <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {assignments.reduce((sum, a) => sum + a.submissions, 0)}
                  </p>
                </div>
                <Upload className="h-8 w-8 text-[#38b2ac]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="grid gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="rounded-2xl shadow-md border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1f4e89] rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}
                        >
                          {assignment.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{assignment.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {assignment.course}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {assignment.dueDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {assignment.submissions}/{assignment.totalStudents} submitted
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewAssignment(assignment)}>
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

        {/* View Assignment Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedAssignment?.title}</DialogTitle>
              <DialogDescription>{selectedAssignment?.course}</DialogDescription>
            </DialogHeader>
            {selectedAssignment && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Due Date</Label>
                    <p className="text-lg">{selectedAssignment.dueDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Submissions</Label>
                    <p className="text-lg">
                      {selectedAssignment.submissions}/{selectedAssignment.totalStudents}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Description</Label>
                  <p className="text-gray-900 mt-1">{selectedAssignment.description}</p>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                    Close
                  </Button>
                  <Button className="bg-[#1f4e89] hover:bg-[#1a4077]">View Submissions</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
