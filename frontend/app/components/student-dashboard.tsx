'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, BookOpen, Clock, Star, Users, Trophy, Calendar, Search, Filter, MoreVertical, CheckCircle, Target, TrendingUp, MessageSquare, Bell, Settings, Award, Zap, Globe, Brain, ChevronRight, StepForwardIcon as Progress } from 'lucide-react'

interface StudentDashboardProps {
  onBack: () => void
}

export default function StudentDashboard({ onBack }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Courses Enrolled', value: '12', icon: BookOpen, color: 'text-blue-400' },
    { label: 'Hours Learned', value: '147', icon: Clock, color: 'text-purple-400' },
    { label: 'Certificates', value: '8', icon: Award, color: 'text-green-400' },
    { label: 'Streak Days', value: '23', icon: Zap, color: 'text-yellow-400' }
  ]

  const currentCourses = [
    {
      id: 1,
      title: 'Advanced JavaScript Concepts',
      instructor: 'Dr. Sarah Chen',
      progress: 75,
      nextLesson: 'Async/Await Patterns',
      timeLeft: '2h 30m',
      rating: 4.8
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Alex Rodriguez',
      progress: 45,
      nextLesson: 'Color Theory',
      timeLeft: '1h 45m',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Data Science with Python',
      instructor: 'Emma Thompson',
      progress: 30,
      nextLesson: 'Pandas Introduction',
      timeLeft: '3h 15m',
      rating: 4.7
    }
  ]

  const achievements = [
    { title: 'First Course Completed', icon: Trophy, color: 'text-yellow-400', date: '2 days ago' },
    { title: 'Week Streak', icon: Zap, color: 'text-orange-400', date: '1 week ago' },
    { title: 'Top Performer', icon: Star, color: 'text-purple-400', date: '2 weeks ago' }
  ]

  const recommendedCourses = [
    {
      title: 'React Advanced Patterns',
      instructor: 'Michael Johnson',
      rating: 4.9,
      students: 1234,
      duration: '8h 30m',
      price: '$89'
    },
    {
      title: 'Machine Learning Basics',
      instructor: 'Dr. Lisa Wang',
      rating: 4.8,
      students: 2156,
      duration: '12h 15m',
      price: '$129'
    }
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
                Student Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
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
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'courses', label: 'My Courses' },
            { id: 'browse', label: 'Browse' },
            { id: 'progress', label: 'Progress' },
            { id: 'community', label: 'Community' }
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

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Alex! 👋</h2>
                    <p className="text-gray-300 text-lg">Ready to continue your learning journey?</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">23</div>
                    <div className="text-gray-400 text-sm">Day Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Continue Learning */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Continue Learning</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentCourses.map((course) => (
                    <Card key={course.id} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-xl group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-2">by {course.instructor}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Progress</span>
                            <span className="text-white text-sm font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Next: {course.nextLesson}</span>
                            <span className="text-gray-400">{course.timeLeft}</span>
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.color === 'text-yellow-400' ? 'bg-yellow-500/20' :
                        achievement.color === 'text-orange-400' ? 'bg-orange-500/20' :
                        'bg-purple-500/20'
                      }`}>
                        <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{achievement.title}</h4>
                        <p className="text-gray-400 text-sm">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Recommended for You</CardTitle>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {recommendedCourses.map((course, index) => (
                    <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-xl group">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">by {course.instructor}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              {course.rating}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {course.students}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {course.duration}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-green-400">{course.price}</span>
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                            Enroll Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* My Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">My Courses</h2>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentCourses.map((course) => (
                <Card key={course.id} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">by {course.instructor}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Progress</span>
                        <span className="text-white text-sm font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Next: {course.nextLesson}</span>
                        <span className="text-gray-400">{course.timeLeft}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Browse Tab */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Browse Courses</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {['All', 'Programming', 'Design', 'Business', 'Data Science', 'Marketing', 'Photography'].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className={`border-white/20 text-white hover:bg-white/10 ${
                    category === 'All' ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent' : ''
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...recommendedCourses, ...recommendedCourses].map((course, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl group">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">by {course.instructor}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {course.rating}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-400">{course.price}</span>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
