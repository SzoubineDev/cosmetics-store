import { useMemo } from 'react'
import { products } from '../../data/products'

function BrandFilter({ activeCategory, activeBrand, onBrandChange }) {
  const brandItems = useMemo(() => {
    const source =
      activeCategory === 'all'
        ? products
        : products.filter((p) => p.category === activeCategory)

    const counts = {}
    source.forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1
    })

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [activeCategory])

  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">
        Brands
      </h3>

      <ul className="space-y-1">
        <li>
          <button
            type="button"
            onClick={() => onBrandChange('')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
              !activeBrand
                ? 'bg-brand-50 text-brand-700 font-medium'
                : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <span>All brands</span>
          </button>
        </li>

        {brandItems.map(({ name, count }) => {
          const isActive = name === activeBrand
          return (
            <li key={name}>
              <button
                type="button"
                onClick={() => onBrandChange(isActive ? '' : name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span className="truncate">{name}</span>
                <span
                  className={`text-xs ml-2 shrink-0 ${
                    isActive ? 'text-brand-600' : 'text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BrandFilter