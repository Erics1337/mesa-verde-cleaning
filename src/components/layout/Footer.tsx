import Link from 'next/link'
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiInstagram } from 'react-icons/fi'

const serviceAreas = [
  'Mesa Verde',
  'Surrounding Areas',
  // Add more service areas
]

const services = [
  'Regular Cleaning',
  'Deep Cleaning',
  'Move In/Out Cleaning',
  'Office Cleaning',
  'Post-Construction Cleaning',
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Mesa Verde Cleaning</h3>
            <div className="space-y-3">
              <p className="flex items-center">
                <FiMapPin className="mr-2" />
                Mesa Verde, CO
              </p>
              <p className="flex items-center">
                <FiPhone className="mr-2" />
                <Link href="tel:+1234567890" className="hover:text-white">
                  (123) 456-7890
                </Link>
              </p>
              <p className="flex items-center">
                <FiMail className="mr-2" />
                <Link href="mailto:contact@mesaverdecleaning.com" className="hover:text-white">
                  contact@mesaverdecleaning.com
                </Link>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link href="#services" className="hover:text-white">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area}>
                  <Link href="#contact" className="hover:text-white">
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <Link href="https://facebook.com" className="hover:text-white">
                <FiFacebook size={24} />
              </Link>
              <Link href="https://instagram.com" className="hover:text-white">
                <FiInstagram size={24} />
              </Link>
            </div>
            <div className="space-y-2 text-sm">
              <p>Licensed & Insured</p>
              <p>Eco-Friendly Products</p>
              <p>100% Satisfaction Guaranteed</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>© {currentYear} Mesa Verde Cleaning. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
