"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, FileText, Search, User, Camera, Save, Edit, Award, Clock, TrendingUp } from "lucide-react"

const sidebarItems = [
  { href: "/student", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard" },
  { href: "/student/courses", icon: <BookOpen className="h-5 w-5" />, label: "My Courses" },
  { href: "/student/browse", icon: <Search className="h-5 w-5" />, label: "Browse Courses" },
  { href: "/student/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments" },
  { href: "/student/profile", icon: <User className="h-5 w-5" />, label: "Profile", active: true },
]

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Alex",
    lastName: "Thompson",
    email: "alex.thompson@email.com",
    phone: "+1234567890",
    bio: "Passionate student pursuing advanced mathematics and science courses. Love learning new concepts and applying them to real-world problems.",
    grade: "الصف الثالث الثانوي",
    section: "علمي رياضة",
    school: "مدرسة النور الثانوية",
    governorate: "القاهرة",
    city: "مدينة نصر",
    birthDate: "2005-03-15",
    interests: "Mathematics, Physics, Programming",
  })

  const handleSave = () => {
    console.log("Saving profile:", profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="student" userName="Alex Thompson">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your profile information and preferences</p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-[#1f4e89] hover:bg-[#1a4077] text-white"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture and Stats */}
          <Card className="rounded-2xl shadow-md border-0">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src="/placeholder.svg?height=120&width=120&text=AT"
                  alt="Profile"
                  className="w-30 h-30 rounded-full object-cover mx-auto"
                />
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-[#1f4e89] hover:bg-[#1a4077]"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600 mb-4">
                {profileData.grade} - {profileData.section}
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>{profileData.school}</p>
                <p>
                  {profileData.city}, {profileData.governorate}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#1f4e89] rounded-full flex items-center justify-center mx-auto mb-2">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                    <p className="text-xs text-gray-600">Courses</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#38b2ac] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">42</p>
                    <p className="text-xs text-gray-600">Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#1f4e89] rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">120h</p>
                    <p className="text-xs text-gray-600">Study Time</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#38b2ac] rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">85%</p>
                    <p className="text-xs text-gray-600">Avg Score</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl shadow-md border-0">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md border-0">
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Grade</Label>
                    <Select
                      value={profileData.grade}
                      onValueChange={(value) => handleInputChange("grade", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="الصف الثالث الثانوي">الصف الثالث الثانوي</SelectItem>
                        <SelectItem value="الصف الثاني الثانوي">الصف الثاني الثانوي</SelectItem>
                        <SelectItem value="الصف الأول الثانوي">الصف الأول الثانوي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Section</Label>
                    <Select
                      value={profileData.section}
                      onValueChange={(value) => handleInputChange("section", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="علمي رياضة">علمي رياضة</SelectItem>
                        <SelectItem value="علمي علوم">علمي علوم</SelectItem>
                        <SelectItem value="أدبي">أدبي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>School Name</Label>
                  <Input
                    value={profileData.school}
                    onChange={(e) => handleInputChange("school", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Governorate</Label>
                    <Select
                      value={profileData.governorate}
                      onValueChange={(value) => handleInputChange("governorate", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="القاهرة">القاهرة</SelectItem>
                        <SelectItem value="الجيزة">الجيزة</SelectItem>
                        <SelectItem value="الإسكندرية">الإسكندرية</SelectItem>
                        <SelectItem value="كفر الشيخ">كفر الشيخ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      value={profileData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Birth Date</Label>
                    <Input
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => handleInputChange("birthDate", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Interests</Label>
                    <Input
                      value={profileData.interests}
                      onChange={(e) => handleInputChange("interests", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Mathematics, Physics, etc."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card className="rounded-2xl shadow-md border-0">
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { subject: "Advanced Mathematics", progress: 85, color: "bg-[#1f4e89]" },
                    { subject: "Physics Fundamentals", progress: 72, color: "bg-[#38b2ac]" },
                    { subject: "Chemistry Basics", progress: 91, color: "bg-[#1f4e89]" },
                    { subject: "Biology Essentials", progress: 68, color: "bg-[#38b2ac]" },
                  ].map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{subject.subject}</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${subject.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${subject.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
