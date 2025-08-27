"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function AnimatedLogo() {
  return (
    <motion.div 
      className="flex items-center"
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <Image
        src="/images/logo.jpg"
        alt="بروكر - نقل عفش جدة"
        width={120}
        height={40}
        className="h-8 sm:h-10 w-auto object-contain"
        priority
      />
    </motion.div>
  )
}