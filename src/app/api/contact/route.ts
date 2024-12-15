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

export async function POST(request: NextRequest) {
  try {
    // Validate AWS configuration
    if (!validateAwsConfig()) {
      console.error('AWS configuration is incomplete')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Check rate limit
    const ip = request.ip || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
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

    // Prepare email content
    const emailContent = `
      New Contact Form Submission:
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Service Requested: ${service}
      Preferred Contact Method: ${preferredContact}
      
      Message:
      ${message}
    `

    // Send email using AWS SES
    const command = new SendEmailCommand({
      Source: process.env.EMAIL_FROM_ADDRESS,
      Destination: {
        ToAddresses: [process.env.EMAIL_TO_ADDRESS || 'contact@mesaverdecleaning.com'],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission from ${name}`,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: emailContent,
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
