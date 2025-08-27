import { google } from 'googleapis'
import { JWT } from 'google-auth-library'

// Google Sheets configuration
const SPREADSHEET_ID = '1PA0drQi1lQuPJzmMiqtBGTq3tfL0x6QGgus5flIN7yE'
const SHEET_NAME = 'fresh leads'

// Service Account credentials from environment
const getGoogleAuth = () => {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}')
  
  return new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file'
    ]
  })
}

// Initialize Google Sheets API
const getGoogleSheetsService = async () => {
  const auth = getGoogleAuth()
  return google.sheets({ version: 'v4', auth })
}

// Headers for the Google Sheet - Arabic Names
const SHEET_HEADERS = [
  'وقت الطلب',           // A - timestamp
  'رقم الطلب',          // B - lead_id
  'حالة الطلب',         // C - status
  'نوع الخدمة',         // D - service_type
  'خدمات إضافية',       // E - additional_services
  'مدينة الاستلام',     // F - from_city
  'حي الاستلام',        // G - from_district
  'نوع المكان (استلام)', // H - from_place_type
  'الطابق (استلام)',     // I - from_floor
  'مصعد متاح (استلام)',  // J - from_elevator
  'مدينة التسليم',      // K - to_city
  'حي التسليم',         // L - to_district
  'الطابق (تسليم)',      // M - to_floor
  'مصعد متاح (تسليم)',   // N - to_elevator
  'قائمة العناصر',       // O - items
  'مستوى التغليف',       // P - packaging_level
  'رافعة مطلوبة',        // Q - hoist_needed
  'التاريخ المفضل',      // R - date_pref
  'الفترة الزمنية',      // S - time_slot
  'مرونة الموعد',        // T - flexibility
  'اسم العميل',          // U - customer_name
  'رقم الهاتف',          // V - customer_phone
  'موافقة واتساب',       // W - whatsapp_optin
  'ملاحظات العميل',      // X - notes
  'مصدر الزيارة',        // Y - utm_source
  'وسيط التسويق',        // Z - utm_medium
  'الحملة التسويقية',     // AA - utm_campaign
  'المصطلح التسويقي',     // BB - utm_term
  'محتوى الحملة',        // CC - utm_content
  'معرف جوجل للنقرة',    // DD - gclid
  'نوع الجهاز',          // EE - device
  'صفحة الدخول',         // FF - page_path
  'الموقع المرجعي',      // GG - referrer
  'عنوان الـ IP',        // HH - ip
  'العملة',             // II - currency
  'زمن الاستجابة (دقيقة)' // JJ - sla_minutes
]

// Check if headers exist, if not, add them
export const ensureHeadersExist = async () => {
  try {
    const sheets = await getGoogleSheetsService()
    
    // Get the first row to check if headers exist
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!1:1`
    })
    
    const existingHeaders = response.data.values?.[0] || []
    
    // If no headers or headers are different, update them
    if (existingHeaders.length === 0 || JSON.stringify(existingHeaders) !== JSON.stringify(SHEET_HEADERS)) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!1:1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [SHEET_HEADERS]
        }
      })
      
      // Format headers with bold and background color
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: 0, // Assuming first sheet
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: SHEET_HEADERS.length
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.2, green: 0.6, blue: 0.2 },
                    textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } }
                  }
                },
                fields: 'userEnteredFormat(backgroundColor,textFormat)'
              }
            }
          ]
        }
      })
      
      console.log('Headers updated successfully')
    }
    
    return true
  } catch (error) {
    console.error('Error ensuring headers exist:', error)
    throw error
  }
}

// Add a new row to the Google Sheet
export const addLeadToSheet = async (leadData: any) => {
  try {
    const sheets = await getGoogleSheetsService()
    
    // Ensure headers exist before adding data
    await ensureHeadersExist()
    
    // Prepare row data in the same order as headers
    const rowData = [
      leadData.timestamp,
      leadData.lead_id,
      leadData.status,
      leadData.service_type,
      Array.isArray(leadData.additional_services) 
        ? leadData.additional_services.join(', ') 
        : (leadData.additional_services || ''),
      leadData.from_city,
      leadData.from_district,
      leadData.from_place_type,
      leadData.from_floor.toString(),
      leadData.from_elevator,
      leadData.to_city,
      leadData.to_district,
      leadData.to_floor.toString(),
      leadData.to_elevator,
      Array.isArray(leadData.items) 
        ? leadData.items.map((item: any) => `${item.item}: ${item.quantity}`).join(', ')
        : (leadData.items || ''),
      leadData.packaging_level,
      leadData.hoist_needed,
      leadData.date_pref,
      leadData.time_slot,
      leadData.flexibility,
      leadData.customer_name,
      leadData.customer_phone,
      leadData.whatsapp_optin ? 'نعم' : 'لا',
      leadData.notes || '',
      leadData.utm_source || '',
      leadData.utm_medium || '',
      leadData.utm_campaign || '',
      leadData.utm_term || '',
      leadData.utm_content || '',
      leadData.gclid || '',
      leadData.device || '',
      leadData.page_path || '',
      leadData.referrer || '',
      leadData.ip || '',
      leadData.currency || 'SAR',
      leadData.sla_minutes ? leadData.sla_minutes.toString() : '30'
    ]
    
    // Add the new row
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:AI`, // Assuming we have columns up to AI
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData]
      }
    })
    
    console.log(`Lead ${leadData.lead_id} added to Google Sheets successfully`)
    return response.data
    
  } catch (error) {
    console.error('Error adding lead to Google Sheets:', error)
    throw error
  }
}

// Get sheet statistics
export const getSheetStats = async () => {
  try {
    const sheets = await getGoogleSheetsService()
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:A`
    })
    
    const rows = response.data.values || []
    
    return {
      totalLeads: Math.max(0, rows.length - 1), // Exclude header row
      lastUpdate: new Date().toISOString()
    }
    
  } catch (error) {
    console.error('Error getting sheet stats:', error)
    throw error
  }
}

// Test Google Sheets connection
export const testGoogleSheetsConnection = async () => {
  try {
    const sheets = await getGoogleSheetsService()
    
    // Try to read the sheet info
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID
    })
    
    return {
      success: true,
      sheetTitle: response.data.properties?.title,
      sheetId: response.data.spreadsheetId
    }
    
  } catch (error) {
    console.error('Google Sheets connection test failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
