"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Menu, X, Bell, Search, Moon, Sun } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
  sidebarItems: Array<{
    href: string
    icon: React.ReactNode
    label: string
    active?: boolean
  }>
  userRole: "student" | "teacher" | "staff"
  userName: string
}

export function DashboardLayout({ children, sidebarItems, userRole, userName }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen bg-[#f9fafb] ${darkMode ? "dark" : ""}`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-[#1f4e89]" />
            <h1 className="text-xl font-bold text-[#1f4e89]">droosy</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? "bg-[#edf2f7] text-[#1f4e89] font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1f4e89] rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>

              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  className="pl-10 w-80 rounded-lg border-gray-300 focus:border-[#1f4e89] focus:ring-[#1f4e89]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="text-gray-600 hover:text-gray-900"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
              </Button>

              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#1f4e89] text-[#1f4e89] hover:bg-[#1f4e89] hover:text-white bg-transparent"
                >
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
