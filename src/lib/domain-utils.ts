/**
 * Utility functions to handle domain-related issues
 */

export function getCorrectDomain(): string {
  if (typeof window !== 'undefined') {
    // Client-side: return current origin if correct, or fixed domain
    const currentHost = window.location.hostname
    if (currentHost.includes('prokr.sa')) {
      return 'https://www.prokr.net'
    }
    return window.location.origin
  }
  
  // Server-side: always return the correct domain
  return 'https://www.prokr.net'
}

export function fixUrl(url: string): string {
  if (!url) return url
  
  // Replace any prokr.sa with prokr.net
  return url.replace(/prokr\.sa/g, 'www.prokr.net')
}

export function validateDomain(): boolean {
  if (typeof window === 'undefined') return true
  
  const hostname = window.location.hostname
  const validDomains = ['prokr.net', 'www.prokr.net', 'localhost']
  
  return validDomains.some(domain => hostname === domain || hostname.endsWith(domain))
}

export function redirectToCorrectDomain(): void {
  if (typeof window === 'undefined') return
  
  if (!validateDomain() && window.location.hostname.includes('prokr.sa')) {
    const correctUrl = window.location.href.replace(/prokr\.sa/g, 'www.prokr.net')
    window.location.replace(correctUrl)
  }
}
