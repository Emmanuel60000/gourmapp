'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémente la logique de connexion ici
    console.log('Form submitted:', { email, password });
  };

  const handleGoogleLogin = () => {
    // Ajoute la logique de connexion avec Google ici
    console.log('Google Login initiated');
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-customHighlight">Se connecter</h1>
          <p className="text-gray-600">Bienvenue ! Merci d'entrer vos informations.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ Email */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Email</label>
            <Input
              type="email"
              placeholder="Entrez votre Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
              required
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Mot de passe</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
              required
            />
          </div>

          {/* Options supplémentaires */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Se souvenir 30 jours
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-orange-500 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Bouton de connexion classique */}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg shadow-[0_4px_14px_rgba(255,122,0,0.4)]"
          >
            Se connecter
          </Button>

          {/* Bouton de connexion avec Google */}
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-lg flex items-center justify-center space-x-2 shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
            onClick={handleGoogleLogin}
          >
            <FontAwesomeIcon icon={faGoogle} className="text-red-500 h-5 w-5" />
            <span>Connectez-vous avec Google</span>
          </Button>
        </form>

        {/* Lien vers la création de compte */}
        <p className="text-center text-gray-600 text-sm">
          Vous n'avez pas de compte ?{' '}
          <Link href="/create" className="text-orange-500 hover:underline">
            Créez en un
          </Link>
        </p>
      </div>
    </div>
  );
}
