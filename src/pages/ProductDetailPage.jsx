import { useState } from 'react'
import { Link, useParams, useOutletContext } from 'react-router-dom'
import {
  ChevronRight,
  ShoppingBag,
  Truck,
  MessageCircle,
  ShieldCheck,
  Check,
  PackageX,
} from 'lucide-react'
import QuantitySelector from '../components/ui/QuantitySelector'
import ProductGrid from '../components/product/ProductGrid'
import { getProductById, products } from '../data/products'
import { getCategoryBySlug } from '../data/categories'
import { formatPrice } from '../utils/formatPrice'

function ProductDetailPage() {
  const { id } = useParams()
  const { cart } = useOutletContext()
  const product = getProductById(id)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
        <PackageX className="w-12 h-12 text-neutral-300 mx-auto" />
        <h1 className="mt-6 text-2xl sm:text-3xl font-display text-neutral-900">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          The product you are looking for does not exist.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
        >
          Back to products
        </Link>
      </div>
    )
  }

  const category = getCategoryBySlug(product.category)
  const isSoldOut = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 5

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    cart.addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center gap-1 text-xs text-neutral-500 overflow-hidden">
            <Link
              to="/"
              className="hover:text-brand-700 transition-colors shrink-0"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
            <Link
              to={`/products?category=${product.category}`}
              className="hover:text-brand-700 transition-colors shrink-0"
            >
              {category?.name || 'Products'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
            <span className="text-neutral-900 font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-14">
          <div className="relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-50 border border-neutral-100 aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {discount && (
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 sm:py-1.5 rounded-full bg-brand-700 text-white text-[11px] sm:text-xs font-semibold tracking-wide">
                  -{discount}%
                </span>
              )}

              {isSoldOut && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-neutral-900 text-white text-sm font-semibold">
                    Sold out
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
              {product.brand}
            </p>

            <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-display text-neutral-900 leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 sm:mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-2xl sm:text-3xl font-semibold text-neutral-900">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-base sm:text-lg text-neutral-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-sm">
              {isSoldOut ? (
                <span className="inline-flex items-center gap-2 text-red-600">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Out of stock
                </span>
              ) : isLowStock ? (
                <span className="inline-flex items-center gap-2 text-amber-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Only {product.stock} left in stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  In stock — {product.stock} available
                </span>
              )}
            </div>

            <p className="mt-5 sm:mt-6 text-sm sm:text-base text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity + Add — stack on mobile */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex sm:block">
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={Math.max(product.stock, 1)}
                />
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isSoldOut}
                className={`w-full sm:flex-1 sm:min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-full text-sm font-medium transition-colors ${
                  isSoldOut
                    ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                    : added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-brand-700 text-white hover:bg-brand-800'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    {isSoldOut ? 'Unavailable' : 'Add to cart'}
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
              <div className="flex items-start gap-2 text-neutral-600">
                <Truck className="w-4 h-4 text-brand-700 mt-0.5 shrink-0" />
                <span>Delivered within 24h in Casablanca</span>
              </div>
              <div className="flex items-start gap-2 text-neutral-600">
                <MessageCircle className="w-4 h-4 text-brand-700 mt-0.5 shrink-0" />
                <span>Order and confirm via WhatsApp</span>
              </div>
              <div className="flex items-start gap-2 text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-brand-700 mt-0.5 shrink-0" />
                <span>100% authentic — money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="bg-neutral-50 border-t border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
            <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-600 font-medium">
                  You may also like
                </p>
                <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-display text-neutral-900">
                  More from {category?.name || 'this category'}
                </h2>
              </div>
              <Link
                to={`/products?category=${product.category}`}
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800 shrink-0"
              >
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <ProductGrid
              products={relatedProducts}
              onAddToCart={(p) => cart.addItem(p, 1)}
            />
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetailPage