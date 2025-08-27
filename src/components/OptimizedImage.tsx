"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  loading?: 'lazy' | 'eager'
  style?: React.CSSProperties
  onLoad?: () => void
  animate?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  loading = 'lazy',
  style,
  onLoad,
  animate = true,
  ...props
}: OptimizedImageProps) {
  const imageProps: any = {
    src,
    alt: alt || '',
    className: `${className} transition-all duration-300`,
    priority,
    quality,
    placeholder,
    loading,
    style,
    onLoad,
    sizes: sizes || (fill ? '100vw' : `${width}px`),
    ...props
  }

  if (fill) {
    imageProps.fill = true
  } else if (width && height) {
    imageProps.width = width
    imageProps.height = height
  }

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Image {...imageProps} />
      </motion.div>
    )
  }

  return <Image {...imageProps} />
}

// Hook لاستخدام الصور الديناميكية
export function useImageWithFallback(
  primarySrc: string,
  fallbackSrc: string = '/images/default-placeholder.jpg'
) {
  const [currentSrc, setCurrentSrc] = React.useState(primarySrc)
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    setCurrentSrc(primarySrc)
    setHasError(false)
  }, [primarySrc])

  const handleError = React.useCallback(() => {
    if (!hasError) {
      setCurrentSrc(fallbackSrc)
      setHasError(true)
    }
  }, [fallbackSrc, hasError])

  return { src: currentSrc, onError: handleError }
}

// مكون للصور المتجاوبة مع تأثيرات متقدمة
interface ResponsiveImageProps extends OptimizedImageProps {
  aspectRatio?: string
  overlay?: boolean
  overlayColor?: string
  hoverEffect?: 'zoom' | 'fade' | 'none'
}

export function ResponsiveImage({
  aspectRatio = '16/9',
  overlay = false,
  overlayColor = 'black/20',
  hoverEffect = 'zoom',
  className = '',
  ...props
}: ResponsiveImageProps) {
  const hoverClasses = {
    zoom: 'hover:scale-110',
    fade: 'hover:opacity-80',
    none: ''
  }

  return (
    <div 
      className={`
        relative overflow-hidden rounded-lg group
        ${className}
      `}
      style={{ aspectRatio }}
    >
      <OptimizedImage
        {...props}
        fill
        className={`
          object-cover w-full h-full transition-transform duration-500
          ${hoverClasses[hoverEffect]}
        `}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {overlay && (
        <div className={`absolute inset-0 bg-gradient-to-t from-${overlayColor} to-transparent`} />
      )}
    </div>
  )
}

export default OptimizedImage
