import HeroSection from '../components/HeroSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section id="about" className="max-w-5xl mx-auto px-4 py-16 text-gray-700">
        <h2 className="text-2xl font-semibold mb-3">About Us</h2>
        <p>We connect donors, hospitals, and people in need to save lives.</p>
      </section>
    </main>
  )
}

