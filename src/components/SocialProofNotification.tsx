"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, MapPin, Clock, User } from 'lucide-react'
import jeddahDistricts from '@/data/jeddah_districts.json'

// قائمة أسماء سعودية متنوعة
const saudiNames = [
  // أسماء رجال
  'أحمد محمد', 'محمد عبدالله', 'عبدالعزيز سالم', 'سالم أحمد', 'فهد عبدالرحمن',
  'عبدالله محمد', 'خالد عبدالعزيز', 'بندر سعد', 'سعد عبدالله', 'ناصر محمد',
  'عمر عبدالعزيز', 'يوسف أحمد', 'إبراهيم سالم', 'عبدالرحمن فهد', 'طارق محمد',
  'وليد عبدالله', 'ماجد سعد', 'هشام عبدالعزيز', 'تركي محمد', 'عادل أحمد',
  'راشد عبدالله', 'زياد سالم', 'نايف عبدالعزيز', 'صالح محمد', 'عثمان أحمد',

  // أسماء نساء  
  'فاطمة أحمد', 'نورا محمد', 'سارة عبدالله', 'عائشة سالم', 'خديجة عبدالعزيز',
  'أسماء محمد', 'هند عبدالله', 'ريم أحمد', 'لمى سعد', 'دانا عبدالرحمن',
  'شهد محمد', 'غلا عبدالله', 'رهف أحمد', 'جود سالم', 'لين عبدالعزيز',
  'مريم محمد', 'زينب عبدالله', 'رنا أحمد', 'سلمى سعد', 'آلاء عبدالرحمن'
]

// رسائل متنوعة للطلبات
const notificationMessages = [
  'طلب خدمة نقل العفش',
  'حجز موعد لنقل الأثاث', 
  'طلب عرض سعر لنقل شقة',
  'حجز خدمة نقل فيلا',
  'طلب نقل مكتب',
  'حجز خدمة التغليف والنقل',
  'طلب نقل عفش مع التركيب',
  'حجز خدمة النقل السريع'
]

// أوقات عشوائية لإظهار أن الطلب حديث
const timeMessages = [
  'منذ 3 دقائق',
  'منذ 5 دقائق', 
  'منذ 8 دقائق',
  'منذ 12 دقائق',
  'منذ 15 دقائق',
  'منذ 18 دقائق'
]

interface NotificationData {
  id: number
  name: string
  district: string
  message: string
  time: string
}

export function SocialProofNotification() {
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [currentNotification, setCurrentNotification] = useState<NotificationData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  // دالة لإنشاء إشعار عشوائي
  const generateRandomNotification = (): NotificationData => {
    const randomName = saudiNames[Math.floor(Math.random() * saudiNames.length)]
    const randomDistrict = jeddahDistricts.districts[Math.floor(Math.random() * (jeddahDistricts.districts.length - 1))] // تجاهل "أخرى"
    const randomMessage = notificationMessages[Math.floor(Math.random() * notificationMessages.length)]
    const randomTime = timeMessages[Math.floor(Math.random() * timeMessages.length)]
    
    return {
      id: Date.now() + Math.random(),
      name: randomName,
      district: randomDistrict,
      message: randomMessage,
      time: randomTime
    }
  }

  // تأثير لإظهار الإشعارات بشكل دوري
  useEffect(() => {
    if (isDismissed) return

    // إظهار أول إشعار بعد 5 ثواني من تحميل الصفحة
    const initialTimer = setTimeout(() => {
      const notification = generateRandomNotification()
      setCurrentNotification(notification)
      setIsVisible(true)
    }, 5000)

    // إنشاء إشعارات جديدة كل 15-25 ثانية
    const notificationInterval = setInterval(() => {
      if (!isDismissed && !isVisible) {
        const notification = generateRandomNotification()
        setCurrentNotification(notification)
        setIsVisible(true)
      }
    }, Math.random() * 10000 + 15000) // بين 15-25 ثانية

    return () => {
      clearTimeout(initialTimer)
      clearInterval(notificationInterval)
    }
  }, [isDismissed, isVisible])

  // إخفاء الإشعار تلقائياً بعد 6 ثواني
  useEffect(() => {
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, 6000)

      return () => clearTimeout(hideTimer)
    }
  }, [isVisible])

  // دالة إغلاق الإشعار
  const handleClose = () => {
    setIsVisible(false)
  }

  // دالة إغلاق الإشعارات نهائياً
  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (isDismissed || !currentNotification) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              duration: 0.6 
            }}
            className="pointer-events-auto"
          >
            <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 p-3 max-w-xs w-60 sm:w-72 backdrop-blur-sm">
              {/* زر الإغلاق */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="إغلاق الإشعار"
              >
                <X className="w-3 h-3 text-gray-500" />
              </button>

              {/* محتوى الإشعار */}
              <div className="flex items-start gap-2 pr-4">
                {/* أيقونة التأكيد */}
                <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* اسم العميل */}
                  <div className="flex items-center gap-1 mb-0.5">
                    <User className="w-3 h-3 text-gray-500" />
                    <p className="font-semibold text-gray-900 text-xs truncate">
                      {currentNotification.name}
                    </p>
                  </div>

                  {/* نوع الطلب */}
                  <p className="text-gray-700 text-xs font-medium mb-1.5">
                    {currentNotification.message}
                  </p>

                  {/* الموقع والوقت */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" />
                      <span className="truncate text-xs">{currentNotification.district}</span>
                    </div>
                    
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <Clock className="w-2.5 h-2.5" />
                      <span className="text-xs">{currentNotification.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* شريط التقدم */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100 rounded-b-xl overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              </div>

              {/* تأثير التوهج */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-teal-500/5 rounded-xl pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* زر إيقاف الإشعارات نهائياً (يظهر عند عدم وجود إشعار نشط) */}
      {!isVisible && !isDismissed && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleDismiss}
          className="pointer-events-auto text-xs text-gray-400 hover:text-gray-600 transition-colors bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md shadow-sm border border-gray-200"
        >
          إيقاف الإشعارات
        </motion.button>
      )}
    </div>
  )
}
