'use client'

import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function LogoShowcaseSection() {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
  })

  return (
    <section ref={elementRef} className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Grid container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Text content */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Local Cleaning Experts
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Mesa Verde Cleaning brings professional, reliable, and eco-conscious cleaning services to Southwest Colorado. Our commitment to excellence shows in every home we clean.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">Professional & Reliable Service</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">Locally Owned & Operated</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">Eco-Conscious Cleaning</span>
                </div>
              </div>
            </div>

            {/* Logo showcase */}
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[120%] h-[120%] rotate-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-full opacity-50 blur-3xl" />
              </div>
              
              {/* Logo container */}
              <div className="relative aspect-square">
                <div className="absolute inset-0 flex items-center justify-center animate-float">
                  <Image
                    src="/images/mvc-logo-01.svg"
                    alt="Mesa Verde Cleaning Logo"
                    width={600}
                    height={600}
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
