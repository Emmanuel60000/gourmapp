// Ce composant affiche une carte interactive des restaurants à proximité et permet à l'utilisateur d'activer la géolocalisation pour une recherche personnalisée.

'use client'

import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useMap } from '../hooks/useMap'
import { getNearbyRestaurants, Restaurant } from '../Services/placeServices'

export default function RestaurantMap() {
  // J'initialise la latitude et la longitude par défaut à Paris
  const [latitude, setLatitude] = useState<number | null>(48.8566)
  const [longitude, setLongitude] = useState<number | null>(2.3522)
  // J'utilise un état pour stocker la liste des restaurants trouvés
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  // Gestion des erreurs et du chargement
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Centre et zoom de la carte
  const center: [number, number] = latitude && longitude ? [latitude, longitude] : [48.8566, 2.3522]
  const zoom = 12
  const { map, mapContainerRef } = useMap(center, zoom)

  // Fonction pour activer la géolocalisation de l'utilisateur
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

  // Recherche des restaurants à proximité après le montage de la carte et l'obtention des coordonnées
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

  // Gestion des marqueurs sur la carte après chaque mise à jour des restaurants
  useEffect(() => {
    if (!map) return

    // Je supprime les marqueurs existants
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer)
      }
    })

    // J'ajoute les nouveaux marqueurs pour chaque restaurant
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

    // Je centre la carte sur la position de l'utilisateur
    if (latitude && longitude) {
      map.setView([latitude, longitude], zoom)
    }
  }, [map, restaurants, latitude, longitude, zoom])

  // Correction de l'icône par défaut de Leaflet
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    })
  }, [])

  // Rendu du composant
  return (
    <div className="flex flex-col space-y-4 min-h-screen ">
      {/* Section des images et informations */}
      <div className="w-full overflow-hidden px-4">
        <h2 className="text-3xl font-bold text-center text-customError mt-8 mb-16 font-inknut">
          Restaurants populaires près de chez vous
        </h2>

        {isLoading ? (
          <p>Chargement des données...</p>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : restaurants.length === 0 ? (
          <p>Aucun restaurant trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 6).map((restaurant, index) => (
              <div
                key={restaurant.id}
                className={`bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:scale-105 opacity-0 animate-fadeIn`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={restaurant.photo || ""}
                  alt={restaurant.name}
                  className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{restaurant.name}</h3>
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
        <h2 className="text-3xl font-bold text-customError mb-4 text-center font-inknut">
          Localiser vos envies
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Cliquez sur le bouton ci-dessous pour activer la géolocalisation et trouver les restaurants proches de votre emplacement.
        </p>
        <div className="text-center">
          <button
            onClick={handleGeolocation}
            className="px-6 py-2 bg-customHighlight text-white rounded-lg "
          >
            Activer la géolocalisation
          </button>
        </div>
      </div>

      {/* Section de la carte */}
      <div className="w-full h-[400px] sm:h-[500px] flex justify-center px-4">
        <div
          ref={mapContainerRef}
          className="h-full w-full sm:w-2/3 rounded-lg border bg-[#fef5e7] relative z-[10]"
        />
      </div>
    </div>
  );
}
