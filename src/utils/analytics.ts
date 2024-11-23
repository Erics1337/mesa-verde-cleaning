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

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  const gtag = (...args: any[]) => {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', siteConfig.analytics.googleAnalyticsId)
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && siteConfig.analytics.googleAnalyticsId) {
    window.gtag('config', siteConfig.analytics.googleAnalyticsId, {
      page_path: url,
    })
  }
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
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Analytics event categories
export const AnalyticsEventCategories = {
  CONTACT: 'Contact',
  NAVIGATION: 'Navigation',
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
