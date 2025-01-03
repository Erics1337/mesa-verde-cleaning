'use client'

import { FiHome, FiBox, FiTool, FiCalendar, FiStar, FiCheckCircle } from 'react-icons/fi'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const services = [
  {
    icon: <FiCalendar className="w-6 h-6" />,
    title: 'Regular Cleaning Services',
    description: 'Regular maintenance cleaning to keep your home pristine',
    features: [
      'Dusting and vacuuming',
      'Bathroom cleaning',
      'Kitchen cleaning',
      'Floor care',
      'Regular maintenance of living spaces',
    ],
    price: 'Contact for pricing',
    popular: true,
  },
  {
    icon: <FiStar className="w-6 h-6" />,
    title: 'Deep Cleaning Services',
    description: 'Comprehensive cleaning for those times when your home needs extra attention',
    features: [
      'All regular cleaning tasks',
      'Baseboards and trim',
      'Inside cabinets and drawers',
      'Window sills and tracks',
      'Light fixtures and door frames',
    ],
    price: 'Based on home size',
    popular: false,
  },
  {
    icon: <FiBox className="w-6 h-6" />,
    title: 'Move In/Out Cleaning',
    description: 'Complete property preparation for moving transitions',
    features: [
      'Complete property preparation',
      'Detail cleaning of all surfaces',
      'Special attention to high-traffic areas',
      'Final inspection and touch-ups',
      'Move-ready guarantee',
    ],
    price: 'Based on square footage',
    popular: false,
  },
]

export default function ServicesSection() {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
  })

  return (
    <section
      id="services"
      ref={elementRef}
      className="py-12 sm:py-16 lg:py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Our Cleaning Services
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Professional cleaning services tailored to your Mancos home
          </p>
        </div>

        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`relative bg-white rounded-2xl shadow-lg p-8 animate-fade-in ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 px-4 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    {service.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    {service.price}
                  </div>
                  <a
                    href="#contact"
                    className="block w-full py-3 px-4 text-center text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition duration-150"
                  >
                    Get a Free Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
