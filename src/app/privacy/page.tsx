import Header from '../../components/header'
import Footer from '../../components/footer'
import Privacy from '../../components/privacy';

export default function privacy() {
  return (
    <div >
      <Header />
      <main className='min-h-screen  bg-customBg'>
       
          
          <Privacy />
        
      </main>
      <Footer />
    </div>
  )
}