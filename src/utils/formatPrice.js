// Central place for price formatting.
// If currency or format ever changes, you only edit this file.

export function formatPrice(amount) {
  return `${Number(amount).toFixed(0)} MAD`
}

export default formatPrice