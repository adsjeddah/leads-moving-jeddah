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
              className="font-bold text-gray-900 text-sm sm:text-base no-underline"
            >
              {motivation.message}
            </motion.h4>
            <motion.p 
              key={motivation.subMessage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs sm:text-sm text-gray-600 no-underline"
            >
              {motivation.subMessage}
            </motion.p>
          </div>
        </div>
        
        {/* نسبة التقدم مع تأثيرات جميلة */}
        <motion.div
          key={progress}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center relative"
        >
          <span className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${motivation.color} bg-clip-text text-transparent`}>
            {Math.round(progress)}%
          </span>
          <motion.div
            className="absolute -inset-2 top-1 rounded-lg opacity-20 blur-md bg-gradient-to-r from-purple-400 to-pink-400 -z-20"
            animate={{ 
              opacity: [0.2, 0.35, 0.2],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <p className="text-xs text-gray-500 mt-1 no-underline">مكتمل</p>
        </motion.div>
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
        <div className="flex justify-between items-center mt-3 text-xs sm:text-sm text-gray-600 no-underline">
          <span className="font-medium no-underline">
            الخطوة {currentStep + 1} من {totalSteps}
          </span>
          <span className="font-medium no-underline">
            {totalSteps - currentStep - 1} خطوات متبقية
          </span>
        </div>
      </div>


    </div>
  )
}