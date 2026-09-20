function HomePage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <p className="text-xs uppercase tracking-[0.2em] text-brand-600 font-medium">
        Your local beauty store
      </p>

      <h1 className="mt-4 text-4xl md:text-6xl font-display text-neutral-900 leading-tight">
        Beauty essentials,
        <br />
        <span className="text-brand-700">delivered to your door.</span>
      </h1>

      <p className="mt-6 max-w-xl text-neutral-600 leading-relaxed">
        Browse our curated collection of makeup, skincare, and haircare
        products. Order in seconds — straight through WhatsApp.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <button className="px-6 py-3 rounded-full bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors">
          Shop now
        </button>
        <button className="px-6 py-3 rounded-full border border-neutral-300 text-sm font-medium text-neutral-700 hover:border-neutral-400 transition-colors">
          View categories
        </button>
      </div>

      <p className="mt-16 text-xs text-neutral-400">
        Phase 1 complete — layout and styling are working.
      </p>
    </section>
  )
}

export default HomePage