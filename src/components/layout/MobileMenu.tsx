import { FiX } from 'react-icons/fi'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'

interface MobileMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
  services: Array<{
    name: string
    description: string
    href: string
  }>
  onGetQuote: () => void
  navigation: Array<{
    name: string
    href: string
  }>
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export default function MobileMenu({
  open,
  setOpen,
  services,
  onGetQuote,
  navigation,
  scrollToSection,
}: MobileMenuProps) {
  useEffect(() => {
    console.log('MobileMenu open state:', open)
  }, [open])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog 
        as="div" 
        className="fixed inset-0 z-50 lg:hidden" 
        onClose={() => setOpen(false)}
      >
        <div className="fixed inset-0 z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Menu
                </Dialog.Title>
                <button
                  type="button"
                  className="rounded-md p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <FiX className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 px-4 pb-6">
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md"
                      onClick={(e) => {
                        scrollToSection(e, item.href)
                        setOpen(false)
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>

                <div className="mt-8">
                  <button
                    type="button"
                    className="w-full rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
                    onClick={() => {
                      onGetQuote()
                      setOpen(false)
                    }}
                  >
                    Get a Quote
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
