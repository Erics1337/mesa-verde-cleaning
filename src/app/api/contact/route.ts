import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import sgMail from '@sendgrid/mail'
import { serverConfig } from '@/utils/config'

// Initialize SendGrid
if (!serverConfig.email.serviceApiKey) {
  console.error('SendGrid API key is missing')
} else {
  try {
    console.log('Initializing SendGrid with API key:', serverConfig.email.serviceApiKey.substring(0, 10) + '...')
    sgMail.setApiKey(serverConfig.email.serviceApiKey)
    
    // Test API key validity
    const testMsg = {
      to: serverConfig.email.toAddress,
      from: {
        email: serverConfig.email.fromAddress,
        name: 'Mesa Verde Cleaning Test'
      },
      subject: 'SendGrid Configuration Test',
      text: 'This is a test email to verify SendGrid configuration.'
    }
    
    console.log('Sending test email with config:', {
      to: testMsg.to,
      from: testMsg.from,
      subject: testMsg.subject
    })
    
    sgMail.send(testMsg)
      .then((response) => {
        console.log('SendGrid test email sent successfully:', response)
      })
      .catch((error) => {
        console.error('SendGrid test failed:', {
          message: error.message,
          response: error.response?.body,
          code: error.code,
          fullError: JSON.stringify(error, null, 2)
        })
      })
  } catch (error) {
    console.error('Failed to initialize SendGrid:', error)
  }
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
    console.log('Received form data:', { ...body, recaptchaToken: '[REDACTED]' })
    
    const validatedData = contactSchema.parse(body)

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(validatedData.recaptchaToken)
    if (!isRecaptchaValid) {
      console.error('reCAPTCHA verification failed')
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }

    // Prepare email
    const msg = {
      to: serverConfig.email.toAddress,
      from: {
        email: serverConfig.email.fromAddress,
        name: 'Mesa Verde Cleaning Contact Form'
      },
      replyTo: validatedData.email,
      subject: `New Contact Form Submission - ${validatedData.service}`,
      text: `
New contact form submission received:

FROM: ${validatedData.name} <${validatedData.email}>
PHONE: ${validatedData.phone}
SERVICE: ${validatedData.service}
PREFERRED CONTACT: ${validatedData.preferredContact}

MESSAGE:
${validatedData.message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>New Contact Form Submission</h2>
  <p><strong>From:</strong> ${validatedData.name} &lt;${validatedData.email}&gt;</p>
  <p><strong>Phone:</strong> ${validatedData.phone}</p>
  <p><strong>Service:</strong> ${validatedData.service}</p>
  <p><strong>Preferred Contact:</strong> ${validatedData.preferredContact}</p>
  <div style="margin-top: 20px;">
    <h3>Message:</h3>
    <p style="white-space: pre-wrap;">${validatedData.message}</p>
  </div>
</div>
      `
    }

    console.log('Attempting to send email with config:', {
      toAddress: serverConfig.email.toAddress,
      fromAddress: serverConfig.email.fromAddress,
      hasApiKey: !!serverConfig.email.serviceApiKey
    })

    // Send email
    if (!serverConfig.email.serviceApiKey) {
      console.error('Cannot send email: SendGrid API key is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      )
    }

    try {
      console.log('SendGrid message configuration:', {
        to: msg.to,
        from: msg.from,
        subject: msg.subject
      })
      
      // Test SendGrid configuration
      const testResponse = await sgMail.send({
        to: 'erics1337@gmail.com',
        from: 'erics1337@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email to verify SendGrid configuration.'
      })
      console.log('Test email response:', testResponse)
      
      // Send actual email
      await sgMail.send(msg)
      console.log('Email sent successfully')
    } catch (emailError: any) {
      console.error('SendGrid error:', {
        message: emailError.message,
        response: emailError.response?.body,
        code: emailError.code,
        fullError: JSON.stringify(emailError, null, 2)
      })
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: emailError.message,
          code: emailError.code,
          responseBody: emailError.response?.body
        },
        { status: 500 }
      )
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

    // Type guard to check if error is an Error object
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to process contact form', details: error.message },
        { status: 500 }
      )
    }

    // Fallback for any other type of error
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: String(error) },
      { status: 500 }
    )
  }
}
