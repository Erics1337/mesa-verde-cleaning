'use client'

import { useState } from 'react'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    image: '/images/testimonials/sarah.jpg',
    content: "Mesa Verde Cleaning has been cleaning my home for over a year now, and I couldn't be happier with their service. The team is professional, thorough, and always goes above and beyond.",
    rating: 5,
    service: 'Regular Home Cleaning',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Owner',
    image: '/images/testimonials/michael.jpg',
    content: 'As a business owner, having a clean office is crucial. Mesa Verde Cleaning consistently delivers exceptional results. Their attention to detail and reliability is outstanding.',
    rating: 5,
    service: 'Office Cleaning',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Real Estate Agent',
    image: '/images/testimonials/emily.jpg',
    content: 'I regularly recommend Mesa Verde Cleaning to my clients for move-in/move-out cleaning. They transform properties and make them show-ready. Their work is simply exceptional.',
    rating: 5,
    service: 'Move In/Out Cleaning',
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 focus:outline-none"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                <div className="flex items-center mt-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">
              {testimonials[currentIndex].content}
            </p>

            <p className="text-sm text-gray-500">
              Service: {testimonials[currentIndex].service}
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 focus:outline-none"
          >
            <FiChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
