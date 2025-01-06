import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import AirbnbSection from '@/components/sections/AirbnbSection'
import LogoShowcaseSection from '@/components/sections/LogoShowcaseSection'
import ContactSection from '@/components/sections/ContactSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import ProductsSection from '@/components/sections/ProductsSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* <LogoShowcaseSection /> */}
      <AboutSection />
      <ServicesSection />
      <AirbnbSection />
      <ContactSection />
      <TestimonialsSection />
      <FAQSection />
      {/* <ProductsSection /> */}
    </main>
  )
}
