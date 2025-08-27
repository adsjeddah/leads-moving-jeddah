import React, { useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { 
  Plus, Minus, Package, Bed, Home, Sofa, Table, ChefHat, 
  Refrigerator, Snowflake, Shirt, Sun, Monitor, BookOpen, Box, Star
} from 'lucide-react'
import { motion } from 'framer-motion'

// Memoized static data to prevent re-creation
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
  const { watch, setValue, formState: { errors } } = useFormContext()
  const [customItem, setCustomItem] = useState('')
  
  // Minimize watches to reduce re-renders
  const itemsType = watch('items_type')
  const watchedItems = watch('items')
  const items = useMemo(() => watchedItems || [], [watchedItems])
  const hoistNeeded = watch('hoist_needed')

  // Memoized handlers to prevent recreation
  const updateItemQuantity = useCallback((itemId: string, label: string, delta: number) => {
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
  }, [items, setValue])

  const getItemQuantity = useCallback((itemLabel: string) => {
    const item = items.find((i: any) => i.item === itemLabel)
    return item ? item.quantity : 0
  }, [items])

  const addCustomItem = useCallback(() => {
    if (customItem.trim()) {
      updateItemQuantity('custom', customItem.trim(), 1)
      setCustomItem('')
    }
  }, [customItem, updateItemQuantity])

  const handleCustomItemKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCustomItem()
    }
  }, [addCustomItem])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">ماذا تريد نقله؟</h2>
        <p className="text-gray-600">حدد نوع العفش المراد نقله</p>
      </div>

      {/* Items Type Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">نوع العفش المراد نقله <span className="text-red-500">*</span></h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Complete Furniture Option */}
          <motion.div
            className={`
              relative p-6 rounded-xl border-2 cursor-pointer transition-all
              ${itemsType === 'complete_furniture'
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }
            `}
            onClick={() => {
              setValue('items_type', 'complete_furniture', { shouldValidate: true })
              setValue('items', [], { shouldValidate: true })
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <Home className={`w-12 h-12 mx-auto mb-3 ${itemsType === 'complete_furniture' ? 'text-primary' : 'text-gray-600'}`} />
              <h4 className="text-xl font-bold mb-2">عفش كامل</h4>
              <p className="text-gray-600 text-sm">نقل جميع محتويات المنزل/المكتب</p>
            </div>
            {itemsType === 'complete_furniture' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold"
              >
                ✓
              </motion.div>
            )}
          </motion.div>

          {/* Specific Items Option */}
          <motion.div
            className={`
              relative p-6 rounded-xl border-2 cursor-pointer transition-all
              ${itemsType === 'specific_items'
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }
            `}
            onClick={() => setValue('items_type', 'specific_items', { shouldValidate: true })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <Package className={`w-12 h-12 mx-auto mb-3 ${itemsType === 'specific_items' ? 'text-primary' : 'text-gray-600'}`} />
              <h4 className="text-xl font-bold mb-2">عناصر محددة</h4>
              <p className="text-gray-600 text-sm">اختيار قطع معينة فقط</p>
            </div>
            {itemsType === 'specific_items' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold"
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        </div>

        {errors.items_type && (
          <p className="text-red-500 text-sm mt-1">{errors.items_type.message as string}</p>
        )}
      </div>

      {/* Specific Items Selection - Only show if specific_items is selected */}
      {itemsType === 'specific_items' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">اختر العناصر المحددة</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {itemsList.map((item) => {
              const Icon = item.icon
              const quantity = getItemQuantity(item.label)
              
              return (
                <motion.div
                  key={item.id}
                  className={`
                    relative p-4 rounded-xl border transition-all
                    ${quantity > 0 
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Main item display */}
                  <div className="text-center mb-3">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                  
                  {/* Quantity controls */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateItemQuantity(item.id, item.label, -1)}
                      disabled={quantity === 0}
                      className={`
                        w-8 h-8 rounded-full transition-all
                        ${quantity > 0
                          ? 'bg-red-100 hover:bg-red-200 text-red-600'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      <Minus className="w-4 h-4 mx-auto" />
                    </button>
                    
                    <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      {quantity}
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => updateItemQuantity(item.id, item.label, 1)}
                      className="w-8 h-8 bg-primary hover:bg-primary-dark text-white rounded-full transition-all"
                    >
                      <Plus className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                  
                  {/* Selection indicator */}
                  {quantity > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
          
          {/* Custom item input */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
            <h4 className="font-medium text-gray-700 mb-2">عنصر آخر؟</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="أدخل اسم العنصر..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
                onKeyPress={handleCustomItemKeyPress}
              />
              <button
                type="button"
                onClick={addCustomItem}
                disabled={!customItem.trim()}
                className={`
                  px-4 py-2 rounded-lg transition-all
                  ${customItem.trim()
                    ? 'bg-primary hover:bg-primary-dark text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                إضافة
              </button>
            </div>
          </div>
          
          {errors.items && (
            <p className="text-red-500 text-sm mt-1">{errors.items.message as string}</p>
          )}
        </div>
      )}

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