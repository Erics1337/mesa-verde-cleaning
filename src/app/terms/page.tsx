import React from 'react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Agreement to Terms</h2>
              <p>
                By engaging Mesa Verde Cleaning LLC ("we," "our," or "us") for cleaning services, 
                you agree to these Terms of Service. Please read them carefully before scheduling 
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Services</h2>
              <p className="mb-3">Our cleaning services include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Regular house cleaning</li>
                <li>Deep cleaning</li>
                <li>Move in/out cleaning</li>
                <li>Custom cleaning services as agreed upon</li>
              </ul>
              <p className="mt-3">
                Specific services will be agreed upon prior to each cleaning appointment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Scheduling and Access</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You agree to provide safe and reasonable access to your property at the scheduled time</li>
                <li>24-hour notice is required for cancellations to avoid a cancellation fee</li>
                <li>We reserve the right to reschedule due to severe weather or other emergency conditions</li>
                <li>Regular cleaning schedules may be adjusted with advance notice from either party</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Payment Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment is due upon completion of services</li>
                <li>Accepted payment methods will be communicated prior to service</li>
                <li>Pricing may be adjusted with 30 days notice for regular clients</li>
                <li>Additional services requested during a cleaning visit may incur extra charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Property and Safety</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Please secure valuable items before our arrival</li>
                <li>Report any damage concerns within 24 hours of service</li>
                <li>Ensure all pets are secured during cleaning</li>
                <li>Inform us of any special handling requirements or delicate items</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Guarantee</h2>
              <p>
                We strive for 100% satisfaction with our services. If you're not completely satisfied, 
                please contact us within 24 hours of service completion, and we'll address your concerns 
                promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Liability</h2>
              <p>
                While we take great care in providing our services, Mesa Verde Cleaning LLC's liability 
                is limited to the cost of the cleaning service provided. We are not responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Pre-existing damage or wear</li>
                <li>Damage due to faulty or aged items</li>
                <li>Loss of items not properly secured</li>
                <li>Issues not reported within 24 hours of service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Refusal</h2>
              <p>
                We reserve the right to refuse service or terminate this agreement if working conditions 
                are unsafe, unsanitary, or if inappropriate behavior is directed toward our staff.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h2>
              <p>For questions about these terms, please contact us at:</p>
              <div className="mt-3">
                <p>Mesa Verde Cleaning LLC</p>
                <p>Mancos, Colorado</p>
                <p>Email: contact@mesaverdecleaning.com</p>
                <p>Phone: (970)903-4279</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to Terms</h2>
              <p>
                We may update these terms from time to time. Significant changes will be communicated 
                to regular clients, and the latest version will always be available on our website.
              </p>
            </section>

            <div className="mt-8 text-sm text-gray-500">
              Last updated: January 2, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
