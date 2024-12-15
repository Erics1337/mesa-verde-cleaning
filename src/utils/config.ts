interface SiteConfig {
  url: string
  name: string
  description: string
  image?: string
  contact: {
    email: string
    phone: string
    address: string
  }
  social: {
    facebook: string
    instagram: string
    twitter: string
  }
  analytics: {
    googleAnalyticsId: string
  }
  recaptcha: {
    siteKey?: string
  }
}

export const siteConfig: SiteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mesaverdecleaning.com',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Mesa Verde Cleaning',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Professional cleaning services in Mesa Verde, Colorado',
  image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mesaverdecleaning.com'}/images/logo.svg`,
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@mesaverdecleaning.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '(123) 456-7890',
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || '123 Main Street, Mesa Verde, CO 81330',
  },
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/mesaverdecleaning',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/mesaverdecleaning',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/mesaverdeclean',
  },
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  },
  recaptcha: {
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
}

interface ServerConfig {
  email: {
    fromAddress: string
    toAddress: string
  }
  recaptcha: {
    secretKey?: string
  }
  aws: {
    region: string
    accessKeyId?: string
    secretAccessKey?: string
  }
  rateLimit: {
    maxRequests: number
    windowMs: number
  }
}

export const serverConfig: ServerConfig = {
  email: {
    fromAddress: process.env.EMAIL_FROM_ADDRESS || 'contact@mesaverdecleaning.com',
    toAddress: process.env.EMAIL_TO_ADDRESS || 'contact@mesaverdecleaning.com',
  },
  recaptcha: {
    secretKey: process.env.RECAPTCHA_SECRET_KEY,
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  rateLimit: {
    maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  },
}
