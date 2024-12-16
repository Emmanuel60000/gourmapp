'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const DynamicRestaurantMap = dynamic(() => import('./RestaurantMap'), {
  loading: () => <p>Chargement de la carte...</p>,
  ssr: false
})

export default function DynamicMap() {
  return (
    <Suspense fallback={<p>Chargement de la carte...</p>}>
      <DynamicRestaurantMap />
    </Suspense>
  )
}

