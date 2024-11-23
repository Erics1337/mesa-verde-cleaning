'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initGA, pageview } from '@/utils/analytics'

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    initGA()
  }, [])

  useEffect(() => {
    pageview(pathname)
  }, [pathname])

  return <>{children}</>
}
