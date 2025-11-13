import { Link } from 'react-router-dom'
import drop from '../assets/drop.png'

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-dark text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_40%)]" />
      <div className="max-w-5xl mx-auto px-4 text-center relative z-10 pt-24">
        <img src={drop} alt="Blood Drop" className="w-28 h-28 mx-auto mb-6 opacity-90" />
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          DONATE BLOOD AND GET REAL BLESSINGS.
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Blood is the most precious gift that anyone can give to another person.
        </p>
        <Link to="/register" className="inline-block px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-medium">
          Get Appointment
        </Link>
      </div>
    </section>
  )
}

