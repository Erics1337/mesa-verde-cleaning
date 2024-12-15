import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { serverConfig } from '@/utils/config'

// Initialize AWS SES
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

// Validate AWS configuration
function validateAwsConfig() {
  const requiredEnvVars = {
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    EMAIL_TO_ADDRESS: process.env.EMAIL_TO_ADDRESS,
  }

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars)
    return false
  }
  return true
}

// Rate limiting setup
const rateLimit = new Map<string, { count: number; timestamp: number }>()

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9-+()]*$/, 'Invalid phone number'),
  service: z.string().min(1, 'Service selection is required'),
  message: z.string().min(1, 'Message is required'),
  preferredContact: z.enum(['email', 'phone']),
  recaptchaToken: z.string(),
})

type ContactRequest = z.infer<typeof contactSchema>

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = serverConfig.recaptcha.secretKey
    if (!secretKey) {
      console.error('reCAPTCHA secret key not configured')
      return false
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success && data.score >= 0.5
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error)
    return false
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = serverConfig.rateLimit.windowMs
  const maxRequests = serverConfig.rateLimit.maxRequests

  // Clean up old entries
  Array.from(rateLimit.entries()).forEach(([key, value]) => {
    if (now - value.timestamp > windowMs) {
      rateLimit.delete(key)
    }
  })

  const clientData = rateLimit.get(ip) || { count: 0, timestamp: now }

  // Reset count if outside window
  if (now - clientData.timestamp > windowMs) {
    clientData.count = 0
    clientData.timestamp = now
  }

  if (clientData.count >= maxRequests) {
    return false
  }

  clientData.count++
  rateLimit.set(ip, clientData)
  return true
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}

export async function POST(request: NextRequest) {
  console.log('API route hit:', request.url)

  try {
    // Log environment variables (excluding sensitive data)
    console.log('Environment check:', {
      hasAwsRegion: !!process.env.AWS_REGION,
      hasAwsKey: !!process.env.AWS_ACCESS_KEY_ID,
      hasAwsSecret: !!process.env.AWS_SECRET_ACCESS_KEY,
      hasFromEmail: !!process.env.EMAIL_FROM_ADDRESS,
      hasToEmail: !!process.env.EMAIL_TO_ADDRESS,
      nodeEnv: process.env.NODE_ENV,
    })

    // Validate AWS configuration
    if (!validateAwsConfig()) {
      console.error('AWS configuration is incomplete')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const ip = request.ip || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    console.log('Received form data:', {
      ...body,
      recaptchaToken: '[REDACTED]'
    })

    const result = contactSchema.safeParse(body)

    if (!result.success) {
      console.error('Validation error:', result.error.errors)
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.errors },
        { status: 400 }
      )
    }

    const { name, email, phone, service, message, preferredContact, recaptchaToken } = result.data

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken)
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }

    // Send email using AWS SES
    const command = new SendEmailCommand({
      Source: process.env.EMAIL_FROM_ADDRESS,
      Destination: {
        ToAddresses: [process.env.EMAIL_TO_ADDRESS || 'contact@mesaverdecleaning.com'],
      },
      ConfigurationSetName: 'ContactForm',
      Message: {
        Subject: {
          Data: `New Contact Form Submission from ${name}`,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: `New Contact Form Submission\n\nFrom: ${name}\nEmail: ${email}\nPhone: ${phone}\nService Requested: ${service}\nPreferred Contact Method: ${preferredContact}\n\nMessage:\n${message}`,
            Charset: 'UTF-8',
          },
          Html: {
            Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Service Requested:</strong> ${service}</p>
              <p><strong>Preferred Contact Method:</strong> ${preferredContact}</p>
              <h3>Message:</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `,
            Charset: 'UTF-8',
          },
        },
      },
    })

    try {
      await sesClient.send(command)
    } catch (error) {
      console.error('Failed to send email:', error)
      return NextResponse.json(
        { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
