import { Link } from 'react-router-dom'
import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import CartItem from './CartItem'
import { formatPrice } from '../../utils/formatPrice'

function CartDrawer({ isOpen, onClose, cart }) {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = cart

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-neutral-900/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-700" />
            <h2 className="font-display text-lg text-neutral-900">
              Your cart
            </h2>
            {totalItems > 0 && (
              <span className="text-xs text-neutral-500">
                ({totalItems} item{totalItems !== 1 && 's'})
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-50 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-brand-700" />
              </div>
              <h3 className="mt-4 font-display text-lg text-neutral-900">
                Your cart is empty
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Add some products to get started.
              </p>
              <Link
                to="/products"
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onQuantityChange={updateQuantity}
                  onRemove={removeItem}
                  compact
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 px-5 py-4 bg-white">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Subtotal</span>
              <span className="text-lg font-semibold text-neutral-900">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              Delivery calculated at checkout.
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                View full cart
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
              >
                Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartDrawer