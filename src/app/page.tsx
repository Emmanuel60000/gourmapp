import Header from '../components/header';
import Intro from '../components/intro';
import Footer from '../components/footer';
import DishCarousel from '../components/DishCarousel';
import DynamicMap from '../components/DynamicMap';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-customBg">
      <Header />
      <main className="flex-grow mb-16 ">
      <Intro />
        <DishCarousel />
        <DynamicMap />
      </main>
      <Footer />
    </div>
  );
}

