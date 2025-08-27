import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Sparkles, 
  Trophy, 
  Target, 
  Zap,
  Star,
  Award,
  Rocket
} from 'lucide-react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  completedSteps?: number[]
}

// رسائل تحفيزية ديناميكية حسب التقدم
const getMotivationMessage = (progress: number, currentStep: number, totalSteps: number) => {
  if (progress <= 20) {
    return {
      message: "رائع! بداية قوية 💪",
      subMessage: "استمر، أنت على الطريق الصحيح",
      icon: <Rocket className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500"
    }
  } else if (progress <= 40) {
    return {
      message: "ممتاز! ربع المسافة 🎯", 
      subMessage: "خطوات رائعة، تابع التقدم",
      icon: <Target className="w-4 h-4" />,
      color: "from-cyan-500 to-teal-500"
    }
  } else if (progress <= 60) {
    return {
      message: "أحسنت! نصف الطريق ⚡",
      subMessage: "أداء مميز، استمر في الإبداع",
      icon: <Zap className="w-4 h-4" />,
      color: "from-teal-500 to-green-500"
    }
  } else if (progress <= 80) {
    return {
      message: "مذهل! ثلاثة أرباع 🌟",
      subMessage: "إنجاز رائع، أكمل بثقة",
      icon: <Star className="w-4 h-4" />,
      color: "from-green-500 to-emerald-500"
    }
  } else if (progress < 100) {
    return {
      message: "رائع جداً! تقريباً انتهيت 🏆",
      subMessage: "خطوة أخيرة للوصول للهدف",
      icon: <Award className="w-4 h-4" />,
      color: "from-emerald-500 to-yellow-500"
    }
  } else {
    return {
      message: "مبروك! اكتمل التسجيل 🎉",
      subMessage: "إنجاز مثالي، شكراً لك",
      icon: <Trophy className="w-4 h-4" />,
      color: "from-yellow-500 to-orange-500"
    }
  }
}

// أيقونات الخطوات
const stepIcons = ['🚚', '📍', '🏠', '📦', '📅']

export function ProgressBar({ currentStep, totalSteps, completedSteps = [] }: ProgressBarProps) {
  const progress = useMemo(() => ((currentStep + 1) / totalSteps) * 100, [currentStep, totalSteps])
  const motivation = useMemo(() => getMotivationMessage(progress, currentStep, totalSteps), [progress, currentStep, totalSteps])

  return (
    <div className="relative w-full space-y-4">
      {/* رسالة تحفيزية ديناميكية */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className={`p-2 rounded-xl bg-gradient-to-r ${motivation.color} text-white shadow-lg`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
          >
            {motivation.icon}
          </motion.div>
          <div>
            <motion.h4 
              key={motivation.message}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-gray-900 text-sm sm:text-base"
            >
              {motivation.message}
            </motion.h4>
            <motion.p 
              key={motivation.subMessage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs sm:text-sm text-gray-600"
            >
              {motivation.subMessage}
            </motion.p>
          </div>
        </div>
        
        {/* نسبة التقدم مع تأثيرات جميلة */}
        <div className="text-center">
          <motion.div
            key={progress}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <span className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${motivation.color} bg-clip-text text-transparent`}>
              {Math.round(progress)}%
            </span>
            <motion.div
              className="absolute -inset-1 rounded-lg opacity-30 blur-sm bg-gradient-to-r from-purple-400 to-pink-400"
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          <p className="text-xs text-gray-500 mt-1">مكتمل</p>
        </div>
      </motion.div>

      {/* شريط التقدم الرئيسي */}
      <div className="relative">
        {/* خلفية الشريط */}
        <div className="w-full h-4 sm:h-5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-full shadow-inner overflow-hidden border border-gray-200/50">
          {/* شريط التقدم مع تأثيرات لونية */}
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${motivation.color} relative overflow-hidden shadow-lg`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* تأثير البريق المتحرك */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />
            
            {/* نقاط متلألئة */}
            {progress > 10 && (
              <motion.div
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.div>
        </div>
        
        {/* تسميات الخطوات */}
        <div className="flex justify-between items-center mt-3 text-xs sm:text-sm text-gray-600">
          <span className="font-medium">
            الخطوة {currentStep + 1} من {totalSteps}
          </span>
          <span className="font-medium">
            {totalSteps - currentStep - 1} خطوات متبقية
          </span>
        </div>
      </div>

      {/* مؤشرات الخطوات التفاعلية */}
      <div className="flex justify-between items-center px-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const isCompleted = completedSteps.includes(index)
          const isCurrent = index === currentStep
          const isPassed = index <= currentStep
          
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* دائرة الخطوة */}
              <motion.div
                className={`
                  relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl
                  transition-all duration-300 border-2 shadow-lg
                  ${isPassed 
                    ? `bg-gradient-to-br ${motivation.color} border-transparent text-white shadow-lg` 
                    : 'bg-white border-gray-300 text-gray-400'
                  }
                  ${isCurrent ? 'ring-4 ring-purple-200 ring-offset-2 scale-110' : ''}
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                ) : (
                  <span className="font-bold">
                    {stepIcons[index]}
                  </span>
                )}
                
                {/* تأثير الإضاءة للخطوة الحالية */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>

              {/* نقطة الاتصال بين الخطوات */}
              {index < totalSteps - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-0.5 -translate-y-1/2 translate-x-6 z-0">
                  <div className={`h-full transition-all duration-500 ${
                    index < currentStep 
                      ? `bg-gradient-to-r ${motivation.color}` 
                      : 'bg-gray-200'
                  }`} />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* شريط تحفيزي سفلي */}
      <motion.div 
        className="text-center py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-full border border-purple-100">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-purple-700">
            {progress < 100 ? "تسير بخطى رائعة!" : "تهانينا على الإنجاز! 🎉"}
          </span>
        </div>
      </motion.div>
    </div>
  )
}