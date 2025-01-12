// Ce composant permet d'assurer que le rendu des enfants se fait uniquement côté client, après le montage du composant.

'use client'

import { useEffect, useState, ReactNode } from 'react'

// J'utilise ce composant pour éviter les erreurs liées au rendu côté serveur dans Next.js
export default function ClientOnly({ children }: { children: ReactNode }) {
  // Je crée un état pour vérifier si le composant a été monté
  const [hasMounted, setHasMounted] = useState(false)

  // Quand le composant est monté, je mets à jour l'état pour signaler que le rendu peut se faire
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Si le composant n'a pas encore été monté, je retourne null pour éviter le rendu côté serveur
  if (!hasMounted) {
    return null
  }

  // Une fois monté, je retourne les enfants pour qu'ils soient rendus correctement
  return <>{children}</>
}
