export const env = {
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
};

// Vérification des variables d'environnement requises
Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`La variable d'environnement ${key} est manquante`);
  }
});

// Ajoutez ce log ici
console.log("Clé API chargée depuis env.ts :", env.GOOGLE_MAPS_API_KEY);

