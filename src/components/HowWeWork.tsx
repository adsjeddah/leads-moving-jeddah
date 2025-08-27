"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FileText, Users, MessageSquare, CheckCircle, Clock, Shield, Star } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'تعبئة الطلب الذكي',
    description: 'املأ النموذج البسيط خلال دقيقة واحدة فقط',
    details: 'نموذج ذكي يجمع كل المعلومات المطلوبة بسهولة',
    number: '1',
    image: '/images/furniture_moving_quotes.jpeg',
    color: 'blue'
  },
  {
    icon: Users,
    title: 'نستقبل عروض من المنفّذين',
    description: 'نتواصل مع أفضل شركات النقل المعتمدة',
    details: 'شبكة واسعة من الشركات المرخصة والموثوقة',
    number: '2',
    image: '/images/furniture_moving_staff.jpeg',
    color: 'green'
  },
  {
    icon: CheckCircle,
    title: 'نرسل الأفضل مباشرة',
    description: 'تصلك أفضل العروض خلال دقائق على واتساب',
    details: 'مقارنة دقيقة لاختيار أفضل عرض لك',
    number: '3',
    image: '/images/best_moving_services_jeddah.jpeg',
    color: 'purple'
  }
]

export function HowWeWork() {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, any> = {
      blue: { bg: 'bg-blue-500', bgLight: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-500', bgLight: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-500', bgLight: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' }
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-6">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">عملية سريعة وسهلة</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              كيف نشتغل؟
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ثلاث خطوات بسيطة تفصلك عن أفضل خدمة نقل عفش في جدة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            const colors = getColorClasses(step.color)
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg z-10">
                    {step.number}
                  </div>
                  
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Icon overlay */}
                    <div className="absolute bottom-4 right-4">
                      <div className={`
                        w-14 h-14 rounded-xl ${colors.bgLight} backdrop-blur-sm border border-white/20 flex items-center justify-center
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        <Icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <p className="text-sm text-gray-500">{step.details}</p>
                  </div>
                </div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -left-6 transform -translate-y-1/2 z-20">
                    <div className="flex items-center">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                      <div className="w-0 h-0 border-l-4 border-l-purple-400 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Clock, title: 'سرعة في التنفيذ', desc: 'استجابة خلال دقائق' },
            { icon: Shield, title: 'ضمان الجودة', desc: 'شركات معتمدة ومرخصة' },
            { icon: Star, title: 'أفضل الأسعار', desc: 'مقارنة شاملة للعروض' }
          ].map((feature, index) => (
            <div key={index} className="text-center p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}