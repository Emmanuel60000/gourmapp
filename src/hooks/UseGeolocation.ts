// Ce hook personnalisé `useGeolocation` permet d'obtenir la position géographique actuelle de l'utilisateur.
// Il renvoie la latitude, la longitude et une éventuelle erreur en cas d'échec de la géolocalisation.

import { useState, useEffect } from 'react'

// Définition de l'interface représentant l'état de la géolocalisation
interface GeolocationState {
  latitude: number | null   // Latitude de la position actuelle
  longitude: number | null  // Longitude de la position actuelle
  error: string | null      // Message d'erreur si la géolocalisation échoue
}

// Hook personnalisé pour gérer la géolocalisation
export function useGeolocation() {
  // Création de l'état initial avec des valeurs nulles pour la latitude, la longitude et l'erreur
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null
  })

  // Utilisation de l'effet pour déclencher la géolocalisation au montage du composant
  useEffect(() => {
    // Vérification si le navigateur prend en charge la géolocalisation
    if (!navigator.geolocation) {
      // Mise à jour de l'état avec un message d'erreur si la géolocalisation n'est pas supportée
      setState(prev => ({
        ...prev,
        error: "La géolocalisation n'est pas supportée par votre navigateur"
      }))
      return  // Arrêt de la fonction si la géolocalisation n'est pas disponible
    }

    // Si la géolocalisation est disponible, demande la position actuelle de l'utilisateur
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Mise à jour de l'état avec la latitude et la longitude récupérées
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null  // Pas d'erreur
        })
      },
      (error) => {
        // Gestion des erreurs si la géolocalisation échoue
        setState(prev => ({
          ...prev,
          error: error.message  // Mise à jour de l'erreur avec le message du navigateur
        }))
      }
    )
  }, [])  // Le tableau de dépendances vide signifie que l'effet ne s'exécutera qu'une seule fois (au montage)

  // Le hook retourne l'état actuel, contenant la latitude, la longitude et l'erreur éventuelle
  return state
}
