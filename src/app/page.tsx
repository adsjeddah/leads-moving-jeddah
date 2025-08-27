import { Hero } from '@/components/Hero'
import { HowWeWork } from '@/components/HowWeWork'
import { Services } from '@/components/Services'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { CTASection } from '@/components/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowWeWork />
      <Services />
      <CTASection />
      <Testimonials />
      <FAQ />
    </>
  )
}