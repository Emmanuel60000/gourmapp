// Ce fichier définit les variables d'environnement utilisées dans l'application.
// Il vérifie également que toutes les variables d'environnement requises sont correctement configurées.

// Exportation des variables d'environnement nécessaires à l'application
export const env = {
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY, // Clé API Google Maps
  NODE_ENV: process.env.NODE_ENV, // Environnement de l'application (développement, production, etc.)
};

// Vérification des variables d'environnement requises
// Si l'une des variables est absente, l'application renvoie une erreur et s'arrête.
Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`La variable d'environnement ${key} est manquante`);
  }
});


console.log("Clé API chargée depuis env.ts :", env.GOOGLE_MAPS_API_KEY);
