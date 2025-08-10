"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, FileText, Search, User, Star, Users, Clock, Play, ShoppingCart } from "lucide-react"

const sidebarItems = [
  { href: "/student", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard" },
  { href: "/student/courses", icon: <BookOpen className="h-5 w-5" />, label: "My Courses" },
  { href: "/student/browse", icon: <Search className="h-5 w-5" />, label: "Browse Courses", active: true },
  { href: "/student/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments" },
  { href: "/student/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

const availableCourses = [
  {
    id: 5,
    title: "Organic Chemistry Advanced",
    instructor: "Dr. Lisa Anderson",
    description: "Deep dive into organic chemistry mechanisms and synthesis",
    price: "$129",
    rating: 4.9,
    students: 156,
    duration: "8 weeks",
    level: "Advanced",
    category: "Chemistry",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Organic+Chemistry",
    lessons: 32,
    enrolled: false,
  },
  {
    id: 6,
    title: "Linear Algebra Fundamentals",
    instructor: "Prof. Robert Kim",
    description: "Essential linear algebra concepts for engineering and science",
    price: "$99",
    rating: 4.7,
    students: 203,
    duration: "6 weeks",
    level: "Intermediate",
    category: "Mathematics",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Linear+Algebra",
    lessons: 24,
    enrolled: false,
  },
  {
    id: 7,
    title: "Quantum Physics Introduction",
    instructor: "Dr. Maria Rodriguez",
    description: "Introduction to quantum mechanics and modern physics",
    price: "$149",
    rating: 4.8,
    students: 89,
    duration: "10 weeks",
    level: "Advanced",
    category: "Physics",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Quantum+Physics",
    lessons: 40,
    enrolled: false,
  },
  {
    id: 8,
    title: "Molecular Biology Basics",
    instructor: "Dr. John Thompson",
    description: "Fundamentals of molecular biology and genetics",
    price: "$89",
    rating: 4.6,
    students: 178,
    duration: "7 weeks",
    level: "Beginner",
    category: "Biology",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Molecular+Biology",
    lessons: 28,
    enrolled: false,
  },
  {
    id: 9,
    title: "Statistics for Data Science",
    instructor: "Prof. Sarah Chen",
    description: "Statistical methods and analysis for data science applications",
    price: "$119",
    rating: 4.8,
    students: 245,
    duration: "9 weeks",
    level: "Intermediate",
    category: "Mathematics",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Statistics",
    lessons: 36,
    enrolled: false,
  },
  {
    id: 10,
    title: "Environmental Science",
    instructor: "Dr. Michael Green",
    description: "Understanding environmental systems and sustainability",
    price: "$79",
    rating: 4.5,
    students: 134,
    duration: "8 weeks",
    level: "Beginner",
    category: "Science",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Environmental+Science",
    lessons: 30,
    enrolled: false,
  },
]

export default function StudentBrowse() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const filteredCourses = availableCourses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
      return matchesSearch && matchesCategory && matchesLevel
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return Number.parseInt(a.price.replace("$", "")) - Number.parseInt(b.price.replace("$", ""))
        case "price-high":
          return Number.parseInt(b.price.replace("$", "")) - Number.parseInt(a.price.replace("$", ""))
        case "popular":
        default:
          return b.students - a.students
      }
    })

  const handleEnrollCourse = (courseId: number) => {
    console.log("Enrolling in course:", courseId)
    // Here you would typically handle the enrollment process
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="student" userName="Alex Thompson">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
          <p className="text-gray-600">Discover new courses to expand your knowledge</p>
        </div>

        {/* Search and Filters */}
        <Card className="rounded-2xl shadow-md border-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
          </p>
        </div>

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
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
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

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students} students
                    </span>
                    <span className="flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl font-bold text-[#1f4e89]">{course.price}</span>
                    <Button
                      onClick={() => handleEnrollCourse(course.id)}
                      className="bg-[#1f4e89] hover:bg-[#1a4077] text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Enroll Now
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
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all courses</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedLevel("all")
                }}
                className="bg-[#1f4e89] hover:bg-[#1a4077] text-white"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
