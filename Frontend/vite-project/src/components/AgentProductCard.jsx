import Button from './Button'

export default function AgentProductCard({ product }) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-white p-3">
      <img src={product.image} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-slate-900">{product.name}</div>
        <div className="mt-1 text-xs text-slate-500">{product.reason}</div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="h-8 rounded-full px-3">View</Button>
            <Button size="sm" className="h-8 rounded-full px-3">Add</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
