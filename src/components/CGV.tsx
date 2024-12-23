'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function CGVPage() {
  const [version, setVersion] = useState<'human' | 'legal'>('human')

  return (
    <div className="flex-grow py-12 px-4 ">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-orange-600 text-sm mb-2">Dernière mise à jour: Jan 2024</p>
          <h1 className="text-3xl font-bold mb-4">Conditions Générales de Vente</h1>
          <p className="text-gray-600 mb-6">
            Nos CGV régissent les conditions de vente de nos services. Veuillez les lire attentivement avant de passer commande.
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
                <h2 className="text-xl font-semibold mb-4">Comment passer commande ?</h2>
                <p className="text-gray-600">
                  Pour passer commande, vous devez :
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                  <li>Créer un compte ou vous connecter</li>
                  <li>Sélectionner les produits ou services souhaités</li>
                  <li>Vérifier et valider votre panier</li>
                  <li>Choisir votre mode de paiement</li>
                  <li>Confirmer votre commande</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Quels sont les modes de paiement acceptés ?</h2>
                <p className="text-gray-600">
                  Nous acceptons les modes de paiement suivants :
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                  <li>Carte bancaire (Visa, Mastercard, American Express)</li>
                  <li>PayPal</li>
                  <li>Virement bancaire</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Quels sont les délais de livraison ?</h2>
                <p className="text-gray-600">
                  Les délais de livraison varient selon le type de service commandé. Pour les réservations de restaurant, la confirmation est généralement immédiate. Pour d'autres services, les délais seront précisés lors de votre commande.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Quelle est notre politique de remboursement ?</h2>
                <p className="text-gray-600">
                  Notre politique de remboursement dépend du type de service :
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                  <li>Réservations de restaurant : remboursement possible jusqu'à 24h avant la date réservée</li>
                  <li>Autres services : conditions spécifiques précisées lors de la commande</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Comment gérer les litiges ?</h2>
                <p className="text-gray-600">
                  En cas de litige, nous vous invitons à nous contacter directement pour trouver une solution à l'amiable. Si aucun accord n'est trouvé, vous pouvez faire appel à un médiateur de la consommation.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Comment nous contacter ?</h2>
                <p className="text-gray-600">
                  Pour toute question concernant nos CGV ou votre commande, vous pouvez nous contacter :
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                  <li>Par email : ventes@gourmapp.com</li>
                  <li>Par téléphone : +33 1 23 45 67 89</li>
                  <li>Par courrier : GourmApp, 123 rue de la Gastronomie, 75001 Paris</li>
                </ul>
              </section>
            </>
          ) : (
            <p className="text-gray-600">
              Ceci est la version légale complète de nos Conditions Générales de Vente. Elle contient tous les détails juridiques
              et techniques de nos conditions de vente.
              [Le contenu complet de la version légale serait inséré ici]
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

