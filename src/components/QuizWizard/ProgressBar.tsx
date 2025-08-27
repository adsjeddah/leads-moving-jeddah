import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  completedSteps?: number[]
}

export function ProgressBar({ currentStep, totalSteps, completedSteps = [] }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100
  const [showCelebration, setShowCelebration] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (progress > 0 && progress % 20 === 0) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 1000)
    }
  }, [progress])

  return (
    <div className="relative w-full">
      {/* Progress Background */}
      <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 h-3 sm:h-4 rounded-full shadow-inner overflow-hidden">
        {/* Animated Progress Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: isMobile ? 0.6 : 0.4,
            ease: 'easeOut',
            type: "spring",
            damping: 20,
            stiffness: 300
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Pulse effect for mobile */}
          {isMobile && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-blue-400/50 rounded-full"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Progress Text */}
      <motion.div 
        className="flex justify-between items-center mt-2 text-xs sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-gray-600">الخطوة {currentStep + 1} من {totalSteps}</span>
        <motion.span 
          className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          animate={{ scale: showCelebration ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </motion.div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center mt-3 px-1">
        {Array.from({ length: totalSteps }, (_, index) => (
          <motion.div
            key={index}
            className={`
              w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300
              ${index <= currentStep 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-purple-300 shadow-lg' 
                : 'bg-gray-200 border-gray-300'
              }
              ${completedSteps.includes(index) ? 'ring-2 ring-green-300 ring-offset-1' : ''}
            `}
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              rotate: completedSteps.includes(index) ? 360 : 0
            }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.1,
              type: "spring"
            }}
            whileHover={{ scale: 1.2 }}
          >
            {/* Checkmark for completed steps */}
            <AnimatePresence>
              {completedSteps.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                >
                  ✓
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Celebration Particles */}
      <AnimatePresence>
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(isMobile ? 8 : 12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 100 + "%",
                  y: "50%"
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -50, -100]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  delay: Math.random() * 0.2,
                  ease: "easeOut"
                }}
                className={`absolute w-2 h-2 rounded-full ${
                  i % 3 === 0 ? 'bg-yellow-400' :
                  i % 3 === 1 ? 'bg-pink-400' : 'bg-blue-400'
                }`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}