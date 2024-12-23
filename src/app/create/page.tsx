import Header from '../../components/header'
import Footer from '../../components/footer'
import Create from '../../components/Create'

export default function CreateAccount() {
  return (
    <div className="flex flex-col min-h-screen bg-customBg">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-orange-800 mb-6 text-center"></h1>
          <Create />
        </div>
      </main>
      <Footer />
    </div>
  )
}