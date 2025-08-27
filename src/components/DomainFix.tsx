"use client"

import { useEffect } from 'react'

export function DomainFix() {
  useEffect(() => {
    // Fix any client-side domain issues
    if (typeof window !== 'undefined') {
      // Check if we're on the wrong domain
      if (window.location.hostname.includes('prokr.sa')) {
        const newUrl = window.location.href.replace('prokr.sa', 'www.prokr.net')
        window.location.replace(newUrl)
        return
      }
      
      // Fix any existing elements with wrong URLs
      const fixExistingUrls = () => {
        // Fix all links
        const existingLinks = document.querySelectorAll('a[href*="prokr.sa"], link[href*="prokr.sa"]')
        existingLinks.forEach((link) => {
          const href = link.getAttribute('href')
          if (href && href.includes('prokr.sa')) {
            link.setAttribute('href', href.replace('prokr.sa', 'www.prokr.net'))
          }
        })

        // Fix all scripts
        const existingScripts = document.querySelectorAll('script[src*="prokr.sa"]')
        existingScripts.forEach((script) => {
          const src = script.getAttribute('src')
          if (src && src.includes('prokr.sa')) {
            script.setAttribute('src', src.replace('prokr.sa', 'www.prokr.net'))
          }
        })

        // Fix all images
        const existingImages = document.querySelectorAll('img[src*="prokr.sa"]')
        existingImages.forEach((image) => {
          const src = image.getAttribute('src')
          if (src && src.includes('prokr.sa')) {
            image.setAttribute('src', src.replace('prokr.sa', 'www.prokr.net'))
          }
        })
      }

      // Fix existing URLs immediately
      fixExistingUrls()

      // Override any incorrect prefetch URLs
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              
              // Fix any links that point to prokr.sa
              const links = element.querySelectorAll('a[href*="prokr.sa"], link[href*="prokr.sa"]')
              links.forEach((link) => {
                const href = link.getAttribute('href')
                if (href && href.includes('prokr.sa')) {
                  link.setAttribute('href', href.replace('prokr.sa', 'www.prokr.net'))
                }
              })
              
              // Fix any script sources that point to prokr.sa
              const scripts = element.querySelectorAll('script[src*="prokr.sa"]')
              scripts.forEach((script) => {
                const src = script.getAttribute('src')
                if (src && src.includes('prokr.sa')) {
                  script.setAttribute('src', src.replace('prokr.sa', 'www.prokr.net'))
                }
              })

              // Fix any image sources that point to prokr.sa
              const images = element.querySelectorAll('img[src*="prokr.sa"]')
              images.forEach((image) => {
                const src = image.getAttribute('src')
                if (src && src.includes('prokr.sa')) {
                  image.setAttribute('src', src.replace('prokr.sa', 'www.prokr.net'))
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
