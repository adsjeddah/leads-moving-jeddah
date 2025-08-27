"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote, ChevronLeft, ChevronRight, Award, TrendingUp, Users, MapPin, Calendar, CheckCircle } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'محمد السالم',
    avatar: '/images/clients/mohamed_ali.jpg',
    rating: 5,
    date: '2024-11-20',
    location: 'حي الروضة، جدة',
    service: 'نقل عفش شقة كاملة',
    text: 'خدمة ممتازة جداً! الفريق محترف ودقيق في المواعيد. تم نقل جميع الأثاث بدون أي خدش أو ضرر. الأسعار عادلة مقارنة بالخدمة الراقية.',
    verified: true,
    highlight: 'دقة في المواعيد'
  },
  {
    id: 2,
    name: 'فاطمة الأحمد',
    avatar: '/images/clients/asmaa.png',
    rating: 5,
    date: '2024-11-18',
    location: 'حي الصفا، جدة',
    service: 'تغليف ونقل',
    text: 'تجربة رائعة! التغليف كان احترافي جداً، استخدموا مواد عالية الجودة. وصل كل شيء بحالة ممتازة للبيت الجديد.',
    verified: true,
    highlight: 'تغليف احترافي'
  },
  {
    id: 3,
    name: 'عبدالله العتيبي',
    avatar: '/images/clients/Abdullah_AlDosari.png',
    rating: 5,
    date: '2024-11-15',
    location: 'حي الشاطئ، جدة',
    service: 'نقل وتركيب',
    text: 'الشباب شاطرين ومحترمين، فكوا وركبوا الأثاث بسرعة وكفاءة. ما قصروا والله، أنصح الجميع بخدماتهم.',
    verified: true,
    highlight: 'فك وتركيب سريع'
  },
  {
    id: 4,
    name: 'نورا الحربي',
    avatar: '/images/clients/Noura_AlHarbi.png',
    rating: 5,
    date: '2024-11-12',
    location: 'حي البوادي، جدة',
    service: 'نقل من جدة للرياض',
    text: 'نقلوا عفشي من جدة للرياض بكل أمانة واحترافية. وصل كل شيء سليم 100% والتواصل كان ممتاز طول الطريق.',
    verified: true,
    highlight: 'نقل بين المدن'
  },
  {
    id: 5,
    name: 'خالد الشمري',
    avatar: '/images/clients/Khalid_AlShammari.png',
    rating: 5,
    date: '2024-11-10',
    location: 'حي النزهة، جدة',
    service: 'نقل عفش فيلا',
    text: 'فريق محترف بكل معنى الكلمة. نقلوا عفش الفيلا كاملة في يوم واحد. التنظيم والترتيب كان على أعلى مستوى.',
    verified: true,
    highlight: 'خدمة سريعة'
  },
  {
    id: 6,
    name: 'سارة الفايز',
    avatar: '/images/clients/Sarah_AlFayez.png',
    rating: 5,
    date: '2024-11-08',
    location: 'حي الحمراء، جدة',
    service: 'تخزين مؤقت ونقل',
    text: 'خدمة التخزين المؤقت ساعدتني كثير أثناء التجديد. المستودعات نظيفة ومؤمنة، واستلمت عفشي بنفس الحالة.',
    verified: true,
    highlight: 'تخزين آمن'
  }
]

const stats = [
  { icon: Users, value: '15,234', label: 'عميل سعيد' },
  { icon: Star, value: '4.9/5', label: 'متوسط التقييم' },
  { icon: TrendingUp, value: '98%', label: 'نسبة الرضا' },
  { icon: Award, value: '50+', label: 'شريك معتمد' }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [autoPlay])

  const handleNext = () => {
    setAutoPlay(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setAutoPlay(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleDotClick = (index: number) => {
    setAutoPlay(false)
    setCurrentIndex(index)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full mb-6">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-gray-700">آراء عملائنا الكرام</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ثقة أكثر من 15,000 عميل
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نفتخر بخدمة آلاف العملاء في جدة وحصولنا على تقييمات ممتازة
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left side - Review content */}
                  <div className="order-2 md:order-1">
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-blue-200 mb-6" />
                    
                    {/* Review Text */}
                    <p className="text-xl text-gray-700 leading-relaxed mb-6">
                      &ldquo;{testimonials[currentIndex].text}&rdquo;
                    </p>

                    {/* Service Details */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        <MapPin className="w-4 h-4" />
                        {testimonials[currentIndex].location}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        {testimonials[currentIndex].service}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold">
                        ⭐ {testimonials[currentIndex].highlight}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="mr-2 text-gray-600 text-sm">5.0 من 5</span>
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          width={60}
                          height={60}
                          className="rounded-full border-3 border-blue-100"
                        />
                        {testimonials[currentIndex].verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">
                          {testimonials[currentIndex].name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span suppressHydrationWarning>{testimonials[currentIndex].date}</span>
                          {testimonials[currentIndex].verified && (
                            <span className="text-green-600 font-medium">✓ عميل موثق</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Visual element */}
                  <div className="order-1 md:order-2">
                    <div className="relative">
                      <div className="aspect-square max-w-sm mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl"></div>
                        <div className="relative p-8">
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="bg-white rounded-2xl p-6 shadow-xl"
                          >
                            <div className="text-center">
                              <div className="text-6xl mb-4">🏆</div>
                              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                خدمة ممتازة
                              </p>
                              <div className="flex justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`
                  transition-all duration-300
                  ${index === currentIndex 
                    ? 'w-12 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full' 
                    : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'}
                `}
              />
            ))}
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
              <div className="text-3xl mb-2">🏅</div>
              <p className="text-sm font-medium text-gray-700">جائزة أفضل خدمة</p>
              <p className="text-xs text-gray-500">2024</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
              <div className="text-3xl mb-2">🛡️</div>
              <p className="text-sm font-medium text-gray-700">تأمين شامل</p>
              <p className="text-xs text-gray-500">على جميع النقلات</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-sm font-medium text-gray-700">تتبع مباشر</p>
              <p className="text-xs text-gray-500">لشحنتك</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-sm font-medium text-gray-700">ضمان الجودة</p>
              <p className="text-xs text-gray-500">100%</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">انضم إلى آلاف العملاء السعداء</p>
          <button
            onClick={() => {
              window.location.href = '/order'
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            احصل على عرض سعر مجاني
            <ChevronLeft className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}