// Ce composant permet de charger dynamiquement une carte des restaurants avec gestion du rendu côté client.

'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// J'importe dynamiquement le composant RestaurantMap pour qu'il soit chargé uniquement côté client.
const DynamicRestaurantMap = dynamic(() => import('./RestaurantMap'), {
  // Pendant le chargement, j'affiche un message d'attente personnalisé.
  loading: () => <p>Chargement de la carte...</p>,
  // J'indique que le rendu côté serveur (SSR) est désactivé pour ce composant.
  ssr: false
})

// Je crée un composant qui utilise le composant dynamique avec un fallback pendant le chargement.
export default function DynamicMap() {
  return (
    // J'utilise le composant Suspense pour gérer le rendu asynchrone et afficher un message d'attente si nécessaire.
    <Suspense fallback={<p>Chargement de la carte...</p>}>
      <DynamicRestaurantMap />
    </Suspense>
  )
}

