import React from 'react'
import { useFormContext } from 'react-hook-form'
import { 
  Plus, Minus, Package, Bed, Home, Sofa, Table, ChefHat, 
  Refrigerator, Snowflake, Shirt, Sun, Monitor, BookOpen, Box, Star
} from 'lucide-react'

const itemsList = [
  { id: 'bed', label: 'سرير', icon: Bed, color: 'text-purple-600' },
  { id: 'closet', label: 'دولاب', icon: Home, color: 'text-amber-600' },
  { id: 'sofa', label: 'كنبة', icon: Sofa, color: 'text-emerald-600' },
  { id: 'dining_table', label: 'طاولة طعام', icon: Table, color: 'text-rose-600' },
  { id: 'chairs', label: 'كراسي', icon: ChefHat, color: 'text-cyan-600' },
  { id: 'fridge', label: 'ثلاجة', icon: Refrigerator, color: 'text-blue-600' },
  { id: 'freezer', label: 'فريزر', icon: Snowflake, color: 'text-slate-600' },
  { id: 'washer', label: 'غسالة', icon: Shirt, color: 'text-violet-600' },
  { id: 'dryer', label: 'نشافة', icon: Sun, color: 'text-yellow-600' },
  { id: 'tv', label: 'تلفزيون', icon: Monitor, color: 'text-gray-600' },
  { id: 'desk', label: 'مكتب', icon: BookOpen, color: 'text-indigo-600' },
  { id: 'boxes', label: 'كراتين', icon: Box, color: 'text-teal-600' },
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
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mb-4 shadow-lg">
          <Package className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
          العناصر المطلوب نقلها
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          حدد الأثاث والأجهزة التي تريد نقلها مع تحديد الكمية المطلوبة لكل عنصر
        </p>
      </div>

      {/* Items Counter */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {itemsList.map((item) => {
          const quantity = getItemQuantity(item.id)
          const Icon = item.icon
          
          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                quantity > 0 
                  ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg ring-2 ring-purple-100' 
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div className="text-center mb-3">
                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center transition-all ${
                  quantity > 0 
                    ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg' 
                    : 'bg-gray-100 ' + item.color
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              
              <p className={`text-sm font-semibold text-center mb-4 transition-colors ${
                quantity > 0 ? 'text-purple-700' : 'text-gray-700'
              }`}>
                {item.label}
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => updateItemQuantity(item.id, item.label, -1)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    quantity === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white shadow-md hover:shadow-lg hover:scale-105'
                  }`}
                  disabled={quantity === 0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <div className={`w-12 h-9 rounded-lg flex items-center justify-center font-bold text-lg ${
                  quantity > 0 
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {quantity}
                </div>
                
                <button
                  type="button"
                  onClick={() => updateItemQuantity(item.id, item.label, 1)}
                  className="w-9 h-9 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {quantity > 0 && (
                <div className="mt-3 flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs text-purple-600 font-semibold">مُختار</span>
                </div>
              )}
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