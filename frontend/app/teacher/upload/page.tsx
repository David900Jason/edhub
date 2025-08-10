"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Users, FileText, Upload, User, Video, FileImage, X, Check } from "lucide-react"
import { useRouter } from "next/navigation"

const sidebarItems = [
  { href: "/teacher", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard" },
  { href: "/teacher/courses", icon: <BookOpen className="h-5 w-5" />, label: "Courses" },
  { href: "/teacher/upload", icon: <Upload className="h-5 w-5" />, label: "Upload Content", active: true },
  { href: "/teacher/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments" },
  { href: "/teacher/students", icon: <Users className="h-5 w-5" />, label: "Students" },
  { href: "/teacher/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

const courses = [
  { id: 1, title: "Advanced Mathematics" },
  { id: 2, title: "Physics Fundamentals" },
  { id: 3, title: "Chemistry Basics" },
  { id: 4, title: "Biology Essentials" },
]

export default function TeacherUpload() {
  const [contentType, setContentType] = useState("video")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedCourse || !title || !file) return

    setIsUploading(true)
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsUploading(false)

    // Reset form
    setTitle("")
    setDescription("")
    setFile(null)
    setSelectedCourse("")

    // Redirect to courses
    router.push("/teacher/courses")
  }

  const getAcceptedFileTypes = () => {
    switch (contentType) {
      case "video":
        return "video/*"
      case "pdf":
        return ".pdf"
      case "image":
        return "image/*"
      default:
        return "*"
    }
  }

  const getFileIcon = () => {
    switch (contentType) {
      case "video":
        return <Video className="h-12 w-12 text-blue-500" />
      case "pdf":
        return <FileText className="h-12 w-12 text-red-500" />
      case "image":
        return <FileImage className="h-12 w-12 text-green-500" />
      default:
        return <Upload className="h-12 w-12 text-gray-400" />
    }
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="teacher" userName="Dr. Sarah Johnson">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upload Content</h1>
          <p className="text-gray-600">Add new videos, PDFs, or images to your courses</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Type Selection */}
          <Card className="rounded-2xl shadow-md border-0">
            <CardHeader>
              <CardTitle>Content Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { value: "video", label: "Video Lecture", icon: <Video className="h-5 w-5" /> },
                { value: "pdf", label: "PDF Document", icon: <FileText className="h-5 w-5" /> },
                { value: "image", label: "Image/Diagram", icon: <FileImage className="h-5 w-5" /> },
              ].map((type) => (
                <Button
                  key={type.value}
                  variant={contentType === type.value ? "default" : "outline"}
                  className={`w-full justify-start gap-3 ${
                    contentType === type.value ? "bg-[#1f4e89] hover:bg-[#1a4077]" : ""
                  }`}
                  onClick={() => setContentType(type.value)}
                >
                  {type.icon}
                  {type.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Upload Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl shadow-md border-0">
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Course</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder={`Enter ${contentType} title`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Textarea
                    placeholder="Describe the content..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="rounded-2xl shadow-md border-0">
              <CardHeader>
                <CardTitle>Upload File</CardTitle>
              </CardHeader>
              <CardContent>
                {file ? (
                  <div className="border-2 border-dashed border-green-300 bg-green-50 rounded-lg p-8">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFile(null)}
                        className="text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                      dragActive
                        ? "border-[#1f4e89] bg-[#1f4e89]/5"
                        : "border-gray-300 hover:border-[#1f4e89] hover:bg-gray-50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {getFileIcon()}
                    <p className="text-gray-600 mb-4 mt-4">
                      Drag and drop your {contentType} file here, or click to browse
                    </p>
                    <input
                      type="file"
                      accept={getAcceptedFileTypes()}
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                        Choose File
                      </Button>
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      {contentType === "video" && "MP4, AVI, MOV up to 500MB"}
                      {contentType === "pdf" && "PDF files up to 50MB"}
                      {contentType === "image" && "PNG, JPG, GIF up to 10MB"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleUpload}
                disabled={!selectedCourse || !title || !file || isUploading}
                className="bg-[#1f4e89] hover:bg-[#1a4077] text-white px-8"
              >
                {isUploading ? "Uploading..." : `Upload ${contentType}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
