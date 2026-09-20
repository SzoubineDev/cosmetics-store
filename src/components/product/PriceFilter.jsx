export const PRICE_RANGES = [
  {
    id: 'under-100',
    label: 'Under 100 MAD',
    test: (p) => p.price < 100,
  },
  {
    id: '100-250',
    label: '100 – 250 MAD',
    test: (p) => p.price >= 100 && p.price < 250,
  },
  {
    id: '250-500',
    label: '250 – 500 MAD',
    test: (p) => p.price >= 250 && p.price < 500,
  },
  {
    id: 'over-500',
    label: 'Over 500 MAD',
    test: (p) => p.price >= 500,
  },
]

function PriceFilter({ activePrice, onPriceChange }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium mb-4">
        Price
      </h3>

      <ul className="space-y-1">
        <li>
          <button
            type="button"
            onClick={() => onPriceChange('')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !activePrice
                ? 'bg-brand-50 text-brand-700 font-medium'
                : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            All prices
          </button>
        </li>

        {PRICE_RANGES.map((range) => {
          const isActive = range.id === activePrice
          return (
            <li key={range.id}>
              <button
                type="button"
                onClick={() => onPriceChange(isActive ? '' : range.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {range.label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PriceFilter