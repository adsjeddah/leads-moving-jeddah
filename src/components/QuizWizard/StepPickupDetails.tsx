import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Home, Building, Building2, Warehouse } from 'lucide-react'
import jeddahDistricts from '@/data/jeddah_districts.json'
import saudiCities from '@/data/saudi_cities.json'
import { formatNumberInput } from '@/lib/arabicToEnglish'

const placeTypes = [
  { value: 'شقة', label: 'شقة', icon: Building },
  { value: 'فيلا', label: 'فيلا', icon: Home },
  { value: 'مكتب', label: 'مكتب', icon: Building2 },
  { value: 'مستودع', label: 'مستودع', icon: Warehouse },
]

export function StepPickupDetails() {
  const { register, watch, setValue, formState: { errors } } = useFormContext()
  const selectedPlaceType = watch('from_place_type')
  const serviceType = watch('service_type')
  const fromCity = watch('from_city')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">تفاصيل موقع الاستلام</h2>
        <p className="text-gray-600">أدخل معلومات المكان الذي سنستلم منه العفش</p>
      </div>

      {/* City & District - Dynamic based on service type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المدينة *
          </label>
          {serviceType === 'من_وإلى_جدة' ? (
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('from_city')}
            >
              <option value="">اختر مدينة الاستلام</option>
              {saudiCities.cities.map((city) => (
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
              {...register('from_city')}
            />
          )}
          {errors.from_city && (
            <p className="text-red-500 text-sm mt-1">{errors.from_city.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {serviceType === 'من_وإلى_جدة' && fromCity && fromCity !== 'جدة' 
              ? 'الحي/المنطقة *' 
              : 'الحي *'
            }
          </label>
          {serviceType === 'من_وإلى_جدة' && fromCity && fromCity !== 'جدة' ? (
            <input
              type="text"
              placeholder="أدخل الحي أو المنطقة"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('from_district')}
            />
          ) : (
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('from_district')}
            >
              <option value="">اختر الحي</option>
              {jeddahDistricts.districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          )}
          {errors.from_district && (
            <p className="text-red-500 text-sm mt-1">{errors.from_district.message as string}</p>
          )}
        </div>
      </div>

      {/* Place Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          نوع المكان *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {placeTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedPlaceType === type.value
            
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setValue('from_place_type', type.value, { shouldValidate: true })}
                className={`
                  p-4 rounded-xl border transition-all
                  ${isSelected 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-gray-700'}`}>
                  {type.label}
                </span>
              </button>
            )
          })}
        </div>
        {errors.from_place_type && (
          <p className="text-red-500 text-sm mt-1">{errors.from_place_type.message as string}</p>
        )}
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
            {...register('from_floor', {
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
          {errors.from_floor && (
            <p className="text-red-500 text-sm mt-1">{errors.from_floor.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            هل يوجد مصعد؟ *
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setValue('from_elevator', 'yes', { shouldValidate: true })}
              className={`
                flex-1 py-3 rounded-xl border transition-all
                ${watch('from_elevator') === 'yes'
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              نعم
            </button>
            <button
              type="button"
              onClick={() => setValue('from_elevator', 'no', { shouldValidate: true })}
              className={`
                flex-1 py-3 rounded-xl border transition-all
                ${watch('from_elevator') === 'no'
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              لا
            </button>
          </div>
          {errors.from_elevator && (
            <p className="text-red-500 text-sm mt-1">{errors.from_elevator.message as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}