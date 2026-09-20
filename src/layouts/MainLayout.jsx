import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar cartCount={0} />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-500">
          © {new Date().getFullYear()} Belle Cosmetics — Casablanca
        </div>
      </footer>
    </div>
  )
}

export default MainLayout