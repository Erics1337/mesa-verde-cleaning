'use client'

import { useState } from 'react'
import { FiHome, FiCalendar, FiStar, FiBox, FiArrowRight } from 'react-icons/fi'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Image from 'next/image'

const services = [
  {
    icon: <FiCalendar className="w-8 h-8" />,
    title: 'Regular Cleaning',
    description: 'Scheduled maintenance cleaning to keep your home pristine',
    features: [
      'Dusting and vacuuming all rooms',
      'Bathroom cleaning and sanitization',
      'Kitchen cleaning and countertop care',
      'Floor care and mopping',
      'Regular maintenance of living spaces',
    ],
    price: 'Contact for pricing',
    color: 'from-blue-500 to-blue-600',
    lightColor: 'bg-blue-50',
  },
  {
    icon: <FiStar className="w-8 h-8" />,
    title: 'Deep Cleaning',
    description: 'Comprehensive cleaning for those times when your home needs extra attention',
    features: [
      'All regular cleaning tasks',
      'Deep cleaning of baseboards and trim',
      'Inside cabinets and drawers',
      'Window sills and tracks',
      'Light fixtures and door frames',
    ],
    price: 'Based on home size',
    color: 'from-purple-500 to-purple-600',
    lightColor: 'bg-purple-50',
  },
  {
    icon: <FiHome className="w-8 h-8" />,
    title: 'Airbnb & Vacation Rentals',
    description: 'Specialized cleaning services for your short-term rental properties',
    features: [
      'Quick turnaround between guests',
      'Thorough sanitization of all spaces',
      'Fresh linens and towel service',
      'Restocking of amenities',
      'Detailed cleaning checklist',
    ],
    price: 'Contact for pricing',
    color: 'from-green-500 to-green-600',
    lightColor: 'bg-green-50',
  },
  {
    icon: <FiBox className="w-8 h-8" />,
    title: 'Move In/Out',
    description: 'Complete property preparation for moving transitions',
    features: [
      'Deep cleaning of all surfaces',
      'Inside all cabinets and appliances',
      'Window and track cleaning',
      'Baseboard and trim detailed cleaning',
      'Final inspection and touch-ups',
    ],
    price: 'Based on square footage',
    color: 'from-orange-500 to-orange-600',
    lightColor: 'bg-orange-50',
  },
]

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0)
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
  })

  const currentService = services[activeService]

  return (
    <section
      id="services"
      ref={elementRef}
      className="py-20 bg-gray-50 min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Our Cleaning Services
          </h2>
          <p className="text-lg text-gray-600">
            Professional cleaning services tailored to your needs. Select a service to learn more.
          </p>
        </div>

        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Services Side */}
            <div className="max-w-lg mx-auto lg:mx-0">
              {/* Service Navigation */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                {services.map((service, index) => (
                  <button
                    key={service.title}
                    onClick={() => setActiveService(index)}
                    className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                      activeService === index
                        ? `bg-gradient-to-r ${service.color} text-white shadow-lg scale-105`
                        : `${service.lightColor} text-gray-700 hover:scale-105`
                    }`}
                  >
                    <span className="mr-2">{service.icon}</span>
                    <span className="font-medium">{service.title}</span>
                  </button>
                ))}
              </div>

              {/* Service Content */}
              <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
                <div className="absolute inset-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentService.color} opacity-10`} />
                </div>
                
                <div className="relative p-6">
                  <div>
                    <div className={`inline-flex p-2 rounded-lg ${currentService.lightColor} mb-4`}>
                      {currentService.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentService.title}</h3>
                    <p className="text-gray-600 mb-4">{currentService.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {currentService.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <FiArrowRight className="w-4 h-4 mr-2 text-primary-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">{currentService.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Side */}
            <div className="hidden lg:block relative">
              {/* Background decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[120%] h-[120%] rotate-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-full opacity-50 blur-3xl" />
              </div>
              
              {/* Logo container */}
              <div className="relative aspect-square">
                <div className="absolute inset-0 flex items-center justify-center animate-float">
                  <Image
                    src="/images/sage.png"
                    alt="Sage Cleansing"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
