// App.jsx — Root component that assembles all page sections
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import About    from './components/About'
import Services from './components/Services'
import Pricing  from './components/Pricing'
import Booking  from './components/Booking'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

function App() {
  return (
    <>
      {/* Fixed top navigation */}
      <Navbar />

      {/* Page sections in order */}
      <main>
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Booking />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
