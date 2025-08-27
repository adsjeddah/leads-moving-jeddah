import { NextRequest, NextResponse } from 'next/server'
import { leadFormSchema } from '@/lib/schemas'
import { generateLeadId, normalizePhone } from '@/lib/utils'
import { addLeadToSheet, testGoogleSheetsConnection } from '@/lib/googleSheets'

// Rate limiting - simple in-memory store
const rateLimitStore = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const MAX_REQUESTS = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitStore.get(ip) || []
  
  // Filter out old timestamps
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW)
  
  if (recentTimestamps.length >= MAX_REQUESTS) {
    return false
  }
  
  recentTimestamps.push(now)
  rateLimitStore.set(ip, recentTimestamps)
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'تم تجاوز الحد المسموح. يرجى المحاولة بعد دقيقة.' },
        { status: 429 }
      )
    }
    
    // Parse and validate request body
    const body = await request.json()
    const validationResult = leadFormSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'البيانات المرسلة غير صحيحة', 
          errors: validationResult.error.flatten() 
        },
        { status: 400 }
      )
    }
    
    const data = validationResult.data
    
    // Generate metadata
    const timestamp = new Date().toISOString()
    const leadId = generateLeadId()
    
    // Normalize phone number
    const normalizedPhone = normalizePhone(data.customer_phone)
    
    // Prepare data for Make.com webhook
    const webhookData = {
      // Lead Information
      timestamp,
      lead_id: leadId,
      
      // Service Details
      service_type: data.service_type,
      additional_services: data.additional_services || [],
      
      // Pickup Location
      from_city: data.from_city,
      from_district: data.from_district,
      from_floor: data.from_floor,
      from_elevator: data.from_elevator,
      from_place_type: data.from_place_type,
      
      // Delivery Location
      to_city: data.to_city,
      to_district: data.to_district,
      to_floor: data.to_floor,
      to_elevator: data.to_elevator,
      
      // Items and Packaging
      items: data.items,
      packaging_level: data.packaging_level,
      hoist_needed: data.hoist_needed,
      
      // Scheduling
      date_pref: data.date_pref,
      time_slot: data.time_slot,
      flexibility: data.flexibility,
      
      // Customer Information
      customer_name: data.customer_name,
      customer_phone: normalizedPhone,
      whatsapp_optin: data.whatsapp_optin,
      notes: data.notes || '',
      
      // UTM & Attribution
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      utm_term: data.utm_term || '',
      utm_content: data.utm_content || '',
      gclid: data.gclid || '',
      device: data.device || '',
      page_path: data.page_path || '/',
      referrer: data.referrer || '',
      ip: ip,
      
      // Initial Status
      status: 'new',
      currency: 'SAR',
      sla_minutes: 30
    }
    
    // Test Google Sheets connection first
    const connectionTest = await testGoogleSheetsConnection()
    if (!connectionTest.success) {
      console.error('Google Sheets connection failed:', connectionTest.error)
      
      // In development, return success without sending to sheets
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode - would send to sheets:', webhookData)
        return NextResponse.json({
          success: true,
          leadId,
          message: 'تم استلام طلبك بنجاح (Development Mode - Sheets Unavailable)'
        })
      }
      throw new Error('Google Sheets connection failed: ' + connectionTest.error)
    }
    
    // Add lead to Google Sheets
    try {
      await addLeadToSheet(webhookData)
      console.log(`Lead ${leadId} successfully added to Google Sheets`)
    } catch (sheetsError) {
      console.error('Error adding to Google Sheets:', sheetsError)
      
      // Fallback to Make.com if available
      const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL
      if (makeWebhookUrl) {
        console.log('Falling back to Make.com webhook...')
        try {
          const webhookResponse = await fetch(makeWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookData)
          })
          
          if (webhookResponse.ok) {
            console.log('Successfully sent to Make.com as fallback')
          } else {
            console.error('Make.com fallback also failed')
            throw new Error('Both Google Sheets and Make.com webhook failed')
          }
        } catch (makeError) {
          console.error('Make.com fallback error:', makeError)
          throw new Error('Both Google Sheets and Make.com webhook failed')
        }
      } else {
        throw new Error('Google Sheets failed and no Make.com fallback available')
      }
    }
    
    return NextResponse.json({
      success: true,
      leadId,
      message: 'تم استلام طلبك بنجاح'
    })
    
  } catch (error) {
    console.error('Lead submission error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.' 
      },
      { status: 500 }
    )
  }
}