import { JsonLd } from 'react-schemaorg'
import type { LocalBusiness, Service } from 'schema-dts'
import { siteConfig } from '@/utils/config'

export default function SchemaOrg() {
  return (
    <>
      {/* Local Business Schema */}
      <JsonLd<LocalBusiness>
        item={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': siteConfig.url,
          name: siteConfig.name,
          image: siteConfig.image,
          description: 'Professional cleaning services in Mesa Verde, Colorado. We offer residential and commercial cleaning services including regular cleaning, deep cleaning, move-in/move-out cleaning, and more.',
          url: siteConfig.url,
          telephone: '(123) 456-7890',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Main Street',
            addressLocality: 'Mesa Verde',
            addressRegion: 'CO',
            postalCode: '81330',
            addressCountry: 'US'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 37.1836,
            longitude: -108.4868
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '18:00'
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Saturday'],
              opens: '09:00',
              closes: '16:00'
            }
          ],
          priceRange: '$$',
          areaServed: {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: 37.1836,
              longitude: -108.4868
            },
            geoRadius: '50000'
          },
          sameAs: [
            'https://facebook.com/mesaverdecleaning',
            'https://instagram.com/mesaverdecleaning',
            'https://twitter.com/mesaverdeclean'
          ]
        }}
      />

      {/* Cleaning Service Schema */}
      <JsonLd<Service>
        item={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Professional Cleaning Services',
          provider: {
            '@type': 'LocalBusiness',
            name: siteConfig.name
          },
          serviceType: 'Cleaning',
          areaServed: {
            '@type': 'City',
            name: 'Mesa Verde'
          },
          description: 'Professional cleaning services including regular home cleaning, deep cleaning, move in/out cleaning, office cleaning, and post-construction cleaning.',
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              minPrice: '100',
              maxPrice: '500'
            }
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Cleaning Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Regular Home Cleaning'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Deep Cleaning'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Move In/Out Cleaning'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Office Cleaning'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Post-Construction Cleaning'
                }
              }
            ]
          }
        }}
      />
    </>
  )
}
