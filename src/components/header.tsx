'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/search')
  }

  return (
    <header
      className={`${
        isMobile
          ? 'h-[60vh] bg-[url("/logo.jpg")] bg-cover bg-center'
          : 'bg-gradient-to-r from-orange-500 to-red-500'
      } shadow-md p-4`}
    >
      <div
        className={`${
          isMobile
            ? "h-full flex flex-col items-center justify-end pb-8 space-y-6"
            : "flex items-center justify-between"
        }`}
      >
        <div
          className={`flex items-center ${isMobile ? "flex-col" : ""}`}
        >
          {/* Lien ajouté autour du logo */}
          <Link href="/" passHref>
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={isMobile ? 100 : 50}
              height={isMobile ? 100 : 50}
              className={`${
                isMobile ? "mb-2" : "mr-2"
              } rounded-full cursor-pointer`}
            />
          </Link>
          {!isMobile && (
            <Link
              href="/"
              className="text-xl font-semibold text-white hover:text-orange-100 transition-colors"
            >
              GourmApp
            </Link>
          )}
        </div>
        <div
          className={`relative ${
            isMobile ? "w-[90%]" : "w-48 sm:w-64"
          }`}
        >
          <Link href="/search" onClick={handleSearchClick} className="block">
            <input
              type="text"
              placeholder={
                isMobile
                  ? "Chercher un restaurant..."
                  : "Rechercher..."
              }
              className={`w-full pl-8 pr-4 ${
                isMobile
                  ? "py-2 text-base"
                  : "py-1 text-sm"
              } rounded-full border ${
                isMobile
                  ? "border-gray-300 bg-white/90 backdrop-blur-sm"
                  : "border-orange-300"
              } focus:outline-none focus:ring-2 focus:ring-white cursor-pointer`}
              readOnly
            />
            <Search
              className={`absolute ${
                isMobile ? "right-4" : "left-2"
              } top-1/2 transform -translate-y-1/2 ${
                isMobile ? "text-orange-500" : "text-orange-500"
              }`}
              size={isMobile ? 20 : 16}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

