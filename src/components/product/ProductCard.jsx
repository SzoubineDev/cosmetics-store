import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'

function ProductCard({ product, onAddToCart }) {
  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onAddToCart) onAddToCart(product)
  }

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 hover:shadow-lg hover:shadow-neutral-900/5 transition-all"
    >
      {/* Image */}
      <div className="relative aspect-square bg-neutral-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {discount && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:py-1 rounded-full bg-brand-700 text-white text-[10px] font-semibold tracking-wide">
            -{discount}%
          </span>
        )}

        {product.stock === 0 && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:py-1 rounded-full bg-neutral-900 text-white text-[10px] font-semibold">
            Sold out
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 truncate">
          {product.brand}
        </p>

        <h3 className="mt-1 text-[13px] sm:text-sm font-medium text-neutral-900 leading-snug line-clamp-2 min-h-[2.4rem] sm:min-h-[2.6rem]">
          {product.name}
        </h3>

        <div className="mt-2.5 sm:mt-3 flex items-end justify-between gap-1.5">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 min-w-0">
            <span className="text-[15px] sm:text-base font-semibold text-neutral-900 whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[11px] sm:text-xs text-neutral-400 line-through whitespace-nowrap">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className="shrink-0 w-9 h-9 sm:w-9 sm:h-9 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center hover:bg-brand-700 hover:text-white active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard