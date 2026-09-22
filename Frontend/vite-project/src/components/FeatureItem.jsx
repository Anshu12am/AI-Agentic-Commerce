export default function FeatureItem({ icon: Icon, title, description, color = '#0D94FB' }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#edf7ff]" style={{ color }}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div>
        <div className="text-[11px] font-semibold text-slate-800">{title}</div>
        <div className="text-[10px] text-slate-500">{description}</div>
      </div>
    </div>
  )
}
