import React, { useMemo, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { formatNumberInput } from '@/lib/arabicToEnglish'

export function StepDeliveryDetails() {
  const { register, watch, setValue, formState: { errors } } = useFormContext()
  
  // Minimize watches to reduce re-renders
  const serviceType = watch('service_type')
  const toCity = watch('to_city')
  
  // Memoized data loading - only load when needed
  const jeddahDistricts = useMemo(() => {
    if (serviceType === 'داخل_جدة' || (serviceType === 'من_وإلى_جدة' && toCity === 'جدة')) {
      return require('@/data/jeddah_districts.json')
    }
    return { districts: [] }
  }, [serviceType, toCity])
  
  const saudiCities = useMemo(() => {
    if (serviceType === 'من_وإلى_جدة') {
      return require('@/data/saudi_cities.json')
    }
    return { cities: [] }
  }, [serviceType])
  


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
            المدينة <span className="text-red-500 font-bold">*</span>
            <span className="text-xs text-red-500 block">(مطلوب)</span>
          </label>
          {serviceType === 'من_وإلى_جدة' ? (
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('to_city')}
            >
              <option value="">اختر مدينة التسليم</option>
              {saudiCities.cities.map((city: string) => (
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
            {serviceType === 'من_وإلى_جدة' && toCity && toCity !== 'جدة' 
              ? (
                <>
                  الحي/المنطقة <span className="text-red-500 font-bold">*</span>
                  <span className="text-xs text-red-500 block">(مطلوب)</span>
                </>
              ) 
              : (
                <>
                  الحي <span className="text-red-500 font-bold">*</span>
                  <span className="text-xs text-red-500 block">(مطلوب)</span>
                </>
              )
            }
          </label>
          {serviceType === 'من_وإلى_جدة' && toCity && toCity !== 'جدة' ? (
            <input
              type="text"
              placeholder="أدخل الحي أو المنطقة"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('to_district')}
            />
          ) : (
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('to_district')}
            >
              <option value="">اختر الحي</option>
              {jeddahDistricts.districts.map((district: string) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
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
            الطابق
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0 (اختياري)"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            {...register('to_floor')}
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