import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import sgMail from '@sendgrid/mail'
import { serverConfig } from '@/utils/config'

// Initialize SendGrid
if (serverConfig.email.serviceApiKey) {
  sgMail.setApiKey(serverConfig.email.serviceApiKey)
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
    const validatedData = contactSchema.parse(body)

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(validatedData.recaptchaToken)
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }

    // Prepare email
    const msg = {
      to: serverConfig.email.toAddress,
      from: serverConfig.email.fromAddress,
      replyTo: validatedData.email,
      subject: `New Contact Form Submission - ${validatedData.service}`,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone}
Service: ${validatedData.service}
Preferred Contact Method: ${validatedData.preferredContact}

Message:
${validatedData.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>Email:</strong> ${validatedData.email}</p>
<p><strong>Phone:</strong> ${validatedData.phone}</p>
<p><strong>Service:</strong> ${validatedData.service}</p>
<p><strong>Preferred Contact Method:</strong> ${validatedData.preferredContact}</p>
<h3>Message:</h3>
<p>${validatedData.message.replace(/\n/g, '<br>')}</p>
      `,
    }

    // Send email
    if (serverConfig.email.serviceApiKey) {
      await sgMail.send(msg)
    } else {
      console.log('Email would have been sent:', msg)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
