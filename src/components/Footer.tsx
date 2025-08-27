import React from 'react'
import Link from 'next/link'
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966543654700'
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <footer className="bg-surface border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">prokr</h3>
            <p className="text-sm text-muted">
              نرتب لك نقل العفش في جدة بسرعة وأمان مع أفضل المنفذين
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#services" className="text-sm text-muted hover:text-primary transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-sm text-muted hover:text-primary transition-colors">
                  كيف نعمل
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-sm text-muted hover:text-primary transition-colors">
                  آراء العملاء
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-muted hover:text-primary transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">قانوني</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted hover:text-primary transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted hover:text-primary transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">تواصل معنا</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  واتساب
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${whatsappNumber}`}
                  className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4" />
                جدة، المملكة العربية السعودية
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted text-center md:text-right">
              © {currentYear} prokr. جميع الحقوق محفوظة.
            </p>
            <p className="text-xs text-muted/70 text-center md:text-left max-w-lg">
              ملاحظة: prokr يعمل كوسيط لتنظيم العملية بين العميل والمنفذ. نحن نسعى لتوفير أفضل الخدمات والأسعار.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}