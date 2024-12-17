'use client'

import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useMap } from '../hooks/useMap'
import { getNearbyRestaurants, Restaurant } from '../Services/placeServices'

export default function RestaurantMap() {
  const [latitude, setLatitude] = useState<number | null>(48.8566) // Latitude par défaut : Paris
  const [longitude, setLongitude] = useState<number | null>(2.3522) // Longitude par défaut : Paris
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const center: [number, number] = latitude && longitude ? [latitude, longitude] : [48.8566, 2.3522]
  const zoom = 12
  const { map, mapContainerRef } = useMap(center, zoom)

  // Fonction pour activer la géolocalisation
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n’est pas prise en charge par votre navigateur.')
      return
    }

    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setError(null) // Réinitialise l'erreur
        setIsLoading(false)
      },
      (err) => {
        setError(`Vous avez refusé la géolocalisation ou une erreur est survenue : ${err.message}`)
        setIsLoading(false)
      }
    )
  }

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
        setError(
          `Erreur lors de la récupération des restaurants: ${
            err instanceof Error ? err.message : 'Erreur inconnue'
          }`
        )
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
        .bindPopup(
          `<div>
            <h3 class="text-lg font-semibold">${restaurant.name}</h3>
            <p class="text-sm text-gray-600">${restaurant.cuisine}</p>
            <p class="text-sm">Note : ${restaurant.rating}/5</p>
          </div>`
        )
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

  return (
    <div className="flex flex-col space-y-4 min-h-screen bg-[#fef5e7]">

      {/* Section des images et informations */}
      <div className="w-full overflow-hidden px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Les restaurants populaires
        </h2>

        {isLoading ? (
          <p>Chargement des données...</p>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : restaurants.length === 0 ? (
          <p>Aucun restaurant trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.slice(0, 6).map((restaurant) => (
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

      {/* Bouton de géolocalisation */}
      <div className="px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Localisateur de Restaurants
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Cliquez sur le bouton ci-dessous pour activer la géolocalisation et trouver les restaurants proches de votre emplacement.
        </p>
        <div className="text-center">
          <button
            onClick={handleGeolocation}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-red-500"
          >
            Activer la géolocalisation
          </button>
        </div>
      </div>
{/* Section de la carte */}
<div className="w-full h-[400px] flex justify-center px-4">
  <div
    ref={mapContainerRef}
    className="h-full w-2/3 rounded-lg border bg-[#fef5e7]"
  />
</div>

    </div>
  )
}
