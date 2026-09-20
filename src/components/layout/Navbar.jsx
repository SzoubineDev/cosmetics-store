import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Cart', to: '/cart' },
]

function Navbar({ cartCount = 0, onCartClick }) {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

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

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    navigate(`/products?q=${encodeURIComponent(trimmed)}`)
    setIsSearchOpen(false)
    setIsMenuOpen(false)
    setQuery('')
  }

  const toggleSearch = () => {
    setIsSearchOpen((open) => !open)
    setIsMenuOpen(false)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
    setQuery('')
  }

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open)
    setIsSearchOpen(false)
  }

  const handleCartClick = () => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
    if (onCartClick) onCartClick()
  }

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-2 shrink-0">
            <span className="font-display text-xl sm:text-2xl text-brand-700 leading-none">
              Belle
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              Cosmetics
            </span>
          </Link>

          {/* Desktop nav */}
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

          {/* Right actions */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              aria-label="Search"
              onClick={toggleSearch}
              className={`p-2.5 rounded-full transition-colors ${
                isSearchOpen ? 'bg-brand-50' : 'hover:bg-neutral-100'
              }`}
            >
              <Search
                className={`w-5 h-5 ${
                  isSearchOpen ? 'text-brand-700' : 'text-neutral-700'
                }`}
              />
            </button>

            <button
              type="button"
              onClick={handleCartClick}
              aria-label="Open cart"
              className="relative p-2.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-neutral-700" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-700 text-white text-[10px] font-semibold flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className="md:hidden p-2.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-neutral-700" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-700" />
              )}
            </button>
          </div>
        </div>

        {/* Search row */}
        {isSearchOpen && (
          <div className="border-t border-neutral-200 py-3">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, brands…"
                  autoFocus
                  className="w-full pl-10 pr-3 py-2.5 rounded-full bg-neutral-50 border border-neutral-200 text-base sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                />
              </div>

              {/* Full-text button on sm+, icon-only on mobile */}
              <button
                type="submit"
                aria-label="Submit search"
                className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
              >
                Search
              </button>
              <button
                type="submit"
                aria-label="Submit search"
                className="sm:hidden p-2.5 rounded-full bg-brand-700 text-white hover:bg-brand-800 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="p-2.5 rounded-full hover:bg-neutral-100 transition-colors shrink-0"
              >
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
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