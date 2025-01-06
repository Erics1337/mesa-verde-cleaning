'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import MobileMenu from './MobileMenu'
import ContactModal from '../modals/ContactModal'
import { useScrollToSection } from '@/hooks/useScrollToSection'

const services = [
  {
    name: 'Regular Cleaning',
    description: 'Scheduled maintenance cleaning for your home',
    href: '#services'
  },
  {
    name: 'Deep Cleaning',
    description: 'Thorough cleaning for those special occasions',
    href: '#services'
  },
  {
    name: 'Airbnb & Vacation Rentals',
    description: 'Specialized cleaning for your rental property',
    href: '#services'
  },
  {
    name: 'Move In/Out',
    description: 'Comprehensive cleaning for property transitions',
    href: '#services'
  }
]

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Airbnb', href: '#airbnb' },
  { name: 'Contact', href: '#contact' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const scrollToSection = useScrollToSection()

  const toggleMenu = () => {
    console.log('Toggling menu. Current state:', isOpen)
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:w-[300px]">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
              <Image
                src="/images/mvc-logo-01.svg"
                alt="Mesa Verde Cleaning Logo"
                width={100}
                height={100}
                className="h-16 w-auto"
              />
              <span className="ml-3 text-xl font-bold text-primary-600 whitespace-nowrap">
                Mesa Verde Cleaning
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 items-center justify-center flex-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:justify-end lg:w-[200px]">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Get a Quote
            </button>
          </div>
        </nav>
        <MobileMenu
          open={isOpen}
          setOpen={setIsOpen}
          services={services}
          onGetQuote={() => setIsContactModalOpen(true)}
          navigation={navigation}
          scrollToSection={scrollToSection}
        />
      </header>

      <ContactModal
        open={isContactModalOpen}
        setOpen={setIsContactModalOpen}
      />
    </>
  )
}
