"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface TestResult {
  success: boolean
  message: string
  data?: any
  error?: string
}

export default function AdminSheetsPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testSheetsConnection = async () => {
    setIsLoading(true)
    setTestResult(null)
    
    try {
      const response = await fetch('/api/test-sheets', {
        method: 'GET'
      })
      
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: 'حدث خطأ أثناء الاختبار',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addHeaders = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/test-sheets', {
        method: 'POST'
      })
      
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: 'حدث خطأ أثناء إضافة رؤوس الأعمدة',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            إدارة Google Sheets
          </h1>
          <p className="text-gray-600">
            اختبار وإدارة اتصال قاعدة البيانات مع Google Sheets
          </p>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            الإجراءات المتاحة
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={testSheetsConnection}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'جاري الاختبار...' : 'اختبار الاتصال'}
            </Button>
            
            <Button 
              onClick={addHeaders}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? 'جاري الإضافة...' : 'إضافة رؤوس الأعمدة'}
            </Button>
            
            <Button 
              onClick={() => window.open('https://docs.google.com/spreadsheets/d/1PA0drQi1lQuPJzmMiqtBGTq3tfL0x6QGgus5flIN7yE/edit', '_blank')}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              فتح Google Sheets
            </Button>
          </div>
        </div>

        {/* Test Results */}
        {testResult && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              نتائج الاختبار
            </h2>
            
            <div className={`p-4 rounded-lg ${
              testResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {testResult.success ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                
                <span className={`font-medium ${
                  testResult.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {testResult.success ? 'نجح الاختبار!' : 'فشل الاختبار'}
                </span>
              </div>
              
              <p className={`${
                testResult.success ? 'text-green-700' : 'text-red-700'
              } mb-3`}>
                {testResult.message}
              </p>
              
              {testResult.data && (
                <div className="bg-white rounded-lg p-3 border">
                  <h3 className="font-medium text-gray-900 mb-2">تفاصيل الاتصال:</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li><strong>اسم الشيت:</strong> {testResult.data.sheetTitle}</li>
                    <li><strong>معرف الشيت:</strong> {testResult.data.sheetId}</li>
                    <li><strong>إجمالي الطلبات:</strong> {testResult.data.totalLeads}</li>
                    <li><strong>آخر تحديث:</strong> {new Date(testResult.data.lastUpdate).toLocaleString('ar-SA')}</li>
                  </ul>
                </div>
              )}
              
              {testResult.error && (
                <div className="bg-red-100 rounded-lg p-3 border border-red-200 mt-3">
                  <h3 className="font-medium text-red-900 mb-2">تفاصيل الخطأ:</h3>
                  <p className="text-sm text-red-700 font-mono">{testResult.error}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            معلومات مهمة
          </h2>
          
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>
                <strong>رابط Google Sheets:</strong>{' '}
                <a 
                  href="https://docs.google.com/spreadsheets/d/1PA0drQi1lQuPJzmMiqtBGTq3tfL0x6QGgus5flIN7yE/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  فتح الشيت
                </a>
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>
                <strong>اسم الشيت:</strong> &quot;fresh leads&quot;
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>
                <strong>عدد الأعمدة:</strong> 35 عمود (من A إلى AI)
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>
                <strong>التزامن:</strong> كل طلب جديد يتم إضافته تلقائياً وفورياً
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
