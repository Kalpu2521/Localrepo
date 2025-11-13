import { Link, NavLink } from 'react-router-dom'
export default function Navbar() {
  return (
    <header className="bg-black/60 backdrop-blur text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Blood<span className="text-red-500">Care</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <NavLink to="/" className={({isActive})=>`hover:text-red-400 ${isActive? 'text-red-400': ''}`}>Home</NavLink>
          <a href="#about" className="hover:text-red-400">About Us</a>
          <a href="#campaign" className="hover:text-red-400">Campaign</a>
          <a href="#pages" className="hover:text-red-400">Pages</a>
          <a href="#blog" className="hover:text-red-400">Blog</a>
          <a href="#contact" className="hover:text-red-400">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 rounded border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition">Login</Link>
          <Link to="/register" className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 transition">Get Appointment</Link>
        </div>
      </div>
    </header>
  )
}