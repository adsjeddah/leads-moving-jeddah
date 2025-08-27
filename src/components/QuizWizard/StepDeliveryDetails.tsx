import React from 'react'
import { useFormContext } from 'react-hook-form'
import jeddahDistricts from '@/data/jeddah_districts.json'
import { formatNumberInput } from '@/lib/arabicToEnglish'

const saudiCities = [
  'جدة', 'الرياض', 'مكة', 'المدينة المنورة', 'الدمام', 'الخبر', 'الطائف', 
  'تبوك', 'بريدة', 'خميس مشيط', 'أبها', 'جازان', 'نجران', 'الجبيل',
  'ينبع', 'القطيف', 'الأحساء', 'حائل', 'عرعر', 'سكاكا', 'الباحة'
]

export function StepDeliveryDetails() {
  const { register, watch, setValue, formState: { errors } } = useFormContext()
  const serviceType = watch('service_type')
  const toCity = watch('to_city')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">تفاصيل موقع التسليم</h2>
        <p className="text-gray-600">أدخل معلومات المكان الذي سنسلم فيه العفش</p>
      </div>

      {/* City & District */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المدينة *
          </label>
          {serviceType === 'بين_مدن' ? (
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('to_city')}
            >
              <option value="">اختر المدينة</option>
              {saudiCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              defaultValue="جدة"
              disabled
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-700"
              {...register('to_city')}
            />
          )}
          {errors.to_city && (
            <p className="text-red-500 text-sm mt-1">{errors.to_city.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الحي *
          </label>
          {toCity === 'جدة' || !serviceType || serviceType === 'داخل_جدة' ? (
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('to_district')}
            >
              <option value="">اختر الحي</option>
              {jeddahDistricts.districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder="اكتب اسم الحي"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('to_district')}
            />
          )}
          {errors.to_district && (
            <p className="text-red-500 text-sm mt-1">{errors.to_district.message as string}</p>
          )}
        </div>
      </div>

      {/* Floor & Elevator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الطابق *
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            {...register('to_floor', {
              setValueAs: (value) => {
                const formatted = formatNumberInput(value)
                return formatted === '' ? 0 : parseInt(formatted, 10)
              },
              onChange: (e) => {
                const formatted = formatNumberInput(e.target.value)
                e.target.value = formatted
              }
            })}
          />
          {errors.to_floor && (
            <p className="text-red-500 text-sm mt-1">{errors.to_floor.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            هل يوجد مصعد؟ *
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setValue('to_elevator', 'yes', { shouldValidate: true })}
              className={`
                flex-1 py-3 rounded-xl border transition-all
                ${watch('to_elevator') === 'yes'
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              نعم
            </button>
            <button
              type="button"
              onClick={() => setValue('to_elevator', 'no', { shouldValidate: true })}
              className={`
                flex-1 py-3 rounded-xl border transition-all
                ${watch('to_elevator') === 'no'
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              لا
            </button>
          </div>
          {errors.to_elevator && (
            <p className="text-red-500 text-sm mt-1">{errors.to_elevator.message as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}