import { useState, useEffect } from 'react'

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  error: string | null
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, error: "La géolocalisation n'est pas supportée par votre navigateur" }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        })
      },
      (error) => {
        setState(prev => ({ ...prev, error: error.message }))
      }
    )
  }, [])

  return state
}