import React from 'react'
import { Check } from 'lucide-react'

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="px-8 py-6 border-b">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            <div className="flex items-center mb-2">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all
                  ${index < currentStep 
                    ? 'bg-primary text-white' 
                    : index === currentStep 
                    ? 'bg-primary text-white ring-4 ring-primary/20' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                    w-16 md:w-24 h-0.5 mx-2
                    ${index < currentStep ? 'bg-primary' : 'bg-gray-200'}
                  `}
                />
              )}
            </div>
            <span 
              className={`
                text-xs md:text-sm font-medium text-center
                ${index === currentStep ? 'text-primary' : 'text-gray-500'}
              `}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}