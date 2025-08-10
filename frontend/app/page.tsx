'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Zap, Globe, Star, ArrowRight, Play, CheckCircle, Brain, Rocket, Shield, TrendingUp, ChevronRight, Menu, X, Sparkles, Award, Target } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function DorroosyHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = (path: string) => {
    setIsExiting(true)
    setTimeout(() => {
      router.push(path)
    }, 300) // Match this duration with the CSS animation duration
  }

  const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, [end, duration])

    return <span>{count.toLocaleString()}{suffix}</span>
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-x-hidden ${isExiting ? 'animate-fade-out' : ''}`}>
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

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Doroosy
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                Features
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                How it Works
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="#benefits" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                Benefits
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="#testimonials" className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                Reviews
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300">
                Sign In
              </Button>
              <Button 
                onClick={() => handleNavigate('/sign-up')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
                <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</Link>
                <Link href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</Link>
                <Link href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Reviews</Link>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10 justify-start">
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => handleNavigate('/sign-up')}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white justify-start"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div 
          className="container mx-auto px-6 text-center"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 group hover:bg-white/10 transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">The Future of Education is Here</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Transform Learning
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Beyond Limits
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the next generation of education with AI-powered personalized learning, 
              immersive teacher platforms, and a community that grows with you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                size="lg" 
                onClick={() => handleNavigate('/sign-up')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 group"
              >
                Start Learning
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => handleNavigate('/demo')}
                className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl backdrop-blur-sm group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { value: 50000, suffix: "+", label: "Students", color: "text-blue-400" },
                { value: 1200, suffix: "+", label: "Teachers", color: "text-purple-400" },
                { value: 500, suffix: "+", label: "Courses", color: "text-indigo-400" },
                { value: 98, suffix: "%", label: "Success Rate", color: "text-cyan-400" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to create, learn, and grow in the digital age
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Learning",
                description: "Personalized learning paths that adapt to your pace and style, powered by advanced machine learning algorithms.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Globe,
                title: "Teacher Subdomains",
                description: "Create your own branded learning space with custom domains, complete control, and professional tools.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Zap,
                title: "Interactive Content",
                description: "Engage with multimedia lessons, real-time quizzes, and immersive learning experiences.",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Enterprise-grade security ensures your data and learning progress are always protected.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: TrendingUp,
                title: "Progress Analytics",
                description: "Detailed insights and analytics help you track progress and optimize your learning journey.",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Users,
                title: "Community Learning",
                description: "Connect with learners worldwide, join study groups, and collaborate on exciting projects.",
                gradient: "from-pink-500 to-rose-500"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 group hover:transform hover:scale-105 rounded-2xl"
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get started in three simple steps and transform your learning experience
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connection Lines */}
              <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 transform -translate-y-1/2"></div>
              <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-500/50 to-blue-500/50 transform -translate-y-1/2"></div>

              {[
                {
                  step: "01",
                  title: "Sign Up & Explore",
                  description: "Create your account and discover thousands of courses tailored to your interests and goals.",
                  icon: Rocket
                },
                {
                  step: "02",
                  title: "Personalize Your Journey",
                  description: "Our AI analyzes your learning style and creates a personalized path just for you.",
                  icon: Target
                },
                {
                  step: "03",
                  title: "Learn & Grow",
                  description: "Start learning with interactive content, track your progress, and achieve your goals.",
                  icon: Award
                }
              ].map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Built for Everyone
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Students Benefits */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  For Students
                </h3>
                <p className="text-gray-400 text-lg">Unlock your potential with personalized learning</p>
              </div>
              
              <div className="space-y-6">
                {[
                  "AI-powered personalized learning paths",
                  "Interactive multimedia content and quizzes",
                  "Real-time progress tracking and analytics",
                  "Global community of learners",
                  "Mobile-optimized learning experience"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Teachers Benefits */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  For Teachers
                </h3>
                <p className="text-gray-400 text-lg">Create and monetize your expertise</p>
              </div>
              
              <div className="space-y-6">
                {[
                  "Custom branded subdomains and websites",
                  "Advanced course creation and management tools",
                  "Student analytics and engagement insights",
                  "Multiple monetization options",
                  "Marketing and promotional support"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                What Our Community Says
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of learners and educators who have transformed their journey
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Sarah Chen",
              role: "Computer Science Student",
              content: "Doroosy's AI-powered learning helped me understand complex algorithms in ways I never thought possible. The personalized approach made all the difference.",
              rating: 5,
              avatar: "/placeholder.svg?height=60&width=60"
            },
            {
              name: "Dr. Michael Rodriguez",
              role: "Mathematics Teacher",
              content: "Having my own subdomain has completely transformed how I teach. My students are more engaged, and I can track their progress in real-time.",
              rating: 5,
              avatar: "/placeholder.svg?height=60&width=60"
            },
            {
              name: "Emma Thompson",
              role: "Language Learner",
              content: "The community features are incredible. I've connected with learners from around the world and we practice together every day.",
              rating: 5,
              avatar: "/placeholder.svg?height=60&width=60"
            }
          ].map((testimonial, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 group hover:transform hover:scale-105 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Ready to Transform
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Learning?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of learners and educators who are already experiencing the future of education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => handleNavigate('/sign-up')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-4 text-lg rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 group"
            >
              Start Learning Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              onClick={() => handleNavigate('/sign-up')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 text-lg rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group"
            >
              <Users className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Become a Teacher
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-slate-950/80 backdrop-blur-sm border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Doroosy
              </span>
            </div>
            <p className="text-gray-400">
              Transforming education through AI-powered learning and personalized teacher platforms.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <div className="space-y-2">
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Courses</Link>
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Teachers</Link>
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Students</Link>
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Pricing</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <div className="space-y-2">
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Help Center</Link>
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Contact Us</Link>
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Community</Link>
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Status</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <div className="space-y-2">
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</Link>
              <Link href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">GDPR</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Doroosy. All rights reserved. Built for the future of education.
          </p>
        </div>
      </div>
    </footer>
  </div>
  )
}
