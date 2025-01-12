// Cette fonction 'cn' permet de combiner les classes CSS dynamiquement en utilisant 'clsx' et 'tailwind-merge'.
// 'clsx' est utilisé pour conditionner l'ajout des classes CSS et 'tailwind-merge' sert à éviter les doublons de classes de Tailwind.

import { clsx, type ClassValue } from "clsx"  // J'importe 'clsx' pour gérer les classes conditionnelles et 'ClassValue' pour typer les entrées.
import { twMerge } from "tailwind-merge"     // J'importe 'twMerge' qui fusionne les classes Tailwind en évitant les conflits.

export function cn(...inputs: ClassValue[]) {
  // Je passe les classes reçues dans 'clsx' pour les conditionner et ensuite je les fusionne avec 'twMerge' pour éviter les doublons.
  return twMerge(clsx(inputs))
}
