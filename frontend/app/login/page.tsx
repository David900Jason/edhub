"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login logic
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock role-based routing
    if (email.includes("teacher")) {
      router.push("/teacher")
    } else if (email.includes("staff")) {
      router.push("/staff")
    } else {
      router.push("/student")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <BookOpen className="h-8 w-8 text-[#2b6cb0]" />
          <h1 className="text-2xl font-bold text-[#2b6cb0]">Droosy</h1>
        </div>

        <Card className="rounded-2xl shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">Sign in to your account to continue learning</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border-gray-300 focus:border-[#2b6cb0] focus:ring-[#2b6cb0]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg border-gray-300 focus:border-[#2b6cb0] focus:ring-[#2b6cb0] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="#" className="text-sm text-[#2b6cb0] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#2b6cb0] hover:bg-[#2c5282] text-white rounded-lg py-2.5"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#2b6cb0] hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Demo accounts info */}
            <div className="mt-6 p-4 bg-[#edf2f7] rounded-lg">
              <p className="text-xs text-gray-600 mb-2 font-medium">Demo accounts:</p>
              <div className="text-xs text-gray-500 space-y-1">
                <p>Student: student@demo.com</p>
                <p>Teacher: teacher@demo.com</p>
                <p>Staff: staff@demo.com</p>
                <p className="italic">Password: any password</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
