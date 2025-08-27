"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Truck, X } from 'lucide-react'

export function OnlineProvidersIndicator() {
  const [onlineCount, setOnlineCount] = useState(23) // قيمة ابتدائية وسط المدى
  const [isDismissed, setIsDismissed] = useState(false)

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
    if (isDismissed) return

    const intervals = [
      45000, 60000, 75000, 90000, 120000 // 45ث - 2 دقيقة (متغير)
    ]
    
    const updateCount = () => {
      if (!isDismissed) {
        setOnlineCount(prevCount => generateRealisticCount(prevCount))
      }
      
      // جدولة التحديث التالي بوقت عشوائي
      const randomInterval = intervals[Math.floor(Math.random() * intervals.length)]
      setTimeout(updateCount, randomInterval)
    }

    // بدء التحديثات بعد دقيقة واحدة
    const initialTimeout = setTimeout(updateCount, 60000)
    
    return () => clearTimeout(initialTimeout)
  }, [isDismissed])

  // إغلاق المؤشر نهائياً
  const handleClose = () => {
    setIsDismissed(true)
  }

  if (isDismissed) return null

  return (
    <div className="fixed right-4 bottom-20 z-40">
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15,
          duration: 0.6 
        }}
      >
        {/* المؤشر المختصر */}
        <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 p-3 max-w-[140px] backdrop-blur-sm overflow-hidden">
          {/* خلفية متدرجة خفيفة */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-teal-50/20"></div>
          
          {/* زر الإغلاق */}
          <button
            onClick={handleClose}
            className="absolute top-1 right-1 p-0.5 rounded-full hover:bg-gray-100 transition-colors z-20"
            aria-label="إغلاق المؤشر"
          >
            <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
          </button>

          {/* محتوى المؤشر المختصر */}
          <div className="relative z-10 pr-4">
            {/* العنوان والعدد */}
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-sm">
                <Truck className="w-3 h-3 text-white" />
              </div>
              
              <div className="flex-1">
                <motion.div
                  key={onlineCount}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-none"
                >
                  {onlineCount}
                </motion.div>
                <p className="text-xs text-gray-600 leading-tight -mt-0.5">
                  شركة متاحة
                </p>
              </div>
            </div>

            {/* مؤشر النشاط المبسط */}
            <div className="flex items-center gap-1 justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
              />
              <span className="text-xs text-emerald-600 font-medium">أونلاين الآن</span>
            </div>
          </div>

          {/* نبضة خفيفة للحواف */}
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(16, 185, 129, 0.15)",
                "0 0 0 3px rgba(16, 185, 129, 0)",
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
            className="absolute inset-0 rounded-xl pointer-events-none"
          />
        </div>
      </motion.div>
    </div>
  )
}