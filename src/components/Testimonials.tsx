"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Users, TrendingUp, Award, Heart } from 'lucide-react'

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

// العميل المميز
const featuredTestimonial = {
  name: 'مروان القرني',
  avatar: '/images/clients/mohamed_ali.jpg',
  rating: 5,
  duration: 'منذ 3 أسابيع',
  cost: '1,700 ريال',
  text: 'تعاملت مع شركة من الدليل ووجدت الاحترافية والأمانة. حل للتفاصيل واضحة والخدمة سريعة'
}

// الإحصائيات الرئيسية
const mainStats = [
  { 
    icon: Users, 
    value: '+15,000', 
    label: 'عملية نقل',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10'
  },
  { 
    icon: TrendingUp, 
    value: '98%', 
    label: 'نسبة الرضا',
    color: 'from-green-500 to-green-600', 
    bgColor: 'bg-green-500/10'
  },
  { 
    icon: Star, 
    value: '4.9', 
    label: 'متوسط التقييم',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-500/10'
  },
  { 
    icon: Heart, 
    value: '+2,847', 
    label: 'عميل سعيد',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10'
  }
]

export function Testimonials() {
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

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <p className="text-2xl text-white leading-relaxed mb-8 text-center">
              &ldquo;{featuredTestimonial.text}&rdquo;
            </p>
            
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">الحد الأدنى لطلبكم</p>
                <p className="text-green-400 font-bold text-lg">{featuredTestimonial.cost}</p>
              </div>
              
              <div className="relative">
                <Image
                  src={featuredTestimonial.avatar}
                  alt={featuredTestimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white/20"
                />
              </div>
              
              <div className="text-center">
                <p className="text-white font-bold text-xl">{featuredTestimonial.name}</p>
                <div className="flex justify-center gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-400 text-sm">{featuredTestimonial.duration}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Client Avatars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-4 mb-8"
        >
          <div className="flex -space-x-3">
            {clientAvatars.slice(0, 12).map((avatar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image
                  src={avatar}
                  alt={`عميل ${index + 1}`}
                  width={50}
                  height={50}
                  className="rounded-full border-3 border-white/30 hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            ))}
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
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
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