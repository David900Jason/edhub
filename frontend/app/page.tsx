import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Users,
  Award,
  Play,
  FileText,
  Star,
  ArrowRight,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Globe,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] via-white to-[#edf2f7]">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <BookOpen className="h-9 w-9 text-[#1f4e89]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#38b2ac] rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1f4e89]">droosy</h1>
              <p className="text-xs text-gray-500">منصة التعليم الذكية</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-[#1f4e89] text-[#1f4e89] hover:bg-[#1f4e89] hover:text-white bg-transparent transition-all duration-300 hover:scale-105"
              >
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-[#1f4e89] to-[#38b2ac] hover:from-[#1a4077] hover:to-[#2d9b95] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                إنشاء حساب جديد
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#38b2ac] to-[#1f4e89] rounded-full opacity-10 animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-[#1f4e89] to-[#38b2ac] rounded-full opacity-10 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-[#38b2ac] rounded-full opacity-20 animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-16 h-16 bg-[#1f4e89] rounded-full opacity-30 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1f4e89]/10 to-[#38b2ac]/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm text-[#1f4e89] font-medium mb-8 shadow-lg border border-[#1f4e89]/20">
            <Sparkles className="h-4 w-4" />
            <span>أكثر من 50,000 طالب يثقون بنا</span>
            <TrendingUp className="h-4 w-4" />
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h2 className="text-7xl md:text-8xl font-black text-gray-900 mb-4 leading-tight">
              مستقبل
              <span className="block bg-gradient-to-r from-[#1f4e89] via-[#38b2ac] to-[#1f4e89] bg-clip-text text-transparent animate-pulse-glow">
                التعليم
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 font-light mb-4">يبدأ من هنا</p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1f4e89] to-[#38b2ac] mx-auto rounded-full"></div>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            انضم إلى ثورة التعليم الرقمي مع <span className="font-bold text-[#1f4e89]">droosy</span> - منصة تعليمية
            متطورة تجمع بين أفضل المعلمين والتكنولوجيا الحديثة لتقدم لك تجربة تعليمية لا مثيل لها
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#1f4e89] to-[#38b2ac] hover:from-[#1a4077] hover:to-[#2d9b95] text-white px-16 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 animate-pulse-glow"
              >
                ابدأ رحلتك المجانية
                <ArrowRight className="mr-3 h-6 w-6" />
              </Button>
            </Link>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 bg-gradient-to-r from-[#1f4e89] to-[#38b2ac] rounded-full border-3 border-white flex items-center justify-center text-white text-sm font-bold shadow-lg"
                  >
                    {String.fromCharCode(65 + i - 1)}
                  </div>
                ))}
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-gray-900">+50,000 طالب</div>
                <div className="text-gray-600">حققوا أهدافهم معنا</div>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 mr-2">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "50K+", label: "طالب نشط", icon: <Users className="h-6 w-6" /> },
              { number: "500+", label: "معلم خبير", icon: <Award className="h-6 w-6" /> },
              { number: "1000+", label: "دورة تدريبية", icon: <BookOpen className="h-6 w-6" /> },
              { number: "95%", label: "معدل النجاح", icon: <TrendingUp className="h-6 w-6" /> },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#1f4e89] to-[#38b2ac] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold text-gray-900 mb-6">لماذا droosy هو الخيار الأمثل؟</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              نحن لا نقدم مجرد دورات تعليمية، بل نبني مستقبلك التعليمي بأحدث الطرق والتقنيات
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Users className="h-12 w-12" />,
                title: "معلمون متميزون",
                description: "نخبة من أفضل المعلمين والخبراء في مختلف المجالات، مع سنوات من الخبرة في التدريس والتعليم",
                color: "from-[#1f4e89] to-[#38b2ac]",
                features: ["خبرة أكثر من 10 سنوات", "شهادات معتمدة", "متابعة شخصية"],
              },
              {
                icon: <Award className="h-12 w-12" />,
                title: "تتبع ذكي للتقدم",
                description: "نظام متطور لتتبع تقدمك التعليمي مع تحليلات مفصلة وتقارير دورية لضمان تحقيق أهدافك",
                color: "from-[#38b2ac] to-[#1f4e89]",
                features: ["تحليلات مفصلة", "تقارير أسبوعية", "أهداف قابلة للقياس"],
              },
              {
                icon: <Globe className="h-12 w-12" />,
                title: "متاح في كل مكان",
                description: "تعلم من أي مكان وفي أي وقت مع منصة متوافقة مع جميع الأجهزة ومتاحة 24/7",
                color: "from-[#1f4e89] to-[#38b2ac]",
                features: ["متوافق مع جميع الأجهزة", "متاح 24/7", "تحديثات مستمرة"],
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="rounded-3xl shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 group overflow-hidden"
              >
                <CardContent className="p-10 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50"></div>
                  <div className="relative z-10">
                    <div
                      className={`w-24 h-24 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h4 className="text-2xl font-bold mb-6 text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">{feature.description}</p>
                    <div className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#f9fafb] to-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold text-gray-900 mb-6">محتوى تعليمي متكامل</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">تجربة تعليمية شاملة تجمع بين النظرية والتطبيق</p>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="space-y-10">
                {[
                  {
                    icon: <Play className="h-10 w-10" />,
                    title: "فيديوهات تفاعلية عالية الجودة",
                    description: "محتوى فيديو بدقة 4K مع إمكانية التفاعل والتحكم في سرعة التشغيل",
                    color: "bg-[#1f4e89]",
                  },
                  {
                    icon: <FileText className="h-10 w-10" />,
                    title: "مواد دراسية شاملة ومحدثة",
                    description: "ملفات PDF تفاعلية وملاحظات منظمة وموارد إضافية للمراجعة",
                    color: "bg-[#38b2ac]",
                  },
                  {
                    icon: <Award className="h-10 w-10" />,
                    title: "اختبارات ومهام تطبيقية",
                    description: "تقييمات دورية ومشاريع عملية لضمان فهم المحتوى وتطبيقه",
                    color: "bg-[#1f4e89]",
                  },
                  {
                    icon: <Shield className="h-10 w-10" />,
                    title: "شهادات معتمدة",
                    description: "احصل على شهادات معتمدة عند إتمام الدورات بنجاح",
                    color: "bg-[#38b2ac]",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-8 group">
                    <div
                      className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-[#1f4e89] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-10 transform hover:scale-105 transition-all duration-500">
                <img
                  src="/placeholder.svg?height=500&width=600&text=Interactive+Learning+Platform"
                  alt="Interactive Learning Platform"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-[#1f4e89] to-[#38b2ac] rounded-full flex items-center justify-center shadow-xl">
                  <Play className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold text-gray-900 mb-6">قصص نجاح ملهمة</h3>
            <p className="text-xl text-gray-600">اكتشف كيف غيّر droosy حياة طلابنا</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "أحمد محمد علي",
                role: "طالب ثانوية عامة - القاهرة",
                content:
                  "droosy ساعدني أحقق حلمي في دخول كلية الطب. المعلمون رائعون والمحتوى منظم بشكل مثالي. حصلت على 98% في الثانوية العامة!",
                rating: 5,
                image: "/placeholder.svg?height=80&width=80&text=أحمد",
                achievement: "98% في الثانوية العامة",
              },
              {
                name: "فاطمة حسن محمود",
                role: "طالبة جامعية - الإسكندرية",
                content:
                  "المنصة غيرت طريقة تعلمي تماماً. الفيديوهات واضحة والاختبارات تساعد على التقييم المستمر. أنصح كل طالب بتجربة droosy.",
                rating: 5,
                image: "/placeholder.svg?height=80&width=80&text=فاطمة",
                achievement: "تفوق أكاديمي مستمر",
              },
              {
                name: "محمد أحمد حسن",
                role: "طالب إعدادي - الجيزة",
                content:
                  "أحب الطريقة التفاعلية في التعلم. الاختبارات ممتعة والمعلمون يردون على أسئلتي بسرعة. درجاتي تحسنت كثيراً!",
                rating: 5,
                image: "/placeholder.svg?height=80&width=80&text=محمد",
                achievement: "تحسن ملحوظ في الدرجات",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="rounded-3xl shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                <CardContent className="p-8 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#1f4e89] to-[#38b2ac] opacity-10 rounded-bl-3xl"></div>
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-3 border-[#1f4e89]"
                    />
                    <div>
                      <h5 className="font-bold text-gray-900 text-lg">{testimonial.name}</h5>
                      <p className="text-sm text-gray-600 mb-1">{testimonial.role}</p>
                      <p className="text-xs text-[#1f4e89] font-semibold">{testimonial.achievement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#1f4e89] via-[#38b2ac] to-[#1f4e89] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h3 className="text-5xl font-bold text-white mb-8">مستعد لتغيير مستقبلك؟</h3>
          <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            انضم إلى أكثر من 50,000 طالب ومعلم يبنون مستقبلهم التعليمي مع droosy
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-[#1f4e89] hover:bg-gray-100 px-16 py-6 text-xl rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-500 font-bold"
              >
                ابدأ مجاناً الآن
                <ArrowRight className="mr-3 h-6 w-6" />
              </Button>
            </Link>
            <div className="text-white/90 text-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>تجربة مجانية لمدة 7 أيام</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="h-5 w-5" />
                <span>بدون التزام أو رسوم خفية</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="h-10 w-10 text-[#38b2ac]" />
                <div>
                  <h4 className="text-2xl font-bold">droosy</h4>
                  <p className="text-sm text-gray-400">منصة التعليم الذكية</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                نحن نؤمن بقوة التعليم في تغيير المستقبل. انضم إلينا في رحلة التعلم والنمو.
              </p>
              <div className="flex gap-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                  <div
                    key={social}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1f4e89] transition-colors cursor-pointer"
                  >
                    <span className="text-xs">{social[0].toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-bold mb-8 text-xl">المنصة</h5>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link href="/register" className="hover:text-white transition-colors hover:underline">
                    للطلاب
                  </Link>
                </li>
                <li>
                  <Link href="/register?role=teacher" className="hover:text-white transition-colors hover:underline">
                    للمعلمين
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors hover:underline">
                    المميزات
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors hover:underline">
                    الأسعار
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-8 text-xl">الدعم</h5>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors hover:underline">
                    مركز المساعدة
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors hover:underline">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors hover:underline">
                    المجتمع
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors hover:underline">
                    الأسئلة الشائعة
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-8 text-xl">قانوني</h5>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors hover:underline">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors hover:underline">
                    شروط الخدمة
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors hover:underline">
                    سياسة الاسترداد
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors hover:underline">
                    ملفات تعريف الارتباط
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 droosy. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <span>صُنع بـ ❤️ في مصر</span>
              <span>|</span>
              <span>نسخة 2.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
