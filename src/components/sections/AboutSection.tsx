import Image from 'next/image'
import { FiCheck, FiAward, FiShield, FiClock, FiHome } from 'react-icons/fi'

const features = [
  {
    icon: <FiHome className="w-5 h-5 text-green-500" />,
    title: 'Local Woman-Owned Business',
    description: 'Founded and operated by a local Mancos mother, we understand the unique needs of our community.',
  },
  {
    icon: <FiClock className="w-5 h-5 text-blue-500" />,
    title: 'Professional Experience',
    description: 'Over 3 years of professional cleaning experience with a strong reputation for reliability and quality.',
  },
  {
    icon: <FiShield className="w-5 h-5 text-indigo-500" />,
    title: 'Licensed & Insured',
    description: "Full insurance coverage and LLC status for your complete peace of mind.",
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="relative animate-fade-in">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <Image
                src="/images/about-cleaning.jpg"
                alt="Professional home cleaning service in Mancos"
                width={800}
                height={600}
                className="object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-6">
              <div className="text-center">
                <span className="block text-3xl font-bold text-blue-600">3+</span>
                <span className="block text-gray-600">Years of Service</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mt-10 lg:mt-0 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Your Trusted Local Cleaning Service in Mancos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Mesa Verde Cleaning brings professional, reliable cleaning services to Mancos and surrounding areas. 
              As a local, woman-owned business, we understand the unique needs of our community.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              We take pride in our commitment to using eco-friendly cleaning products and methods, 
              ensuring your home is not only clean but also safe for your family and the environment. 
              Our personalized service approach and strong local references reflect our dedication to 
              excellence and customer satisfaction.
            </p>

            <div className="mt-10 space-y-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-600">
                      {feature.description}
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
