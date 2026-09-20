import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl aspect-[3/4] bg-neutral-100"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-end text-white">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/70 truncate">
            {category.productCount} items
          </p>
          <span className="hidden sm:flex w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
        <h3 className="mt-1.5 sm:mt-2 font-display text-base sm:text-xl lg:text-2xl leading-tight">
          {category.name}
        </h3>
        <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-white/80 line-clamp-2">
          {category.tagline}
        </p>
      </div>
    </Link>
  )
}

export default CategoryCard