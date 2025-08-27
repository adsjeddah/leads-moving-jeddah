"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface ImagePlaceholderProps {
  width?: string | number
  height?: string | number
  className?: string
  text?: string
  icon?: React.ReactNode
  animate?: boolean
}

export function ImagePlaceholder({
  width = '100%',
  height = '200px',
  className = '',
  text = 'جاري التحميل...',
  icon,
  animate = true
}: ImagePlaceholderProps) {
  const placeholderContent = (
    <div
      className={`
        flex flex-col items-center justify-center
        bg-gradient-to-br from-gray-100 to-gray-200
        border-2 border-dashed border-gray-300
        rounded-lg
        ${className}
      `}
      style={{ width, height }}
    >
      {icon && (
        <div className="mb-2 text-gray-400">
          {icon}
        </div>
      )}
      <span className="text-sm text-gray-500 font-medium">{text}</span>
      
      {/* Loading dots animation */}
      <div className="flex space-x-1 mt-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {placeholderContent}
      </motion.div>
    )
  }

  return placeholderContent
}

// Skeleton Loader للصور
export function ImageSkeleton({
  width = '100%',
  height = '200px',
  className = '',
  rounded = true
}: {
  width?: string | number
  height?: string | number
  className?: string
  rounded?: boolean
}) {
  return (
    <div
      className={`
        animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
        ${rounded ? 'rounded-lg' : ''}
        ${className}
      `}
      style={{ width, height }}
    >
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
    </div>
  )
}

export default ImagePlaceholder
