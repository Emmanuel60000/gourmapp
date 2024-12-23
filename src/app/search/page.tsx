import Header from '../../components/header'
import Footer from '../../components/footer'
import SearchComponent from '../../components/SearchComponent'

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-customBg py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-customError mb-6 text-center font-inknut">Recherche de Restaurants</h1>
          <SearchComponent />
        </div>
      </main>
      <Footer />
    </div>
  )
}