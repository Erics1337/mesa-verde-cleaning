import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/utils/config'
import SchemaOrg from '@/components/SchemaOrg'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider'
import ReCaptchaProvider from '@/components/providers/ReCaptchaProvider'
import { Analytics } from "@vercel/analytics/react"

const quicksand = Quicksand({ 
  subsets: ['latin'],
  display: 'swap',
})

const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.vercel.live https://*.vercel.app https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://www.google-analytics.com;
  frame-src 'self' https://www.google.com;
  connect-src 'self' https://www.google-analytics.com https://*.vercel.live https://*.vercel.app;
`.replace(/\s+/g, ' ').trim()

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'Content-Security-Policy': csp
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={quicksand.className}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </head>
      <body suppressHydrationWarning={true}>
        <Analytics/>
        <ReCaptchaProvider>
          <AnalyticsProvider>
            <SchemaOrg />
            <Header />
            <main>{children}</main>
            <Footer />
          </AnalyticsProvider>
        </ReCaptchaProvider>
      </body>
    </html>
  )
}
