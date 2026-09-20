// ---------------------------------------------------------------
// STORE WHATSAPP NUMBER
// ---------------------------------------------------------------
// Replace this with the real store number before deployment.
// Format: country code + number, NO "+", NO spaces, NO leading zero.
// Morocco = 212. Example local number 0612345678 → "212612345678".
// ---------------------------------------------------------------
export const STORE_WHATSAPP_NUMBER = '0628362791'

/**
 * Normalize a phone number to the format wa.me expects:
 * digits only, with country code, no leading zero.
 * Handles inputs like:
 *   "0612345678"       → "212612345678"
 *   "+212612345678"    → "212612345678"
 *   "06 12 34 56 78"   → "212612345678"
 *   "212-612-345-678"  → "212612345678"
 */
export function normalizePhone(raw) {
  if (!raw) return ''
  let digits = String(raw).replace(/\D/g, '')
  if (digits.startsWith('0')) {
    digits = '212' + digits.slice(1)
  }
  return digits
}

/**
 * Build the plain-text order message.
 * Returns a multi-line string; URLs are built later.
 */
export function buildOrderMessage({ items, subtotal, customer }) {
  const lines = []

  lines.push('Hello, I would like to place an order:')
  lines.push('')

  items.forEach((item, index) => {
    const lineTotal = item.product.price * item.quantity
    lines.push(
      `${index + 1}. ${item.product.name} x${item.quantity} - ${lineTotal} MAD`
    )
  })

  lines.push('')
  lines.push(`Total: ${subtotal} MAD`)
  lines.push('')
  lines.push('Customer information:')
  lines.push(`Name: ${customer.name}`)
  lines.push(`Phone: ${customer.phone}`)
  lines.push(`City: ${customer.city}`)
  lines.push(`Address: ${customer.address}`)

  if (customer.notes && customer.notes.trim()) {
    lines.push(`Notes: ${customer.notes}`)
  }

  return lines.join('\n')
}

/**
 * Turn the plain message into a clickable wa.me URL.
 */
export function buildWhatsAppUrl(message, number = STORE_WHATSAPP_NUMBER) {
  const target = normalizePhone(number)
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${target}?text=${encoded}`
}

/**
 * Convenience wrapper: build message + URL in one call.
 */
export function buildOrderWhatsApp({ items, subtotal, customer, number }) {
  const message = buildOrderMessage({ items, subtotal, customer })
  const url = buildWhatsAppUrl(message, number)
  return { message, url }
}