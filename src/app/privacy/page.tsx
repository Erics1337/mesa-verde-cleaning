import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
              <p>
                Mesa Verde Cleaning LLC ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your information when 
                you use our house cleaning services or interact with our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
              <p className="mb-3">We collect information that you provide to us directly, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact information (name, email address, phone number, home address)</li>
                <li>Service preferences and cleaning requirements</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Communications with us regarding our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our cleaning services</li>
                <li>Communicate with you about appointments and services</li>
                <li>Process payments</li>
                <li>Send service updates and promotional offers (with your consent)</li>
                <li>Maintain the security and safety of our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Information Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. 
                Our cleaning professionals are trained in confidentiality and privacy practices. 
                We never share or sell your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request corrections to your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
              <p>
                If you have questions about our Privacy Policy or how we handle your information, 
                please contact us at:
              </p>
              <div className="mt-3">
                <p>Mesa Verde Cleaning LLC</p>
                <p>Jaguar Road, Santa Fe</p>
                <p>Email: contact@mesaverdecleaning.com</p>
                <p>Phone: (970)903-4279</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The latest version will be 
                posted on our website with the effective date.
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
