import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Cart', to: '/cart' },
]

function Navbar({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-700' : 'text-neutral-600 hover:text-brand-700'
    }`

  const mobileLinkClasses = ({ isActive }) =>
    `px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'text-brand-700 bg-brand-50'
        : 'text-neutral-700 hover:bg-neutral-50'
    }`

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ---------- Logo ---------- */}
          <Link to="/" className="flex items-baseline gap-2 shrink-0">
            <span className="font-display text-2xl text-brand-700 leading-none">
              Belle
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              Cosmetics
            </span>
          </Link>

          {/* ---------- Desktop nav ---------- */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={linkClasses}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ---------- Right-side actions ---------- */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Search"
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <Search className="w-5 h-5 text-neutral-700" />
            </button>

            <Link
              to="/cart"
              aria-label="Open cart"
              className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-neutral-700" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-700 text-white text-[10px] font-semibold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="md:hidden p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-neutral-700" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-700" />
              )}
            </button>
          </div>
        </div>

        {/* ---------- Mobile menu (conditional) ---------- */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-neutral-200 py-2 flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsMenuOpen(false)}
                className={mobileLinkClasses}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar