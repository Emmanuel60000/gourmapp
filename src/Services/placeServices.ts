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
  const url = `/api/nearby-restaurants?lat=${lat}&lng=${lng}&radius=${radius}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("La réponse de l'API n'est pas un tableau");
    }

    return data.map((restaurant: any) => ({
      id: restaurant.id,
      name: restaurant.name,
      lat: restaurant.lat,
      lng: restaurant.lng,
      rating: restaurant.rating,
      cuisine: restaurant.cuisine,
      address: restaurant.address,
      photo: restaurant.photo,
      phone: restaurant.phone || null, // Assure l'inclusion du numéro
    })) as Restaurant[];
  } catch (error) {
    console.error("Erreur lors de la récupération des restaurants :", error);
    throw error;
  }
}
