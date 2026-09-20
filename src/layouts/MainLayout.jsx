import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import CartDrawer from '../components/cart/CartDrawer'
import { useCart } from '../hooks/useCart'

function MainLayout() {
  const cart = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        cartCount={cart.totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* The context prop gives every page access to the cart. */}
        <Outlet context={{ cart }} />
      </main>

      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-500">
          © {new Date().getFullYear()} Belle Cosmetics — Casablanca
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
      />
    </div>
  )
}

export default MainLayout