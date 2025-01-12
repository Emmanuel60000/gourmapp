// Ce code permet de récupérer les restaurants proches d'une position géographique en utilisant l'API, 
// ainsi que d'afficher les restaurants par ville en récupérant leur information depuis une API.

export interface Restaurant {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  cuisine: string;
  address: string;
  photo: string | null;
  phone: string | null; // Ajout du numéro de téléphone
}

export async function getNearbyRestaurants(lat: number, lng: number, radius: number = 10000): Promise<Restaurant[]> {
  // Je crée l'URL de l'API en passant la latitude, la longitude et le rayon de recherche.
  const url = `/api/nearby-restaurants?lat=${lat}&lng=${lng}&radius=${radius}`;
  
  try {
    // Je fais une requête fetch pour récupérer les données des restaurants à proximité.
    const response = await fetch(url);
    const data = await response.json();

    // Je vérifie que la réponse de l'API est bien un tableau.
    if (!Array.isArray(data)) {
      throw new Error("La réponse de l'API n'est pas un tableau");
    }

    // Je transforme les données reçues et je retourne un tableau d'objets Restaurant.
    return data.map((restaurant: any) => ({
      id: restaurant.id,
      name: restaurant.name,
      lat: restaurant.lat,
      lng: restaurant.lng,
      rating: restaurant.rating,
      cuisine: restaurant.cuisine,
      address: restaurant.address,
      photo: restaurant.photo,
      phone: restaurant.phone || null, // Je m'assure que le numéro de téléphone est inclus, même s'il est null.
    })) as Restaurant[];
  } catch (error) {
    // En cas d'erreur, je l'affiche dans la console.
    console.error("Erreur lors de la récupération des restaurants :", error);
    throw error;
  }
}

