"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadFormSchema, type LeadFormData } from '@/lib/schemas'
import { getUTMParams, getDeviceType, getReferrer, getPagePath } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Sparkles, Shield, Clock, Award, ChevronRight, ChevronLeft, Send, Phone, MessageCircle, Zap, Star, Flame, Rocket } from 'lucide-react'

// Import step components
import { StepService } from './StepService'
import { StepPickupDetails } from './StepPickupDetails'
import { StepDeliveryDetails } from './StepDeliveryDetails'
import { StepItems } from './StepItems'
import { StepScheduleContact } from './StepScheduleContact'
import { ProgressBar } from './ProgressBar'

// Memoized static data to prevent re-creation
const steps = [
  { 
    title: 'نوع الخدمة', 
    component: StepService,
    icon: '🚚',
    subtitle: 'اختر الخدمة المناسبة لاحتياجك'
  },
  { 
    title: 'من أين؟', 
    component: StepPickupDetails,
    icon: '📍',
    subtitle: 'حدد موقع الاستلام بدقة'
  },
  { 
    title: 'إلى أين؟', 
    component: StepDeliveryDetails,
    icon: '🏠',
    subtitle: 'حدد وجهة التسليم'
  },
  { 
    title: 'ماذا تنقل؟', 
    component: StepItems,
    icon: '📦',
    subtitle: 'أخبرنا عن العناصر المراد نقلها'
  },
  { 
    title: 'متى؟', 
    component: StepScheduleContact,
    icon: '📅',
    subtitle: 'حدد الموعد المناسب واترك بياناتك'
  },
]

// Smart suggestions based on user selections
const getSmartSuggestions = (formData: Partial<LeadFormData>) => {
  const suggestions = []
  
  if (formData.from_floor && formData.from_floor > 2 && !formData.from_elevator) {
    suggestions.push({
      type: 'warning',
      message: 'قد تحتاج لرافعة للطوابق العليا بدون مصعد'
    })
  }
  
  if (formData.items && formData.items.length > 5) {
    suggestions.push({
      type: 'info',
      message: 'ننصح بالتغليف الاحترافي للعناصر الكثيرة'
    })
  }
  
  return suggestions
}

