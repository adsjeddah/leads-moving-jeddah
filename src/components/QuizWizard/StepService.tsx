import React, { useMemo, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { MapPin, Truck, Package, Wrench, Archive, Sparkles, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

// Memoized static data to prevent re-creation on every render
const serviceOptions = [
  { 
    value: 'داخل_جدة', 
    label: 'نقل عفش داخل جدة', 
    icon: MapPin,
    description: 'نقل آمن وسريع بين أحياء جدة',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    value: 'من_وإلى_جدة', 
    label: 'نقل عفش من وإلى جدة', 
    icon: Truck,
    description: 'نقل احترافي بين جدة والمدن الأخرى',
    color: 'from-emerald-500 to-emerald-600'
  },
]



export function StepService() {
  const { register, watch, setValue } = useFormContext()
  
  // Minimize watches to reduce re-renders
  const selectedService = watch('service_type')

  // Memoized handlers to prevent recreation on every render
  const handleServiceSelect = useCallback((value: string) => {
    setValue('service_type', value, { shouldValidate: true })
  }, [setValue])

  return (
    <div className="space-y-8">
      {/* Main Service Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-4 shadow-xl relative">
            <Sparkles className="w-9 h-9 text-white animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
            اختر نوع الخدمة الأساسية
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            حدد الخدمة المطلوبة وسنوفر لك أفضل العروض من المختصين المعتمدين
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceOptions.map((option, index) => {
            const Icon = option.icon
            const isSelected = selectedService === option.value
            
            return (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => handleServiceSelect(option.value)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative p-7 rounded-3xl transition-all text-right group overflow-hidden border-2
                  ${isSelected 
                    ? 'border-transparent bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 shadow-2xl ring-4 ring-purple-200/50' 
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-xl hover:bg-gradient-to-br hover:from-purple-50/30 hover:to-indigo-50/30'
                  }
                `}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-4 left-4 z-20"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                )}

                {/* Floating sparkles for selected option */}
                {isSelected && (
                  <>
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                        rotate: [0, 180, 360] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                      className="absolute top-6 right-6 text-purple-400"
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    <motion.div
                      animate={{ 
                        y: [0, -6, 0],
                        rotate: [0, -180, -360] 
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                      className="absolute bottom-6 right-8 text-indigo-400"
                    >
                      <Sparkles className="w-3 h-3" />
                    </motion.div>
                  </>
                )}

                <div className="relative">
                  <div className="flex items-start gap-5">
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 relative
                      ${isSelected 
                        ? `bg-gradient-to-br ${option.color} shadow-xl scale-110` 
                        : 'bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-purple-100 group-hover:to-indigo-100 group-hover:scale-105'
                      }
                    `}>
                      <Icon className={`w-8 h-8 transition-all ${isSelected ? 'text-white' : 'text-gray-700 group-hover:text-purple-600'}`} />
                      {isSelected && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${option.color} rounded-2xl animate-pulse opacity-30`}></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-2xl mb-3 transition-all ${isSelected ? 'bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent' : 'text-gray-900 group-hover:text-purple-800'}`}>
                        {option.label}
                      </h3>
                      <p className={`text-base leading-relaxed transition-all ${isSelected ? 'text-gray-800 font-medium' : 'text-gray-600 group-hover:text-gray-700'}`}>
                        {option.description}
                      </p>
                      {isSelected && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 flex items-center gap-2"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
                          <span className="text-sm text-emerald-600 font-semibold">تم الاختيار ✨</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      <input
        type="hidden"
        {...register('service_type')}
      />
    </div>
  )
}