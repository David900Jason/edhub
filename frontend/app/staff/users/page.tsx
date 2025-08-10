"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Users,
  BookOpen,
  DollarSign,
  Flag,
  TrendingUp,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  UserCheck,
  UserX,
  Mail,
  Phone,
} from "lucide-react"

const sidebarItems = [
  { href: "/staff", icon: <TrendingUp className="h-5 w-5" />, label: "Dashboard" },
  { href: "/staff/users", icon: <Users className="h-5 w-5" />, label: "Users", active: true },
  { href: "/staff/courses", icon: <BookOpen className="h-5 w-5" />, label: "Courses" },
  { href: "/staff/payments", icon: <DollarSign className="h-5 w-5" />, label: "Payments" },
  { href: "/staff/flags", icon: <Flag className="h-5 w-5" />, label: "Moderation" },
]

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1234567890",
    role: "Student",
    status: "Active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    coursesEnrolled: 3,
    totalSpent: "$297",
    avatar: "/placeholder.svg?height=40&width=40&text=AJ",
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@droosy.com",
    phone: "+1234567891",
    role: "Teacher",
    status: "Active",
    joinDate: "2023-12-01",
    lastActive: "1 hour ago",
    coursesCreated: 12,
    totalEarnings: "$15,420",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
  },
  {
    id: 3,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1234567892",
    role: "Student",
    status: "Suspended",
    joinDate: "2024-01-20",
    lastActive: "1 week ago",
    coursesEnrolled: 1,
    totalSpent: "$99",
    avatar: "/placeholder.svg?height=40&width=40&text=BS",
  },
  {
    id: 4,
    name: "Prof. Michael Chen",
    email: "michael.chen@droosy.com",
    phone: "+1234567893",
    role: "Teacher",
    status: "Active",
    joinDate: "2023-11-15",
    lastActive: "30 minutes ago",
    coursesCreated: 8,
    totalEarnings: "$9,850",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
  },
]

export default function StaffUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase()
    const matchesStatus = filterStatus === "all" || user.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setIsViewModalOpen(true)
  }

  const handleCreateUser = () => {
    console.log("Creating user:", newUser)
    setIsCreateModalOpen(false)
    setNewUser({ name: "", email: "", phone: "", role: "" })
  }

  const handleSuspendUser = (userId: number) => {
    console.log("Suspending user:", userId)
  }

  const handleActivateUser = (userId: number) => {
    console.log("Activating user:", userId)
  }

  const handleDeleteUser = (userId: number) => {
    console.log("Deleting user:", userId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Teacher":
        return "bg-blue-100 text-blue-800"
      case "Student":
        return "bg-purple-100 text-purple-800"
      case "Admin":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="staff" userName="Admin User">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage platform users and their permissions</p>
          </div>

          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={newUser.name}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newUser.email}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={newUser.phone}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateUser} className="bg-[#1f4e89] hover:bg-[#1a4077]">
                  Create User
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
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-[#1f4e89]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Students</p>
                  <p className="text-3xl font-bold text-gray-900">{users.filter((u) => u.role === "Student").length}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Teachers</p>
                  <p className="text-3xl font-bold text-gray-900">{users.filter((u) => u.role === "Teacher").length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-[#38b2ac]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Suspended</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {users.filter((u) => u.status === "Suspended").length}
                  </p>
                </div>
                <UserX className="h-8 w-8 text-red-500" />
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="teacher">Teachers</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="rounded-2xl shadow-md border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {user.phone}
                        </span>
                        <span>Joined: {user.joinDate}</span>
                        <span>Last active: {user.lastActive}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        {user.role === "Student" && (
                          <>
                            <span>{user.coursesEnrolled} courses enrolled</span>
                            <span>Total spent: {user.totalSpent}</span>
                          </>
                        )}
                        {user.role === "Teacher" && (
                          <>
                            <span>{user.coursesCreated} courses created</span>
                            <span>Total earnings: {user.totalEarnings}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewUser(user)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {user.status === "Active" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSuspendUser(user.id)}
                        className="text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleActivateUser(user.id)}
                        className="text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View User Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedUser?.name}</DialogTitle>
              <DialogDescription>User Details and Activity</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedUser.avatar || "/placeholder.svg"}
                    alt={selectedUser.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                        {selectedUser.role}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}
                      >
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {selectedUser.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {selectedUser.phone}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Account Details</h4>
                    <div className="space-y-2 text-sm">
                      <p>Join Date: {selectedUser.joinDate}</p>
                      <p>Last Active: {selectedUser.lastActive}</p>
                      {selectedUser.role === "Student" && (
                        <>
                          <p>Courses: {selectedUser.coursesEnrolled}</p>
                          <p>Total Spent: {selectedUser.totalSpent}</p>
                        </>
                      )}
                      {selectedUser.role === "Teacher" && (
                        <>
                          <p>Courses Created: {selectedUser.coursesCreated}</p>
                          <p>Total Earnings: {selectedUser.totalEarnings}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                    Close
                  </Button>
                  <Button className="bg-[#1f4e89] hover:bg-[#1a4077]">
                    <Mail className="h-4 w-4 mr-2" />
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