// Optimized QuizWizard component with performance improvements
export function QuizWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [estimatedPrice, setEstimatedPrice] = useState<string | null>(null)

  const [isMobile, setIsMobile] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  
  // Refs for smooth scrolling
  const quizRef = useRef<HTMLDivElement>(null)
  const stepContentRef = useRef<HTMLDivElement>(null)
  const errorFieldRef = useRef<HTMLDivElement>(null)

  const methods = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onChange',
    defaultValues: {
      from_city: 'جدة',
      items: [],
      whatsapp_optin: false,
      ...getUTMParams(),
      device: getDeviceType(),
      page_path: getPagePath(),
      referrer: getReferrer(),
    }
  })

  const formData = methods.watch()
  const suggestions = getSmartSuggestions(formData)

  // Detect mobile and setup responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Smooth scroll to top of quiz
  const scrollToQuizTop = useCallback(() => {
    if (quizRef.current) {
      quizRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }
  }, [])

  // Smooth scroll to error field
  const scrollToErrorField = useCallback((fieldName: string) => {
    setTimeout(() => {
      const errorElement = document.querySelector(`[data-field="${fieldName}"]`) || 
                          document.querySelector('.text-red-500') ||
                          document.querySelector('[aria-invalid="true"]')
      
      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        })
        
        // Add highlight effect
        errorElement.classList.add('highlight-error')
        setTimeout(() => {
          errorElement.classList.remove('highlight-error')
        }, 2000)
      }
    }, 100)
  }, [])



  // Calculate estimated price based on selections
  useEffect(() => {
    if (formData.service_type) {
      // Base price based on service type - تحديث القيم الصحيحة
      const basePrice = formData.service_type === 'داخل_جدة' ? 800 : 1200
      
      // Calculate distance multiplier if both districts are selected
      const distanceMultiplier = (formData.from_district && formData.to_district && formData.from_district !== formData.to_district) ? 1.3 : 1
      
      // Calculate floor multiplier
      const floorMultiplier = (formData.from_floor && Number(formData.from_floor) > 3) ? 1.2 : 1
      
      const estimated = Math.round(basePrice * distanceMultiplier * floorMultiplier)
      setEstimatedPrice(`${estimated} - ${estimated + 300} ريال`)
    }
  }, [formData.service_type, formData.from_district, formData.to_district, formData.from_floor])

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep)
    const isValid = await methods.trigger(fields as any)
    
    if (isValid) {
      // Additional validation for required fields before proceeding
      const requiredFieldsValidation = validateRequiredFieldsForStep(currentStep)
      
      if (!requiredFieldsValidation.isValid) {
        // Show specific error message for missing required fields
        toast({
          title: 'خانات مطلوبة غير مكتملة',
          description: requiredFieldsValidation.message,
          variant: 'destructive',
        })
        
        // Scroll to first missing required field
        if (requiredFieldsValidation.firstMissingField) {
          scrollToErrorField(requiredFieldsValidation.firstMissingField)
        }
        return
      }
      
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
      
      if (currentStep < steps.length - 1) {
        // Smooth scroll to top before changing step
        scrollToQuizTop()
        
        setTimeout(() => {
          setCurrentStep(currentStep + 1)
        }, 300) // Small delay for smooth scroll
        
        // Push analytics event for step completion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'quiz_step_completed', {
            step: currentStep + 1,
            step_name: steps[currentStep].title
          })
        }
      }
    } else {
      // Scroll to first error field with more specific message
      const errors = methods.formState.errors
      const errorFields = Object.keys(errors)
      if (errorFields.length > 0) {
        toast({
          title: 'يرجى إكمال البيانات المطلوبة',
          description: 'تأكد من ملء جميع الخانات المطلوبة قبل المتابعة',
          variant: 'destructive',
        })
        scrollToErrorField(errorFields[0])
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      scrollToQuizTop()
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
      }, 300)
    }
  }

  const goToStep = (stepIndex: number) => {
    // Check if user is trying to skip forward
    if (stepIndex > currentStep) {
      // Validate current step first
      const requiredFieldsValidation = validateRequiredFieldsForStep(currentStep)
      if (!requiredFieldsValidation.isValid) {
        toast({
          title: 'أكمل الخطوة الحالية أولاً',
          description: requiredFieldsValidation.message,
          variant: 'destructive',
        })
        return
      }
    }
    
    if (stepIndex <= Math.max(...completedSteps, 0) + 1) {
      scrollToQuizTop()
      setTimeout(() => {
        setCurrentStep(stepIndex)
      }, 300)
    }
  }

  const onSubmit = async (data: LeadFormData) => {
    // Final validation for required fields before submission
    const finalValidation = validateRequiredFieldsForStep(4)
    if (!finalValidation.isValid) {
      toast({
        title: 'خانات مطلوبة غير مكتملة',
        description: finalValidation.message,
        variant: 'destructive',
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        // Push GA4 event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'lead_submit', {
            event_category: 'conversion',
            event_label: data.service_type,
            service_type: data.service_type,
            from_district: data.from_district,
            to_district: data.to_district,
            estimated_value: estimatedPrice
          })
        }

        // Push GTM event
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'lead_submit',
            service_type: data.service_type,
            from_district: data.from_district,
            to_district: data.to_district,
            estimated_value: estimatedPrice
          })
        }

        // Redirect to thank you page
        router.push(`/thanks?name=${encodeURIComponent(data.customer_name)}`)
      } else {
        toast({
          title: 'خطأ',
          description: result.message || 'تعذّر الإرسال حاليًا. جرّب مرة أخرى خلال لحظات.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 0:
        return ['service_type']
      case 1:
        return ['from_city', 'from_district', 'from_place_type', 'from_elevator']
      case 2:
        return ['to_city', 'to_district', 'to_elevator']
      case 3:
        return ['items_type', 'hoist_needed']
      case 4:
        return ['date_pref', 'customer_name', 'customer_phone']
      default:
        return []
    }
  }

  // Validate required fields for each step
  const validateRequiredFieldsForStep = (step: number) => {
    const currentFormData = methods.getValues()
    
    switch (step) {
      case 1: // Pickup details
        if (!currentFormData.from_district || currentFormData.from_district.trim() === '') {
          return {
            isValid: false,
            message: 'يرجى اختيار حي الاستلام قبل المتابعة',
            firstMissingField: 'from_district'
          }
        }
        if (!currentFormData.from_place_type) {
          return {
            isValid: false,
            message: 'يرجى اختيار نوع المكان قبل المتابعة',
            firstMissingField: 'from_place_type'
          }
        }
        break
        
      case 2: // Delivery details
        if (!currentFormData.to_city || currentFormData.to_city.trim() === '') {
          return {
            isValid: false,
            message: 'يرجى اختيار مدينة التسليم قبل المتابعة',
            firstMissingField: 'to_city'
          }
        }
        if (!currentFormData.to_district || currentFormData.to_district.trim() === '') {
          return {
            isValid: false,
            message: 'يرجى اختيار حي التسليم قبل المتابعة',
            firstMissingField: 'to_district'
          }
        }
        break
        
      case 4: // Schedule & Contact
        if (!currentFormData.customer_name || currentFormData.customer_name.trim() === '') {
          return {
            isValid: false,
            message: 'يرجى إدخال الاسم قبل إرسال الطلب',
            firstMissingField: 'customer_name'
          }
        }
        if (!currentFormData.customer_phone || currentFormData.customer_phone.trim() === '') {
          return {
            isValid: false,
            message: 'يرجى إدخال رقم الجوال قبل إرسال الطلب',
            firstMissingField: 'customer_phone'
          }
        }
        break
    }
    
    return { isValid: true, message: '', firstMissingField: null }
  }

  const CurrentStepComponent = steps[currentStep].component
  const completionPercentage = ((completedSteps.length + 1) / steps.length) * 100

  return (
    <section 
      ref={quizRef}
      id="quiz-section" 
      className="relative py-12 sm:py-20 bg-gradient-to-br from-purple-50 via-indigo-50/50 to-blue-50 overflow-hidden scroll-smooth" 
      dir="rtl"
    >


      {/* Enhanced Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0] 
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            x: [-20, 20, -20],
            y: [-10, 10, -10]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl"
        />
      </div>

      <div className={`container max-w-5xl relative z-10 px-4 sm:px-6 ${isMobile ? 'quiz-mobile-enhanced quiz-scroll-enhanced' : ''}`}>
        {/* Header with trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">خلصها في دقيقتين بس</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              خلي الشركات تجيك بدال ما تدور عليها
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            بس جاوب على كم سؤال بسيط وحنا نجيب لك أحسن العروض
          </p>

          {/* Trust indicators - Mobile optimized */}
          <div className="flex justify-center gap-3 sm:gap-6 mt-4 sm:mt-6 flex-wrap">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              <span className="text-gray-600">معلوماتك آمنة</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span className="text-gray-600">رد خلال 5 دقائق</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
              <span className="text-gray-600">شركات معتمدة</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-purple-100/50"
        >
          {/* Enhanced Progress Bar */}
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 p-4 sm:p-6 border-b border-purple-100/30">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">{steps[currentStep].title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{steps[currentStep].subtitle}</p>
              </div>

            </div>
            
            <ProgressBar 
              currentStep={currentStep} 
              totalSteps={steps.length}
              completedSteps={completedSteps}
            />


          </div>

          {/* Smart Suggestions */}
          {suggestions.length > 0 && (
            <div className="px-4 sm:px-8 pt-4 sm:pt-6">
              <AnimatePresence>
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`
                      p-3 sm:p-4 rounded-xl mb-2 sm:mb-3 flex items-start gap-2 sm:gap-3
                      ${suggestion.type === 'warning' ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'}
                    `}
                  >
                    <span className="text-base sm:text-lg">💡</span>
                    <p className="text-xs sm:text-sm text-gray-700">{suggestion.message}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Estimated Price Display - Hidden as requested */}
          {/* {estimatedPrice && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-4 sm:mx-8 mt-4 sm:mt-6 mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl sm:rounded-2xl border-2 border-emerald-300 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">💰 السعر التقديري للخدمة</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-700">{estimatedPrice}</p>
                  <p className="text-xs text-gray-500 mt-1">* السعر النهائي يحدد بعد المعاينة</p>
                </div>
                <div className="text-green-600">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          )} */}

          {/* Form - Mobile optimized */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="p-4 sm:p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  ref={stepContentRef}
                  key={currentStep}
                  initial={{ 
                    opacity: 0, 
                    x: isMobile ? 100 : 50,
                    scale: 0.95
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: isMobile ? -100 : -50,
                    scale: 0.95
                  }}
                  transition={{ 
                    duration: isMobile ? 0.4 : 0.3,
                    ease: "easeInOut",
                    type: "spring",
                    damping: 20,
                    stiffness: 300
                  }}
                  className="relative"
                  dir="rtl"
                >
                  {/* Step content with enhanced mobile experience */}
                  <div className={`
                    transform transition-all duration-500 ease-out quiz-step-container
                    ${isMobile ? 'min-h-[60vh]' : 'min-h-[50vh]'}
                  `}>
                    <div className="quiz-field-focus">
                      <CurrentStepComponent />
                    </div>
                  </div>
                  
                  {/* Step completion celebration indicator */}
                  {completedSteps.includes(currentStep) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        ✓
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons - Mobile optimized */}
              <div className="mt-8 sm:mt-12 flex justify-between items-center gap-3">
                {currentStep > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:bg-gray-50 rounded-xl text-sm sm:text-base"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    رجوع
                  </motion.button>
                )}

                {currentStep < steps.length - 1 ? (
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(147, 51, 234, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={nextStep}
                    className={`
                      relative overflow-hidden mr-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 
                      bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 
                      hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 
                      text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl 
                      transition-all duration-300 text-sm sm:text-base
                      ${isMobile ? 'min-h-[54px] text-lg' : ''}
                    `}
                  >
                    {/* Shimmer effect for mobile */}
                    {isMobile && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    
                    <span>التالي</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 15px 35px rgba(34, 197, 94, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      relative overflow-hidden mr-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 
                      bg-gradient-to-r from-green-600 to-emerald-600 
                      hover:from-green-700 hover:to-emerald-700 
                      disabled:from-gray-400 disabled:to-gray-500 
                      text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl 
                      transition-all duration-300 text-sm sm:text-base
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${isMobile ? 'min-h-[54px] text-lg' : ''}
                    `}
                  >
                    {/* Success pulse effect */}
                    {!isSubmitting && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-xl"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    
                    {isSubmitting ? (
                      <>
                        <motion.div 
                          className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <motion.div
                          animate={{ 
                            x: [0, 3, 0],
                            y: [0, -2, 0]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.div>
                        <span>احصل على عروض الأسعار</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              {/* Alternative Contact Options - Mobile optimized */}
              {currentStep === steps.length - 1 && (
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                  <p className="text-center text-gray-600 mb-3 sm:mb-4 text-sm">أو تواصل معنا مباشرة</p>
                  <div className="flex justify-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => window.open(`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '966543654700'}`, '_self')}
                      className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <span>اتصل الآن</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966543654700'
                        window.open(`https://wa.me/${whatsappNumber}`, '_blank')
                      }}
                      className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-100 hover:bg-green-200 rounded-xl transition-colors text-sm"
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <span>واتساب</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </FormProvider>
        </motion.div>

        {/* Bottom trust message - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 sm:mt-8"
        >
          <p className="text-xs sm:text-sm text-gray-500">
            🔒 معلوماتك بأمان وما نشاركها مع أي أحد
          </p>
        </motion.div>
      </div>
    </section>
  )
}