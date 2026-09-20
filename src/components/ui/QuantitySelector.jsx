import { Minus, Plus } from 'lucide-react'

function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
}) {
  const decrease = () => {
    if (value > min) onChange(value - 1)
  }

  const increase = () => {
    if (value < max) onChange(value + 1)
  }

  const isSmall = size === 'sm'
  const btnSize = isSmall ? 'w-8 h-8' : 'w-10 h-10'
  const inputWidth = isSmall ? 'w-10 text-sm' : 'w-12 text-base'
  const iconSize = isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'

  return (
    <div className="inline-flex items-center rounded-full border border-neutral-300 bg-white overflow-hidden">
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`${btnSize} flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors`}
      >
        <Minus className={iconSize} />
      </button>

      <span
        className={`${inputWidth} text-center font-medium text-neutral-900 select-none`}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`${btnSize} flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors`}
      >
        <Plus className={iconSize} />
      </button>
    </div>
  )
}

export default QuantitySelector