export default function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-white text-slate-600 border border-slate-200',
    primary: 'bg-[#edf7ff] text-[#0D94FB] border border-[#d9efff]',
    success: 'bg-[#eafaf3] text-[#0b8e63] border border-[#cfeee1]',
    subtle: 'bg-slate-100 text-slate-600 border border-slate-200'
  }

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[variant]} ${className}`}>{children}</span>
}
