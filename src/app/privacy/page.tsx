import React from 'react'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">سياسة الخصوصية</h1>
          </div>

          {/* Last Updated */}
          <p className="text-gray-500 mb-8">آخر تحديث: يناير 2024</p>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-3">مقدمة</h2>
              <p>
                نحن في prokr نلتزم بحماية خصوصية عملائنا ومستخدمي موقعنا. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات الشخصية التي نحصل عليها منك.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">المعلومات التي نجمعها</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>الاسم الكامل</li>
                <li>رقم الهاتف المحمول</li>
                <li>عنوان الاستلام والتسليم</li>
                <li>تفاصيل العناصر المطلوب نقلها</li>
                <li>التواريخ والأوقات المفضلة</li>
                <li>معلومات تقنية (عنوان IP، نوع الجهاز، المتصفح)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">كيف نستخدم معلوماتك</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>معالجة طلبات نقل العفش وإرسالها للمنفذين المعتمدين</li>
                <li>التواصل معك بخصوص طلبك والعروض المتاحة</li>
                <li>تحسين خدماتنا وتجربة المستخدم</li>
                <li>إرسال عروض ترويجية (بموافقتك المسبقة)</li>
                <li>الامتثال للمتطلبات القانونية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">مشاركة المعلومات</h2>
              <p>
                نشارك معلوماتك فقط مع:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>مقدمي خدمات النقل المعتمدين لتنفيذ طلبك</li>
                <li>مزودي الخدمات التقنية (مثل SheetDB لتخزين البيانات)</li>
                <li>السلطات القانونية عند الضرورة</li>
              </ul>
              <p className="mt-2">
                لن نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة لأغراض تسويقية.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">حماية المعلومات</h2>
              <p>
                نستخدم تدابير أمنية متقدمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الإفصاح أو التعديل. تشمل هذه التدابير:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>تشفير البيانات أثناء النقل (HTTPS)</li>
                <li>الوصول المقيد للمعلومات الشخصية</li>
                <li>المراجعة المنتظمة لإجراءات الأمان</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">حقوقك</h2>
              <p>
                لديك الحق في:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>الوصول إلى معلوماتك الشخصية</li>
                <li>تصحيح أي معلومات غير دقيقة</li>
                <li>طلب حذف معلوماتك</li>
                <li>الاعتراض على معالجة معلوماتك لأغراض معينة</li>
                <li>سحب موافقتك في أي وقت</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">ملفات تعريف الارتباط (Cookies)</h2>
              <p>
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. يمكنك ضبط متصفحك لرفض ملفات تعريف الارتباط، ولكن هذا قد يؤثر على بعض وظائف الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">التحديثات على السياسة</h2>
              <p>
                قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سننشر أي تغييرات على هذه الصفحة وسنحدث تاريخ &ldquo;آخر تحديث&rdquo;.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">اتصل بنا</h2>
              <p>
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يمكنك التواصل معنا عبر:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>واتساب: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966543654700'}</li>
                <li>البريد الإلكتروني: privacy@prokr.net</li>
              </ul>
            </section>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <Link href="/">
              <button className="inline-flex items-center gap-2 text-primary hover:underline">
                <ArrowRight className="w-4 h-4" />
                العودة للرئيسية
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}