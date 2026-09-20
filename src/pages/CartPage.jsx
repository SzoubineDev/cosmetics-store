import { Link, useOutletContext } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import CartItem from '../components/cart/CartItem'
import { formatPrice } from '../utils/formatPrice'

function CartPage() {
  const { cart } = useOutletContext()
  const { items, updateQuantity, removeItem, clearCart, subtotal, totalItems } =
    cart

  if (items.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-brand-50 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-9 h-9 text-brand-700" />
        </div>
        <h1 className="mt-6 text-3xl font-display text-neutral-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Add some products and come back here.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
        >
          Browse products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-brand-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Continue shopping
          </Link>
          <h1 className="mt-3 text-3xl md:text-4xl font-display text-neutral-900">
            Your cart
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            {totalItems} item{totalItems !== 1 && 's'}
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear cart
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        {/* Items */}
        <div className="divide-y divide-neutral-100 border-y border-neutral-100">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onQuantityChange={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 h-fit bg-neutral-50 border border-neutral-100 rounded-2xl p-6">
          <h2 className="font-display text-xl text-neutral-900">
            Order summary
          </h2>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-neutral-600">Subtotal</dt>
              <dd className="text-neutral-900 font-medium">
                {formatPrice(subtotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-neutral-600">Delivery</dt>
              <dd className="text-neutral-900 font-medium">
                {subtotal >= 300 ? 'Free' : 'Calculated at checkout'}
              </dd>
            </div>
          </dl>

          <div className="mt-6 pt-6 border-t border-neutral-200 flex items-center justify-between">
            <span className="text-sm text-neutral-600">Total</span>
            <span className="text-xl font-semibold text-neutral-900">
              {formatPrice(subtotal)}
            </span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
          >
            Proceed to checkout
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="mt-3 text-xs text-neutral-500 text-center">
            You will confirm your order via WhatsApp.
          </p>
        </aside>
      </div>
    </section>
  )
}

export default CartPage