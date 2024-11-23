'use client'

import Link from 'next/link'

export default function HeroContent() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        Professional Home Cleaning Services in Mancos, Colorado
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-100">
        Local, trusted, and eco-conscious cleaning services. Bringing peace of mind to Mancos homes since 2021.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="#contact"
          className="btn-primary text-lg px-8 py-4"
        >
          Get Your Free Quote
        </Link>
        <Link
          href="#services"
          className="btn bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4"
        >
          Book Your Cleaning
        </Link>
      </div>
    </div>
  )
}
