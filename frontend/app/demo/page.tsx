'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Play, Pause, Volume2, Maximize, SkipForward, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(180) // 3 minutes demo
  const router = useRouter()

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would control video playback
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <Button
          onClick={() => router.push('/')}
          variant="ghost"
          className="absolute -top-12 left-0 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-slate-950/95 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          
          <CardContent className="relative z-10 p-0">
            {/* Video Player */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center">
              {/* Placeholder Video Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
              
              {/* Demo Content Preview */}
              <div className="relative z-10 text-center space-y-6 p-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Doroosy Platform Demo
                  </h3>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    See how our AI-powered learning platform transforms education with personalized courses, 
                    interactive content, and powerful teacher tools.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-2">AI Learning Paths</h4>
                    <p className="text-gray-300 text-sm">Personalized curriculum that adapts to your pace</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-2">Teacher Subdomains</h4>
                    <p className="text-gray-300 text-sm">Custom branded platforms for educators</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-2">Interactive Content</h4>
                    <p className="text-gray-300 text-sm">Engaging multimedia learning experiences</p>
                  </div>
                </div>
              </div>

              {/* Play Button Overlay */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </div>
              </button>
            </div>

            {/* Video Controls */}
            <div className="p-6 bg-slate-950/80 backdrop-blur-sm">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-purple-600 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                  
                  <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                    <SkipForward className="w-4 h-4 text-white" />
                  </button>

                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-gray-400" />
                    <div className="w-20 h-1 bg-white/20 rounded-full">
                      <div className="w-3/4 h-full bg-white/60 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">1080p</span>
                  <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                    <Maximize className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Demo Features */}
            <div className="p-6 border-t border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">What you'll see in this demo:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Student Dashboard</h5>
                    <p className="text-gray-400 text-sm">Personalized learning interface with AI recommendations</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Teacher Platform</h5>
                    <p className="text-gray-400 text-sm">Course creation tools and student analytics</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Interactive Learning</h5>
                    <p className="text-gray-400 text-sm">Real-time quizzes and multimedia content</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Community Features</h5>
                    <p className="text-gray-400 text-sm">Study groups and collaborative learning</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
