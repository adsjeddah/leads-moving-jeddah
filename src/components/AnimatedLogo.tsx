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
        width={150}
        height={50}
        className="h-10 sm:h-12 w-auto object-contain"
        priority
      />
    </motion.div>
  )
}