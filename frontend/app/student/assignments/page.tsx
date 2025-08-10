"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookOpen, FileText, Search, User, Calendar, Clock, CheckCircle, AlertCircle, Upload, Eye } from "lucide-react"

const sidebarItems = [
  { href: "/student", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard" },
  { href: "/student/courses", icon: <BookOpen className="h-5 w-5" />, label: "My Courses" },
  { href: "/student/browse", icon: <Search className="h-5 w-5" />, label: "Browse Courses" },
  { href: "/student/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments", active: true },
  { href: "/student/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

const assignments = [
  {
    id: 1,
    title: "Calculus Problem Set",
    course: "Advanced Mathematics",
    instructor: "Dr. Sarah Johnson",
    dueDate: "2024-02-01",
    status: "Submitted",
    grade: "A",
    description: "Solve the given calculus problems focusing on derivatives and integrals",
    submittedAt: "2024-01-30",
  },
  {
    id: 2,
    title: "Integration Project",
    course: "Advanced Mathematics",
    instructor: "Dr. Sarah Johnson",
    dueDate: "2024-02-08",
    status: "Pending",
    grade: null,
    description: "Complete the integration techniques project with real-world applications",
    submittedAt: null,
  },
  {
    id: 3,
    title: "Physics Lab Report",
    course: "Physics Fundamentals",
    instructor: "Prof. Michael Chen",
    dueDate: "2024-02-15",
    status: "Not Started",
    grade: null,
    description: "Write a comprehensive lab report on Newton's laws experiment",
    submittedAt: null,
  },
  {
    id: 4,
    title: "Chemical Equations Quiz",
    course: "Chemistry Basics",
    instructor: "Dr. Emily Davis",
    dueDate: "2024-02-20",
    status: "In Progress",
    grade: null,
    description: "Balance chemical equations and explain reaction mechanisms",
    submittedAt: null,
  },
]

export default function StudentAssignments() {
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [submissionText, setSubmissionText] = useState("")
  const [submissionFile, setSubmissionFile] = useState<File | null>(null)

  const filteredAssignments = assignments.filter((assignment) => {
    if (filterStatus === "all") return true
    return assignment.status.toLowerCase().replace(" ", "-") === filterStatus
  })

  const handleSubmitAssignment = () => {
    console.log("Submitting assignment:", {
      assignmentId: selectedAssignment?.id,
      text: submissionText,
      file: submissionFile,
    })
    setIsSubmitModalOpen(false)
    setSubmissionText("")
    setSubmissionFile(null)
    setSelectedAssignment(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Not Started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Submitted":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "In Progress":
        return <AlertCircle className="h-5 w-5 text-blue-600" />
      case "Not Started":
        return <FileText className="h-5 w-5 text-gray-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="student" userName="Alex Thompson">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600">Track and submit your course assignments</p>
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
                  <p className="text-sm font-medium text-gray-600">Submitted</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {assignments.filter((a) => a.status === "Submitted").length}
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
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {assignments.filter((a) => a.status === "Pending" || a.status === "In Progress").length}
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
                  <p className="text-sm font-medium text-gray-600">Average Grade</p>
                  <p className="text-3xl font-bold text-gray-900">A-</p>
                </div>
                <BookOpen className="h-8 w-8 text-[#38b2ac]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <Card className="rounded-2xl shadow-md border-0">
          <CardContent className="p-6">
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
                className={filterStatus === "all" ? "bg-[#1f4e89] hover:bg-[#1a4077]" : ""}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "not-started" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("not-started")}
                className={filterStatus === "not-started" ? "bg-[#1f4e89] hover:bg-[#1a4077]" : ""}
              >
                Not Started
              </Button>
              <Button
                variant={filterStatus === "in-progress" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("in-progress")}
                className={filterStatus === "in-progress" ? "bg-[#1f4e89] hover:bg-[#1a4077]" : ""}
              >
                In Progress
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
                className={filterStatus === "pending" ? "bg-[#1f4e89] hover:bg-[#1a4077]" : ""}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "submitted" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("submitted")}
                className={filterStatus === "submitted" ? "bg-[#1f4e89] hover:bg-[#1a4077]" : ""}
              >
                Submitted
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Assignments List */}
        <div className="grid gap-6">
          {filteredAssignments.map((assignment) => {
            const daysUntilDue = getDaysUntilDue(assignment.dueDate)
            return (
              <Card key={assignment.id} className="rounded-2xl shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#1f4e89] rounded-lg flex items-center justify-center">
                        {getStatusIcon(assignment.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}
                          >
                            {assignment.status}
                          </span>
                          {assignment.grade && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Grade: {assignment.grade}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{assignment.description}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {assignment.course}
                          </span>
                          <span>by {assignment.instructor}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {assignment.dueDate}
                          </span>
                          {daysUntilDue > 0 && assignment.status !== "Submitted" && (
                            <span
                              className={`flex items-center gap-1 ${
                                daysUntilDue <= 3
                                  ? "text-red-600"
                                  : daysUntilDue <= 7
                                    ? "text-yellow-600"
                                    : "text-green-600"
                              }`}
                            >
                              <Clock className="h-4 w-4" />
                              {daysUntilDue} days left
                            </span>
                          )}
                          {assignment.submittedAt && (
                            <span className="text-green-600">Submitted on {assignment.submittedAt}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {assignment.status === "Submitted" ? (
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Submission
                        </Button>
                      ) : (
                        <Dialog
                          open={isSubmitModalOpen && selectedAssignment?.id === assignment.id}
                          onOpenChange={(open) => {
                            setIsSubmitModalOpen(open)
                            if (open) setSelectedAssignment(assignment)
                            else setSelectedAssignment(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                              {assignment.status === "Not Started" ? "Start" : "Continue"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Submit Assignment</DialogTitle>
                              <DialogDescription>{assignment.title}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div>
                                <p className="text-sm text-gray-600 mb-4">{assignment.description}</p>
                                <div className="text-sm text-gray-500">
                                  <p>Course: {assignment.course}</p>
                                  <p>Due Date: {assignment.dueDate}</p>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Written Response
                                  </label>
                                  <Textarea
                                    placeholder="Enter your response here..."
                                    value={submissionText}
                                    onChange={(e) => setSubmissionText(e.target.value)}
                                    rows={6}
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload File (Optional)
                                  </label>
                                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 mb-2">
                                      Drag and drop your file here, or click to browse
                                    </p>
                                    <input
                                      type="file"
                                      onChange={(e) => setSubmissionFile(e.target.files?.[0] || null)}
                                      className="hidden"
                                      id="file-upload"
                                    />
                                    <label htmlFor="file-upload">
                                      <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                                        Choose File
                                      </Button>
                                    </label>
                                    {submissionFile && (
                                      <p className="text-sm text-green-600 mt-2">Selected: {submissionFile.name}</p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setIsSubmitModalOpen(false)}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleSubmitAssignment}
                                  disabled={!submissionText.trim()}
                                  className="bg-[#1f4e89] hover:bg-[#1a4077]"
                                >
                                  Submit Assignment
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAssignments.length === 0 && (
          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
              <p className="text-gray-600">No assignments match the selected filter</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
