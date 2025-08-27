import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Calendar, Clock, User, Phone, MessageSquare } from 'lucide-react'
import { normalizePhoneNumber } from '@/lib/arabicToEnglish'

export function StepScheduleContact() {
  const { register, watch, setValue, formState: { errors } } = useFormContext()
  const timeSlot = watch('time_slot')
  const flexibility = watch('flexibility')
  const whatsappOptin = watch('whatsapp_optin')

  // Generate dates for next 14 days
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatDateDisplay = (date: Date) => {
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    
    const dayName = days[date.getDay()]
    const day = date.getDate()
    const month = months[date.getMonth()]
    
    return `${dayName} ${day} ${month}`
  }

  const dates = generateDates()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">الموعد والتواصل</h2>
        <p className="text-gray-600">حدد التوقيت المناسب وأدخل بيانات التواصل</p>
      </div>

      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar className="inline-block w-4 h-4 ml-1" />
          التاريخ المطلوب *
        </label>
        <select
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          {...register('date_pref')}
        >
          <option value="">اختر التاريخ</option>
          {dates.map((date, index) => (
            <option key={index} value={formatDate(date)}>
              {formatDateDisplay(date)}
              {index === 0 && ' (اليوم)'}
              {index === 1 && ' (غداً)'}
            </option>
          ))}
        </select>
        {errors.date_pref && (
          <p className="text-red-500 text-sm mt-1">{errors.date_pref.message as string}</p>
        )}
      </div>

      {/* Time Slot */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Clock className="inline-block w-4 h-4 ml-1" />
          الفترة المفضلة *
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setValue('time_slot', 'صباحًا', { shouldValidate: true })}
            className={`
              flex-1 py-3 rounded-xl border transition-all
              ${timeSlot === 'صباحًا'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            صباحًا (8:00 - 12:00)
          </button>
          <button
            type="button"
            onClick={() => setValue('time_slot', 'مساءً', { shouldValidate: true })}
            className={`
              flex-1 py-3 rounded-xl border transition-all
              ${timeSlot === 'مساءً'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            مساءً (12:00 - 8:00)
          </button>
        </div>
      </div>

      {/* Flexibility */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          مرونة الموعد *
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setValue('flexibility', 'flexible', { shouldValidate: true })}
            className={`
              flex-1 py-3 rounded-xl border transition-all
              ${flexibility === 'flexible'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            مرن
          </button>
          <button
            type="button"
            onClick={() => setValue('flexibility', 'strict', { shouldValidate: true })}
            className={`
              flex-1 py-3 rounded-xl border transition-all
              ${flexibility === 'strict'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            غير مرن
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline-block w-4 h-4 ml-1" />
            الاسم *
          </label>
          <input
            type="text"
            placeholder="أدخل اسمك الكامل"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            {...register('customer_name')}
          />
          {errors.customer_name && (
            <p className="text-red-500 text-sm mt-1">{errors.customer_name.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="inline-block w-4 h-4 ml-1" />
            رقم الجوال *
          </label>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="05XXXXXXXX"
            dir="ltr"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-left"
            {...register('customer_phone', {
              onChange: (e) => {
                const normalized = normalizePhoneNumber(e.target.value)
                e.target.value = normalized
              }
            })}
          />
          {errors.customer_phone && (
            <p className="text-red-500 text-sm mt-1">{errors.customer_phone.message as string}</p>
          )}
        </div>

        {/* WhatsApp Opt-in */}
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
          <input
            type="checkbox"
            id="whatsapp_optin"
            className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            {...register('whatsapp_optin')}
          />
          <label htmlFor="whatsapp_optin" className="flex items-center gap-2 cursor-pointer">
            <MessageSquare className="w-5 h-5 text-green-600" />
            <span className="text-sm">أوافق على استقبال العروض عبر واتساب</span>
          </label>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ملاحظات إضافية (اختياري)
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
            placeholder="أي تفاصيل أو طلبات خاصة..."
            {...register('notes')}
          />
        </div>
      </div>
    </div>
  )
}