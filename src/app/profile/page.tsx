import Header from '../../components/header'
import Footer from '../../components/footer'
import ProfileForms from '../../components/ProfilForms'

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-orange-800 mb-6 text-center">Profil</h1>
          <ProfileForms />
        </div>
      </main>
      <Footer />
    </div>
  )
}
