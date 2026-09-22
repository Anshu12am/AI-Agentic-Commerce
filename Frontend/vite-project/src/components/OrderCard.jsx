import Badge from './Badge'
import Button from './Button'


export default function OrderCard({ order }) {
  const statusColors = {
    delivered: 'success',
    shipped: 'primary',
    pending: 'default',
    confirmed: 'primary',
    cancelled: 'subtle',
  }



  const status = order.status.toLowerCase()

  const itemNames = order.items.map((item) => `${item.product?.name || 'Product'} × ${item.quantity}`)
    .join(', ')

  return (
    <div className="flex flex-col gap-3 rounded-[20px] border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-xs font-medium text-slate-500">{order._id}</div>
        <div className="mt-1 text-sm text-slate-600"> {new Date(order.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}</div>
      </div>
      <div className="flex-1 text-sm text-slate-600 md:px-6">
        {itemNames}
      </div>
      <div className="text-sm font-semibold text-slate-900">₹{order.totalAmount.toLocaleString('en-IN')}</div>
      <div>
        <Badge variant={statusColors[order.status]}>{status}</Badge>
      </div>

    </div>
  )
}
