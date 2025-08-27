import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  
  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']
  
  utmKeys.forEach(key => {
    const value = params.get(key)
    if (value) utm[key] = value
  })
  
  return utm
}

export function normalizePhone(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Handle Saudi numbers
  if (cleaned.startsWith('966')) {
    return '+' + cleaned
  } else if (cleaned.startsWith('05')) {
    return '+966' + cleaned.substring(1)
  } else if (cleaned.startsWith('5') && cleaned.length === 9) {
    return '+966' + cleaned
  }
  
  return phone
}

export function generateLeadId(): string {
  return `JED-${Date.now()}`
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getDeviceType(): string {
  if (typeof window === 'undefined') return 'desktop'
  
  const userAgent = window.navigator.userAgent.toLowerCase()
  
  if (/mobile|android|iphone/.test(userAgent)) {
    return 'mobile'
  } else if (/ipad|tablet/.test(userAgent)) {
    return 'tablet'
  }
  
  return 'desktop'
}

export function getReferrer(): string {
  if (typeof window === 'undefined') return ''
  return document.referrer || ''
}

export function getPagePath(): string {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname
}