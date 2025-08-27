# Google Sheets Integration Setup 📊

## نظرة عامة
تم ربط الموقع مباشرة مع Google Sheets لحفظ طلبات العملاء بشكل تلقائي ولحظي باستخدام Google Service Account.

## 🔗 رابط Google Sheets
[https://docs.google.com/spreadsheets/d/1PA0drQi1lQuPJzmMiqtBGTq3tfL0x6QGgus5flIN7yE/edit](https://docs.google.com/spreadsheets/d/1PA0drQi1lQuPJzmMiqtBGTq3tfL0x6QGgus5flIN7yE/edit)

## 📋 رؤوس الأعمدة (35 عمود)

| العمود | اسم الحقل | الوصف |
|--------|-----------|--------|
| A | timestamp | وقت استلام الطلب |
| B | lead_id | رقم الطلب الفريد |
| C | status | حالة الطلب (new) |
| D | service_type | نوع الخدمة |
| E | additional_services | خدمات إضافية |
| F | from_city | مدينة الاستلام |
| G | from_district | حي الاستلام |
| H | from_place_type | نوع المكان |
| I | from_floor | الطابق - استلام |
| J | from_elevator | مصعد متاح - استلام |
| K | to_city | مدينة التسليم |
| L | to_district | حي التسليم |
| M | to_floor | الطابق - تسليم |
| N | to_elevator | مصعد متاح - تسليم |
| O | items | قائمة العناصر والكميات |
| P | packaging_level | مستوى التغليف |
| Q | hoist_needed | رافعة مطلوبة |
| R | date_pref | التاريخ المفضل |
| S | time_slot | الفترة الزمنية |
| T | flexibility | مرونة الموعد |
| U | customer_name | اسم العميل |
| V | customer_phone | رقم الهاتف |
| W | whatsapp_optin | موافقة واتساب |
| X | notes | ملاحظات العميل |
| Y | utm_source | مصدر الزيارة |
| Z | utm_medium | وسيط التسويق |
| AA | utm_campaign | الحملة التسويقية |
| BB | utm_term | المصطلح |
| CC | utm_content | محتوى الحملة |
| DD | gclid | Google Click ID |
| EE | device | نوع الجهاز |
| FF | page_path | صفحة الدخول |
| GG | referrer | الموقع المرجعي |
| HH | ip | عنوان IP |
| II | currency | العملة (SAR) |
| JJ | sla_minutes | زمن الاستجابة |

## 🛠️ إعدادات التطبيق

### 1. متغيرات البيئة
تم إضافة المتغيرات التالية في `.env.local`:

```env
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
GOOGLE_SPREADSHEET_ID=1PA0drQi1lQuPJzmMiqtBGTq3tfL0x6QGgus5flIN7yE  
GOOGLE_SHEET_NAME=fresh leads
```

### 2. Service Account
- **Project ID**: leads-store
- **Service Account Email**: service-account@leads-store.iam.gserviceaccount.com
- **الأذونات**: Google Sheets API + Drive API

## 🔍 الاختبار والمراقبة

### صفحة الإدارة
```
https://your-domain.com/admin-sheets
```

**الميزات:**
- اختبار اتصال Google Sheets
- عرض إحصائيات الطلبات
- إضافة رؤوس الأعمدة يدوياً
- رابط مباشر للشيت

### API Endpoints

#### اختبار الاتصال
```bash
GET /api/test-sheets
```
**Response:**
```json
{
  "success": true,
  "message": "تم الاتصال مع Google Sheets بنجاح",
  "data": {
    "sheetTitle": "moving leads",
    "sheetId": "1PA0drQi1lQuPJzmMiqtBGTq3tfL0x6QGgus5flIN7yE",
    "totalLeads": 0,
    "lastUpdate": "2025-01-27T15:36:16.972Z"
  }
}
```

#### إضافة رؤوس الأعمدة
```bash  
POST /api/test-sheets
```

#### إرسال طلب جديد
```bash
POST /api/lead
```

## 🎯 خصائص النظام

### ✅ المميزات
- **تزامن لحظي**: كل طلب يُحفظ فوراً
- **أمان عالي**: Service Account مع أذونات محددة
- **نظام احتياطي**: العودة لـ Make.com عند الفشل
- **تنسيق احترافي**: رؤوس ملونة ومنسقة
- **بيانات شاملة**: 35 حقل للتحليل

### 🔄 آلية العمل
1. عميل يملأ الفورم على الموقع
2. التطبيق يتحقق من اتصال Google Sheets
3. إضافة البيانات كصف جديد في الشيت
4. تنسيق البيانات المعقدة (Arrays → Text)
5. إرسال رد للعميل بنجاح العملية

### 📊 تنسيق البيانات

#### البيانات المركبة
- **items**: `"غرفة نوم: 2, صالة: 1, مطبخ: 1"`
- **additional_services**: `"تغليف_كامل, فك_وتركيب"`
- **whatsapp_optin**: `"نعم" / "لا"`
- **timestamp**: `"2025-01-27T15:36:16.972Z"`

#### معلومات UTM
جميع معلومات التتبع التسويقي محفوظة:
- مصدر الزيارة (Google, Facebook, etc.)
- نوع الحملة (CPC, Organic, etc.)
- معرف النقرة (GCLID)
- الصفحة المرجعية

## 🚨 استكشاف الأخطاء

### مشاكل شائعة

#### خطأ في Service Account
```
Error: Google Sheets connection failed: Unauthorized
```
**الحل:** تأكد من صحة credentials في `.env.local`

#### خطأ في الأذونات
```  
Error: The caller does not have permission
```
**الحل:** تأكد من إعطاء Service Account حقوق التحرير

#### خطأ في Spreadsheet ID
```
Error: Unable to parse range
```
**الحل:** تأكد من صحة معرف الشيت في المتغيرات

### فحص الاتصال
```bash
# تطوير محلي
curl -X GET http://localhost:3000/api/test-sheets

# Production  
curl -X GET https://your-domain.com/api/test-sheets
```

## 📈 التقارير والتحليل

### مؤشرات الأداء
- **إجمالي الطلبات**: عدد الصفوف - 1 (Header)
- **معدل النجاح**: مراقبة errors في الـ logs
- **أوقات الذروة**: تحليل timestamp
- **مصادر التحويل**: تحليل utm_source

### تصفية البيانات
استخدم Google Sheets filters لتحليل:
- طلبات حسب التاريخ
- طلبات حسب المنطقة
- طلبات حسب مصدر التسويق
- طلبات حسب نوع الخدمة

## 🔒 الأمان

### Service Account Security
- Private Key محمي في environment variables
- أذونات محددة فقط للشيت المطلوب
- لا يمكن الوصول لملفات أخرى في Drive

### Rate Limiting
- حد أقصى 5 طلبات في الدقيقة لكل IP
- حماية من الـ spam والاستخدام المفرط

## 📞 الدعم

في حالة مواجهة أي مشاكل:
1. تحقق من صفحة `/admin-sheets` أولاً
2. راجع الـ console logs
3. تأكد من متغيرات البيئة
4. اختبر الاتصال عبر API

---

**تم تطوير النظام بنجاح! 🎉**
كل طلب جديد سيظهر فوراً في Google Sheets مع جميع التفاصيل المطلوبة للمتابعة والتحليل.
