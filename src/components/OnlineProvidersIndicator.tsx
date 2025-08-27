"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, X, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function OnlineProvidersIndicator() {
  const [onlineCount, setOnlineCount] = useState(23) // قيمة ابتدائية وسط المدى
  const [isDismissed, setIsDismissed] = useState(false)
  const [showChangeNotification, setShowChangeNotification] = useState(false)
  const [changeDirection, setChangeDirection] = useState<'up' | 'down' | 'same'>('same')
  const [changeAmount, setChangeAmount] = useState(0)

  // دالة لتوليد عدد عشوائي بين 17-35 مع منطق واقعي ومتقدم
  const generateRealisticCount = (currentCount: number): number => {
    // نظام ذكي لتوليد التغييرات المنطقية
    const timeOfDay = new Date().getHours()
    
    // أوقات الذروة (المزيد من الشركات)
    const isPeakTime = (timeOfDay >= 9 && timeOfDay <= 11) || (timeOfDay >= 14 && timeOfDay <= 17)
    
    // احتمالية أكبر للزيادة في أوقات الذروة
    const increaseChance = isPeakTime ? 0.65 : 0.45
    
    // تحديد نوع التغيير
    const randomValue = Math.random()
    let direction: number
    let maxChange: number
    
    if (randomValue < increaseChance) {
      direction = 1 // زيادة
      maxChange = isPeakTime ? 4 : 2
    } else if (randomValue < increaseChance + 0.35) {
      direction = -1 // نقصان
      maxChange = isPeakTime ? 2 : 3
    } else {
      direction = 0 // ثابت
      maxChange = 0
    }
    
    const change = maxChange > 0 ? Math.floor(Math.random() * maxChange) + 1 : 0
    let newCount = currentCount + (direction * change)
    
    // ضمان البقاء في المدى 17-35 مع تحسينات ذكية
    if (newCount < 17) {
      newCount = 17 + Math.floor(Math.random() * 4)
      direction = 1
    }
    if (newCount > 35) {
      newCount = 35 - Math.floor(Math.random() * 3)
      direction = -1
    }
    
    // إذا كان العدد قريب من الحدود، قلل احتمالية الحركة في نفس الاتجاه
    if (currentCount <= 19 && direction === -1) {
      newCount = currentCount + Math.floor(Math.random() * 2) + 1
      direction = 1
    }
    if (currentCount >= 33 && direction === 1) {
      newCount = currentCount - Math.floor(Math.random() * 2) - 1
      direction = -1
    }
    
    return newCount
  }

  // دالة عرض إشعار التغيير
  const showChangeAlert = (oldCount: number, newCount: number) => {
    const difference = newCount - oldCount
    setChangeAmount(Math.abs(difference))
    
    if (difference > 0) {
      setChangeDirection('up')
    } else if (difference < 0) {
      setChangeDirection('down')
    } else {
      setChangeDirection('same')
      return // لا نعرض إشعار للتغيير الصفري
    }
    
    setShowChangeNotification(true)
    
    // إخفاء الإشعار بعد 3 ثواني
    setTimeout(() => {
      setShowChangeNotification(false)
    }, 3000)
  }

  // تحديث العدد بشكل دوري واقعي ومتقدم
  useEffect(() => {
    if (isDismissed) return

    // أوقات متغيرة ذكية حسب النشاط
    const getSmartInterval = () => {
      const timeOfDay = new Date().getHours()
      const isPeakTime = (timeOfDay >= 9 && timeOfDay <= 11) || (timeOfDay >= 14 && timeOfDay <= 17)
      
      // تحديثات أسرع في أوقات الذروة
      if (isPeakTime) {
        return [30000, 45000, 60000] // 30ث - 1 دقيقة
      } else {
        return [60000, 90000, 120000, 150000] // 1-2.5 دقيقة
      }
    }
    
    const updateCount = () => {
      if (!isDismissed) {
        const oldCount = onlineCount
        const newCount = generateRealisticCount(oldCount)
        
        if (newCount !== oldCount) {
          setOnlineCount(newCount)
          showChangeAlert(oldCount, newCount)
        }
      }
      
      // جدولة التحديث التالي بوقت ذكي
      const smartIntervals = getSmartInterval()
      const randomInterval = smartIntervals[Math.floor(Math.random() * smartIntervals.length)]
      setTimeout(updateCount, randomInterval)
    }

    // بدء التحديثات بعد 30 ثانية (أسرع من قبل)
    const initialTimeout = setTimeout(updateCount, 30000)
    
    return () => clearTimeout(initialTimeout)
  }, [onlineCount, isDismissed])

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
                  initial={{ scale: 1.2, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    duration: 0.5
                  }}
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

      {/* إشعار التغيير الذكي */}
      <AnimatePresence>
        {showChangeNotification && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute -top-12 right-0 z-50"
          >
            <div className={`
              px-3 py-1.5 rounded-lg shadow-lg text-xs font-medium flex items-center gap-2
              ${changeDirection === 'up' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-orange-500 text-white'
              }
            `}>
              {changeDirection === 'up' ? (
                <>
                  <TrendingUp className="w-3 h-3" />
                  <span>+{changeAmount} شركة انضمت</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-3 h-3" />
                  <span>-{changeAmount} شركة غادرت</span>
                </>
              )}
              
              {/* مثلث صغير */}
              <div className={`
                absolute -bottom-1 right-4 w-2 h-2 rotate-45
                ${changeDirection === 'up' ? 'bg-emerald-500' : 'bg-orange-500'}
              `} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}