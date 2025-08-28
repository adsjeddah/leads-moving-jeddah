"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  // إظهار الأيقونة بعد تحميل الصفحة
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000) // ظهور بعد ثانيتين

    return () => clearTimeout(timer)
  }, [])

  // دالة فتح واتساب
  const handleWhatsAppClick = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966543654700'
    const message = 'مرحبا، أريد طلب خدمة نقل عفش من خلال موقع prokr'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    // تتبع النقرة في Google Analytics إذا كان متاحاً
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_float_click', {
        event_category: 'engagement',
        event_label: 'floating_whatsapp_button'
      })
    }
    
    window.open(whatsappUrl, '_blank')
  }

  // دالة إخفاء الأيقونة مؤقتاً
  const handleHide = () => {
    setIsVisible(false)
    // إعادة إظهارها بعد 30 ثانية
    setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true)
      }
    }, 30000)
  }

  // دالة إخفاء الأيقونة نهائياً
  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (isDismissed) return null

  return (
    <div className="fixed bottom-4 right-4 z-[9999] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.6
            }}
            className="relative group"
          >
            {/* الأيقونة الرئيسية */}
            <button
              onClick={handleWhatsAppClick}
              className="relative w-12 h-12 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              aria-label="تواصل عبر واتساب"
            >
              {/* أيقونة واتساب الكلاسيكية */}
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.462-.996-4.779-2.811-6.598-1.815-1.819-4.148-2.799-6.620-2.798-5.448 0-9.886 4.435-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.292-.477zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              
              {/* النبضة المتحركة */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-[#25D366] rounded-full"
              />
            </button>

            {/* نص التوضيح عند التمرير */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[10000]">
              <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                تواصل عبر واتساب
                <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 rotate-45 transform -translate-y-1"></div>
              </div>
            </div>

            {/* أزرار الإدارة (تظهر عند التمرير) */}
            <div className="absolute -top-10 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1 z-[10000]">
              {/* زر الإخفاء المؤقت */}
              <button
                onClick={handleHide}
                className="w-5 h-5 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center shadow-md transition-colors text-xs"
                aria-label="إخفاء مؤقت"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              
              {/* زر الإغلاق النهائي */}
              <button
                onClick={handleDismiss}
                className="w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                aria-label="إغلاق نهائي"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// إضافة أيقونة Minus المفقودة
const Minus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
)
