import Header from '../components/header';
import Footer from '../components/footer';
import DishCarousel from '../components/DishCarousel';
import DynamicMap from '../components/DynamicMap';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col mb-16">
   
        <DishCarousel />
        <DynamicMap />
      </main>
      <Footer />
    </div>
  );
}


