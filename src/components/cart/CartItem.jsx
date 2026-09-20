import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import QuantitySelector from '../ui/QuantitySelector'
import { formatPrice } from '../../utils/formatPrice'

function CartItem({ item, onQuantityChange, onRemove, compact = false }) {
  const { product, quantity } = item
  const lineTotal = product.price * quantity

  return (
    <div className="flex gap-4 py-4">
      <Link
        to={`/product/${product.id}`}
        className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
              {product.brand}
            </p>
            <Link
              to={`/product/${product.id}`}
              className="mt-0.5 block text-sm font-medium text-neutral-900 leading-snug line-clamp-2 hover:text-brand-700 transition-colors"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-xs text-neutral-500">
              {formatPrice(product.price)} each
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={`Remove ${product.name}`}
            className="p-1.5 rounded-full text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <QuantitySelector
            value={quantity}
            onChange={(q) => onQuantityChange(product.id, q)}
            min={1}
            max={Math.max(1, product.stock || 99)}
            size={compact ? 'sm' : 'md'}
          />
          <span className="text-sm font-semibold text-neutral-900">
            {formatPrice(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartItem