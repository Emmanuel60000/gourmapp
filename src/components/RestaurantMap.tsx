'use client'

import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useMap } from '../hooks/useMap'
import { useGeolocation } from '../hooks/UseGeolocation'
import { getNearbyRestaurants, Restaurant } from '../Services/placeServices'

export default function RestaurantMap() {
  const { latitude, longitude, error: geoError } = useGeolocation()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const center: [number, number] = latitude && longitude ? [latitude, longitude] : [48.8566, 2.3522]
  const zoom = 12
  const { map, mapContainerRef } = useMap(center, zoom)

  useEffect(() => {
    if (!map || !latitude || !longitude) return

    const fetchRestaurants = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const nearbyRestaurants = await getNearbyRestaurants(latitude, longitude)
        setRestaurants(nearbyRestaurants)
      } catch (err) {
        console.error('Erreur détaillée:', err)
        setError(`Erreur lors de la récupération des restaurants: ${err instanceof Error ? err.message : 'Erreur inconnue'}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRestaurants()
  }, [map, latitude, longitude])

  useEffect(() => {
    if (!map) return

    // Supprimer les marqueurs existants
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer)
      }
    })

    // Ajouter les nouveaux marqueurs
    restaurants.forEach((restaurant) => {
      L.marker([restaurant.lat, restaurant.lng])
        .addTo(map)
        .bindPopup(`
          <div>
            <h3 class="text-lg font-semibold">${restaurant.name}</h3>
            <p class="text-sm text-gray-600">${restaurant.cuisine}</p>
            <p class="text-sm">Note : ${restaurant.rating}/5</p>
          </div>
        `)
    })

    // Centrer la carte sur la position de l'utilisateur
    if (latitude && longitude) {
      map.setView([latitude, longitude], zoom)
    }
  }, [map, restaurants, latitude, longitude, zoom])

  useEffect(() => {
    // Correction de l'icône par défaut de Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    })
  }, [])

  if (geoError) {
    return <div className="text-red-500">Erreur de géolocalisation : {geoError}</div>
  }

  return (
    <div className="flex flex-col space-y-4 min-h-screen bg-[#fef5e7]">

      {/* Section des images et informations */}
      <div className="w-full overflow-hidden px-4">
        {/* Titre au-dessus des images */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Les restaurants populaires près de chez vous
        </h2>

        {isLoading ? (
          <p>Chargement des restaurants...</p>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : restaurants.length === 0 ? (
          <p>Aucun restaurant trouvé à proximité.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.slice(0, 3).map((restaurant) => (
              <div key={restaurant.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={restaurant.photo || ''}
                  alt={restaurant.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600">{restaurant.address}</p>
                  <p className="text-yellow-500 font-semibold mt-2">
                    Note : {restaurant.rating} / 5
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Titre principal au-dessus de la carte */}
      <div className="px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Localisateur de Restaurants
        </h2>
        <p className="text-gray-600 text-center mb-4">
          La carte ci-dessous affiche les restaurants à proximité de votre position actuelle. Veuillez autoriser la géolocalisation pour une expérience optimale.
        </p>
      </div>

      {/* Section de la carte */}
      <div className="w-full h-[350px] px-4">
        <div
          ref={mapContainerRef}
          className="h-full w-full rounded-lg border bg-[#fef5e7]"
        />
      </div>
    </div>
  )
}
