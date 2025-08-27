"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Sparkles, Shield, Clock, Award } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CTASection() {
  const router = useRouter()
  
  const features = [
    { icon: Shield, text: 'ضمان على الخدمة' },
    { icon: Clock, text: 'عروض خلال 5 دقائق' },
    { icon: Award, text: 'شركات معتمدة' },
    { icon: CheckCircle, text: 'أسعار شفافة' },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">وفر وقتك وفلوسك</span>
          </div>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              ليش تتعب نفسك وتتصل على كل شركة؟
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8">
            خلاص اطلب عروض أسعارك وخلنا نجيب لك <span className="font-bold text-purple-600">أفضل 3 عروض</span> تختار منها اللي يناسبك
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 p-4"
              >
                <feature.icon className="w-8 h-8 text-indigo-600" />
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Main CTA Button */}
          <motion.button
            onClick={() => router.push('/order')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden px-10 py-6 rounded-full font-bold text-white text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* Pulse rings */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-ping opacity-30" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-ping animation-delay-200 opacity-30" />
            </div>

            {/* Button content */}
            <div className="relative flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 animate-pulse" />
              <span>احصل على عروض أسعار مجاناً</span>
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
            </div>
          </motion.button>

          {/* Trust message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500 mt-6"
          >
            🔒 بياناتك محمية • لا توجد رسوم مخفية • إلغاء مجاني
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">15K+</p>
              <p className="text-sm text-gray-600">عميل ارتاح معانا</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">4.9/5</p>
              <p className="text-sm text-gray-600">تقييم العملاء</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">50+</p>
              <p className="text-sm text-gray-600">شريك معتمد</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}