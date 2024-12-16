import { Search } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-orange-400 to-red-500 shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/logo.jpg"
          alt="Logo"
          width={50}
          height={50}
          className="mr-2"
        />
        <span className="text-xl font-semibold text-white">GourmApp</span>
      </div>
      <div className="relative w-48 sm:w-64">
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full pl-8 pr-4 py-1 rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-white text-sm"
        />
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-orange-500" size={16} />
      </div>
    </header>
  )
}
