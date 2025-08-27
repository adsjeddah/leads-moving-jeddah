"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Truck, Package, Wrench, Archive, Shield, Clock, Users, Star, CheckCircle, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const services = [
  {
    icon: MapPin,
    title: 'نقل عفش داخل جدة',
    description: 'من حي لحي، نوصلك لأحسن المنفذين',
    features: ['تغطية جميع الأحياء', 'توصيل في نفس اليوم', 'أسعار ثابتة'],
    popular: false,
    color: 'blue',
    image: '/images/furniture_moving_services_jeddah_1.jpeg'
  },
  {
    icon: Truck,
    title: 'نقل عفش من وإلى جدة',
    description: 'للي رايح أو جاي جدة، عندنا أفضل الشركات',
    features: ['تأمين على البضائع', 'تتبع الشحنة', 'خدمة 24/7'],
    popular: true,
    color: 'purple',
    image: '/images/furniture_moving_trucks.jpeg'
  },
  {
    icon: Package,
    title: 'تغليف احترافي',
    description: 'عشان عفشك يوصل سليم 100%',
    features: ['مواد تغليف مستوردة', 'حماية 100%', 'تغليف مخصص'],
    popular: false,
    color: 'green',
    image: '/images/furniture_packing_experts.jpeg'
  },
  {
    icon: Wrench,
    title: 'فك وتركيب',
    description: 'عمال محترفين يفكون ويركبون بدقة',
    features: ['فنيون محترفون', 'أدوات حديثة', 'ضمان التركيب'],
    popular: false,
    color: 'orange',
    image: '/images/furniture_assembly_services.jpeg'
  },
  {
    icon: Archive,
    title: 'تخزين مؤقت',
    description: 'لو محتاج تخزن عفشك فترة، عندنا مستودعات آمنة',
    features: ['مستودعات مؤمنة', 'تكييف 24/7', 'مراقبة مستمرة'],
    popular: false,
    color: 'red',
    image: '/images/furniture_storage_solutions.jpeg'
  },
  {
    icon: Shield,
    title: 'تأمين شامل',
    description: 'تأمين كامل على جميع المنقولات ضد التلف والفقدان',
    features: ['تغطية شاملة', 'تعويض فوري', 'بدون رسوم إضافية'],
    popular: false,
    color: 'indigo',
    image: '/images/furniture_moving_insurance.jpeg'
  }
]

const stats = [
  { number: '15,000+', label: 'عملية نقل ناجحة' },
  { number: '98%', label: 'رضا العملاء' },
  { number: '50+', label: 'شريك موثوق' },
  { number: '24/7', label: 'خدمة متاحة' }
]

export function Services() {
  const router = useRouter()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' }
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-6">
            <Star className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">خدمات متكاملة بأعلى جودة</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              كل ما تحتاجه لنقل آمن ومريح
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم حلول نقل عفش شاملة مع ضمان الجودة والأمان. اختر الخدمات التي تناسب احتياجاتك
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            const colors = getColorClasses(service.color)
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative group"
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                      الأكثر طلباً
                    </span>
                  </div>
                )}
                
                <div className={`
                  h-full rounded-3xl bg-white border-2 transition-all duration-300 cursor-pointer overflow-hidden
                  ${service.popular ? 'border-purple-300 shadow-xl' : 'border-gray-100 hover:border-gray-200 hover:shadow-xl'}
                  group-hover:transform group-hover:scale-[1.02]
                `}>
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Icon overlay */}
                    <div className="absolute bottom-4 right-4">
                      <div className={`
                        w-12 h-12 rounded-xl ${colors.bg} backdrop-blur-sm border border-white/20 flex items-center justify-center
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2">
                          <CheckCircle className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        router.push('/order')
                      }}
                      className={`
                        w-full py-3 px-6 rounded-xl font-medium transition-all duration-300
                        ${service.popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                          : `${colors.bg} ${colors.text} hover:bg-opacity-80`
                        }
                        group-hover:shadow-lg flex items-center justify-center gap-2
                      `}
                    >
                      <span>اطلب عروض أسعار</span>
                      <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <Shield className="w-12 h-12 text-green-600" />
            <div className="text-right">
              <p className="font-bold text-lg text-gray-900">ضمان 100% على جميع الخدمات</p>
              <p className="text-sm text-gray-600">نضمن لك خدمة احترافية أو استرداد أموالك</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">لا تجد الخدمة التي تبحث عنها؟</p>
          <button 
            onClick={() => {
              const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966543654700'
              window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('أريد الاستفسار عن خدمة مخصصة')}`, '_blank')
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            تواصل واتساب للخدمات المخصصة
          </button>
        </motion.div>
      </div>
    </section>
  )
}