'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import Image from 'next/image'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { siteConfig } from '@/utils/config'
import { event, AnalyticsEventCategories, AnalyticsEventActions } from '@/utils/analytics'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9-+()]*$/, 'Invalid phone number')
    .required('Phone number is required'),
  service: yup.string().required('Please select a service'),
  propertyType: yup.string().required('Please select your property type'),
  squareFootage: yup.string().required('Please select approximate square footage'),
  cleaningFrequency: yup.string().required('Please select preferred frequency'),
  propertyUse: yup.array().of(yup.string()),
  message: yup.string().required('Message is required'),
  preferredContact: yup.string().required('Please select preferred contact method'),
}).required()

type FormData = yup.InferType<typeof schema>

const services = [
  'Regular Home Cleaning',
  'Deep Cleaning',
  'Move In/Out Cleaning',
  'Office Cleaning',
  'Post-Construction Cleaning',
  'Other',
]

const propertyTypes = [
  'Single Family Home',
  'Townhouse/Condo',
  'Vacation Rental',
  'Commercial Space',
]

const squareFootageRanges = [
  'Under 1,000 sq ft',
  '1,000 - 2,000 sq ft',
  '2,000 - 3,000 sq ft',
  '3,000 - 4,000 sq ft',
  'Over 4,000 sq ft',
]

const cleaningFrequencies = [
  'Weekly',
  'Bi-weekly',
  'Monthly',
  'One-time',
  'Custom Schedule',
]

const propertyUseOptions = [
  'Primary Residence',
  'Vacation Home',
  'Short-term Rental',
  'Long-term Rental',
]

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { executeRecaptcha } = useGoogleReCaptcha()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not initialized')
      }

      const recaptchaToken = await executeRecaptcha('contact_form')

      // Always use relative URL to avoid CSP issues
      const apiUrl = '/api/contact'

      console.log('Submitting to:', apiUrl)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Form submission error:', result)
        throw new Error(result.error || 'Failed to submit form')
      }

      event({
        action: AnalyticsEventActions.FORM_SUBMIT,
        category: AnalyticsEventCategories.CONTACT,
        label: 'Contact Form Submit Success'
      })

      setSubmitSuccess(true)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to submit form'
      )
      event({
        action: AnalyticsEventActions.FORM_ERROR,
        category: AnalyticsEventCategories.CONTACT,
        label: error instanceof Error ? error.message : 'Failed to submit form'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const { elementRef, isVisible } = useIntersectionObserver<HTMLFormElement>({
    threshold: 0.2,
    rootMargin: '-50px',
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      ref={elementRef}
      className={`space-y-6 transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.phone ? 'border-red-500' : ''
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Service */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Service Type
        </label>
        <select
          {...register('service')}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select a Service</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
        )}
      </div>

      {/* Property Type */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Property Type
        </label>
        <select
          {...register('propertyType')}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select Property Type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.propertyType && (
          <p className="mt-1 text-sm text-red-600">{errors.propertyType.message}</p>
        )}
      </div>

      {/* Square Footage */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Approximate Square Footage
        </label>
        <select
          {...register('squareFootage')}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select Square Footage</option>
          {squareFootageRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
        {errors.squareFootage && (
          <p className="mt-1 text-sm text-red-600">{errors.squareFootage.message}</p>
        )}
      </div>

      {/* Cleaning Frequency */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Preferred Cleaning Frequency
        </label>
        <select
          {...register('cleaningFrequency')}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select Frequency</option>
          {cleaningFrequencies.map((frequency) => (
            <option key={frequency} value={frequency}>
              {frequency}
            </option>
          ))}
        </select>
        {errors.cleaningFrequency && (
          <p className="mt-1 text-sm text-red-600">{errors.cleaningFrequency.message}</p>
        )}
      </div>

      {/* Property Use (Optional Checkboxes) */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Property Use (Optional)
        </label>
        <div className="space-y-2">
          {propertyUseOptions.map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="checkbox"
                {...register('propertyUse')}
                value={option}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-gray-700">{option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.message ? 'border-red-500' : ''
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Preferred Contact Method
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="contact-email"
              value="email"
              {...register('preferredContact')}
              className="focus:ring-blue-500 h-4 w-4 text-primary-600 border-gray-300"
            />
            <label htmlFor="contact-email" className="ml-2 text-sm text-gray-700">
              Email
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="contact-phone"
              value="phone"
              {...register('preferredContact')}
              className="focus:ring-blue-500 h-4 w-4 text-primary-600 border-gray-300"
            />
            <label htmlFor="contact-phone" className="ml-2 text-sm text-gray-700">
              Phone
            </label>
          </div>
        </div>
        {errors.preferredContact && (
          <p className="mt-1 text-sm text-red-600">
            {errors.preferredContact.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {/* Error Message */}
      {submitError && (
        <div
          className="rounded-md bg-red-50 p-4"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{submitError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {submitSuccess && (
        <div
          className="rounded-md bg-green-50 p-4"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Thank you! We'll get back to you soon.
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

export default function ContactSection() {
  'use client'
  const { elementRef, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '-50px',
  })

  return (
    <section
      id="contact"
      ref={elementRef}
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <Image
                  src="/images/mvc-logo-01.svg"
                  alt="Mesa Verde Cleaning Logo"
                  width={800}
                  height={600}
                  className="w-full h-auto mb-8"
                  priority
                />
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 mb-12">
                  Ready to experience the best cleaning service in Montezuma County? 
                  Contact us today for a free quote or to schedule your first cleaning.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiMapPin className="h-6 w-6 text-primary-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Location</h3>
                      <p className="text-gray-600">{siteConfig.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiPhone className="h-6 w-6 text-primary-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                      <p className="text-gray-600">{siteConfig.contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiMail className="h-6 w-6 text-primary-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">{siteConfig.contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiClock className="h-6 w-6 text-primary-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 8am - 6pm</p>
                      <p className="text-gray-600">Saturday: 9am - 4pm</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
