# دليل النشر على Vercel

## الخطوات المطلوبة للنشر

### 1. تجهيز المتغيرات البيئية
قم بإعداد المتغيرات التالية في لوحة تحكم Vercel:

#### متغيرات عامة (NEXT_PUBLIC_)
```
NEXT_PUBLIC_PHONE_NUMBER=966543654700
NEXT_PUBLIC_WHATSAPP_NUMBER=966543654700
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

#### متغيرات خاصة بالخادم
```
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/l2nrqm4smvo3llpgpnkv6vr4rsqf6g37
NODE_ENV=production
```

### 2. إعداد Make.com Webhook
الموقع يستخدم الآن [Make.com webhook](https://hook.eu2.make.com/l2nrqm4smvo3llpgpnkv6vr4rsqf6g37) لمعالجة البيانات.

#### بنية البيانات المرسلة:
```json
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "lead_id": "LEAD_20240101_ABC123",
  "service_type": "نقل كامل",
  "additional_services": ["تغليف", "فك وتركيب"],
  "from_city": "جدة",
  "from_district": "الصفا",
  "from_floor": "الأول",
  "from_elevator": true,
  "from_place_type": "شقة",
  "to_city": "جدة", 
  "to_district": "الروضة",
  "to_floor": "الثاني",
  "to_elevator": false,
  "items": [
    {"category": "غرف نوم", "quantity": 2},
    {"category": "مطبخ", "quantity": 1}
  ],
  "packaging_level": "متوسط",
  "hoist_needed": false,
  "date_pref": "2024-01-15",
  "time_slot": "صباحي",
  "flexibility": "مرن",
  "customer_name": "أحمد محمد",
  "customer_phone": "+966543654700",
  "whatsapp_optin": true,
  "notes": "ملاحظات إضافية",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "furniture_moving",
  "utm_term": "نقل عفش جدة",
  "utm_content": "ad_variant_1",
  "gclid": "gclid_example",
  "device": "desktop",
  "page_path": "/order",
  "referrer": "https://google.com",
  "ip": "192.168.1.1",
  "status": "new",
  "currency": "SAR",
  "sla_minutes": 30
}
```

#### مزايا استخدام Make.com:
- **مرونة أكثر**: يمكن إرسال البيانات لعدة أماكن (Google Sheets, CRM, Email, etc.)
- **أتمتة متقدمة**: إمكانية إنشاء workflows معقدة
- **إشعارات فورية**: إرسال تنبيهات عبر واتساب، إيميل، أو تيليجرام
- **تكامل سهل**: ربط مع أنظمة إدارة العملاء المختلفة

### 3. إعداد Google Analytics
1. إنشاء حساب Google Analytics جديد
2. إنشاء Google Tag Manager container
3. الحصول على GA4 ID و GTM ID

### 4. النشر على Vercel

#### الطريقة الأولى: عبر Git
1. رفع الكود إلى GitHub repository
2. ربط repository بـ Vercel
3. إضافة متغيرات البيئة في إعدادات Vercel
4. النشر التلقائي

#### الطريقة الثانية: عبر Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 5. التحقق من النشر
- تأكد من أن الموقع يعمل بشكل صحيح
- اختبر نموذج الطلبات
- تحقق من وصول البيانات إلى Make.com webhook
- اختبر Google Analytics
- تأكد من تشغيل أي workflows في Make.com

### 6. إعدادات إضافية

#### Domain مخصص (اختياري)
1. إضافة domain في إعدادات Vercel
2. تحديث DNS records
3. تحديث metadataBase في layout.tsx

#### HTTPS والأمان
- الموقع يتضمن headers أمان مُحسنة
- HTTPS مُفعل تلقائياً على Vercel
- تم تطبيق best practices للأمان

## الملفات المُحدثة

- ✅ `next.config.js` - محسن للأداء على Vercel
- ✅ `vercel.json` - إعدادات خاصة بـ Vercel
- ✅ `.gitignore` - لحماية الملفات الحساسة
- ✅ `src/app/layout.tsx` - إضافة metadataBase
- ✅ اختبار البناء - تم بنجاح

## نصائح مهمة

1. **لا تنس** تحديث أرقام الهاتف والواتساب في متغيرات البيئة
2. **تأكد** من صحة MAKE_WEBHOOK_URL قبل النشر
3. **اختبر** النموذج في بيئة التطوير أولاً
4. **فعّل** Google Analytics بعد النشر
5. **أعد** وقم بتكوين Make.com scenario لمعالجة البيانات الواردة

## استكشاف الأخطاء

### مشاكل شائعة:
- **خطأ 404 في API**: تحقق من MAKE_WEBHOOK_URL
- **عدم وصول البيانات**: تحقق من Make.com scenario وأنه مُفعل
- **مشاكل CSS**: تحقق من إعدادات Tailwind
- **مشاكل RTL**: تأكد من إعدادات i18n
- **webhook لا يعمل**: تحقق من Make.com scenario settings

### Logs ومتابعة الأخطاء:
- استخدم Vercel Dashboard للوصول إلى logs
- تحقق من Function logs للـ API routes
- استخدم browser dev tools لتتبع الأخطاء

---

## اكتمل تجهيز الموقع للنشر! 🎉
