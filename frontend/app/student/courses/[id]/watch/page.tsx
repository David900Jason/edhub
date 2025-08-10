"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  FileText,
  Search,
  User,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Download,
  FileIcon,
  Clock,
  CheckCircle,
  Lock,
  List,
} from "lucide-react"
import { useParams } from "next/navigation"

const sidebarItems = [
  { href: "/student", icon: <BookOpen className="h-5 w-5" />, label: "Dashboard" },
  { href: "/student/courses", icon: <BookOpen className="h-5 w-5" />, label: "My Courses", active: true },
  { href: "/student/browse", icon: <Search className="h-5 w-5" />, label: "Browse Courses" },
  { href: "/student/assignments", icon: <FileText className="h-5 w-5" />, label: "Assignments" },
  { href: "/student/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
]

const courseContent = {
  course: {
    id: 1,
    title: "Advanced Mathematics",
    instructor: "Dr. Sarah Johnson",
  },
  currentVideo: {
    id: 4,
    title: "Differential Equations",
    duration: "55:45",
    videoUrl: "/placeholder.svg?height=400&width=800&text=Video+Player",
  },
  videos: [
    { id: 1, title: "Introduction to Calculus", duration: "45:30", completed: true, locked: false },
    { id: 2, title: "Derivatives and Applications", duration: "52:15", completed: true, locked: false },
    { id: 3, title: "Integration Techniques", duration: "48:20", completed: true, locked: false },
    { id: 4, title: "Differential Equations", duration: "55:45", completed: false, locked: false, current: true },
    { id: 5, title: "Advanced Integration", duration: "42:30", completed: false, locked: true },
    { id: 6, title: "Series and Sequences", duration: "38:15", completed: false, locked: true },
  ],
  pdfs: [
    { id: 1, title: "Calculus Fundamentals", size: "2.5 MB", downloaded: true },
    { id: 2, title: "Practice Problems Set 1", size: "1.8 MB", downloaded: false },
    { id: 3, title: "Integration Formulas", size: "1.2 MB", downloaded: true },
    { id: 4, title: "Differential Equations Guide", size: "3.1 MB", downloaded: false },
  ],
  notes: [
    { id: 1, timestamp: "12:30", note: "Important formula for derivatives", time: 750 },
    { id: 2, timestamp: "25:15", note: "Remember the chain rule application", time: 1515 },
    { id: 3, timestamp: "38:45", note: "Practice problem example", time: 2325 },
  ],
}

export default function CourseWatch() {
  const params = useParams()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(100)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(3345) // 55:45 in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("playlist")
  const [newNote, setNewNote] = useState("")
  const [notes, setNotes] = useState(courseContent.notes)
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate video progress
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (time: number) => {
    setCurrentTime(time)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed)
  }

  const handleVideoSelect = (videoId: number) => {
    const video = courseContent.videos.find((v) => v.id === videoId)
    if (video && !video.locked) {
      console.log("Switching to video:", video.title)
      setCurrentTime(0)
      setIsPlaying(false)
    }
  }

  const handleDownloadPDF = (pdfId: number) => {
    console.log("Downloading PDF:", pdfId)
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      const timestamp = `${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, "0")}`
      const note = {
        id: notes.length + 1,
        timestamp,
        note: newNote,
        time: currentTime,
      }
      setNotes([...notes, note])
      setNewNote("")
    }
  }

  const handleJumpToNote = (time: number) => {
    setCurrentTime(time)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = (currentTime / duration) * 100

  return (
    <DashboardLayout sidebarItems={sidebarItems} userRole="student" userName="Alex Thompson">
      <div className="space-y-6">
        {/* Course Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{courseContent.course.title}</h1>
            <p className="text-gray-600">by {courseContent.course.instructor}</p>
          </div>
          <div className="text-sm text-gray-500">
            Video {courseContent.videos.findIndex((v) => v.current) + 1} of {courseContent.videos.length}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <Card className="rounded-2xl shadow-md border-0 overflow-hidden">
              <div className="relative bg-black aspect-video">
                {/* Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <img
                    src="/placeholder.svg?height=400&width=800&text=Video+Player"
                    alt="Video Player"
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      onClick={handlePlayPause}
                      size="lg"
                      className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white ml-1" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="relative">
                      <Progress value={progress} className="h-1 bg-white/20" />
                      <div
                        className="absolute top-0 h-1 bg-[#1f4e89] rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={handlePlayPause}
                        size="sm"
                        className="bg-transparent hover:bg-white/20 text-white p-2"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          onClick={handleMute}
                          size="sm"
                          className="bg-transparent hover:bg-white/20 text-white p-2"
                        >
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => handleVolumeChange(Number(e.target.value))}
                          className="w-20 h-1 bg-white/20 rounded-lg appearance-none slider"
                        />
                      </div>

                      <div className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={playbackSpeed}
                        onChange={(e) => handleSpeedChange(Number(e.target.value))}
                        className="bg-transparent text-white text-sm border border-white/20 rounded px-2 py-1"
                      >
                        <option value={0.5} className="text-black">
                          0.5x
                        </option>
                        <option value={0.75} className="text-black">
                          0.75x
                        </option>
                        <option value={1} className="text-black">
                          1x
                        </option>
                        <option value={1.25} className="text-black">
                          1.25x
                        </option>
                        <option value={1.5} className="text-black">
                          1.5x
                        </option>
                        <option value={2} className="text-black">
                          2x
                        </option>
                      </select>

                      <Button
                        onClick={handleFullscreen}
                        size="sm"
                        className="bg-transparent hover:bg-white/20 text-white p-2"
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{courseContent.currentVideo.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {courseContent.currentVideo.duration}
                  </span>
                  <span>•</span>
                  <span>{Math.round(progress)}% completed</span>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card className="rounded-2xl shadow-md border-0 mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">My Notes</h3>

                {/* Add Note */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Add a note at current time..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f4e89] focus:border-transparent"
                    onKeyPress={(e) => e.key === "Enter" && handleAddNote()}
                  />
                  <Button onClick={handleAddNote} className="bg-[#1f4e89] hover:bg-[#1a4077] text-white">
                    Add Note
                  </Button>
                </div>

                {/* Notes List */}
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div key={note.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Button
                        onClick={() => handleJumpToNote(note.time)}
                        size="sm"
                        variant="outline"
                        className="text-[#1f4e89] border-[#1f4e89] hover:bg-[#1f4e89] hover:text-white bg-transparent"
                      >
                        {note.timestamp}
                      </Button>
                      <p className="flex-1 text-sm text-gray-700">{note.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-md border-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="playlist">
                    <List className="h-4 w-4 mr-2" />
                    Playlist
                  </TabsTrigger>
                  <TabsTrigger value="materials">
                    <FileIcon className="h-4 w-4 mr-2" />
                    Materials
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="playlist" className="p-4">
                  <div className="space-y-2">
                    {courseContent.videos.map((video, index) => (
                      <div
                        key={video.id}
                        onClick={() => handleVideoSelect(video.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          video.current
                            ? "bg-[#1f4e89] text-white"
                            : video.locked
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {video.locked ? (
                            <Lock className="h-4 w-4" />
                          ) : video.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : video.current ? (
                            <Play className="h-4 w-4" />
                          ) : (
                            <div className="w-4 h-4 border border-current rounded-full flex items-center justify-center">
                              <span className="text-xs">{index + 1}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${video.locked ? "text-gray-400" : ""}`}>
                            {video.title}
                          </p>
                          <p className={`text-xs ${video.current ? "text-blue-200" : "text-gray-500"}`}>
                            {video.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="materials" className="p-4">
                  <div className="space-y-3">
                    {courseContent.pdfs.map((pdf) => (
                      <div key={pdf.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileIcon className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{pdf.title}</p>
                          <p className="text-xs text-gray-500">{pdf.size}</p>
                        </div>
                        <Button
                          onClick={() => handleDownloadPDF(pdf.id)}
                          size="sm"
                          variant="outline"
                          className="bg-transparent"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
