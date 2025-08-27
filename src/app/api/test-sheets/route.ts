import { NextResponse } from 'next/server'
import { testGoogleSheetsConnection, getSheetStats, ensureHeadersExist } from '@/lib/googleSheets'

// GET endpoint to test Google Sheets connection
export async function GET() {
  try {
    // Test connection
    const connectionTest = await testGoogleSheetsConnection()
    
    if (!connectionTest.success) {
      return NextResponse.json({
        success: false,
        message: 'فشل الاتصال مع Google Sheets',
        error: connectionTest.error
      }, { status: 500 })
    }
    
    // Ensure headers exist
    await ensureHeadersExist()
    
    // Get stats
    const stats = await getSheetStats()
    
    return NextResponse.json({
      success: true,
      message: 'تم الاتصال مع Google Sheets بنجاح',
      data: {
        sheetTitle: connectionTest.sheetTitle,
        sheetId: connectionTest.sheetId,
        totalLeads: stats.totalLeads,
        lastUpdate: stats.lastUpdate
      }
    })
    
  } catch (error) {
    console.error('Test Sheets API error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'حدث خطأ أثناء اختبار الاتصال',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST endpoint to manually add headers
export async function POST() {
  try {
    await ensureHeadersExist()
    
    return NextResponse.json({
      success: true,
      message: 'تم إضافة رؤوس الأعمدة بنجاح'
    })
    
  } catch (error) {
    console.error('Add Headers API error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'حدث خطأ أثناء إضافة رؤوس الأعمدة',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
