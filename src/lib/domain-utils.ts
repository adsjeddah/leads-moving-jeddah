/**
 * Utility functions to handle domain-related issues
 */

export function getCorrectDomain(): string {
  if (typeof window !== 'undefined') {
    // Client-side: return current origin if correct, or fixed domain
    const currentHost = window.location.hostname
    if (currentHost.includes('prokr.net')) {
      return 'https://prokr.sa'
    }
    return window.location.origin
  }
  
  // Server-side: always return the correct domain
  return 'https://prokr.sa'
}

export function fixUrl(url: string): string {
  if (!url) return url
  
  // Replace any prokr.net with prokr.sa
  return url.replace(/prokr\.net/g, 'prokr.sa')
}

export function validateDomain(): boolean {
  if (typeof window === 'undefined') return true
  
  const hostname = window.location.hostname
  const validDomains = ['prokr.sa', 'www.prokr.sa', 'localhost']
  
  return validDomains.some(domain => hostname === domain || hostname.endsWith(domain))
}

export function redirectToCorrectDomain(): void {
  if (typeof window === 'undefined') return
  
  if (!validateDomain() && window.location.hostname.includes('prokr.net')) {
    const correctUrl = window.location.href.replace(/prokr\.net/g, 'prokr.sa')
    window.location.replace(correctUrl)
  }
}
