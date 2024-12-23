'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Home, Search, Calendar, User, Plus, X } from 'lucide-react'

export default function Footer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <footer className="bg-gradient-to-r from-red-500 to-orange-500 relative z-[100]">
      <nav className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Liens principaux */}
          <Link
            href="/"
            className="flex flex-col items-center flex-1 text-white font-serif border-r border-white/20"
          >
            <Home className="h-5 w-5" />
            <span className="text-sm mt-1 font-inknut">Accueil</span>
          </Link>

          <Link
            href="/search"
            className="flex flex-col items-center flex-1 text-white font-serif border-r border-white/20"
          >
            <Search className="h-5 w-5" />
            <span className="text-sm mt-1 font-inknut">Recherche</span>
          </Link>

          <Link
            href="/reservations"
            className="flex flex-col items-center flex-1 text-white font-serif border-r border-white/20"
          >
            <Calendar className="h-5 w-5" />
            <span className="text-sm mt-1 font-inknut">Réservations</span>
          </Link>

          <Link
            href="/profile"
            className="flex flex-col items-center flex-1 text-white font-serif border-r border-white/20"
          >
            <User className="h-5 w-5" />
            <span className="text-sm mt-1 font-inknut">Profil</span>
          </Link>

          {/* Bouton "Plus" */}
          <div className="flex flex-col items-center flex-1 text-white font-serif relative">
            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className="flex flex-col items-center bg-transparent border-none cursor-pointer"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
            >
              <div className="rounded-full border-2 border-white p-1">
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-white" />
                ) : (
                  <Plus className="h-5 w-5 text-white" />
                )}
              </div>
              <span className="text-sm mt-1 font-inknut">Plus</span>
            </button>

            {/* Menu déroulant ajusté */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute bottom-full left-1/2 -translate-x-[80%] md:translate-x-0 mb-2 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg shadow-xl overflow-hidden z-[150] border border-orange-200 p-4"
              >
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/CGU"
                    className="group px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-200 rounded-md transition-all duration-200 flex items-center justify-center"
                  >
                    CGU
                  </Link>
                  <Link
                    href="/CGV"
                    className="group px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-200 rounded-md transition-all duration-200 flex items-center justify-center"
                  >
                    CGV
                  </Link>
                  <Link
                    href="/privacy"
                    className="group px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-200 rounded-md transition-all duration-200 flex items-center justify-center"
                  >
                    Privacy
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </nav>
    </footer>
  )
}
