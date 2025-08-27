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
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-emerald-600 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            اختر نوع الخدمة الأساسية
          </h2>
          <p className="text-gray-600 text-lg">حدد الخدمة المطلوبة وسنوفر لك أفضل العروض</p>
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
                  relative p-6 rounded-2xl transition-all text-right group overflow-hidden
                  ${isSelected 
                    ? 'ring-2 ring-primary ring-offset-2 shadow-xl' 
                    : 'border-2 border-gray-200 hover:border-primary/50 hover:shadow-lg'
                  }
                `}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 left-3"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                )}

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className={`
                      w-14 h-14 rounded-xl flex items-center justify-center transition-all
                      ${isSelected 
                        ? 'bg-gradient-to-br ' + option.color + ' shadow-lg' 
                        : 'bg-gray-100 group-hover:bg-primary/10'
                      }
                    `}>
                      <Icon className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-gray-700 group-hover:text-primary'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-xl mb-2 ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                        {option.label}
                      </h3>
                      <p className={`text-sm ${isSelected ? 'text-gray-700' : 'text-gray-500'}`}>
                        {option.description}
                      </p>
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
          <div className="border-t pt-8">
            <h3 className="text-xl font-bold mb-2">خدمات إضافية (اختياري)</h3>
            <p className="text-gray-600 mb-6">يمكنك إضافة هذه الخدمات لطلبك</p>
            
            <div className="space-y-4">
              {additionalServices.map((addon) => {
                const Icon = addon.icon
                const isSelected = selectedAddons.includes(addon.id)
                
                return (
                  <motion.button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full p-4 rounded-xl border-2 transition-all text-right flex items-center gap-4 group
                      ${isSelected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                      }
                    `}
                  >
                    {/* Checkbox */}
                    <div className={`
                      w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center
                      ${isSelected 
                        ? 'bg-primary border-primary' 
                        : 'border-gray-300 group-hover:border-primary/50'
                      }
                    `}>
                      {isSelected && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 text-white"
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
                      w-12 h-12 rounded-lg flex items-center justify-center transition-all
                      ${isSelected 
                        ? 'bg-primary/20' 
                        : 'bg-gray-100 group-hover:bg-primary/10'
                      }
                    `}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-gray-600'}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className={`font-semibold ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                        {addon.label}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {addon.description}
                      </p>
                    </div>
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