import { QuizWizard } from '@/components/QuizWizard/QuizWizard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'اطلب خدمة نقل العفش - prokr',
  description: 'احصل على عروض أسعار فورية من أفضل شركات نقل العفش في جدة',
}

export default function OrderPage() {
  return (
    <main className="min-h-screen">
      <QuizWizard />
    </main>
  )
}