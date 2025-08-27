"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Star, Users, TrendingUp, Award, Heart, ChevronLeft, ChevronRight } from 'lucide-react'

// بيانات العملاء للصور الدائرية
const clientAvatars = [
  '/images/clients/mohamed_ali.jpg',
  '/images/clients/asmaa.png', 
  '/images/clients/Abdullah_AlDosari.png',
  '/images/clients/Noura_AlHarbi.png',
  '/images/clients/Khalid_AlShammari.png',
  '/images/clients/Sarah_AlFayez.png',
  '/images/clients/Fahad_AlOtaibi.png',
  '/images/clients/Yousef_AlQahtani.png',
  '/images/clients/abdelhadi.jpg',
  '/images/clients/amer.jpg',
  '/images/clients/badr.webp',
  '/images/clients/basma.webp'
]

// مجموعة التقييمات المتعددة
const testimonials = [
  {
    id: 1,
    name: 'مروان القرني',
    avatar: '/images/clients/mohamed_ali.jpg',
    rating: 5,
    duration: 'منذ 3 أسابيع',
    cost: '1,700 ريال',
    text: 'تعاملت مع شركة من الدليل ووجدت الاحترافية والأمانة. حل للتفاصيل واضحة والخدمة سريعة'
  },
  {
    id: 2,
    name: 'فاطمة الأحمد',
    avatar: '/images/clients/asmaa.png',
    rating: 5,
    duration: 'منذ أسبوعين',
    cost: '2,300 ريال',
    text: 'خدمة ممتازة جداً! الفريق محترف ودقيق في المواعيد. تم نقل جميع الأثاث بدون أي خدش أو ضرر'
  },
  {
    id: 3,
    name: 'عبدالله العتيبي',
    avatar: '/images/clients/Abdullah_AlDosari.png',
    rating: 5,
    duration: 'منذ شهر',
    cost: '1,450 ريال',
    text: 'الشباب شاطرين ومحترمين، فكوا وركبوا الأثاث بسرعة وكفاءة. ما قصروا والله، أنصح الجميع بخدماتهم'
  },
  {
    id: 4,
    name: 'نورا الحربي',
    avatar: '/images/clients/Noura_AlHarbi.png',
    rating: 5,
    duration: 'منذ أسبوع',
    cost: '3,200 ريال',
    text: 'نقلوا عفشي من جدة للرياض بكل أمانة واحترافية. وصل كل شيء سليم 100% والتواصل كان ممتاز طول الطريق'
  }
]

// الإحصائيات الرئيسية
const mainStats = [
  { 
    icon: Users, 
    value: '+15,000', 
    label: 'عملية نقل',
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-500/20'
  },
  { 
    icon: TrendingUp, 
    value: '98%', 
    label: 'نسبة الرضا',
    iconColor: 'text-green-400', 
    bgColor: 'bg-green-500/20'
  },
  { 
    icon: Star, 
    value: '4.9', 
    label: 'متوسط التقييم',
    iconColor: 'text-orange-400',
    bgColor: 'bg-orange-500/20'
  },
  { 
    icon: Heart, 
    value: '+2,847', 
    label: 'عميل سعيد',
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/20'
  }
]

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  // التقليب التلقائي بين التقييمات
  useEffect(() => {
    if (!autoPlay) return
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [autoPlay])

  const handleNext = () => {
    setAutoPlay(false)
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setAutoPlay(false)
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full shadow-lg">
            <Star className="w-5 h-5 text-black" />
            <span className="text-black font-bold text-sm">تقييمات حقيقية 100+</span>
            <Star className="w-5 h-5 text-black" />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            ماذا يقول{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              عملاؤنا الكرام
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            تجارب حقيقية من عملائنا استخدموا دليلاً للوصول إلى أفضل شركات نقل العفش في المملكة
          </p>
        </motion.div>

        {/* Featured Testimonial with Carousel */}
        <div className="max-w-4xl mx-auto mb-16 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <p className="text-2xl text-white leading-relaxed mb-8 text-center">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </p>
              
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">تكلفة الخدمة</p>
                  <p className="text-green-400 font-bold text-lg">{testimonials[currentTestimonial].cost}</p>
                </div>
                
                <div className="relative">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white/20"
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-white font-bold text-xl">{testimonials[currentTestimonial].name}</p>
                  <div className="flex justify-center gap-1 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm">{testimonials[currentTestimonial].duration}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 border border-white/30"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 border border-white/30"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoPlay(false)
                  setCurrentTestimonial(index)
                }}
                className={`transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'w-8 h-2 bg-white rounded-full' 
                    : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Client Avatars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center items-center mb-8"
        >
          <div className="flex items-center gap-2">
            {clientAvatars.slice(0, 12).map((avatar, index) => {
              // تحديد ما إذا كانت هذه الصورة مرتبطة بالتقييم الحالي
              const isActiveTestimonial = testimonials[currentTestimonial]?.avatar === avatar
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative cursor-pointer"
                  onClick={() => {
                    // البحث عن التقييم المرتبط بهذه الصورة
                    const testimonialIndex = testimonials.findIndex(t => t.avatar === avatar)
                    if (testimonialIndex !== -1) {
                      setAutoPlay(false)
                      setCurrentTestimonial(testimonialIndex)
                    }
                  }}
                >
                  <div 
                    className={`
                      relative overflow-hidden rounded-full transition-all duration-500 ease-in-out
                      ${isActiveTestimonial 
                        ? 'w-16 h-16 border-4 border-amber-400 shadow-lg shadow-amber-400/50 scale-110 animate-pulse' 
                        : 'w-12 h-12 border-2 border-white/50 hover:border-white/70 hover:scale-105'
                      }
                      bg-white/10 backdrop-blur-sm
                    `}
                  >
                    <Image
                      src={avatar}
                      alt={`عميل ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full rounded-full object-cover"
                    />
                    
                    {/* مؤشر التقييم النشط */}
                    {isActiveTestimonial && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center border-2 border-white"
                      >
                        <Star className="w-3 h-3 text-white fill-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-white font-bold text-lg mr-2">متوسط التقييم 4.9</span>
          </div>
          <p className="text-gray-300">
            <span className="text-blue-400 font-bold">+2,847</span> عميل سعيد
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {mainStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${stat.bgColor} flex items-center justify-center border border-white/20`}>
                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => {
              window.location.href = '/order'
            }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <Award className="w-6 h-6" />
            اطلب خدمتك الآن
          </button>
        </motion.div>
      </div>
    </section>
  )
}