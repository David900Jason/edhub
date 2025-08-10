"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, Check, ChevronRight, Upload, User, GraduationCap, Users, FileText, X } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

// Arabic educational data
const gradeData = {
  "الصف الثالث الثانوي": ["علمي رياضة", "علمي علوم", "أدبي"],
  "الصف الثاني الثانوي": ["علمي", "أدبي"],
  "الصف الأول الثانوي": ["عام"],
  "الصف الثالث الإعدادي": ["عام"],
  "الصف الثاني الإعدادي": ["عام"],
  "الصف الأول الإعدادي": ["عام"],
  "الصف السادس الابتدائي": ["عام"],
  "الصف الخامس الابتدائي": ["عام"],
  "الصف الرابع الابتدائي": ["عام"],
}

const governorateData = {
  "كفر الشيخ": ["سيدي سالم", "دسوق", "الرياض", "بيلا", "الحامول"],
  الجيزة: ["الهرم", "العجوزة", "أكتوبر", "بولاق", "الدقي"],
  القاهرة: ["مدينة نصر", "المعادي", "مصر الجديدة", "شبرا", "المقطم"],
  الإسكندرية: ["سيدي بشر", "محرم بك", "العصافرة", "المنتزه", "الأزاريطة"],
  الغربية: ["طنطا", "المحلة الكبرى", "زفتى", "السنطة", "كفر الزيات"],
  المنوفية: ["شبين الكوم", "منوف", "سرس الليان", "أشمون", "الباجور"],
}

