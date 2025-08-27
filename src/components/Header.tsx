"use client"

import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AnimatedLogo } from '@/components/AnimatedLogo'

export function Header() {
  const router = useRouter()
  
  const handleOrderClick = () => {
    // Push GTM event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'cta_click',
        event_category: 'engagement',
        event_label: 'header_order_button'
      })
    }
    
    router.push('/order')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <AnimatedLogo />
        </Link>
        
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          <Link href="/#services" className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            خدماتنا
          </Link>
          <Link href="/#how-it-works" className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            كيف نعمل
          </Link>
          <Link href="/#testimonials" className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            آراء العملاء
          </Link>
        </nav>

        <motion.button
          onClick={handleOrderClick}
          className="relative group overflow-hidden px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>

          {/* Pulse rings */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-ping opacity-20" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-ping animation-delay-200 opacity-20" />
          </div>

          {/* Button content */}
          <div className="relative flex items-center gap-1 sm:gap-2">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
            <span className="hidden sm:inline text-sm sm:text-base">اطلب الخدمة الآن</span>
            <span className="sm:hidden text-xs">اطلب الآن</span>
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 group-hover:-translate-x-1 transition-transform" />
          </div>
        </motion.button>
      </div>
    </header>
  )
}