import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Plus, Minus, Package } from 'lucide-react'

const itemsList = [
  { id: 'bed', label: 'سرير', icon: '🛏️' },
  { id: 'closet', label: 'دولاب', icon: '🚪' },
  { id: 'sofa', label: 'كنبة', icon: '🛋️' },
  { id: 'dining_table', label: 'طاولة طعام', icon: '🪑' },
  { id: 'chairs', label: 'كراسي', icon: '🪑' },
  { id: 'fridge', label: 'ثلاجة', icon: '🧊' },
  { id: 'freezer', label: 'فريزر', icon: '❄️' },
  { id: 'washer', label: 'غسالة', icon: '🌀' },
  { id: 'dryer', label: 'نشافة', icon: '☀️' },
  { id: 'tv', label: 'تلفزيون', icon: '📺' },
  { id: 'desk', label: 'مكتب', icon: '🪑' },
  { id: 'boxes', label: 'كراتين', icon: '📦' },
]

export function StepItems() {
  const { watch, setValue, register, formState: { errors } } = useFormContext()
  const items = watch('items') || []
  const packagingLevel = watch('packaging_level')
  const hoistNeeded = watch('hoist_needed')

  const updateItemQuantity = (itemId: string, label: string, delta: number) => {
    const existingItems = [...items]
    const itemIndex = existingItems.findIndex(item => item.item === label)
    
    if (itemIndex >= 0) {
      const newQuantity = existingItems[itemIndex].quantity + delta
      if (newQuantity <= 0) {
        existingItems.splice(itemIndex, 1)
      } else {
        existingItems[itemIndex].quantity = newQuantity
      }
    } else if (delta > 0) {
      existingItems.push({ item: label, quantity: 1 })
    }
    
    setValue('items', existingItems, { shouldValidate: true })
  }

  const getItemQuantity = (itemId: string) => {
    const itemLabel = itemsList.find(item => item.id === itemId)?.label
    const item = items.find((i: any) => i.item === itemLabel)
    return item ? item.quantity : 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">العناصر المطلوب نقلها</h2>
        <p className="text-gray-600">حدد الأثاث والأجهزة التي تريد نقلها</p>
      </div>

      {/* Items Counter */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {itemsList.map((item) => {
          const quantity = getItemQuantity(item.id)
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border ${
                quantity > 0 ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
            >
              <div className="text-center mb-2">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <p className="text-sm font-medium text-center mb-3">{item.label}</p>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => updateItemQuantity(item.id, item.label, -1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  disabled={quantity === 0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => updateItemQuantity(item.id, item.label, 1)}
                  className="w-8 h-8 rounded-lg bg-primary hover:bg-primary-hover text-white flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Other Items */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          عناصر أخرى (اختياري)
        </label>
        <textarea
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={3}
          placeholder="أضف أي عناصر أخرى تريد نقلها..."
        />
      </div>

      {errors.items && (
        <p className="text-red-500 text-sm">{errors.items.message as string}</p>
      )}

      {/* Packaging Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          مستوى التغليف *
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setValue('packaging_level', 'basic', { shouldValidate: true })}
            className={`
              flex-1 py-3 px-4 rounded-xl border transition-all
              ${packagingLevel === 'basic'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            أساسي
          </button>
          <button
            type="button"
            onClick={() => setValue('packaging_level', 'full', { shouldValidate: true })}
            className={`
              flex-1 py-3 px-4 rounded-xl border transition-all
              ${packagingLevel === 'full'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            كامل (حماية إضافية)
          </button>
        </div>
      </div>

      {/* Hoist Needed */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          هل تحتاج رافعة/ونش؟ *
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setValue('hoist_needed', 'yes', { shouldValidate: true })}
            className={`
              flex-1 py-3 rounded-xl border transition-all
              ${hoistNeeded === 'yes'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            نعم
          </button>
          <button
            type="button"
            onClick={() => setValue('hoist_needed', 'no', { shouldValidate: true })}
            className={`
              flex-1 py-3 rounded-xl border transition-all
              ${hoistNeeded === 'no'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            لا
          </button>
          <button
            type="button"
            onClick={() => setValue('hoist_needed', 'unknown', { shouldValidate: true })}
            className={`
              flex-1 py-3 rounded-xl border transition-all
              ${hoistNeeded === 'unknown'
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            غير متأكد
          </button>
        </div>
      </div>
    </div>
  )
}