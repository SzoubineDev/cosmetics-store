import { useState, useEffect } from 'react'

const STORAGE_KEY = 'belle-cart'

export function useCart() {
  // Initialize from localStorage so a refresh keeps the cart.
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  // Save on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore (private mode etc.)
    }
  }, [items])

  // items: [{ product, quantity }]

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      const maxQty = Math.max(1, product.stock || 99)

      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, maxQty) }
            : i
        )
      }
      return [
        ...prev,
        { product, quantity: Math.min(Math.max(1, quantity), maxQty) },
      ]
    })
  }

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id !== productId) return i
        const maxQty = Math.max(1, i.product.stock || 99)
        const safe = Math.max(1, Math.min(quantity, maxQty))
        return { ...i, quantity: safe }
      })
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  )

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
  }
}

export default useCart