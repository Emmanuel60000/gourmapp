'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/Services/placeServices'; 

/**
 * Composant de recherche permettant de trouver des restaurants par ville.
 * L'utilisateur peut entrer le nom d'une ville et obtenir une liste de restaurants proches de cette localisation.
 */
export default function SearchComponent() {
  // État pour suivre le terme de recherche saisi par l'utilisateur
  const [searchTerm, setSearchTerm] = useState('');
  // État pour stocker les restaurants récupérés depuis l'API
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  // État pour indiquer si les données sont en cours de chargement
  const [isLoading, setIsLoading] = useState(false);
  // État pour gérer les erreurs
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les restaurants à partir de l'API backend
  const fetchRestaurants = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Envoi de la requête au backend avec le nom de la ville
      const response = await fetch(`/api/nearby-restaurants?city=${encodeURIComponent(city)}`);
      console.log('Réponse brut API backend:', response);

      if (!response.ok) {
        // Gestion des erreurs si la réponse n'est pas valide
        const errorData = await response.json();
        console.error('Erreur renvoyée par le backend:', errorData);
        throw new Error(errorData.error || 'Erreur inconnue');
      }

      // Traitement des données reçues
      const data = await response.json();
      console.log('Données reçues:', data);

      if (!Array.isArray(data)) {
        throw new Error("La réponse de l'API n'est pas valide.");
      }

      setRestaurants(data);
    } catch (err: any) {
      // Gestion des erreurs pendant la récupération des données
      console.error('Erreur lors de la récupération des restaurants :', err.message);
      setError(err.message || 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction déclenchée lors de la soumission du formulaire
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
          <Button type="submit" className="bg-customHighlight text-white">
            <Search className="mr-2 h-4 w-4" /> Rechercher
          </Button>
        </div>
      </form>
  
      {/* Résultats de la recherche */}
      <div className="space-y-6 pb-20">
        <h2 className="text-2xl font-bold text-customError font-inknut">Résultats de la recherche</h2>
  
        {isLoading ? (
          <p>Chargement des restaurants...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md transform transition-all duration-500 hover:shadow-lg hover:scale-105 opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }} // Délai progressif pour chaque carte
              >
                <img
                  src={
                    restaurant.photo || 'https://via.placeholder.com/400x200?text=Image+non+disponible'
                  }
                  alt={`Image de ${restaurant.name}`}
                  className="w-full h-40 object-cover rounded-t-lg transition-transform duration-500 hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                  <p className="mt-2 text-sm text-gray-500 flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-orange-500" />
                    {restaurant.address}
                  </p>
                </div>
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
