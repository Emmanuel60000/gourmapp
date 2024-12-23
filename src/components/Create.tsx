'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémente la logique de création de compte ici
    console.log('Account creation:', { name, email, password });
  };

  const handleGoogleLogin = () => {
    // Ajoute la logique de connexion avec Google ici
    console.log('Google Login initiated');
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-customHighlight">Créez un compte</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ Nom */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Nom*</label>
            <Input
              type="text"
              placeholder="Entrez votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
              required
            />
          </div>

          {/* Champ Email */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Email*</label>
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
            <label className="text-sm text-gray-600">Mot de passe*</label>
            <Input
              type="password"
              placeholder="Créer un mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white border-none shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
              required
            />
            <p className="text-xs text-gray-500">Doit faire au minimum 8 caractères</p>
          </div>

          {/* Bouton de création de compte */}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg shadow-[0_4px_14px_rgba(255,122,0,0.4)]"
          >
            Créer un compte
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

        <p className="text-center text-gray-600 text-sm">
          Vous avez déjà un compte ?{' '}
          <Link href="/profile" className="text-orange-500 hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
