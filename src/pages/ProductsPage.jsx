import { useMemo, useState } from 'react'
import { useSearchParams, useOutletContext } from 'react-router-dom'
import { SlidersHorizontal, X, Search as SearchIcon } from 'lucide-react'
import ProductGrid from '../components/product/ProductGrid'
import CategoryFilter from '../components/product/CategoryFilter'
import BrandFilter from '../components/product/BrandFilter'
import PriceFilter, { PRICE_RANGES } from '../components/product/PriceFilter'
import { products } from '../data/products'
import { categories } from '../data/categories'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name-asc', label: 'Name: A–Z' },
]

function ProductsPage() {
  const { cart } = useOutletContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('featured')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const query = searchParams.get('q') || ''
  const activeCategory = searchParams.get('category') || 'all'
  const activeBrand = searchParams.get('brand') || ''
  const activePrice = searchParams.get('price') || ''

  const activePriceRange = PRICE_RANGES.find((r) => r.id === activePrice)

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value == null) {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    })
    setSearchParams(next)
  }

  const handleCategoryChange = (slug) => {
    updateParams({
      category: slug === 'all' ? '' : slug,
      brand: '',
    })
    setShowMobileFilters(false)
  }

  const handleBrandChange = (brand) => {
    updateParams({ brand })
  }

  const handlePriceChange = (priceId) => {
    updateParams({ price: priceId })
  }

  const clearAllFilters = () => {
    setSearchParams({})
  }

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    let result = [...products]

    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (activeBrand) {
      result = result.filter((p) => p.brand === activeBrand)
    }

    if (activePriceRange) {
      result = result.filter(activePriceRange.test)
    }

    switch (sort) {
      case 'price-asc':
        return result.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return result.sort((a, b) => b.price - a.price)
      case 'name-asc':
        return result.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return result.sort(
          (a, b) => Number(b.featured || false) - Number(a.featured || false)
        )
    }
  }, [query, activeCategory, activeBrand, activePriceRange, sort])

  const headerTitle = query
    ? `Results for “${query}”`
    : activeCategory === 'all'
      ? 'All products'
      : categories.find((c) => c.slug === activeCategory)?.name || 'Products'

  const hasActiveFilters =
    Boolean(query) ||
    activeCategory !== 'all' ||
    Boolean(activeBrand) ||
    Boolean(activePrice)

  const FiltersPanel = (
    <div className="space-y-8">
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <BrandFilter
        activeCategory={activeCategory}
        activeBrand={activeBrand}
        onBrandChange={handleBrandChange}
      />
      <PriceFilter
        activePrice={activePrice}
        onPriceChange={handlePriceChange}
      />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14">
      <div className="mb-5 sm:mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-600 font-medium">
          Shop
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-display text-neutral-900 break-words">
          {headerTitle}
        </h1>
        <p className="mt-1.5 sm:mt-2 text-sm text-neutral-500">
          {filteredProducts.length} product
          {filteredProducts.length !== 1 && 's'}
        </p>
      </div>

      {hasActiveFilters && (
        <div className="mb-5 sm:mb-6 flex flex-wrap items-center gap-2">
          {query && (
            <FilterPill
              label={`Search: ${query}`}
              onRemove={() => updateParams({ q: '' })}
            />
          )}
          {activeCategory !== 'all' && (
            <FilterPill
              label={`Category: ${
                categories.find((c) => c.slug === activeCategory)?.name ||
                activeCategory
              }`}
              onRemove={() => handleCategoryChange('all')}
            />
          )}
          {activeBrand && (
            <FilterPill
              label={`Brand: ${activeBrand}`}
              onRemove={() => handleBrandChange('')}
            />
          )}
          {activePriceRange && (
            <FilterPill
              label={`Price: ${activePriceRange.label}`}
              onRemove={() => handlePriceChange('')}
            />
          )}
          <button
            type="button"
            onClick={clearAllFilters}
            className="ml-1 text-xs font-medium text-brand-700 hover:text-brand-800 underline underline-offset-2"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="lg:hidden mb-5 sm:mb-6 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowMobileFilters(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-neutral-300 text-sm font-medium text-neutral-700 hover:border-neutral-400 transition-colors shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="flex-1 min-w-0 px-4 py-2.5 rounded-full border border-neutral-300 bg-white text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24">{FiltersPanel}</div>
        </aside>

        <div>
          <div className="hidden lg:flex items-center justify-end mb-6">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-full border border-neutral-300 bg-white text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyState onClear={clearAllFilters} />
          ) : (
            <ProductGrid
              products={filteredProducts}
              onAddToCart={(product) => cart.addItem(product, 1)}
            />
          )}
        </div>
      </div>

      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-neutral-900/40"
            onClick={() => setShowMobileFilters(false)}
            aria-hidden="true"
          />
          <div className="relative ml-auto w-[88%] max-w-sm h-full bg-white shadow-xl p-5 sm:p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-neutral-900">Filters</h2>
              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5 text-neutral-700" />
              </button>
            </div>

            {FiltersPanel}
          </div>
        </div>
      )}
    </div>
  )
}

function FilterPill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-medium max-w-full">
      <span className="truncate">{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="w-4 h-4 rounded-full hover:bg-brand-100 flex items-center justify-center shrink-0"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}

function EmptyState({ onClear }) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 py-16 sm:py-20 text-center px-6">
      <SearchIcon className="w-10 h-10 text-neutral-300 mx-auto" />
      <h3 className="mt-4 text-lg font-display text-neutral-900">
        No products match your filters
      </h3>
      <p className="mt-2 text-sm text-neutral-500">
        Try removing a filter or search for something else.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex items-center px-5 py-2.5 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  )
}

export default ProductsPage