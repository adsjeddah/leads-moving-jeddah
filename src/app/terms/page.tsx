import React from 'react'
import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <FileText className="w-10 h-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">الشروط والأحكام</h1>
          </div>

          {/* Last Updated */}
          <p className="text-gray-500 mb-8">آخر تحديث: يناير 2024</p>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-3">1. الموافقة على الشروط</h2>
              <p>
                باستخدامك لموقع prokr وخدماته، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. وصف الخدمة</h2>
              <p>
                prokr هو منصة وسيطة تربط بين العملاء الذين يحتاجون خدمات نقل العفش ومقدمي هذه الخدمات في جدة والمناطق المحيطة. نحن لا نقدم خدمات النقل بشكل مباشر، بل نسهل عملية التواصل بين الطرفين.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. استخدام الخدمة</h2>
              <p>يجب عليك:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>تقديم معلومات صحيحة ودقيقة</li>
                <li>أن تكون بالغًا (18 سنة أو أكثر) أو لديك موافقة ولي الأمر</li>
                <li>استخدام الخدمة للأغراض القانونية فقط</li>
                <li>عدم محاولة الإضرار بالموقع أو الخدمة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. العلاقة مع مقدمي الخدمات</h2>
              <p>
                prokr يعمل كوسيط فقط. أي اتفاق أو عقد لخدمات النقل يكون مباشرة بينك وبين مقدم الخدمة. نحن لسنا طرفًا في هذه الاتفاقيات ولا نتحمل مسؤولية عن:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>جودة خدمات النقل المقدمة</li>
                <li>الأضرار أو الخسائر التي قد تحدث أثناء النقل</li>
                <li>النزاعات بينك وبين مقدم الخدمة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. الأسعار والدفع</h2>
              <p>
                الأسعار المعروضة عبر منصتنا هي تقديرات مقدمة من مقدمي الخدمات. قد تخضع الأسعار النهائية للتغيير بناءً على:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>التفاصيل الإضافية غير المذكورة في الطلب الأصلي</li>
                <li>الظروف الخاصة في موقع الاستلام أو التسليم</li>
                <li>طلبات خدمات إضافية</li>
              </ul>
              <p className="mt-2">
                جميع المدفوعات تتم مباشرة مع مقدم الخدمة وليس عبر prokr.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. إلغاء الخدمة</h2>
              <p>
                يمكنك إلغاء طلبك في أي وقت قبل البدء في تنفيذ الخدمة. قد تطبق رسوم إلغاء حسب سياسة مقدم الخدمة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">7. المسؤولية</h2>
              <p>
                prokr غير مسؤول عن:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الخدمة</li>
                <li>فقدان أو تلف الممتلكات أثناء النقل</li>
                <li>التأخير في تقديم الخدمة</li>
                <li>أي خسائر مالية ناتجة عن استخدام الموقع</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">8. الملكية الفكرية</h2>
              <p>
                جميع المحتويات على الموقع بما في ذلك النصوص، الصور، الشعارات، والتصميمات هي ملك لـ prokr ومحمية بموجب قوانين حقوق الطبع والنشر.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">9. تعديل الشروط</h2>
              <p>
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم نشر أي تعديلات على هذه الصفحة مع تحديث تاريخ &ldquo;آخر تحديث&rdquo;.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">10. القانون المطبق</h2>
              <p>
                تخضع هذه الشروط والأحكام وتفسر وفقًا لقوانين المملكة العربية السعودية.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">11. الاتصال بنا</h2>
              <p>
                لأي استفسارات حول هذه الشروط والأحكام، يمكنك التواصل معنا عبر:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>واتساب: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966543654700'}</li>
                <li>البريد الإلكتروني: support@prokr.net</li>
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