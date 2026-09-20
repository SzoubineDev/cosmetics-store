import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import {
  ArrowLeft,
  AlertCircle,
  ShoppingBag,
  Check,
  MessageCircle,
  ExternalLink,
  Pencil,
} from 'lucide-react'
import { formatPrice } from '../utils/formatPrice'
import { buildOrderWhatsApp, STORE_WHATSAPP_NUMBER } from '../utils/whatsapp'

const PHONE_REGEX = /^(\+212|0)[5-7]\d{8}$/

function CheckoutPage() {
  const { cart } = useOutletContext()
  const { items, subtotal, totalItems, clearCart } = cart

  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)
  // submitted = { message, url, order }

  // ---------- Empty cart fallback (only when not yet submitted) ----------
  if (items.length === 0 && !submitted) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-brand-50 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-9 h-9 text-brand-700" />
        </div>
        <h1 className="mt-6 text-3xl font-display text-neutral-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Add some products before checking out.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
        >
          Browse products
        </Link>
      </section>
    )
  }

  // ---------- Field change ----------
  const handleChange = (field) => (e) => {
    const value = e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  // ---------- Validation ----------
  const validate = () => {
    const next = {}

    if (!form.name.trim()) {
      next.name = 'Please enter your full name'
    } else if (form.name.trim().length < 3) {
      next.name = 'Name must be at least 3 characters'
    }

    const phone = form.phone.replace(/[\s-]/g, '')
    if (!phone) {
      next.phone = 'Please enter your phone number'
    } else if (!PHONE_REGEX.test(phone)) {
      next.phone = 'Enter a valid Moroccan number (e.g. 0612345678)'
    }

    if (!form.city.trim()) {
      next.city = 'Please enter your city'
    }

    if (!form.address.trim()) {
      next.address = 'Please enter your address'
    } else if (form.address.trim().length < 10) {
      next.address = 'Please enter a more detailed address'
    }

    return next
  }

  // ---------- Submit → build message, open WhatsApp, clear cart ----------
  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      const firstField = Object.keys(next)[0]
      document.getElementById(firstField)?.focus()
      return
    }

    // Snapshot the order BEFORE clearing the cart.
    const orderItems = items.map((i) => ({ ...i }))
    const orderSubtotal = subtotal

    const { message, url } = buildOrderWhatsApp({
      items: orderItems,
      subtotal: orderSubtotal,
      customer: form,
      number: STORE_WHATSAPP_NUMBER,
    })

    // Open WhatsApp in a new tab. Using a real user gesture keeps popup
    // blockers happy. If they still block it, we surface a manual link below.
    window.open(url, '_blank', 'noopener,noreferrer')

    // Move to confirmation screen.
    setSubmitted({
      message,
      url,
      order: { items: orderItems, subtotal: orderSubtotal, customer: form },
    })

    // Cart is done; empty it so the next visit starts fresh.
    clearCart()
  }

  // ---------- Edit order: go back to the form (cart is already empty) ----------
  const handleEdit = () => {
    setSubmitted(null)
  }

  // ---------- Confirmation screen ----------
  if (submitted) {
    return (
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 mx-auto flex items-center justify-center">
            <Check className="w-9 h-9 text-emerald-600" />
          </div>
          <h1 className="mt-6 text-3xl font-display text-neutral-900">
            Almost done!
          </h1>
          <p className="mt-3 text-neutral-600 leading-relaxed">
            WhatsApp should have opened in a new tab with your order ready to
            send. Press <span className="font-semibold">Send</span> in WhatsApp
            to confirm the order with us.
          </p>
        </div>

        {/* Reopen button — the safety net for popup blockers */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={submitted.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Open WhatsApp again
          </a>
          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit order
          </button>
        </div>

        {/* Message preview */}
        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3">
            Message preview
          </p>
          <pre className="whitespace-pre-wrap break-words rounded-2xl bg-neutral-50 border border-neutral-100 p-5 text-sm text-neutral-800 font-sans leading-relaxed">
            {submitted.message}
          </pre>
        </div>

        {/* Order total reminder */}
        <div className="mt-6 rounded-2xl border border-neutral-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500">Order total</p>
            <p className="text-lg font-semibold text-neutral-900">
              {formatPrice(submitted.order.subtotal)}
            </p>
          </div>
          <a
            href={submitted.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-800"
          >
            Resend on WhatsApp
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="mt-6 text-xs text-neutral-500 text-center">
          Your cart has been cleared. If you need to change anything, we will
          confirm details with you on WhatsApp before shipping.
        </p>

        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    )
  }

  // ---------- Main checkout layout ----------
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <Link
        to="/cart"
        className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-brand-700 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to cart
      </Link>

      <h1 className="mt-3 text-3xl md:text-4xl font-display text-neutral-900">
        Checkout
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Enter your details and confirm your order via WhatsApp.
      </p>

      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-10">
        {/* FORM */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field
              id="name"
              label="Full name"
              value={form.name}
              onChange={handleChange('name')}
              error={errors.name}
              placeholder="Ahmed Benali"
              autoComplete="name"
            />
            <Field
              id="phone"
              label="Phone number"
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              error={errors.phone}
              placeholder="0612345678"
              autoComplete="tel"
            />
          </div>

          <Field
            id="city"
            label="City"
            value={form.city}
            onChange={handleChange('city')}
            error={errors.city}
            placeholder="Casablanca"
            autoComplete="address-level2"
          />

          <Field
            id="address"
            label="Full address"
            value={form.address}
            onChange={handleChange('address')}
            error={errors.address}
            placeholder="Apartment, street, district, postal code"
            autoComplete="street-address"
            as="textarea"
          />

          <Field
            id="notes"
            label="Notes"
            value={form.notes}
            onChange={handleChange('notes')}
            placeholder="Delivery instructions, preferred time, etc."
            as="textarea"
            optional
          />

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Send order via WhatsApp
          </button>

          <p className="text-xs text-neutral-500">
            Pressing this button opens WhatsApp with your order pre-filled. You
            still need to press <span className="font-medium">Send</span> in
            WhatsApp to confirm.
          </p>
        </form>

        {/* SUMMARY */}
        <aside className="lg:sticky lg:top-24 h-fit bg-neutral-50 border border-neutral-100 rounded-2xl p-6">
          <h2 className="font-display text-xl text-neutral-900">
            Order summary
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            {totalItems} item{totalItems !== 1 && 's'}
          </p>

          <ul className="mt-5 space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.product.id} className="flex gap-3 text-sm">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-neutral-100 shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-neutral-900 truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {item.quantity} × {formatPrice(item.product.price)}
                  </p>
                </div>
                <span className="text-neutral-900 font-medium whitespace-nowrap">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 pt-5 border-t border-neutral-200 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span className="text-neutral-900 font-medium">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">Delivery</span>
              <span className="text-neutral-900 font-medium">
                {subtotal >= 300 ? 'Free' : 'Calculated at delivery'}
              </span>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-neutral-200 flex items-center justify-between">
            <span className="text-sm text-neutral-600">Total</span>
            <span className="text-xl font-semibold text-neutral-900">
              {formatPrice(subtotal)}
            </span>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            You will not pay online. We confirm everything on WhatsApp before
            shipping.
          </p>
        </aside>
      </div>
    </section>
  )
}

/* ---------- Local Field component ---------- */
function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  autoComplete,
  as = 'input',
  optional = false,
}) {
  const baseInput =
    'w-full px-4 py-3 rounded-xl bg-white border text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 transition-colors'
  const stateClass = error
    ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
    : 'border-neutral-200 focus:ring-brand-200 focus:border-brand-400'

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-neutral-700 mb-1.5"
      >
        {label}
        {optional && (
          <span className="ml-1 text-neutral-400 font-normal">(optional)</span>
        )}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          rows={3}
          className={`${baseInput} ${stateClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${baseInput} ${stateClass}`}
        />
      )}

      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

export default CheckoutPage