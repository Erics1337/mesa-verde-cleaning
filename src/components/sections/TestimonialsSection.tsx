'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiStar, FiChevronLeft, FiChevronRight, FiPause, FiPlay } from 'react-icons/fi'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const testimonials = [
  {
    id: 1,
    name: 'Mark and Jody ~ Harmony Barn',
    role: 'Homeowners',
    image: '/images/testimonials/markjody.png',
    content: "Keen attention to detail, thoughtful care of every surface, and that special touch you only get from those who clearly enjoy what they do and who set high standards for their own work. Highly recommended!",
    rating: 5,
    service: 'AirBnB Cleaning',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Owner',
    image: '/images/testimonials/michael.jpg.svg',
    content: 'As a business owner, having a clean office is crucial. Mesa Verde Cleaning consistently delivers exceptional results. Their attention to detail and reliability is outstanding.',
    rating: 5,
    service: 'Office Cleaning',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Real Estate Agent',
    image: '/images/testimonials/emily.jpg.svg',
    content: 'I regularly recommend Mesa Verde Cleaning to my clients for move-in/move-out cleaning. They transform properties and make them show-ready. Their work is simply exceptional.',
    rating: 5,
    service: 'Move In/Out Cleaning',
  },
]

const SLIDE_DURATION = 5000 // 5 seconds per slide
const ANIMATION_DURATION = 500 // 500ms for animations

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
  })

  const nextTestimonial = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }, [isAnimating])

  const prevTestimonial = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }, [isAnimating])

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, ANIMATION_DURATION)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  useEffect(() => {
    if (isPaused || !isVisible) return

    const timer = setInterval(() => {
      nextTestimonial()
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [isPaused, isVisible, nextTestimonial])

  const TestimonialContent = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="h-full flex flex-col">
      <div className="flex items-start space-x-4 mb-4 flex-shrink-0">
        <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {testimonial.name}
          </h3>
          <p className="text-gray-600 truncate">{testimonial.role}</p>
          <div className="flex items-center mt-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <p className="text-gray-600 mb-2 line-clamp-4">{testimonial.content}</p>
        <p className="text-sm text-gray-500">{testimonial.service}</p>
      </div>
    </div>
  )

  return (
    <section
      id="testimonials"
      ref={elementRef}
      className="py-12 sm:py-16 lg:py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        <div 
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div 
            className="relative max-w-3xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-opacity z-10"
            >
              <FiChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="relative h-[300px] overflow-hidden bg-white rounded-2xl shadow-xl">
              <div 
                className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0"
                  >
                    <div className="h-[300px] p-6">
                      <TestimonialContent testimonial={testimonial} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-opacity z-10"
            >
              <FiChevronRight className="w-6 h-6 text-gray-600" />
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="absolute bottom-4 right-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 focus:outline-none transition-opacity"
            >
              {isPaused ? (
                <FiPlay className="w-4 h-4 text-gray-600" />
              ) : (
                <FiPause className="w-4 h-4 text-gray-600" />
              )}
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating || index === currentIndex) return
                    setIsAnimating(true)
                    setCurrentIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-primary-600 w-4'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
