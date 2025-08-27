"use client"

import React from 'react'
import { motion } from 'framer-motion'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'كم الوقت للرد؟',
    answer: 'نرسل لك العروض خلال دقائق في أوقات العمل. عادة ما تصلك 3-5 عروض خلال أول نصف ساعة من تقديم الطلب.'
  },
  {
    question: 'هل الأسعار ثابتة؟',
    answer: 'الأسعار مرنة حسب التفاصيل المقدمة. نرسل لك أكثر من عرض من شركات مختلفة لتختار الأنسب لميزانيتك واحتياجاتك.'
  },
  {
    question: 'هل فيه ضمان؟',
    answer: 'نعم، نوفر ضمان على التغليف والفك والتركيب. جميع الشركات المعتمدة معنا ملتزمة بمعايير الجودة والأمان.'
  },
  {
    question: 'كيف أضمن سلامة عفشي؟',
    answer: 'جميع المنفذين معنا محترفون ومعتمدون. نستخدم مواد تغليف عالية الجودة ونوفر تأمين على النقل في حال طلبت ذلك.'
  },
  {
    question: 'هل تنقلون خارج جدة؟',
    answer: 'نعم، نوفر خدمة النقل من وإلى جميع مدن المملكة. اختر "نقل بين المدن" عند تعبئة الطلب.'
  },
  {
    question: 'ما طرق الدفع المتاحة؟',
    answer: 'يمكنك الدفع نقداً أو بالتحويل البنكي أو عن طريق التطبيقات البنكية. بعض المنفذين يوفرون أيضاً الدفع بالبطاقة الائتمانية.'
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">الأسئلة الشائعة</h2>
          <p className="text-lg text-gray-600">
            إجابات على أكثر الأسئلة شيوعاً
          </p>
        </motion.div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion.Item
                value={`item-${index}`}
                className="bg-gray-50 rounded-2xl overflow-hidden border"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-6 py-4 text-right flex justify-between items-center hover:bg-gray-100 transition-colors group">
                    <span className="font-semibold text-lg">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 pb-4 text-gray-600">
                  <p className="pt-2">{faq.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}