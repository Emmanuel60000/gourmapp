'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/Services/placeServices'; // Assurez-vous que l'interface Restaurant est définie.

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/nearby-restaurants?city=${encodeURIComponent(city)}`);
      console.log('Réponse brut API backend:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur renvoyée par le backend:', errorData);
        throw new Error(errorData.error || 'Erreur inconnue');
      }

      const data = await response.json();
      console.log('Données reçues:', data);

      if (!Array.isArray(data)) {
        throw new Error("La réponse de l'API n'est pas valide.");
      }

      setRestaurants(data);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des restaurants :', err.message);
      setError(err.message || 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchRestaurants(searchTerm);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Formulaire de recherche */}
      <form onSubmit={handleSearch} className="space-y-6 bg-white p-6 rounded-xl shadow-lg mb-6">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Rechercher une ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Search className="mr-2 h-4 w-4" /> Rechercher
          </Button>
        </div>
      </form>

      {/* Résultats de la recherche */}
      <div className="space-y-6 pb-20">
        <h2 className="text-2xl font-bold text-orange-800">Résultats de la recherche</h2>

        {isLoading ? (
          <p>Chargement des restaurants...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                <img
                  src={restaurant.photo || 'https://via.placeholder.com/400x200?text=Image+non+disponible'}
                  alt={`Image de ${restaurant.name}`}
                  className="w-full h-40 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="text-gray-600">{restaurant.cuisine}</p>
                <p className="mt-2 text-sm text-gray-500 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {restaurant.address}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucun restaurant trouvé pour cette ville.</p>
        )}
      </div>
    </div>
  );
}
