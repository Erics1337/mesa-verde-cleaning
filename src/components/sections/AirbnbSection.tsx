'use client'

import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { FiCheckCircle } from 'react-icons/fi'

const benefits = [
  {
    title: 'Fast Turnaround Times',
    description: 'We ensure your property is ready for the next guest within hours, maximizing your rental availability'
  },
  {
    title: '5-Star Cleaning Standards',
    description: 'Our thorough cleaning protocols help maintain your high ratings and guest satisfaction'
  },
  {
    title: 'Property Care Expertise',
    description: 'We understand the unique needs of vacation rentals and treat your property with expert care'
  },
  {
    title: 'Flexible Scheduling',
    description: 'Easy booking around your guest calendar'
  }
]

export default function AirbnbSection() {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
  })

  return (
    <section
      ref={elementRef}
      className="py-16 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          {/* Image side */}
          <div className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/airbnb-cleaning.jpg"
                alt="Professional vacation rental cleaning"
                width={800}
                height={600}
                className="object-cover"
              />
            </div>
          </div>

          {/* Content side */}
          <div className={`mt-10 lg:mt-0 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
              Your Trusted Partner in Vacation Rental Success
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We specialize in maintaining the highest standards of cleanliness for Airbnb and vacation rental properties in Southwest Colorado. Our expert team understands what it takes to keep your property guest-ready and earning 5-star reviews.
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title}
                  className={`flex items-start transition-all duration-500`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex-shrink-0">
                    <FiCheckCircle className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
