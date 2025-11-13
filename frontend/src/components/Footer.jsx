export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">© {new Date().getFullYear()} BloodCare. All rights reserved.</p>
        <div className="text-sm">Made with ❤️ for saving lives</div>
      </div>
    </footer>
  )
}

