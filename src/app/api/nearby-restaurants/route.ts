// Ce code permet de géolocaliser l'utilisateur ou de rechercher une ville spécifique pour trouver des restaurants à proximité via l'API Google Maps.

import { NextResponse } from 'next/server';

// Je récupère la clé d'API Google Maps depuis les variables d'environnement
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Voici la fonction principale qui gère les requêtes GET
export async function GET(request: Request) {
  // J'extrais les paramètres de recherche de l'URL
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city'); // Si une ville est spécifiée, je la récupère ici
  const radius = searchParams.get('radius') || '10000'; // Par défaut, je fixe le rayon de recherche à 10 km
  const lat = searchParams.get('lat'); // Latitude transmise par le frontend
  const lng = searchParams.get('lng'); // Longitude transmise par le frontend

  // Je vérifie que la clé d'API Google Maps est bien configurée
  if (!GOOGLE_MAPS_API_KEY) {
    return NextResponse.json(
      { error: 'Google Maps API key is not configured.' },
      { status: 500 }
    );
  }

  let latitude = lat;
  let longitude = lng;

  try {
    // Étape 1 : Si un nom de ville est fourni, je fais un géocodage pour obtenir ses coordonnées GPS
    if (city) {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${GOOGLE_MAPS_API_KEY}`;
      const geocodeResponse = await fetch(geocodeUrl);
      const geocodeData = await geocodeResponse.json();

      // Je vérifie que le géocodage a réussi et que des résultats sont disponibles
      if (geocodeData.status !== 'OK' || !geocodeData.results.length) {
        throw new Error(`Erreur Geocoding : ${geocodeData.error_message || 'Aucun résultat'}`);
      }

      // Je récupère les coordonnées GPS de la ville
      latitude = geocodeData.results[0].geometry.location.lat.toString();
      longitude = geocodeData.results[0].geometry.location.lng.toString();
    }

    // Étape 2 : Je vérifie que les coordonnées (latitude et longitude) sont bien définies
    if (!latitude || !longitude) {
      throw new Error('Latitude et longitude sont requises.');
    }

    // Étape 3 : Je fais une recherche des restaurants à proximité en utilisant l'API Places de Google
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`;
    const placesResponse = await fetch(placesUrl);
    const placesData = await placesResponse.json();

    // Je vérifie que la requête Places a réussi
    if (placesData.status !== 'OK') {
      throw new Error(`Erreur Places API : ${placesData.error_message || 'Erreur inconnue'}`);
    }

    // Étape 4 : Je transforme les résultats obtenus pour les rendre plus faciles à exploiter dans le frontend
    const restaurants = placesData.results.map((place: any) => ({
      id: place.place_id,
      name: place.name || "Nom non disponible",
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      rating: place.rating || 0,
      address: place.vicinity || "Adresse non disponible",
      photo: place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
        : null,
      cuisine: place.types ? place.types.join(", ") : "Type non spécifié",
    }));

    // Je retourne les restaurants trouvés au frontend
    return NextResponse.json(restaurants);
  } catch (error: any) {
    // En cas d'erreur, j'affiche un message dans la console et je renvoie une réponse d'erreur
    console.error('Erreur lors de la récupération des restaurants :', error);
    return NextResponse.json(
      { error: error.message || 'Erreur inconnue.' },
      { status: 500 }
    );
  }
}
