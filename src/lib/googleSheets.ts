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

// Headers for the Google Sheet - Arabic Names (Updated Structure)
const SHEET_HEADERS = [
  'وقت الطلب',           // A - timestamp
  'رقم الطلب',          // B - lead_id  
  'حالة الطلب',         // C - status
  'نوع الخدمة',         // D - service_type (داخل_جدة أو من_وإلى_جدة)
  'مدينة الاستلام',     // E - from_city (جدة أو مدن أخرى)
  'حي/منطقة الاستلام',   // F - from_district (حي جدة أو منطقة في مدينة أخرى)
  'نوع المكان (استلام)', // G - from_place_type
  'الطابق (استلام)',     // H - from_floor
  'مصعد متاح (استلام)',  // I - from_elevator
  'مدينة التسليم',      // J - to_city (جدة أو مدن أخرى)
  'حي/منطقة التسليم',    // K - to_district (حي جدة أو منطقة في مدينة أخرى)
  'الطابق (تسليم)',      // L - to_floor
  'مصعد متاح (تسليم)',   // M - to_elevator
  'نوع العفش',          // N - items_type (عفش كامل أو عناصر محددة)
  'قائمة العناصر والكميات', // O - items (إذا كان عناصر محددة)
  'رافعة مطلوبة',        // P - hoist_needed
  'التاريخ المفضل',      // Q - date_pref
  'اسم العميل',          // R - customer_name
  'رقم الهاتف',          // S - customer_phone
  'موافقة واتساب',       // T - whatsapp_optin
  'ملاحظات العميل',      // U - notes
  'مصدر الزيارة',        // V - utm_source
  'وسيط التسويق',        // W - utm_medium
  'الحملة التسويقية',     // X - utm_campaign
  'المصطلح التسويقي',     // Y - utm_term
  'محتوى الحملة',        // Z - utm_content
  'معرف جوجل للنقرة',    // AA - gclid
  'نوع الجهاز',          // BB - device
  'صفحة الدخول',         // CC - page_path
  'الموقع المرجعي',      // DD - referrer
  'عنوان الـ IP',        // EE - ip
  'العملة',             // FF - currency
  'زمن الاستجابة (دقيقة)' // GG - sla_minutes
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
      leadData.from_city,
      leadData.from_district,
      leadData.from_place_type,
      leadData.from_floor ? leadData.from_floor.toString() : '0',
      leadData.from_elevator,
      leadData.to_city,
      leadData.to_district,
      leadData.to_floor ? leadData.to_floor.toString() : '0',
      leadData.to_elevator,
      leadData.items_type === 'complete_furniture' ? 'عفش كامل' : 'عناصر محددة',
      leadData.items_type === 'specific_items' && Array.isArray(leadData.items) 
        ? leadData.items.map((item: any) => `${item.item}: ${item.quantity}`).join(', ')
        : (leadData.items_type === 'complete_furniture' ? 'جميع محتويات المنزل/المكتب' : ''),
      leadData.hoist_needed,
      leadData.date_pref,
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
      range: `${SHEET_NAME}!A:GG`, // Updated range for new structure
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
