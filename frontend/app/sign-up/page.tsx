"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  User,
  GraduationCap,
  Target,
  FileText,
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  Check,
  Sparkles,
  Rocket,
  Brain,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

const steps = [
  { id: 1, title: "Personal Information", icon: <User className="h-5 w-5" /> },
  { id: 2, title: "Learning Preferences", icon: <Brain className="h-5 w-5" /> },
  { id: 3, title: "Goals & Interests", icon: <Target className="h-5 w-5" /> },
  { id: 4, title: "Terms & Conditions", icon: <FileText className="h-5 w-5" /> },
]

const teacherSteps = [
  { id: 1, title: "Personal Information", icon: <User className="h-5 w-5" /> },
  { id: 2, title: "Teaching Experience", icon: <GraduationCap className="h-5 w-5" /> },
  { id: 3, title: "Platform Setup", icon: <Globe className="h-5 w-5" /> },
  { id: 4, title: "Terms & Conditions", icon: <FileText className="h-5 w-5" /> },
]

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "History",
  "Geography",
  "Art",
  "Music",
  "Languages",
]

const learningStyles = [
  { id: "visual", label: "Visual", description: "Learn through images and diagrams" },
  { id: "auditory", label: "Auditory", description: "Learn through listening and discussion" },
  { id: "kinesthetic", label: "Kinesthetic", description: "Learn through hands-on activities" },
  { id: "reading", label: "Reading/Writing", description: "Learn through text and writing" },
]

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState<"student" | "teacher">("student")
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",

    // Student specific
    educationLevel: "",
    subjects: [] as string[],
    learningStyle: "",
    goals: "",
    interests: "",

    // Teacher specific
    qualifications: "",
    experience: "",
    teachingSubjects: [] as string[],
    bio: "",
    subdomain: "",
    profileImage: null as File | null,

    // Terms
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Set user type from URL params
  useState(() => {
    const typeParam = searchParams.get("type")
    if (typeParam === "teacher") {
      setUserType("teacher")
    }
  })

  const currentSteps = userType === "teacher" ? teacherSteps : steps

  const handleInputChange = (field: string, value: string | boolean | File | null | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubjectToggle = (subject: string, field: "subjects" | "teachingSubjects") => {
    const currentSubjects = formData[field] as string[]
    const updatedSubjects = currentSubjects.includes(subject)
      ? currentSubjects.filter((s) => s !== subject)
      : [...currentSubjects, subject]
    handleInputChange(field, updatedSubjects)
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = "First name is required"
        if (!formData.lastName) newErrors.lastName = "Last name is required"
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.password) newErrors.password = "Password is required"
        if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match"
        if (!formData.phone) newErrors.phone = "Phone number is required"
        break

      case 2:
        if (userType === "student") {
          if (!formData.educationLevel) newErrors.educationLevel = "Education level is required"
          if (formData.subjects.length === 0) newErrors.subjects = "Please select at least one subject"
          if (!formData.learningStyle) newErrors.learningStyle = "Learning style is required"
        } else {
          if (!formData.qualifications) newErrors.qualifications = "Qualifications are required"
          if (!formData.experience) newErrors.experience = "Experience level is required"
          if (formData.teachingSubjects.length === 0) newErrors.teachingSubjects = "Please select at least one subject"
        }
        break

      case 3:
        if (userType === "student") {
          if (!formData.goals) newErrors.goals = "Learning goals are required"
          if (!formData.interests) newErrors.interests = "Interests are required"
        } else {
          if (!formData.subdomain) newErrors.subdomain = "Subdomain is required"
          if (!formData.bio) newErrors.bio = "Bio is required"
        }
        break

      case 4:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (userType === "student") {
      router.push("/student-dashboard")
    } else {
      router.push("/teacher-dashboard")
    }
  }

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
      handleInputChange("profileImage", e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange("profileImage", e.target.files[0])
    }
  }

  const removeFile = () => {
    handleInputChange("profileImage", null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-slate-950/80 backdrop-blur-xl border-r border-white/10 p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Doroosy
              </h1>
              <p className="text-xs text-gray-400">Smart Learning Platform</p>
            </div>
          </div>

          {/* User Type Toggle */}
          <div className="mb-8">
            <div className="flex bg-white/5 backdrop-blur-sm rounded-2xl p-1">
              <button
                onClick={() => setUserType("student")}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  userType === "student"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <GraduationCap className="w-5 h-5 mx-auto mb-1" />
                Student
              </button>
              <button
                onClick={() => setUserType("teacher")}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  userType === "teacher"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <User className="w-5 h-5 mx-auto mb-1" />
                Teacher
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6 flex-1">
            {currentSteps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                  step.id === currentStep
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white shadow-lg"
                    : step.id < currentStep
                      ? "bg-green-500/10 border border-green-500/30 text-green-400"
                      : "bg-white/5 border border-white/10 text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.id === currentStep
                      ? "bg-white text-blue-600"
                      : step.id < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-white/10 text-gray-400"
                  }`}
                >
                  {step.id < currentStep ? <Check className="h-5 w-5" /> : step.icon}
                </div>
                <div>
                  <div className="text-sm opacity-75">Step {step.id}</div>
                  <div className="font-semibold">{step.title}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <p className="text-sm text-gray-300 text-center">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <Card className="w-full max-w-2xl bg-slate-950/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
            <CardContent className="p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Personal Information</h2>
                    <p className="text-gray-400">Tell us about yourself to get started</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">First Name</Label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Last Name</Label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={`bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Email Address</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Phone Number</Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Password</Label>
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        placeholder="••••••••"
                      />
                      {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Confirm Password</Label>
                      <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={`bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                        placeholder="••••••••"
                      />
                      {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Learning Preferences (Student) / Teaching Experience (Teacher) */}
              {currentStep === 2 && userType === "student" && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Learning Preferences</h2>
                    <p className="text-gray-400">Help us personalize your learning experience</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Education Level</Label>
                    <Select
                      value={formData.educationLevel}
                      onValueChange={(value) => handleInputChange("educationLevel", value)}
                    >
                      <SelectTrigger
                        className={`bg-white/10 border-white/20 text-white rounded-xl ${errors.educationLevel ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/20">
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.educationLevel && <p className="text-red-400 text-xs">{errors.educationLevel}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Subjects of Interest</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {subjects.map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => handleSubjectToggle(subject, "subjects")}
                          className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                            formData.subjects.includes(subject)
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                              : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                    {errors.subjects && <p className="text-red-400 text-xs">{errors.subjects}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Learning Style</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {learningStyles.map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => handleInputChange("learningStyle", style.id)}
                          className={`p-4 rounded-xl text-left transition-all duration-300 ${
                            formData.learningStyle === style.id
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white"
                              : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                          }`}
                        >
                          <div className="font-medium">{style.label}</div>
                          <div className="text-sm opacity-75">{style.description}</div>
                        </button>
                      ))}
                    </div>
                    {errors.learningStyle && <p className="text-red-400 text-xs">{errors.learningStyle}</p>}
                  </div>
                </div>
              )}

              {currentStep === 2 && userType === "teacher" && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Teaching Experience</h2>
                    <p className="text-gray-400">Tell us about your teaching background</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Qualifications</Label>
                    <Textarea
                      value={formData.qualifications}
                      onChange={(e) => handleInputChange("qualifications", e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl min-h-[100px] ${
                        errors.qualifications ? "border-red-500" : ""
                      }`}
                      placeholder="Describe your educational background and certifications..."
                    />
                    {errors.qualifications && <p className="text-red-400 text-xs">{errors.qualifications}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Experience Level</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => handleInputChange("experience", value)}
                    >
                      <SelectTrigger
                        className={`bg-white/10 border-white/20 text-white rounded-xl ${errors.experience ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/20">
                        <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (6-10 years)</SelectItem>
                        <SelectItem value="expert">Expert (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.experience && <p className="text-red-400 text-xs">{errors.experience}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Teaching Subjects</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {subjects.map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => handleSubjectToggle(subject, "teachingSubjects")}
                          className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                            formData.teachingSubjects.includes(subject)
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                              : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                    {errors.teachingSubjects && <p className="text-red-400 text-xs">{errors.teachingSubjects}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Goals & Interests (Student) / Platform Setup (Teacher) */}
              {currentStep === 3 && userType === "student" && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Goals & Interests</h2>
                    <p className="text-gray-400">What do you want to achieve?</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Learning Goals</Label>
                    <Textarea
                      value={formData.goals}
                      onChange={(e) => handleInputChange("goals", e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl min-h-[120px] ${
                        errors.goals ? "border-red-500" : ""
                      }`}
                      placeholder="What do you hope to achieve through learning? Be specific about your goals..."
                    />
                    {errors.goals && <p className="text-red-400 text-xs">{errors.goals}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Additional Interests</Label>
                    <Textarea
                      value={formData.interests}
                      onChange={(e) => handleInputChange("interests", e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl min-h-[120px] ${
                        errors.interests ? "border-red-500" : ""
                      }`}
                      placeholder="Tell us about your hobbies, interests, and what motivates you to learn..."
                    />
                    {errors.interests && <p className="text-red-400 text-xs">{errors.interests}</p>}
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="w-6 h-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Personalized Learning</h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Based on your preferences, we'll recommend courses and create a personalized learning path that
                      matches your goals and learning style.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 3 && userType === "teacher" && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Platform Setup</h2>
                    <p className="text-gray-400">Set up your teaching profile</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Your Subdomain</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">doroosy.com/</span>
                      <Input
                        value={formData.subdomain}
                        onChange={(e) =>
                          handleInputChange("subdomain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                        }
                        className={`bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl ${
                          errors.subdomain ? "border-red-500" : ""
                        }`}
                        placeholder="your-name"
                      />
                    </div>
                    {formData.subdomain && (
                      <p className="text-blue-400 text-sm">
                        Your profile will be available at: doroosy.com/{formData.subdomain}
                      </p>
                    )}
                    {errors.subdomain && <p className="text-red-400 text-xs">{errors.subdomain}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Bio</Label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className={`bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl min-h-[120px] ${
                        errors.bio ? "border-red-500" : ""
                      }`}
                      placeholder="Write a compelling bio that describes your teaching philosophy and expertise..."
                    />
                    {errors.bio && <p className="text-red-400 text-xs">{errors.bio}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300">Profile Image</Label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                        dragActive
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-white/20 hover:border-white/40 hover:bg-white/5"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {formData.profileImage ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                              <Check className="h-6 w-6 text-green-400" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-white">{formData.profileImage.name}</p>
                              <p className="text-sm text-gray-400">
                                {(formData.profileImage.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeFile}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-300 mb-4">Drag your image here or click to browse</p>
                          <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 10MB</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="profile-upload"
                          />
                          <label htmlFor="profile-upload">
                            <Button
                              type="button"
                              variant="outline"
                              className="cursor-pointer border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              Choose File
                            </Button>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Terms & Conditions */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Terms & Conditions</h2>
                    <p className="text-gray-400">Please review and accept our terms</p>
                  </div>

                  <div className="space-y-6 max-h-96 overflow-y-auto">
                    {[
                      {
                        title: "Account Registration",
                        content:
                          "By creating an account, you agree to provide accurate information and maintain the security of your account credentials. You are responsible for all activities under your account.",
                      },
                      {
                        title: "Content Usage",
                        content:
                          "All course materials and content are protected by copyright. You may access content for personal learning purposes only. Redistribution or sharing of content is prohibited.",
                      },
                      {
                        title: "Payment Terms",
                        content:
                          "Course fees are non-refundable unless specified otherwise. Subscription fees are charged automatically and can be cancelled at any time through your account settings.",
                      },
                      {
                        title: "Community Guidelines",
                        content:
                          "We maintain a respectful learning environment. Harassment, spam, or inappropriate behavior will result in account suspension or termination.",
                      },
                      {
                        title: "Privacy Policy",
                        content:
                          "We collect and process your data in accordance with our Privacy Policy. Your personal information is protected and will not be shared with third parties without consent.",
                      },
                    ].map((section, index) => (
                      <Card key={index} className="bg-white/5 border-white/10 rounded-xl">
                        <CardContent className="p-4">
                          <h4 className="font-bold text-white mb-2">{section.title}</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{section.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        className="mt-1 border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer leading-relaxed">
                        I agree to all the terms and conditions mentioned above and understand that I am responsible for
                        complying with all platform policies and guidelines.
                      </label>
                    </div>
                    {errors.agreeToTerms && <p className="text-red-400 text-xs mt-2">{errors.agreeToTerms}</p>}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {currentSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index + 1 <= currentStep ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  {isLoading ? (
                    "Creating Account..."
                  ) : currentStep === 4 ? (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
