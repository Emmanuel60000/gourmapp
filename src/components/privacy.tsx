 'use client'
 import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  const [version, setVersion] = useState<'human' | 'legal'>('human')

  return (
    <div className="flex-grow py-12 px-4 ">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-orange-600 text-sm mb-2">Dernière mise à jour: Jan 2024</p>
          <h1 className="text-3xl font-bold mb-4">Politique de Confidentialité</h1>
          <p className="text-gray-600 mb-6">
            Votre confidentialité est importante pour nous. Nous respectons votre vie privée concernant toute
            information que nous pourrions collecter sur notre site web.
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
                <h2 className="text-xl font-semibold mb-4">Quelles informations collectons-nous ?</h2>
                <p className="text-gray-600">
                  Nous collectons des informations que vous nous fournissez directement lorsque vous créez un compte,
                  effectuez une réservation ou interagissez avec notre site. Cela peut inclure votre nom, adresse
                  email, numéro de téléphone et préférences de restauration.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Comment utilisons-nous vos informations ?</h2>
                <p className="text-gray-600">
                  Nous utilisons les informations collectées pour :
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                  <li>Gérer vos réservations et vous fournir nos services</li>
                  <li>Personnaliser votre expérience utilisateur</li>
                  <li>Communiquer avec vous concernant nos services</li>
                  <li>Améliorer notre site web et nos services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Utilisons-nous des cookies ?</h2>
                <p className="text-gray-600">
                  Oui, nous utilisons des cookies et d'autres technologies similaires pour améliorer votre
                  expérience sur notre site, comprendre comment il est utilisé et personnaliser notre
                  contenu marketing.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Combien de temps conservons-nous vos informations ?</h2>
                <p className="text-gray-600">
                  Nous conservons vos informations personnelles aussi longtemps que nécessaire pour vous
                  fournir nos services et respecter nos obligations légales. Vous pouvez demander la
                  suppression de vos données à tout moment.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Comment protégeons-nous vos informations ?</h2>
                <p className="text-gray-600">
                  Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations
                  personnelles contre tout accès, modification, divulgation ou destruction non autorisés.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Quels sont vos droits en matière de confidentialité ?</h2>
                <p className="text-gray-600">
                  Vous avez le droit d'accéder, de modifier ou de supprimer vos informations personnelles.
                  Vous pouvez également vous opposer au traitement de vos données ou demander leur portabilité.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Comment nous contacter ?</h2>
                <p className="text-gray-600">
                  Pour toute question concernant notre politique de confidentialité, vous pouvez nous contacter :
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                  <li>Par email : privacy@gourmapp.com</li>
                  <li>Par téléphone : +33 1 23 45 67 89</li>
                  <li>Par courrier : GourmApp, 123 rue de la Gastronomie, 75001 Paris</li>
                </ul>
              </section>
            </>
          ) : (
            <p className="text-gray-600">
              Ceci est la version légale complète de notre politique de confidentialité. Elle contient tous les détails juridiques
              et techniques de nos pratiques en matière de collecte, d'utilisation et de protection des données.
              [Le contenu complet de la version légale serait inséré ici]
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

