# إعداد Google Analytics وGoogle Ads للتتبع الصحيح 🎯

## المشكلة المحددة
```
❌ No tags found - There are currently no debuggable Google tags
❌ لا يظهر التتبع في Google Ads Conversion
❌ عدم ظهور الأحداث في Google Analytics
```

## الحل الكامل ✅

### 1️⃣ إعداد Google Analytics 4

#### أ) إنشاء حساب Google Analytics
1. اذهب إلى [Google Analytics](https://analytics.google.com/)
2. أنشئ حساباً جديداً أو استخدم حساباً موجوداً
3. أنشئ Property جديد باسم "prokr - نقل عفش جدة"
4. احصل على **Measurement ID** بالصيغة `G-XXXXXXXXXX`

#### ب) إعداد Google Tag Manager (اختياري ولكن مفضل)
1. اذهب إلى [Google Tag Manager](https://tagmanager.google.com/)
2. أنشئ Container جديد للموقع
3. احصل على **Container ID** بالصيغة `GTM-XXXXXXX`

### 2️⃣ إعداد Google Ads Conversion Tracking

#### أ) إنشاء Conversion Action
1. اذهب إلى [Google Ads](https://ads.google.com/)
2. Tools & Settings → Conversions
3. انقر على "+" لإنشاء conversion جديد
4. اختر "Website" → "Submit lead form"
5. قم بالتكوين كالتالي:
   ```
   Conversion name: إرسال نموذج عملاء محتملين
   Category: Submit lead form
   Value: Use the same value for each conversion
   Value: 1
   Currency: SAR (Saudi Riyal)
   Count: One
   Attribution window: 30 days
   ```

#### ب) احصل على معرفات Conversion
- **Google Ads ID**: `AW-XXXXXXXXX` 
- **Conversion ID**: `AW-XXXXXXXXX/XXXXXXXXX`

### 3️⃣ تحديث ملف البيئة

قم بتحديث ملف `.env.local` ليحتوي على:

```bash
# Google Analytics & Ads Configuration  
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX                    # من Google Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX                     # من Google Tag Manager (اختياري)
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX             # من Google Ads
NEXT_PUBLIC_GOOGLE_CONVERSION_ID=AW-XXXXXXXXX/XXXXXXXXX  # من Google Ads Conversion
NEXT_PUBLIC_WHATSAPP_NUMBER=966543654700
NEXT_PUBLIC_PHONE_NUMBER=966543654700

# Google Sheets (موجود مسبقاً)
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
GOOGLE_SPREADSHEET_ID=1PA0drQi1lQuPJzmMiqtBGTq3tfL0x6QGgus5flIN7yE
GOOGLE_SHEET_NAME=fresh leads
```

### 4️⃣ اختبار التتبع

#### أ) اختبار محلي (Development)
```bash
npm run dev
```
1. افتح Developer Tools (F12)
2. اذهب إلى Console
3. يجب أن ترى الرسائل:
   ```
   Google Analytics loaded with ID: G-XXXXXXXXXX
   Google Ads configured with ID: AW-XXXXXXXXX
   ```

#### ب) اختبار صفحة الشكر
1. املأ النموذج واضغط إرسال
2. ستنتقل لصفحة `/thanks`
3. في Console يجب أن ترى:
   ```
   Conversion events sent to Google Analytics
   Conversion events sent to dataLayer (GTM)
   ```

#### ج) التحقق من Google Tag Assistant
1. تثبيت [Tag Assistant Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. فعل التتبع وقم بزيارة الموقع
3. يجب أن ترى:
   - ✅ Google Analytics GA4 Tag
   - ✅ Google Ads Remarketing Tag
   - ✅ Conversion Tag (عند زيارة صفحة الشكر)

### 5️⃣ التحقق من Real-Time في Google Analytics

1. اذهب إلى Google Analytics → Reports → Realtime
2. قم بزيارة الموقع في تبويب آخر
3. يجب أن ترى:
   - زيارة نشطة في الوقت الفعلي
   - أحداث الصفحات
   - أحداث التحويل عند إرسال النموذج

### 6️⃣ مراقبة Conversion في Google Ads

1. اذهب إلى Google Ads → Tools → Conversions
2. انقر على اسم Conversion التي أنشأتها
3. يجب أن ترى التحويلات تظهر خلال 24-48 ساعة

## الأحداث المتتبعة حالياً 📊

### أحداث Google Analytics
- `page_view` - زيارة الصفحات
- `lead_submit` - إرسال النموذج
- `conversion` - التحويل الناجح
- `whatsapp_click` - النقر على واتساب
- `quiz_step_completed` - إكمال خطوة في النموذج

### أحداث Google Ads
- `conversion` - تحويل ناجح (صفحة الشكر)
- Enhanced Conversions مفعل

## استكشاف الأخطاء 🔧

### إذا لم تظهر Tags في Tag Assistant:
1. تأكد من وجود القيم في `.env.local`
2. أعد تشغيل الخادم `npm run dev`
3. تأكد من عدم حظر Ad Blockers للـ tags

### إذا لم تظهر التحويلات:
1. تأكد من صحة Conversion ID
2. تأكد من تطابق Domain في Google Ads
3. انتظر 24-48 ساعة للظهور في التقارير

### إذا كانت Console تظهر أخطاء:
```bash
# تحقق من التكوين الحالي
console.log('Current config:', {
  GA_ID: process.env.NEXT_PUBLIC_GA4_ID,
  GOOGLE_ADS_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
})
```

## نشر التحديثات 🚀

بعد إعداد جميع المتغيرات:

```bash
npm run build
npm run start
# أو
vercel --prod
```

## التحقق النهائي ✅

✅ Google Analytics يعرض زيارات فورية  
✅ Google Ads يتتبع التحويلات  
✅ Tag Assistant يظهر جميع Tags  
✅ Console لا يظهر أخطاء Google Analytics  
✅ صفحة `/thanks` ترسل conversion events  

---

💡 **نصيحة**: استخدم [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) لمراقبة الأحداث بالتفصيل أثناء التطوير.
