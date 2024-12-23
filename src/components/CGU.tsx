'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function CGUPage() {
  const [version, setVersion] = useState<'human' | 'legal'>('human')

  return (
    <div className="flex-grow py-12 px-4 ">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-orange-600 text-sm mb-2">Dernière mise à jour: Jan 2024</p>
          <h1 className="text-3xl font-bold mb-4">Conditions Générales d'Utilisation</h1>
          <p className="text-gray-600 mb-6">
            Nos CGU définissent les règles d'utilisation de notre plateforme. Veuillez les lire attentivement avant d'utiliser nos services.
          </p>
          <div className="inline-flex rounded-full bg-white shadow-sm p-1">
            <Button 
              onClick={() => setVersion('human')}
              variant="ghost"
              className={`
                rounded-full px-6 py-2 text-sm font-medium transition-colors
                ${version === 'human' 
                  ? 'bg-[#F5F0E8] text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              Version simplifiée
            </Button>
            <Button 
              onClick={() => setVersion('legal')}
              variant="ghost"
              className={`
                rounded-full px-6 py-2 text-sm font-medium transition-colors
                ${version === 'legal' 
                  ? 'bg-[#F5F0E8] text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              Version légale
            </Button>
          </div>
        </div>

        <div className="space-y-8 p-8 rounded-xl shadow-sm">
          {version === 'human' ? (
            <>
              <section>
                <h2 className="text-xl font-semibold mb-4">Qui peut utiliser nos services ?</h2>
                <p className="text-gray-600">
                  Nos services sont destinés aux personnes majeures. Si vous êtes mineur, vous devez obtenir l'autorisation de vos parents ou tuteurs légaux avant d'utiliser notre plateforme.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Comment créer un compte ?</h2>
                <p className="text-gray-600">
                  Pour créer un compte, vous devez :
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                  <li>Fournir des informations exactes et complètes</li>
                  <li>Choisir un mot de passe sécurisé</li>
                  <li>Ne pas partager vos identifiants de connexion</li>
                  <li>Nous informer de toute utilisation non autorisée de votre compte</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Quelles sont vos responsabilités ?</h2>
                <p className="text-gray-600">
                  En utilisant notre plateforme, vous vous engagez à :
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                  <li>Respecter les lois en vigueur</li>
                  <li>Ne pas publier de contenu illégal ou offensant</li>
                  <li>Ne pas perturber le fonctionnement de la plateforme</li>
                  <li>Respecter les droits des autres utilisateurs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Que se passe-t-il en cas de non-respect des CGU ?</h2>
                <p className="text-gray-600">
                  En cas de non-respect des CGU, nous nous réservons le droit de suspendre ou supprimer votre compte, sans préavis ni indemnité.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Comment pouvons-nous modifier les CGU ?</h2>
                <p className="text-gray-600">
                  Nous pouvons modifier les CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur la plateforme. Nous vous recommandons de consulter régulièrement cette page.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Comment nous contacter ?</h2>
                <p className="text-gray-600">
                  Pour toute question concernant nos CGU, vous pouvez nous contacter :
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                  <li>Par email : contact@gourmapp.com</li>
                  <li>Par téléphone : +33 1 23 45 67 89</li>
                  <li>Par courrier : GourmApp, 123 rue de la Gastronomie, 75001 Paris</li>
                </ul>
              </section>
            </>
          ) : (
            <p className="text-gray-600">
              Ceci est la version légale complète de nos Conditions Générales d'Utilisation. Elle contient tous les détails juridiques
              et techniques de nos conditions d'utilisation.
              [Le contenu complet de la version légale serait inséré ici]
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

