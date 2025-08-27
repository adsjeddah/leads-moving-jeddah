import { z } from 'zod'

export const leadFormSchema = z.object({
  // Service details
  service_type: z.enum(['داخل_جدة', 'من_وإلى_جدة']),
  additional_services: z.array(z.string()).optional(),
  
  // From location
  from_city: z.string().default('جدة'),
  from_district: z.string().min(1, 'يرجى اختيار الحي'),
  from_place_type: z.enum(['شقة', 'فيلا', 'مكتب', 'مستودع']),
  from_floor: z.number().min(0).max(50),
  from_elevator: z.enum(['yes', 'no']),
  
  // To location
  to_city: z.string().min(1, 'يرجى اختيار المدينة'),
  to_district: z.string().min(1, 'يرجى اختيار الحي'),
  to_floor: z.number().min(0).max(50),
  to_elevator: z.enum(['yes', 'no']),
  
  // Items
  items: z.array(z.object({
    item: z.string(),
    quantity: z.number().min(0)
  })).min(1, 'يرجى إضافة عنصر واحد على الأقل'),
  packaging_level: z.enum(['basic', 'full']),
  hoist_needed: z.enum(['yes', 'no', 'unknown']),
  
  // Schedule
  date_pref: z.string(),
  time_slot: z.enum(['صباحًا', 'مساءً']),
  flexibility: z.enum(['flexible', 'strict']),
  
  // Customer
  customer_name: z.string().min(2, 'يرجى إدخال الاسم'),
  customer_phone: z.string().regex(
    /^(\+?9665|05)[0-9]{8}$/,
    'يرجى إدخال رقم جوال سعودي صحيح'
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