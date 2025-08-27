"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Users, MessageSquare, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'تعبئة الطلب الذكي',
    description: 'املأ النموذج البسيط خلال دقيقة واحدة فقط',
    number: '1'
  },
  {
    icon: Users,
    title: 'نستقبل عروض من المنفّذين',
    description: 'نتواصل مع أفضل شركات النقل المعتمدة',
    number: '2'
  },
  {
    icon: CheckCircle,
    title: 'نرسل الأفضل مباشرة',
    description: 'تصلك أفضل العروض خلال دقائق على واتساب',
    number: '3'
  }
]

export function HowWeWork() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">كيف نشتغل؟</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ثلاث خطوات بسيطة للحصول على أفضل خدمة نقل عفش
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -left-4 w-8 border-t-2 border-dashed border-gray-300" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}