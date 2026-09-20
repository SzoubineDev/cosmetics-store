import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800',
  outline:
    'border border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
  ghost: 'text-brand-700 hover:bg-brand-50',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-base',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button