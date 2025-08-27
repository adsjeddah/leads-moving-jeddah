"use client"

import { useEffect } from 'react'

export function DomainFix() {
  useEffect(() => {
    // Fix any client-side domain issues
    if (typeof window !== 'undefined') {
      // Check if we're on the wrong domain
      if (window.location.hostname.includes('prokr.net')) {
        const newUrl = window.location.href.replace('prokr.net', 'prokr.sa')
        window.location.replace(newUrl)
        return
      }
      
      // Override any incorrect prefetch URLs
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              
              // Fix any links that point to prokr.net
              const links = element.querySelectorAll('a[href*="prokr.net"], link[href*="prokr.net"]')
              links.forEach((link) => {
                const href = link.getAttribute('href')
                if (href && href.includes('prokr.net')) {
                  link.setAttribute('href', href.replace('prokr.net', 'prokr.sa'))
                }
              })
              
              // Fix any script sources that point to prokr.net
              const scripts = element.querySelectorAll('script[src*="prokr.net"]')
              scripts.forEach((script) => {
                const src = script.getAttribute('src')
                if (src && src.includes('prokr.net')) {
                  script.setAttribute('src', src.replace('prokr.net', 'prokr.sa'))
                }
              })
            }
          })
        })
      })
      
      observer.observe(document.head, { 
        childList: true, 
        subtree: true 
      })
      
      // Cleanup
      return () => observer.disconnect()
    }
  }, [])

  return null
}
