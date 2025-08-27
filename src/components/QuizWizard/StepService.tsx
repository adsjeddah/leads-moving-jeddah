import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MapPin, Truck, Package, Wrench, Archive, Sparkles, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

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

const additionalServices = [
  { 
    id: 'packing', 
    label: 'تغليف احترافي', 
    icon: Package,
    description: 'حماية كاملة للأثاث من الخدوش والكسر'
  },
  { 
    id: 'assembly', 
    label: 'فك وتركيب', 
    icon: Wrench,
    description: 'فك وتركيب جميع أنواع الأثاث'
  },
  { 
    id: 'storage', 
    label: 'تخزين مؤقت', 
    icon: Archive,
    description: 'مستودعات آمنة ومكيفة'
  },
]

export function StepService() {
  const { register, watch, setValue } = useFormContext()
  const selectedService = watch('service_type')
  const selectedAddons = watch('additional_services') || []

  const handleServiceSelect = (value: string) => {
    setValue('service_type', value, { shouldValidate: true })
  }

  const toggleAddon = (addonId: string) => {
    const current = selectedAddons || []
    if (current.includes(addonId)) {
      setValue('additional_services', current.filter((id: string) => id !== addonId))
    } else {
      setValue('additional_services', [...current, addonId])
    }
  }

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

      {/* Additional Services */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-t-2 border-gradient-to-r from-purple-200 to-indigo-200 pt-10 mt-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                  خدمات إضافية (اختياري)
                </h3>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                أضف المزيد من الخدمات المتخصصة لتجربة نقل مثالية وحماية أفضل لممتلكاتك
              </p>
            </div>
            
            <div className="space-y-5">
              {additionalServices.map((addon) => {
                const Icon = addon.icon
                const isSelected = selectedAddons.includes(addon.id)
                
                return (
                  <motion.button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    whileHover={{ x: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full p-6 rounded-2xl border-2 transition-all text-right flex items-center gap-5 group relative overflow-hidden
                      ${isSelected 
                        ? 'border-transparent bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg ring-2 ring-purple-200' 
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md hover:bg-gradient-to-br hover:from-purple-50/20 hover:to-indigo-50/20'
                      }
                    `}
                  >
                    {/* Background pattern for selected */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5"></div>
                    )}

                    {/* Checkbox */}
                    <div className={`
                      w-8 h-8 rounded-xl border-2 transition-all flex items-center justify-center relative z-10
                      ${isSelected 
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-500 border-transparent shadow-lg' 
                        : 'border-gray-300 group-hover:border-purple-400 bg-white'
                      }
                    `}>
                      {isSelected && (
                        <motion.svg
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </div>
                    
                    {/* Icon */}
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative z-10
                      ${isSelected 
                        ? 'bg-gradient-to-br from-purple-400 to-indigo-500 shadow-lg scale-110' 
                        : 'bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-purple-100 group-hover:to-indigo-100 group-hover:scale-105'
                      }
                    `}>
                      <Icon className={`w-7 h-7 transition-all ${isSelected ? 'text-white' : 'text-gray-600 group-hover:text-purple-600'}`} />
                      {isSelected && (
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                        ></motion.div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 relative z-10">
                      <h4 className={`font-bold text-lg mb-2 transition-all ${isSelected ? 'bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent' : 'text-gray-900 group-hover:text-purple-800'}`}>
                        {addon.label}
                      </h4>
                      <p className={`text-sm leading-relaxed transition-all ${isSelected ? 'text-gray-700 font-medium' : 'text-gray-500 group-hover:text-gray-600'}`}>
                        {addon.description}
                      </p>
                      {isSelected && (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="mt-3 flex items-center gap-2"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-emerald-600 font-semibold">مُضاف للطلب 🎯</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Floating sparkle for selected items */}
                    {isSelected && (
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                        className="absolute top-4 right-4 z-10"
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}

      <input
        type="hidden"
        {...register('service_type')}
      />
      <input
        type="hidden"
        {...register('additional_services')}
      />
    </div>
  )
}