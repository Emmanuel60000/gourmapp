import Header from '../../components/header'
import Footer from '../../components/footer'
import ReservationForm from '../../components/ReservationForm'

export default function ReservationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <ReservationForm />
      </main>
      <Footer />
    </div>
  )
}