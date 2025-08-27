import React, { useMemo } from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  completedSteps?: number[]
}

// Simplified and optimized ProgressBar with minimal animations
export function ProgressBar({ currentStep, totalSteps, completedSteps = [] }: ProgressBarProps) {
  const progress = useMemo(() => ((currentStep + 1) / totalSteps) * 100, [currentStep, totalSteps])

  return (
    <div className="relative w-full">
      {/* Simplified Progress Background */}
      <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 h-3 sm:h-4 rounded-full shadow-inner overflow-hidden">
        {/* Optimized Progress Bar with CSS transition */}
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Simplified Progress Text */}
      <div className="flex justify-between items-center mt-2 text-xs sm:text-sm">
        <span className="text-gray-600">الخطوة {currentStep + 1} من {totalSteps}</span>
        <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Simplified Step Indicators */}
      <div className="flex justify-between items-center mt-3 px-1">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`
              w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300
              ${index <= currentStep 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 border-purple-300 shadow-lg' 
                : 'bg-gray-200 border-gray-300'
              }
              ${completedSteps.includes(index) ? 'ring-2 ring-green-300 ring-offset-1' : ''}
            `}
          >
            {/* Simple checkmark for completed steps */}
            {completedSteps.includes(index) && (
              <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}