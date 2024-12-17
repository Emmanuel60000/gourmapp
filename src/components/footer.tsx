import { Home, Search, Calendar, User } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-10">
      <nav className="flex justify-around items-center h-16">
        <Link href="/" className="flex flex-col items-center text-orange-600">
          <Home size={24} />
          <span className="text-xs mt-1">Accueil</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center text-orange-600">
          <Search size={24} />
          <span className="text-xs mt-1">Recherche</span>
        </Link>
        <Link href="/reservations" className="flex flex-col items-center text-orange-600">
          <Calendar size={24} />
          <span className="text-xs mt-1">Réservations</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-orange-600">
          <User size={24} />
          <span className="text-xs mt-1">Profil</span>
        </Link>
      </nav>
    </footer>
  )
}

