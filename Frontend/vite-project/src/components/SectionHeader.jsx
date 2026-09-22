export default function SectionHeader({ title, action, className = '' }) {
  return (
    <div className={`mb-4 flex items-center justify-between ${className}`}>
      <h2 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-slate-900">{title}</h2>
      {action && <div>{action}</div>}
    </div>
  )
}
