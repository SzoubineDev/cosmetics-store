import { Link, useOutletContext } from 'react-router-dom'
import {
  Truck,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import Button from '../components/ui/Button'
import CategoryGrid from '../components/product/CategoryGrid'
import ProductGrid from '../components/product/ProductGrid'
import { getFeaturedProducts } from '../data/products'

const features = [
  {
    icon: Truck,
    title: 'Fast local delivery',
    text: 'Delivered across Casablanca within 24 hours.',
  },
  {
    icon: MessageCircle,
    title: 'Order via WhatsApp',
    text: 'Confirm your order in one tap — no account needed.',
  },
  {
    icon: Sparkles,
    title: '100% authentic',
    text: 'Only genuine products from trusted brands.',
  },
  {
    icon: ShieldCheck,
    title: 'Easy returns',
    text: 'Not happy? Return within 7 days, no questions.',
  },
]

function HomePage() {
  const { cart } = useOutletContext()
  const featuredProducts = getFeaturedProducts(8)

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-100 text-[11px] uppercase tracking-[0.2em] text-brand-700 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Your local beauty store
              </span>

              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-display text-neutral-900 leading-[1.05]">
                Beauty essentials,
                <br />
                <span className="text-brand-700">delivered to your door.</span>
              </h1>

              <p className="mt-6 max-w-xl text-neutral-600 leading-relaxed">
                Discover a curated collection of makeup, skincare and haircare
                products. Add what you love to your cart and check out in
                seconds — straight through WhatsApp.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/products" variant="primary" size="lg">
                  Shop now
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button to="/products" variant="outline" size="lg">
                  Browse categories
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  In stock &amp; ready to ship
                </div>
                <div className="hidden sm:block">•</div>
                <div className="hidden sm:block">Free delivery over 300 MAD</div>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-6 bg-brand-100/60 rounded-[2.5rem] blur-2xl"
                aria-hidden="true"
              />
              <div className="relative rounded-[2rem] overflow-hidden shadow-xl shadow-brand-900/5 border border-white">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
                  alt="Cosmetics flat lay"
                  className="w-full h-[360px] sm:h-[440px] md:h-[520px] object-cover"
                  loading="eager"
                />
              </div>

              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg border border-neutral-100 px-4 py-3 items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-brand-700" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Curated by us</p>
                  <p className="text-sm font-semibold text-neutral-900">
                    100+ handpicked products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-neutral-50 transition-colors"
              >
                <div className="shrink-0 w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {title}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-600 font-medium">
              Shop by category
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-display text-neutral-900">
              Find your essentials
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <CategoryGrid />
      </section>

      {/* NEW ARRIVALS */}
      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-600 font-medium">
                Featured
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-display text-neutral-900">
                New arrivals
              </h2>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProductGrid
            products={featuredProducts}
            onAddToCart={(product) => cart.addItem(product, 1)}
          />
        </div>
      </section>
    </div>
  )
}

export default HomePage