import { siteConfig } from './config'

declare global {
  interface Window {
    gtag: (
      type: string,
      action: string,
      params: {
        [key: string]: any
      }
    ) => void
    dataLayer: any[]
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return
  
  // Check if script is already loaded
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) return

  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', siteConfig.analytics.googleAnalyticsId, {
    page_path: window.location.pathname,
  })

  // Load GA script asynchronously
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId}`
  document.head.appendChild(script)
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('config', siteConfig.analytics.googleAnalyticsId, {
    page_path: url,
  })
}

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Analytics event categories
export const AnalyticsEventCategories = {
  CONTACT: 'Contact',
  NAVIGATION: 'Navigation',
  SOCIAL: 'Social',
  DOWNLOAD: 'Download',
  SEARCH: 'Search',
  ENGAGEMENT: 'Engagement',
} as const

// Analytics event actions
export const AnalyticsEventActions = {
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  CLICK: 'click',
  SCROLL: 'scroll',
  VIEW: 'view',
} as const
