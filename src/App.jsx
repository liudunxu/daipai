import Header from './components/Header'
import Symptoms from './components/Symptoms'
import Solutions from './components/Solutions'
import Tips from './components/Tips'
import Cta from './components/Cta'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark p-5">
      <div className="max-w-[600px] mx-auto bg-white rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        <Header />

        <div className="p-[30px]">
          <div className="mb-[25px] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Symptoms />
          </div>

          <div className="mb-[25px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Solutions />
          </div>

          <div className="mb-[25px] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Tips />
          </div>
        </div>

        <Cta />
        <Footer />
      </div>
    </div>
  )
}

export default App
