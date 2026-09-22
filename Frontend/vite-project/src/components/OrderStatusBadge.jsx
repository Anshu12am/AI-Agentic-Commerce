export default function OrderStatusBadge({ status }) {
  const map = {
    Delivered: 'bg-[#eafaf3] text-[#0b8e63] border border-[#cfeee1]',
    Shipped: 'bg-[#eaf4ff] text-[#0D94FB] border border-[#d6ebff]',
    Processing: 'bg-[#f3f4f6] text-slate-700 border border-slate-200',
    Cancelled: 'bg-[#f5f5f5] text-slate-500 border border-slate-200'
  }

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${map[status] || map.Processing}`}>{status}</span>
}
