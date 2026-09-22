import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
   if (products.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-[22px] border border-dashed border-slate-200">
        <div className="text-center">
          <h3 className="font-semibold text-slate-900">
            No products found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
