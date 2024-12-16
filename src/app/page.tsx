import Header from '../components/header'
import Footer from '../components/footer'
import DishCarousel from '../components/DishCarousel'
import DynamicMap from '../components/DynamicMap'

export default function Home() {
  return (
    <div >
      <Header />
      <main className="flex-grow">
        <DishCarousel />
        <DynamicMap />
      </main>
      <Footer />
    </div>
  )
}
