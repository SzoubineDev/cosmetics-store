import { categories } from '../../data/categories'
import { products } from '../../data/products'

function CategoryFilter({ activeCategory, onCategoryChange }) {
  const items = [
    { slug: 'all', name: 'All products', count: products.length },
    ...categories.map((c) => ({
      slug: c.slug,
      name: c.name,
      count: products.filter((p) => p.category === c.slug).length,
    })),
  ]

  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">
        Categories
      </h3>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = item.slug === activeCategory
          return (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => onCategoryChange(item.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span>{item.name}</span>
                <span
                  className={`text-xs ${
                    isActive ? 'text-brand-600' : 'text-neutral-400'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryFilter