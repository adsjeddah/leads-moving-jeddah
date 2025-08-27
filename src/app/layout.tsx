import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { DomainFix } from '@/components/DomainFix'

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.prokr.net'),
  title: 'prokr - نقل عفش جدة | خدمات نقل آمنة وسريعة',
  description: 'نرتب لك نقل العفش في جدة بسرعة وأمان. احصل على عروض أسعار من أفضل المنفذين خلال دقائق. تغليف احترافي، فك وتركيب، وأسعار منافسة.',
  keywords: 'نقل عفش جدة، نقل اثاث، شركة نقل عفش، فك وتركيب، تغليف اثاث',
  openGraph: {
    title: 'prokr - نقل عفش جدة',
    description: 'احصل على أفضل خدمات نقل العفش في جدة',
    url: 'https://www.prokr.net',
    siteName: 'prokr',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'prokr - نقل عفش جدة',
    description: 'احصل على أفضل خدمات نقل العفش في جدة',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar-SA" dir="rtl">
      <body className={tajawal.className}>
        <DomainFix />
        <GoogleAnalytics />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}