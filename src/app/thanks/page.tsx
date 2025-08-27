'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

function ThanksContent() {
  const searchParams = useSearchParams()
  const [customerName, setCustomerName] = useState('')

  useEffect(() => {
    const name = searchParams.get('name')
    if (name) {
      setCustomerName(decodeURIComponent(name))
    }
  }, [searchParams])

  const handleWhatsAppClick = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966543654700'
    const message = `مرحبا، قدمت طلب نقل عفش عبر موقعكم واريد متابعة العروض`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    // Push GTM event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'engagement',
        event_label: 'thanks_page'
      })
    }
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white py-20">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {customerName ? (
              <>شكرًا يا {customerName}</>
            ) : (
              <>شكرًا لك</>
            )}
          </h1>

          {/* Message */}
          <p className="text-lg text-gray-600 mb-2">
            تم استلام طلبك بنجاح!
          </p>
          <p className="text-xl font-semibold text-primary mb-8">
            ستصلك عروض الأسعار خلال دقائق في واتساب
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-right">
            <h3 className="font-bold text-lg mb-3">ماذا يحدث الآن؟</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>نقوم بمراجعة طلبك وإرساله للمنفذين المعتمدين</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>ستصلك 3-5 عروض أسعار مختلفة خلال 30 دقيقة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>يمكنك اختيار العرض الأنسب لك والتواصل مباشرة</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              تواصل واتساب الآن
            </Button>
            
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 w-full"
              >
                العودة للرئيسية
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Additional Note */}
          <p className="text-sm text-gray-500 mt-8">
            إذا لم تصلك العروض خلال 30 دقيقة، تواصل معنا على واتساب
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function ThanksPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    }>
      <ThanksContent />
    </Suspense>
  )
}