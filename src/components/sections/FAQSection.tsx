'use client'

import { useState } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const faqs = [
  {
    question: 'How do I schedule a cleaning?',
    answer: "You can schedule a cleaning by filling out our contact form or calling us directly. We'll respond within 24 hours to confirm your appointment.",
    category: 'Booking',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We require 24 hours notice for cancellations. Late cancellations may be subject to a fee.',
    category: 'Booking',
  },
  {
    question: 'What is included in a regular cleaning?',
    answer: 'Our regular cleaning includes dusting, vacuuming, bathroom cleaning, kitchen cleaning, and floor care. We can customize the service based on your specific needs.',
    category: 'Services',
  },
  {
    question: 'Do you provide cleaning supplies?',
    answer: 'Yes, we bring all necessary cleaning supplies and equipment. We use eco-friendly products that are safe for your family and pets.',
    category: 'Services',
  },
  {
    question: 'How do you determine pricing?',
    answer: 'Our pricing is based on factors including home size, service type, and cleaning frequency. Contact us for a detailed quote tailored to your needs.',
    category: 'Pricing',
  },
  {
    question: 'Do you offer package deals?',
    answer: 'Yes, we offer discounted rates for regular recurring services. Ask about our monthly and bi-monthly service packages.',
    category: 'Pricing',
  },
  {
    question: 'Are you insured?',
    answer: 'Yes, we are fully licensed and insured with comprehensive coverage for your peace of mind.',
    category: 'Business',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We primarily serve Mancos and surrounding areas including Cortez, Dolores, and the Mesa Verde National Park area.',
    category: 'Business',
  },
]

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
  })

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category))).sort()]
  
  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory)

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    setOpenIndex(null)
  }

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      ref={elementRef}
      className="py-12 sm:py-16 lg:py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have questions? We're here to help.
          </p>
        </div>

        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-wrap justify-center gap-2 mb-12 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left focus:outline-none"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {faq.question}
                      </h3>
                      <span className="ml-6 flex-shrink-0">
                        {openIndex === index ? (
                          <FiMinus className="h-5 w-5 text-blue-500" />
                        ) : (
                          <FiPlus className="h-5 w-5 text-blue-500" />
                        )}
                      </span>
                    </div>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                      openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
