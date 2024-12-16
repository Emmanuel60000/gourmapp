import { NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const radius = searchParams.get('radius') || '10000';
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!GOOGLE_MAPS_API_KEY) {
    return NextResponse.json(
      { error: 'Google Maps API key is not configured.' },
      { status: 500 }
    );
  }

  let latitude = lat;
  let longitude = lng;

  try {
    // Étape 1 : Si "city" est fourni, géocodez pour obtenir les coordonnées GPS
    if (city) {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${GOOGLE_MAPS_API_KEY}`;
      const geocodeResponse = await fetch(geocodeUrl);
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.status !== 'OK' || !geocodeData.results.length) {
        throw new Error(`Erreur Geocoding : ${geocodeData.error_message || 'Aucun résultat'}`);
      }

      latitude = geocodeData.results[0].geometry.location.lat.toString();
      longitude = geocodeData.results[0].geometry.location.lng.toString();
    }

    // Étape 2 : Vérifiez que les coordonnées existent
    if (!latitude || !longitude) {
      throw new Error('Latitude et longitude sont requises.');
    }

    // Étape 3 : Recherche des restaurants via Places API
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`;
    const placesResponse = await fetch(placesUrl);
    const placesData = await placesResponse.json();

    if (placesData.status !== 'OK') {
      throw new Error(`Erreur Places API : ${placesData.error_message || 'Erreur inconnue'}`);
    }

    // Étape 4 : Transformation des résultats pour le frontend
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

    return NextResponse.json(restaurants);
  } catch (error: any) {
    console.error('Erreur lors de la récupération des restaurants :', error);
    return NextResponse.json(
      { error: error.message || 'Erreur inconnue.' },
      { status: 500 }
    );
  }
}
