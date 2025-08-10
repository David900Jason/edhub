'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Users, BookOpen, TrendingUp, DollarSign, Settings, Bell, Search, Filter, MoreVertical, Eye, Edit, Trash2, Star, Calendar, Clock, Globe, BarChart3, PieChart, MessageSquare, Video, FileText, Image, Upload, Save } from 'lucide-react'

interface TeacherDashboardProps {
  onBack: () => void
}

export default function TeacherDashboard({ onBack }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateCourse, setShowCreateCourse] = useState(false)

  const stats = [
    { label: 'Total Students', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-400' },
    { label: 'Active Courses', value: '24', change: '+3', icon: BookOpen, color: 'text-purple-400' },
    { label: 'Monthly Revenue', value: '$12,450', change: '+18%', icon: DollarSign, color: 'text-green-400' },
    { label: 'Avg. Rating', value: '4.9', change: '+0.2', icon: Star, color: 'text-yellow-400' }
  ]

  const courses = [
    {
      id: 1,
      title: 'Advanced JavaScript Concepts',
      students: 342,
      rating: 4.8,
      revenue: '$2,340',
      status: 'Published',
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'React for Beginners',
      students: 567,
      rating: 4.9,
      revenue: '$3,890',
      status: 'Published',
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      students: 234,
      rating: 4.7,
      revenue: '$1,560',
      status: 'Draft',
      lastUpdated: '3 days ago'
    }
  ]

  const recentActivity = [
    { type: 'enrollment', message: 'Sarah Chen enrolled in React for Beginners', time: '2 hours ago' },
    { type: 'review', message: 'New 5-star review on Advanced JavaScript', time: '4 hours ago' },
    { type: 'completion', message: '15 students completed Node.js module 3', time: '6 hours ago' },
    { type: 'message', message: 'New message from Alex Rodriguez', time: '1 day ago' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-white/20"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Teacher Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, students..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors w-64"
                />
              </div>
              <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white">
                <Bell className="w-4 h-4" />
              </Button>
              <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'courses', label: 'Courses' },
            { id: 'students', label: 'Students' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'messages', label: 'Messages' },
            { id: 'settings', label: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                        stat.color === 'text-blue-400' ? 'from-blue-500 to-cyan-500' :
                        stat.color === 'text-purple-400' ? 'from-purple-500 to-pink-500' :
                        stat.color === 'text-green-400' ? 'from-green-500 to-emerald-500' :
                        'from-yellow-500 to-orange-500'
                      } flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-sm font-medium ${stat.color}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => setShowCreateCourse(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-6 h-auto flex-col space-y-2 rounded-xl"
                  >
                    <Plus className="w-8 h-8" />
                    <span className="font-medium">Create New Course</span>
                  </Button>
                  <Button className="bg-white/10 hover:bg-white/20 text-white p-6 h-auto flex-col space-y-2 rounded-xl">
                    <Video className="w-8 h-8" />
                    <span className="font-medium">Schedule Live Session</span>
                  </Button>
                  <Button className="bg-white/10 hover:bg-white/20 text-white p-6 h-auto flex-col space-y-2 rounded-xl">
                    <MessageSquare className="w-8 h-8" />
                    <span className="font-medium">Message Students</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'enrollment' ? 'bg-blue-500/20 text-blue-400' :
                        activity.type === 'review' ? 'bg-yellow-500/20 text-yellow-400' :
                        activity.type === 'completion' ? 'bg-green-500/20 text-green-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {activity.type === 'enrollment' && <Users className="w-5 h-5" />}
                        {activity.type === 'review' && <Star className="w-5 h-5" />}
                        {activity.type === 'completion' && <BookOpen className="w-5 h-5" />}
                        {activity.type === 'message' && <MessageSquare className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white">{activity.message}</p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* Course Management Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">My Courses</h2>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button
                  onClick={() => setShowCreateCourse(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Course
                </Button>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.students}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-400" />
                            {course.rating}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Revenue</span>
                        <span className="text-green-400 font-medium">{course.revenue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === 'Published' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Last Updated</span>
                        <span className="text-gray-300 text-sm">{course.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-white/10 hover:bg-white/20 text-white">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" className="flex-1 bg-white/10 hover:bg-white/20 text-white">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Students</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-6 text-gray-400 font-medium">Student</th>
                        <th className="text-left p-6 text-gray-400 font-medium">Courses</th>
                        <th className="text-left p-6 text-gray-400 font-medium">Progress</th>
                        <th className="text-left p-6 text-gray-400 font-medium">Last Active</th>
                        <th className="text-left p-6 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Sarah Chen', email: 'sarah@example.com', courses: 3, progress: 85, lastActive: '2 hours ago' },
                        { name: 'Alex Rodriguez', email: 'alex@example.com', courses: 2, progress: 92, lastActive: '1 day ago' },
                        { name: 'Emma Thompson', email: 'emma@example.com', courses: 4, progress: 67, lastActive: '3 hours ago' },
                        { name: 'Michael Johnson', email: 'michael@example.com', courses: 1, progress: 45, lastActive: '1 week ago' }
                      ].map((student, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-sm">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="text-white font-medium">{student.name}</div>
                                <div className="text-gray-400 text-sm">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-6 text-white">{student.courses}</td>
                          <td className="p-6">
                            <div className="flex items-center space-x-3">
                              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-white text-sm font-medium">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="p-6 text-gray-400">{student.lastActive}</td>
                          <td className="p-6">
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Revenue Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Revenue chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Course Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Performance chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Create Course Modal */}
      {showCreateCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCreateCourse(false)}></div>
          
          <Card className="relative w-full max-w-2xl bg-slate-950/95 backdrop-blur-xl border border-white/20 rounded-3xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-white">Create New Course</CardTitle>
                <Button
                  onClick={() => setShowCreateCourse(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Course Title</label>
                  <input
                    type="text"
                    placeholder="Enter course title..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    placeholder="Describe your course..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors">
                      <option value="" className="bg-slate-900">Select category</option>
                      <option value="programming" className="bg-slate-900">Programming</option>
                      <option value="design" className="bg-slate-900">Design</option>
                      <option value="business" className="bg-slate-900">Business</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Course Thumbnail</label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-sm mt-2">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={() => setShowCreateCourse(false)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Create Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
