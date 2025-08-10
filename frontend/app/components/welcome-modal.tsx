'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Sparkles, Brain, Users, ArrowRight, CheckCircle } from 'lucide-react'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  userType: 'teacher' | 'student' | null
}

export default function WelcomeModal({ isOpen, onClose, onComplete, userType }: WelcomeModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: [] as string[],
    experience: '',
    goals: ''
  })

  if (!isOpen) return null

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const studentInterests = [
    'Programming', 'Design', 'Mathematics', 'Science', 'Languages', 'Business',
    'Art', 'Music', 'History', 'Psychology', 'Engineering', 'Medicine'
  ]

  const teacherInterests = [
    'Technology', 'Mathematics', 'Science', 'Languages', 'Business', 'Arts',
    'History', 'Psychology', 'Engineering', 'Medicine', 'Music', 'Sports'
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal */}
      <Card className="relative w-full max-w-2xl bg-slate-950/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <CardContent className="relative z-10 p-8">
          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i <= step ? 'bg-blue-500' : 'bg-white/20'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                {userType === 'teacher' ? <Users className="w-10 h-10 text-white" /> : <Brain className="w-10 h-10 text-white" />}
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Welcome to Doroosy!
                </h2>
                <p className="text-gray-300 text-lg">
                  {userType === 'teacher' 
                    ? "Let's set up your teaching profile and create your personalized learning platform."
                    : "Let's personalize your learning journey with AI-powered recommendations."
                  }
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <Button
                onClick={handleNext}
                disabled={!formData.name || !formData.email}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl transition-all duration-300 group"
              >
                Continue
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  What interests you?
                </h2>
                <p className="text-gray-300">
                  {userType === 'teacher' 
                    ? "Select the subjects you'd like to teach"
                    : "Choose topics you'd like to learn about"
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(userType === 'teacher' ? teacherInterests : studentInterests).map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-4 py-3 rounded-xl border transition-all duration-300 ${
                      formData.interests.includes(interest)
                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                        : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={formData.interests.length === 0}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {userType === 'teacher' ? 'Teaching Goals' : 'Learning Goals'}
                </h2>
                <p className="text-gray-300">
                  {userType === 'teacher' 
                    ? "What do you hope to achieve as an educator?"
                    : "What would you like to accomplish with your learning?"
                  }
                </p>
              </div>

              <div className="space-y-4">
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="" className="bg-slate-900">
                    {userType === 'teacher' ? 'Teaching experience' : 'Learning experience'}
                  </option>
                  <option value="beginner" className="bg-slate-900">Beginner</option>
                  <option value="intermediate" className="bg-slate-900">Intermediate</option>
                  <option value="advanced" className="bg-slate-900">Advanced</option>
                  <option value="expert" className="bg-slate-900">Expert</option>
                </select>

                <textarea
                  placeholder={userType === 'teacher' 
                    ? "Describe your teaching goals and what you'd like to achieve..."
                    : "Tell us about your learning goals and what you'd like to achieve..."
                  }
                  value={formData.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!formData.experience || !formData.goals}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white group"
                >
                  {userType === 'teacher' ? 'Create Dashboard' : 'Start Learning'}
                  <Sparkles className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
