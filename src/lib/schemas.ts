import { z } from 'zod'

export const leadFormSchema = z.object({
  // Service details
  service_type: z.enum(['داخل_جدة', 'من_وإلى_جدة']),
  
  // From location
  from_city: z.string().min(1, 'يرجى اختيار مدينة الاستلام').default('جدة'),
  from_district: z.string().min(1, 'يرجى اختيار حي الاستلام'),
  from_place_type: z.enum(['شقة', 'فيلا', 'مكتب', 'مستودع', 'استراحة'], {
    errorMap: () => ({ message: 'يرجى اختيار نوع المكان' })
  }),
  from_floor: z.union([
    z.string().transform((val) => parseInt(val) || 0),
    z.number()
  ]).optional().default(0),
  from_elevator: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'يرجى اختيار وجود المصعد' })
  }),
  
  // To location
  to_city: z.string().min(1, 'يرجى اختيار مدينة التسليم'),
  to_district: z.string().min(1, 'يرجى اختيار حي التسليم'),
  to_floor: z.union([
    z.string().transform((val) => parseInt(val) || 0),
    z.number()
  ]).optional().default(0),
  to_elevator: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'يرجى اختيار وجود المصعد' })
  }),
  
  // Items
  items_type: z.enum(['complete_furniture', 'specific_items'], {
    errorMap: () => ({ message: 'يرجى اختيار نوع العفش المراد نقله' })
  }),
  items: z.array(z.object({
    item: z.string(),
    quantity: z.number().min(0)
  })).optional(),
  hoist_needed: z.enum(['yes', 'no', 'unknown']),
  
  // Schedule
  date_pref: z.string(),
  
  // Customer
  customer_name: z.string().min(2, 'يرجى إدخال الاسم (مطلوب)').max(50, 'الاسم طويل جداً'),
  customer_phone: z.string().regex(
    /^(\+?9665|05)[0-9]{8}$/,
    'يرجى إدخال رقم جوال سعودي صحيح (مطلوب)'
  ),
  whatsapp_optin: z.boolean().default(false),
  notes: z.string().optional(),
  
  // Hidden fields (will be added server-side)
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  gclid: z.string().optional(),
  device: z.string().optional(),
  page_path: z.string().optional(),
  referrer: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadFormSchema>

export interface SheetDBPayload {
  data: Record<string, any>
}

export interface ApiResponse {
  success: boolean
  message?: string
  leadId?: string
}