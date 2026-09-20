// Mock product data.
// When Laravel is ready, this file becomes:
//   GET /api/products   →  returns the same array shape
// Components import from here today; tomorrow they will import from a service.

export const products = [
  // ---------------- Makeup ----------------
  {
    id: 1,
    name: 'Maybelline Fit Me Foundation',
    brand: 'Maybelline',
    category: 'makeup',
    price: 129,
    oldPrice: 159,
    image:
      'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=700&q=80',
    description:
      'Lightweight liquid foundation that blends seamlessly for a natural, matte finish. Available in a wide range of shades for every skin tone.',
    stock: 14,
    featured: true,
  },
  {
    id: 2,
    name: "L'Oréal Volume Million Lashes Mascara",
    brand: "L'Oréal",
    category: 'makeup',
    price: 145,
    image:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80',
    description:
      'Volumizing mascara with a multi-zone brush that separates and multiplies lashes for a bold, full look.',
    stock: 22,
    featured: true,
  },
  {
    id: 3,
    name: 'NYX Soft Matte Lip Cream',
    brand: 'NYX',
    category: 'makeup',
    price: 89,
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80',
    description:
      'Creamy, long-wearing lip color that glides on and sets to a soft matte finish. Lightweight and non-drying.',
    stock: 30,
  },
  {
    id: 4,
    name: 'Essence Lash Princess Mascara',
    brand: 'Essence',
    category: 'makeup',
    price: 79,
    image:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80',
    description:
      'Cult-favorite mascara for dramatic volume and length. The conical brush reaches every lash from root to tip.',
    stock: 40,
    featured: true,
  },
  {
    id: 5,
    name: 'MAC Matte Lipstick — Ruby Woo',
    brand: 'MAC',
    category: 'makeup',
    price: 245,
    image:
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=80',
    description:
      'An iconic vivid blue-red with a retro matte finish. Highly pigmented and long-lasting.',
    stock: 8,
  },
  {
    id: 6,
    name: 'Maybelline Instant Age Rewind Concealer',
    brand: 'Maybelline',
    category: 'makeup',
    price: 119,
    image:
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=700&q=80',
    description:
      'Erase the look of dark circles and fine lines with this creamy, blendable concealer. Includes a built-in sponge applicator.',
    stock: 18,
  },
  {
    id: 7,
    name: 'Rimmel Stay Matte Pressed Powder',
    brand: 'Rimmel',
    category: 'makeup',
    price: 95,
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80',
    description:
      'Lightweight pressed powder that controls shine for up to 5 hours and leaves a smooth, natural finish.',
    stock: 25,
  },

  // ---------------- Skincare ----------------
  {
    id: 8,
    name: 'Nivea Soft Moisturizing Cream',
    brand: 'Nivea',
    category: 'skincare',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80',
    description:
      'Refreshingly light moisturizer enriched with Jojoba Oil and Vitamin E. Fast-absorbing for face, hands, and body.',
    stock: 50,
    featured: true,
  },
  {
    id: 9,
    name: 'Garnier Micellar Cleansing Water',
    brand: 'Garnier',
    category: 'skincare',
    price: 89,
    image:
      'https://images.unsplash.com/photo-1583241800698-e8ab01c85b6e?auto=format&fit=crop&w=700&q=80',
    description:
      'Gentle micellar water that removes makeup, cleanses, and refreshes skin in one step. No rinsing needed.',
    stock: 35,
  },
  {
    id: 10,
    name: 'La Roche-Posay Effaclar Duo+',
    brand: 'La Roche-Posay',
    category: 'skincare',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=700&q=80',
    description:
      'Corrective anti-imperfection care for oily, acne-prone skin. Reduces pimples and unclogs pores.',
    stock: 12,
    featured: true,
  },
  {
    id: 11,
    name: 'Vichy Mineral 89 Serum',
    brand: 'Vichy',
    category: 'skincare',
    price: 329,
    image:
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=80',
    description:
      'Daily booster with 89% Vichy Volcanic Water and Hyaluronic Acid. Strengthens and plumps the skin.',
    stock: 9,
  },
  {
    id: 12,
    name: 'CeraVe Hydrating Cleanser',
    brand: 'CeraVe',
    category: 'skincare',
    price: 179,
    image:
      'https://images.unsplash.com/photo-1556228852-80c9e2f7d4c4?auto=format&fit=crop&w=700&q=80',
    description:
      'Non-foaming cleanser with three essential ceramides and hyaluronic acid. Cleanses and hydrates without stripping.',
    stock: 20,
  },
  {
    id: 13,
    name: 'The Ordinary Niacinamide 10% + Zinc',
    brand: 'The Ordinary',
    category: 'skincare',
    price: 149,
    image:
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=80',
    description:
      'High-strength vitamin and mineral blemish formula that reduces the appearance of skin blemishes and congestion.',
    stock: 16,
  },

  // ---------------- Haircare ----------------
  {
    id: 14,
    name: "L'Oréal Elvive Total Repair Shampoo",
    brand: "L'Oréal",
    category: 'haircare',
    price: 65,
    image:
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=700&q=80',
    description:
      'Repairing shampoo for damaged hair. Restores strength and shine with Pro-Keratin and Ceramide.',
    stock: 45,
  },
  {
    id: 15,
    name: 'Garnier Fructis Hair Food Aloe',
    brand: 'Garnier',
    category: 'haircare',
    price: 79,
    image:
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=700&q=80',
    description:
      '3-in-1 hair mask, conditioner, and leave-in treatment with 98% natural origin ingredients. For normal to dry hair.',
    stock: 28,
    featured: true,
  },
  {
    id: 16,
    name: 'Pure Argan Oil Hair Treatment',
    brand: 'Belle Naturals',
    category: 'haircare',
    price: 119,
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80',
    description:
      '100% pure Moroccan argan oil. Nourishes, repairs split ends, and adds shine without weighing hair down.',
    stock: 22,
  },
  {
    id: 17,
    name: 'Head & Shoulders Anti-Dandruff',
    brand: 'Head & Shoulders',
    category: 'haircare',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=700&q=80',
    description:
      'Classic anti-dandruff shampoo that fights flakes and itch from the first wash. Gentle enough for daily use.',
    stock: 60,
  },
  {
    id: 18,
    name: 'Schwarzkopf Gliss Hair Repair',
    brand: 'Schwarzkopf',
    category: 'haircare',
    price: 69,
    image:
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=700&q=80',
    description:
      'Liquid keratin hair repair treatment for deeply damaged hair. Rebuilds and strengthens from within.',
    stock: 33,
  },

  // ---------------- Perfumes ----------------
  {
    id: 19,
    name: 'Dior Sauvage Eau de Parfum',
    brand: 'Dior',
    category: 'perfumes',
    price: 899,
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80',
    description:
      'A radically fresh composition with radiant top notes of Calabrian bergamot and a powerful Ambroxan base.',
    stock: 6,
    featured: true,
  },
  {
    id: 20,
    name: 'Chanel Coco Mademoiselle',
    brand: 'Chanel',
    category: 'perfumes',
    price: 1290,
    image:
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=700&q=80',
    description:
      'An oriental freshness — a bold, independent woman in a bottle. Notes of orange, jasmine, and patchouli.',
    stock: 4,
  },
  {
    id: 21,
    name: "Yves Rocher Quelques Notes d'Amour",
    brand: 'Yves Rocher',
    category: 'perfumes',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80',
    description:
      'A romantic floral bouquet with Damascus rose and pink peppercorn. Elegant and long-lasting.',
    stock: 11,
  },
  {
    id: 22,
    name: 'Adidas Ice Dive Eau de Toilette',
    brand: 'Adidas',
    category: 'perfumes',
    price: 119,
    image:
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=700&q=80',
    description:
      'Fresh, energetic fragrance for everyday wear. Marine notes with a woody base — perfect for the active man.',
    stock: 19,
  },

  // ---------------- Body Care ----------------
  {
    id: 23,
    name: 'Dove Nourishing Body Lotion',
    brand: 'Dove',
    category: 'body-care',
    price: 59,
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80',
    description:
      'Deeply nourishing body lotion with NutriumMoisture technology. Leaves skin soft for 24 hours.',
    stock: 40,
    featured: true,
  },
  {
    id: 24,
    name: 'Nivea Creme Tin',
    brand: 'Nivea',
    category: 'body-care',
    price: 35,
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80',
    description:
      'The legendary all-purpose cream in the iconic blue tin. Moisturizes face, hands, and body.',
    stock: 55,
  },
  {
    id: 25,
    name: 'The Body Shop Shea Body Butter',
    brand: 'The Body Shop',
    category: 'body-care',
    price: 189,
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80',
    description:
      'Rich, creamy body butter with Community Fair Trade shea butter from Ghana. For very dry skin.',
    stock: 15,
  },
  {
    id: 26,
    name: 'Palmolive Naturals Shower Gel',
    brand: 'Palmolive',
    category: 'body-care',
    price: 39,
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80',
    description:
      'Gentle shower gel with moisturizing milk and honey. Dermatologically tested and pH-balanced.',
    stock: 70,
  },
]

// Helpers used across pages.

export function getProductById(id) {
  return products.find((p) => String(p.id) === String(id))
}

export function getProductsByCategory(slug) {
  if (!slug || slug === 'all') return products
  return products.filter((p) => p.category === slug)
}

export function getFeaturedProducts(limit = 8) {
  return products.filter((p) => p.featured).slice(0, limit)
}

export default products