'use client'

import Script from 'next/script'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA4_ID
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
  const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

  // Show placeholder values in development
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  console.log('Google Analytics Config:', {
    GA_ID: GA_ID || 'Not configured',
    GTM_ID: GTM_ID || 'Not configured', 
    GOOGLE_ADS_ID: GOOGLE_ADS_ID || 'Not configured',
    isDevelopment
  })

  return (
    <>
      {/* Google Tag Manager - Always load if GTM_ID exists */}
      {GTM_ID && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
          <noscript>
            <iframe 
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0" 
              width="0" 
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics 4 - Primary tracking */}
      {GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="ga-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', '${GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  send_page_view: true
                });
                
                // Enable Google Ads remarketing
                gtag('config', 'AW-990599653');
                
                console.log('Google Analytics loaded with ID: ${GA_ID}');
              `,
            }}
          />
        </>
      )}

      {/* Google Ads Enhanced Conversion Tracking */}
      {GOOGLE_ADS_ID && (
        <>
          <Script
            id="google-ads-enhanced"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                
                gtag('config', '${GOOGLE_ADS_ID}', {
                  allow_enhanced_conversions: true
                });
                
                console.log('Google Ads configured with ID: ${GOOGLE_ADS_ID}');
              `,
            }}
          />
        </>
      )}

      {/* Fallback Global gtag function if none of the above load */}
      {!GTM_ID && !GA_ID && (
        <Script
          id="gtag-fallback"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              console.log('Google Analytics fallback initialized');
            `,
          }}
        />
      )}
    </>
  )
}