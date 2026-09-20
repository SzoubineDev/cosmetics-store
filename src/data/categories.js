// Mock category data.
// When the Laravel backend is ready, replace this file with an API call:
//   GET /api/categories
// The shape of each object should stay identical so components don't change.

export const categories = [
  {
    id: 1,
    slug: 'makeup',
    name: 'Makeup',
    tagline: 'Foundation, mascara & more',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    productCount: 32,
  },
  {
    id: 2,
    slug: 'skincare',
    name: 'Skincare',
    tagline: 'Cleansers, serums, creams',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    productCount: 28,
  },
  {
    id: 3,
    slug: 'haircare',
    name: 'Haircare',
    tagline: 'Shampoos, oils & masks',
    image:
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=800&q=80',
    productCount: 21,
  },
  {
    id: 4,
    slug: 'perfumes',
    name: 'Perfumes',
    tagline: 'Signature scents for her & him',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    productCount: 17,
  },
  {
    id: 5,
    slug: 'body-care',
    name: 'Body Care',
    tagline: 'Lotions, scrubs, hand creams',
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
    productCount: 14,
  },
]

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug)
}