"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  AlertTriangle,
  User,
} from "lucide-react"

const sidebarItems = [
  { href: "/staff", icon: <TrendingUp className="h-5 w-5" />, label: "Dashboard" },
  { href: "/staff/users", icon: <Users className="h-5 w-5" />, label: "Users" },
  { href: "/staff/courses", icon: <BookOpen className="h-5 w-5" />, label: "Courses" },
  { href: "/staff/payments", icon: <DollarSign className="h-5 w-5" />, label: "Payments" },
  { href: "/staff/flags", icon: <Flag className="h-5 w-5" />, label: "Moderation", active: true },
]

const flags = [
  {
    id: 1,
    type: "Inappropriate Content",
    reportedBy: "Alice Johnson",
    targetUser: "Bob Smith",
    targetContent: "Course: Physics Fundamentals - Video: Newton's Laws",
    description: "Contains inappropriate language and offensive remarks",
    status: "Pending",
    priority: "High",
    reportDate: "2024-01-30",
    category: "Content",
  },
  {
    id: 2,
    type: "Spam",
    reportedBy: "Carol Davis",
    targetUser: "Dr. Fake Teacher",
    targetContent: "Course: Get Rich Quick - Multiple promotional videos",
    description: "Promoting non-educational content and spam courses",
    status: "Under Review",
    priority: "Medium",
    reportDate: "2024-01-29",
    category: "User",
  },
  {
    id: 3,
    type: "Copyright Violation",
    reportedBy: "System Auto-Detection",
    targetUser: "John Doe",
    targetContent: "Course: Advanced Math - PDF: Calculus Textbook",
    description: "Uploaded copyrighted material without permission",
    status: "Resolved",
    priority: "High",
    reportDate: "2024-01-28",
    category: "Content",
    resolution: "Content removed and user warned",
  },
  {
    id: 4,
    type: "Harassment",
    reportedBy: "Emma Wilson",
    targetUser: "David Brown",
    targetContent: "Course comments and direct messages",
    description: "Sending inappropriate messages and harassing behavior",
    status: "Pending",
    priority: "Critical",
    reportDate: "2024-01-27",
    category: "User",
  },
]

export default function StaffFlags() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [selectedFlag, setSelectedFlag] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [resolution, setResolution] = useState("")

  const filteredFlags = flags.filter((flag) => {
    const matchesSearch =
      flag.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.targetUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || flag.status.toLowerCase().replace(" ", "-") === filterStatus
    const matchesPriority = filterPriority === "all" || flag.priority.toLowerCase() === filterPriority.toLowerCase()
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleViewFlag = (flag: any) => {
    setSelectedFlag(flag)
    setIsViewModalOpen(true)
  }

  const handleResolveFlag = (flagId: number, action: string) => {
    console.log(`${action} flag:`, flagId, "Resolution:", resolution)
    setIsViewModalOpen(false)
    setResolution("")
  }

  const handleDismissFlag = (flagId: number) => {
    console.log("Dismissing flag:", flagId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Dismissed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "Under Review":
        return <Eye className="h-4 w-4 text-blue-600" />
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Dismissed":
        return <XCircle className="h-4 w-4 text-gray-600" />
      default:
        return <Flag className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="staff" userName="Admin User">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
          <p className="text-gray-600">Review and manage reported content and user behavior</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Flags</p>
                  <p className="text-3xl font-bold text-gray-900">{flags.length}</p>
                </div>
                <Flag className="h-8 w-8 text-[#1f4e89]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {flags.filter((f) => f.status === "Pending").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Priority</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {flags.filter((f) => f.priority === "Critical").length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {flags.filter((f) => f.status === "Resolved").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
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
                  placeholder="Search flags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Flags List */}
        <div className="grid gap-4">
          {filteredFlags.map((flag) => (
            <Card key={flag.id} className="rounded-2xl shadow-md border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Flag className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{flag.type}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(flag.status)}`}>
                          {flag.status}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(flag.priority)}`}
                        >
                          {flag.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{flag.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-1">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          Reported by: {flag.reportedBy}
                        </span>
                        <span>Target: {flag.targetUser}</span>
                        <span>Date: {flag.reportDate}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Content:</span> {flag.targetContent}
                      </div>
                      {flag.resolution && (
                        <div className="mt-2 p-2 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium text-green-800">Resolution: </span>
                          <span className="text-sm text-green-700">{flag.resolution}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewFlag(flag)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {flag.status === "Pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDismissFlag(flag.id)}
                        className="text-gray-600 hover:bg-gray-50 bg-transparent"
                      >
                        Dismiss
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Flag Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Flag Details</DialogTitle>
              <DialogDescription>{selectedFlag?.type}</DialogDescription>
            </DialogHeader>
            {selectedFlag && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  {getStatusIcon(selectedFlag.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedFlag.status)}`}>
                    {selectedFlag.status}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedFlag.priority)}`}
                  >
                    {selectedFlag.priority} Priority
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Report Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span>{selectedFlag.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reported By:</span>
                        <span>{selectedFlag.reportedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Target User:</span>
                        <span>{selectedFlag.targetUser}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{selectedFlag.reportDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span>{selectedFlag.category}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Content Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Target Content:</span>
                        <p className="text-gray-600 mt-1">{selectedFlag.targetContent}</p>
                      </div>
                      <div>
                        <span className="font-medium">Description:</span>
                        <p className="text-gray-600 mt-1">{selectedFlag.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedFlag.status !== "Resolved" && selectedFlag.status !== "Dismissed" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Notes</label>
                      <Textarea
                        placeholder="Enter resolution details..."
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {selectedFlag.resolution && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Previous Resolution</h4>
                    <p className="text-sm text-green-700">{selectedFlag.resolution}</p>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                    Close
                  </Button>
                  {selectedFlag.status !== "Resolved" && selectedFlag.status !== "Dismissed" && (
                    <>
                      <Button
                        onClick={() => handleResolveFlag(selectedFlag.id, "Dismiss")}
                        className="bg-gray-600 hover:bg-gray-700 text-white"
                      >
                        Dismiss
                      </Button>
                      <Button
                        onClick={() => handleResolveFlag(selectedFlag.id, "Resolve")}
                        disabled={!resolution.trim()}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Resolve
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
