import Header from '../../components/header'
import Footer from '../../components/footer'
import SearchComponent from '../../components/SearchComponent'

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-orange-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-orange-800 mb-6 text-center">Recherche de Restaurants</h1>
          <SearchComponent />
        </div>
      </main>
      <Footer />
    </div>
  )
}