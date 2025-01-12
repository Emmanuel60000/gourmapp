import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'

// Hook personnalisé pour gérer la carte Leaflet
export function useMap(center: [number, number], zoom: number) {
  // État pour stocker l'instance de la carte Leaflet
  const [map, setMap] = useState<L.Map | null>(null)

  // Référence pour éviter de recréer plusieurs instances de la carte
  const mapRef = useRef<L.Map | null>(null)

  // Référence pour le conteneur HTML de la carte
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  // Effet qui s'exécute au montage et lorsqu'il y a des changements dans `center` ou `zoom`
  useEffect(() => {
    // Vérifie si le conteneur existe et si aucune carte n'a déjà été créée
    if (mapContainerRef.current && !mapRef.current) {
      // Crée une nouvelle instance de la carte Leaflet
      mapRef.current = L.map(mapContainerRef.current).setView(center, zoom)

      // Met à jour l'état avec l'instance de la carte
      setMap(mapRef.current)

      // Ajoute les tuiles OpenStreetMap à la carte
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)
    }
  }, [center, zoom])  // L'effet dépend des variables `center` et `zoom`

  // Retourne l'instance de la carte et la référence du conteneur HTML
  return { map, mapContainerRef }
}


