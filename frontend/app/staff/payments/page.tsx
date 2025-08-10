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
  Download,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

const sidebarItems = [
  { href: "/staff", icon: <TrendingUp className="h-5 w-5" />, label: "Dashboard" },
  { href: "/staff/users", icon: <Users className="h-5 w-5" />, label: "Users" },
  { href: "/staff/courses", icon: <BookOpen className="h-5 w-5" />, label: "Courses" },
  { href: "/staff/payments", icon: <DollarSign className="h-5 w-5" />, label: "Payments", active: true },
  { href: "/staff/flags", icon: <Flag className="h-5 w-5" />, label: "Moderation" },
]

const payments = [
  {
    id: 1,
    transactionId: "TXN-2024-001",
    student: "Alice Johnson",
    course: "Advanced Mathematics",
    amount: "$99",
    method: "Credit Card",
    status: "Completed",
    date: "2024-01-30",
    instructor: "Dr. Sarah Johnson",
    commission: "$19.80",
    netAmount: "$79.20",
  },
  {
    id: 2,
    transactionId: "TXN-2024-002",
    student: "Bob Smith",
    course: "Physics Fundamentals",
    amount: "$79",
    method: "PayPal",
    status: "Completed",
    date: "2024-01-29",
    instructor: "Prof. Michael Chen",
    commission: "$15.80",
    netAmount: "$63.20",
  },
  {
    id: 3,
    transactionId: "TXN-2024-003",
    student: "Carol Davis",
    course: "Chemistry Basics",
    amount: "$89",
    method: "Credit Card",
    status: "Pending",
    date: "2024-01-28",
    instructor: "Dr. Emily Davis",
    commission: "$17.80",
    netAmount: "$71.20",
  },
  {
    id: 4,
    transactionId: "TXN-2024-004",
    student: "David Wilson",
    course: "Biology Essentials",
    amount: "$85",
    method: "Bank Transfer",
    status: "Failed",
    date: "2024-01-27",
    instructor: "Dr. James Wilson",
    commission: "$17.00",
    netAmount: "$68.00",
  },
  {
    id: 5,
    transactionId: "TXN-2024-005",
    student: "Emma Brown",
    course: "Organic Chemistry Advanced",
    amount: "$129",
    method: "Credit Card",
    status: "Completed",
    date: "2024-01-26",
    instructor: "Dr. Lisa Anderson",
    commission: "$25.80",
    netAmount: "$103.20",
  },
]

export default function StaffPayments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterMethod, setFilterMethod] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || payment.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesMethod = filterMethod === "all" || payment.method.toLowerCase().replace(" ", "-") === filterMethod
    return matchesSearch && matchesStatus && matchesMethod
  })

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsViewModalOpen(true)
  }

  const handleRefundPayment = (paymentId: number) => {
    console.log("Processing refund for payment:", paymentId)
  }

  const handleRetryPayment = (paymentId: number) => {
    console.log("Retrying payment:", paymentId)
  }

  const handleExportPayments = () => {
    console.log("Exporting payments data")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      case "Refunded":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Refunded":
        return <XCircle className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const totalRevenue = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + Number.parseFloat(p.amount.replace("$", "")), 0)

  const totalCommission = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + Number.parseFloat(p.commission.replace("$", "")), 0)

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="staff" userName="Admin User">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600">Monitor transactions and financial activity</p>
          </div>
          <Button onClick={handleExportPayments} className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-[#1f4e89]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Platform Commission</p>
                  <p className="text-3xl font-bold text-gray-900">${totalCommission.toFixed(2)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#38b2ac]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {payments.filter((p) => p.status === "Completed").length}
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
                  <p className="text-sm font-medium text-gray-600">Failed/Pending</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {payments.filter((p) => p.status === "Failed" || p.status === "Pending").length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
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
                  placeholder="Search payments..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterMethod} onValueChange={setFilterMethod}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payments List */}
        <div className="grid gap-4">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="rounded-2xl shadow-md border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1f4e89] rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{payment.transactionId}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}
                        >
                          {payment.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-1">
                        <span>{payment.student}</span>
                        <span>•</span>
                        <span>{payment.course}</span>
                        <span>•</span>
                        <span>by {payment.instructor}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span>{payment.date}</span>
                        <span>•</span>
                        <span>{payment.method}</span>
                        <span>•</span>
                        <span className="font-medium text-[#1f4e89]">{payment.amount}</span>
                        {payment.status === "Completed" && (
                          <>
                            <span>•</span>
                            <span>Commission: {payment.commission}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewPayment(payment)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {payment.status === "Failed" && (
                      <Button
                        size="sm"
                        onClick={() => handleRetryPayment(payment.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Retry
                      </Button>
                    )}
                    {payment.status === "Completed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRefundPayment(payment.id)}
                        className="text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        Refund
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Payment Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>{selectedPayment?.transactionId}</DialogDescription>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  {getStatusIcon(selectedPayment.status)}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPayment.status)}`}
                  >
                    {selectedPayment.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Transaction Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Transaction ID:</span>
                        <span className="font-mono">{selectedPayment.transactionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{selectedPayment.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span>{selectedPayment.method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-medium text-[#1f4e89]">{selectedPayment.amount}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Course & User</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Student:</span>
                        <span>{selectedPayment.student}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Course:</span>
                        <span>{selectedPayment.course}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Instructor:</span>
                        <span>{selectedPayment.instructor}</span>
                      </div>
                      {selectedPayment.status === "Completed" && (
                        <>
                          <div className="flex justify-between">
                            <span>Commission:</span>
                            <span className="text-[#38b2ac]">{selectedPayment.commission}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Net Amount:</span>
                            <span className="font-medium">{selectedPayment.netAmount}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                    Close
                  </Button>
                  {selectedPayment.status === "Failed" && (
                    <Button
                      onClick={() => handleRetryPayment(selectedPayment.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Retry Payment
                    </Button>
                  )}
                  {selectedPayment.status === "Completed" && (
                    <Button
                      onClick={() => handleRefundPayment(selectedPayment.id)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Process Refund
                    </Button>
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
