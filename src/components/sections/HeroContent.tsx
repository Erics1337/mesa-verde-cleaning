import Link from 'next/link'
import Image from 'next/image'

export default function HeroContent() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        <div className="text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Professional Home Cleaning Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow">
            Local, trusted, and eco-conscious cleaning services in Santa Fe, New Mexico. Bringing peace of mind to homes since 2021.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-shadow"
            >
              Get Your Free Quote
            </Link>
            <Link
              href="#services"
              className="btn bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-shadow"
            >
              Book Your Cleaning
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