const steps = [
  { id: 1, title: "إنشاء حسابك الشخصي", icon: <User className="h-5 w-5" /> },
  { id: 2, title: "الصف الدراسي", icon: <GraduationCap className="h-5 w-5" /> },
  { id: 3, title: "بيانات الوالدين", icon: <Users className="h-5 w-5" /> },
  { id: 4, title: "الشروط والأحكام", icon: <FileText className="h-5 w-5" /> },
]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    grade: "",
    section: "",
    governorate: "",
    city: "",
    gender: "",
    school: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    fatherPhone: "",
    motherPhone: "",
    idDocument: null as File | null,
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Set default role from URL params
  useState(() => {
    const roleParam = searchParams.get("role")
    if (roleParam === "teacher") {
      // Handle teacher registration differently if needed
    }
  })

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = "الاسم الأول مطلوب"
        if (!formData.middleName) newErrors.middleName = "الاسم الأوسط مطلوب"
        if (!formData.lastName) newErrors.lastName = "الاسم الأخير مطلوب"
        if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب"
        if (!formData.password) newErrors.password = "كلمة المرور مطلوبة"
        if (!formData.confirmPassword) newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب"
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "كلمات المرور غير متطابقة"
        if (!formData.phone) newErrors.phone = "رقم الموبايل مطلوب"
        break
      case 2:
        if (!formData.grade) newErrors.grade = "الصف الدراسي مطلوب"
        if (!formData.section) newErrors.section = "الشعبة مطلوبة"
        if (!formData.governorate) newErrors.governorate = "المحافظة مطلوبة"
        if (!formData.city) newErrors.city = "المدينة مطلوبة"
        if (!formData.gender) newErrors.gender = "النوع مطلوب"
        if (!formData.school) newErrors.school = "اسم المدرسة مطلوب"
        if (!formData.birthDay || !formData.birthMonth || !formData.birthYear) {
          newErrors.birthDate = "تاريخ الميلاد مطلوب"
        }
        break
      case 3:
        if (!formData.fatherPhone) newErrors.fatherPhone = "رقم موبايل الأب مطلوب"
        if (!formData.motherPhone) newErrors.motherPhone = "رقم موبايل الأم مطلوب"
        if (!formData.idDocument) newErrors.idDocument = "صورة البطاقة أو شهادة الميلاد مطلوبة"
        break
      case 4:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "يجب الموافقة على الشروط والأحكام"
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
    router.push("/student")
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
      handleInputChange("idDocument", e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange("idDocument", e.target.files[0])
    }
  }

  const removeFile = () => {
    handleInputChange("idDocument", null)
  }

  const availableSections = formData.grade ? gradeData[formData.grade as keyof typeof gradeData] || [] : []
  const availableCities = formData.governorate
    ? governorateData[formData.governorate as keyof typeof governorateData] || []
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#edf2f7] flex" dir="rtl">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-2xl p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <BookOpen className="h-8 w-8 text-[#1f4e89]" />
          <div>
            <h1 className="text-2xl font-bold text-[#1f4e89]">droosy</h1>
            <p className="text-xs text-gray-500">منصة التعليم الذكية</p>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                step.id === currentStep
                  ? "bg-gradient-to-r from-[#1f4e89] to-[#38b2ac] text-white shadow-lg"
                  : step.id < currentStep
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-50 text-gray-500"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.id === currentStep
                    ? "bg-white text-[#1f4e89]"
                    : step.id < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {step.id < currentStep ? <Check className="h-5 w-5" /> : step.icon}
              </div>
              <div>
                <div className="text-sm opacity-75">الخطوة {step.id}</div>
                <div className="font-semibold">{step.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-[#edf2f7] rounded-2xl">
          <p className="text-sm text-gray-600 text-center">
            هل لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-[#1f4e89] font-semibold hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl rounded-2xl shadow-2xl border-0">
          <CardContent className="p-8">
            {/* Step 1: Personal Account */}
            {currentStep === 1 && (
              <div className="step-transition">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حسابك الشخصي</h2>
                <p className="text-gray-600 mb-8">أدخل بياناتك الشخصية لإنشاء حسابك على droosy</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">الاسم الأول (باللغة العربية)</Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`rounded-lg ${errors.firstName ? "border-red-500 field-error" : ""}`}
                      placeholder="أحمد"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">الاسم الأوسط (باللغة العربية)</Label>
                    <Input
                      value={formData.middleName}
                      onChange={(e) => handleInputChange("middleName", e.target.value)}
                      className={`rounded-lg ${errors.middleName ? "border-red-500 field-error" : ""}`}
                      placeholder="محمد"
                    />
                    {errors.middleName && <p className="text-red-500 text-xs">{errors.middleName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">الاسم الأخير (باللغة العربية)</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`rounded-lg ${errors.lastName ? "border-red-500 field-error" : ""}`}
                      placeholder="علي"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">البريد الإلكتروني</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`rounded-lg ${errors.email ? "border-red-500 field-error" : ""}`}
                      placeholder="ahmed@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">رقم الموبايل الشخصي</Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`rounded-lg ${errors.phone ? "border-red-500 field-error" : ""}`}
                      placeholder="01234567890"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">كلمة المرور</Label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`rounded-lg ${errors.password ? "border-red-500 field-error" : ""}`}
                      placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">تأكيد كلمة المرور</Label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`rounded-lg ${errors.confirmPassword ? "border-red-500 field-error" : ""}`}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Info */}
            {currentStep === 2 && (
              <div className="step-transition">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">الصف الدراسي</h2>
                <p className="text-gray-600 mb-8">أدخل معلوماتك الأكاديمية والشخصية</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">الصف الدراسي</Label>
                    <Select
                      value={formData.grade}
                      onValueChange={(value) => {
                        handleInputChange("grade", value)
                        handleInputChange("section", "") // Reset section when grade changes
                      }}
                    >
                      <SelectTrigger className={`rounded-lg ${errors.grade ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="اختر الصف الدراسي" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(gradeData).map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.grade && <p className="text-red-500 text-xs">{errors.grade}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">الشعبة</Label>
                    <Select
                      value={formData.section}
                      onValueChange={(value) => handleInputChange("section", value)}
                      disabled={!formData.grade}
                    >
                      <SelectTrigger className={`rounded-lg ${errors.section ? "border-red-500" : ""}`}>
                        <SelectValue placeholder={formData.grade ? "اختر الشعبة" : "اختر الصف أولاً"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSections.map((section) => (
                          <SelectItem key={section} value={section}>
                            {section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.section && <p className="text-red-500 text-xs">{errors.section}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">المحافظة</Label>
                    <Select
                      value={formData.governorate}
                      onValueChange={(value) => {
                        handleInputChange("governorate", value)
                        handleInputChange("city", "") // Reset city when governorate changes
                      }}
                    >
                      <SelectTrigger className={`rounded-lg ${errors.governorate ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="اختر المحافظة" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(governorateData).map((gov) => (
                          <SelectItem key={gov} value={gov}>
                            {gov}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.governorate && <p className="text-red-500 text-xs">{errors.governorate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">المدينة/المنطقة</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => handleInputChange("city", value)}
                      disabled={!formData.governorate}
                    >
                      <SelectTrigger className={`rounded-lg ${errors.city ? "border-red-500" : ""}`}>
                        <SelectValue placeholder={formData.governorate ? "اختر المدينة" : "اختر المحافظة أولاً"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">النوع</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className={`rounded-lg ${errors.gender ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">ذكر</SelectItem>
                        <SelectItem value="female">أنثى</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">اسم المدرسة</Label>
                    <Input
                      value={formData.school}
                      onChange={(e) => handleInputChange("school", e.target.value)}
                      className={`rounded-lg ${errors.school ? "border-red-500 field-error" : ""}`}
                      placeholder="مدرسة النور الثانوية"
                    />
                    {errors.school && <p className="text-red-500 text-xs">{errors.school}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">تاريخ الميلاد</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Select value={formData.birthDay} onValueChange={(value) => handleInputChange("birthDay", value)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="اليوم" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={formData.birthMonth}
                      onValueChange={(value) => handleInputChange("birthMonth", value)}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="الشهر" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "يناير",
                          "فبراير",
                          "مارس",
                          "أبريل",
                          "مايو",
                          "يونيو",
                          "يوليو",
                          "أغسطس",
                          "سبتمبر",
                          "أكتوبر",
                          "نوفمبر",
                          "ديسمبر",
                        ].map((month, index) => (
                          <SelectItem key={index + 1} value={(index + 1).toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={formData.birthYear} onValueChange={(value) => handleInputChange("birthYear", value)}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="السنة" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 30 }, (_, i) => 2010 - i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.birthDate && <p className="text-red-500 text-xs">{errors.birthDate}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Parent Info */}
            {currentStep === 3 && (
              <div className="step-transition">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">بيانات الوالدين</h2>
                <p className="text-gray-600 mb-8">أدخل بيانات الاتصال بالوالدين والوثائق المطلوبة</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">رقم موبايل الأب</Label>
                    <Input
                      type="tel"
                      value={formData.fatherPhone}
                      onChange={(e) => handleInputChange("fatherPhone", e.target.value)}
                      className={`rounded-lg ${errors.fatherPhone ? "border-red-500 field-error" : ""}`}
                      placeholder="01234567890"
                    />
                    {errors.fatherPhone && <p className="text-red-500 text-xs">{errors.fatherPhone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">رقم موبايل الأم</Label>
                    <Input
                      type="tel"
                      value={formData.motherPhone}
                      onChange={(e) => handleInputChange("motherPhone", e.target.value)}
                      className={`rounded-lg ${errors.motherPhone ? "border-red-500 field-error" : ""}`}
                      placeholder="01234567890"
                    />
                    {errors.motherPhone && <p className="text-red-500 text-xs">{errors.motherPhone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">رفع صورة بطاقة أو شهادة ميلاد</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-[#1f4e89] bg-[#1f4e89]/5"
                        : errors.idDocument
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-[#1f4e89] hover:bg-gray-50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {formData.idDocument ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{formData.idDocument.name}</p>
                            <p className="text-sm text-gray-500">
                              {(formData.idDocument.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={removeFile}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">اسحب الملف هنا أو انقر للاختيار</p>
                        <p className="text-sm text-gray-500 mb-4">PNG, JPG, PDF حتى 10MB</p>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="id-upload"
                        />
                        <label htmlFor="id-upload">
                          <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                            اختيار ملف
                          </Button>
                        </label>
                      </>
                    )}
                  </div>
                  {errors.idDocument && <p className="text-red-500 text-xs">{errors.idDocument}</p>}
                </div>
              </div>
            )}

            {/* Step 4: Terms */}
            {currentStep === 4 && (
              <div className="step-transition">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">الشروط والأحكام</h2>
                <p className="text-gray-600 mb-8">يرجى قراءة الشروط والأحكام والموافقة عليها</p>

                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {[
                    {
                      title: "التسجيل / الحضور",
                      content:
                        "يجب على الطالب الالتزام بمواعيد الحضور المحددة وعدم التغيب بدون عذر مقبول. في حالة التغيب المتكرر، يحق للمنصة اتخاذ الإجراءات المناسبة.",
                    },
                    {
                      title: "المحاضرات / الباقات",
                      content:
                        "جميع المحاضرات والمواد التعليمية محمية بحقوق الطبع والنشر. لا يُسمح بتسجيل أو نسخ أو توزيع المحتوى بأي شكل من الأشكال دون إذن كتابي مسبق.",
                    },
                    {
                      title: "الأكواد والمحفظة",
                      content:
                        "أكواد الدخول للمحاضرات شخصية ولا يُسمح بمشاركتها مع الآخرين. المحفظة الإلكترونية آمنة ومحمية، ويجب الحفاظ على سرية بيانات الدخول.",
                    },
                    {
                      title: "شروط عامة",
                      content:
                        "يحق للمنصة تعديل هذه الشروط في أي وقت. سيتم إشعار المستخدمين بأي تغييرات مهمة. استخدام المنصة يعني الموافقة على جميع الشروط والأحكام المذكورة.",
                    },
                  ].map((section, index) => (
                    <Card key={index} className="rounded-lg border border-gray-200">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-gray-900 mb-2">{section.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-[#edf2f7] rounded-lg">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                      أوافق على جميع الشروط والأحكام المذكورة أعلاه وأتعهد بالالتزام بها
                    </label>
                  </div>
                  {errors.agreeToTerms && <p className="text-red-500 text-xs mt-2">{errors.agreeToTerms}</p>}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6"
              >
                السابق
              </Button>

              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index + 1 <= currentStep ? "bg-[#1f4e89]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="bg-[#1f4e89] hover:bg-[#1a4077] text-white px-6"
              >
                {isLoading ? "جاري التسجيل..." : currentStep === 4 ? "إنشاء الحساب" : "التالي"}
                <ChevronRight className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
