"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Truck, Users, Clock, Zap, CheckCircle2 } from 'lucide-react'

export function OnlineProvidersIndicator() {
  const [onlineCount, setOnlineCount] = useState(23) // قيمة ابتدائية وسط المدى
  const [isVisible, setIsVisible] = useState(true)

  // دالة لتوليد عدد عشوائي بين 17-35 مع منطق واقعي
  const generateRealisticCount = (currentCount: number): number => {
    // تغييرات صغيرة أكثر واقعية (+-1 إلى +-3)
    const maxChange = Math.random() > 0.7 ? 3 : Math.random() > 0.5 ? 2 : 1
    const direction = Math.random() > 0.5 ? 1 : -1
    const change = Math.floor(Math.random() * maxChange) + 1
    
    let newCount = currentCount + (direction * change)
    
    // ضمان البقاء في المدى 17-35
    if (newCount < 17) newCount = 17 + Math.floor(Math.random() * 3)
    if (newCount > 35) newCount = 35 - Math.floor(Math.random() * 3)
    
    return newCount
  }

  // تحديث العدد بشكل دوري واقعي
  useEffect(() => {
    const intervals = [
      45000, 60000, 75000, 90000, 120000 // 45ث - 2 دقيقة (متغير)
    ]
    
    const updateCount = () => {
      setOnlineCount(prevCount => generateRealisticCount(prevCount))
      
      // جدولة التحديث التالي بوقت عشوائي
      const randomInterval = intervals[Math.floor(Math.random() * intervals.length)]
      setTimeout(updateCount, randomInterval)
    }

    // بدء التحديثات بعد دقيقة واحدة
    const initialTimeout = setTimeout(updateCount, 60000)
    
    return () => clearTimeout(initialTimeout)
  }, [])

  // إخفاء/إظهار المؤشر (للمستخدمين الذين لا يريدونه)
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          x: isVisible ? 0 : 100, 
          scale: isVisible ? 1 : 0.8 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15,
          duration: 0.6 
        }}
        className="group"
      >
        {/* المؤشر الرئيسي */}
        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-[200px] backdrop-blur-sm overflow-hidden">
          {/* خلفية متدرجة خفيفة */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-blue-50/50"></div>
          
          {/* محتوى المؤشر */}
          <div className="relative z-10">
            {/* العنوان */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-sm">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-semibold text-gray-700 leading-tight">
                  شركات متاحة الآن
                </h4>
              </div>
            </div>

            {/* العدد الرئيسي */}
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                key={onlineCount}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
              >
                {onlineCount}
              </motion.div>
              
              <div className="flex-1">
                <p className="text-xs text-gray-600 leading-tight">
                  شركة نقل عفش
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                  />
                  <span className="text-xs text-emerald-600 font-medium">أونلاين</span>
                </div>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>جاهزة لاستقبال الطلبات</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Clock className="w-3 h-3 text-blue-500" />
                <span>متوسط الرد: دقيقتان</span>
              </div>
            </div>

            {/* شريط النشاط */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">مستوى النشاط</span>
                <span className="text-emerald-600 font-medium">عالي</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* نبضة الحواف للدلالة على النشاط */}
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(16, 185, 129, 0.4)",
                "0 0 0 8px rgba(16, 185, 129, 0)",
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
          />
          
          {/* أيقونة نشاط في الزاوية */}
          <div className="absolute top-2 right-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 text-emerald-400"
            >
              <Zap className="w-full h-full" />
            </motion.div>
          </div>
        </div>

        {/* زر إخفاء صغير (يظهر عند التمرير) */}
        <motion.button
          onClick={toggleVisibility}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-white/80 backdrop-blur-sm rounded-l-lg shadow-sm border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors text-xs opacity-0 group-hover:opacity-100"
          aria-label={isVisible ? "إخفاء المؤشر" : "إظهار المؤشر"}
        >
          {isVisible ? "‹" : "›"}
        </motion.button>
      </motion.div>

      {/* زر إظهار صغير عند الإخفاء */}
      {!isVisible && (
        <motion.button
          onClick={toggleVisibility}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
          aria-label="إظهار مؤشر الشركات"
        >
          <Truck className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  )
}
