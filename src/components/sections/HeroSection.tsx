import Image from 'next/image'
import HeroContent from './HeroContent'
import ScrollIndicator from './ScrollIndicator'

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cleaning.jpg"
          alt="Professional cleaning service in action"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <HeroContent />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  )
}
