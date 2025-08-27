import React, { useMemo, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { Calendar, Clock, User, Phone, MessageSquare } from 'lucide-react'
import { normalizePhoneNumber } from '@/lib/arabicToEnglish'

export function StepScheduleContact() {
  const { register, watch, setValue, formState: { errors } } = useFormContext()
  
  // Minimize watches to reduce re-renders
  const whatsappOptin = watch('whatsapp_optin')

  // Memoized date generation to prevent recalculation on every render
  const availableDates = useMemo(() => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }, [])

  // Memoized formatters to prevent recreation
  const formatDate = useCallback((date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }, [])

  const formatDateDisplay = useCallback((date: Date) => {
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    
    const dayName = days[date.getDay()]
    const day = date.getDate()
    const month = months[date.getMonth()]
    
    return `${dayName} ${day} ${month}`
  }, [])

  // Use memoized dates instead of regenerating

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
          {availableDates.map((date, index) => (
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



      {/* Contact Information */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline-block w-4 h-4 ml-1" />
            الاسم <span className="text-red-500 font-bold">*</span>
            <span className="text-xs text-red-500 block mr-5">(مطلوب)</span>
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
            رقم الجوال <span className="text-red-500 font-bold">*</span>
            <span className="text-xs text-red-500 block mr-5">(مطلوب)</span>
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