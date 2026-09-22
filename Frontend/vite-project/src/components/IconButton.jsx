export default function IconButton({ icon: Icon, className = '', ...props }) {
  return (
    <button
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900 ${className}`}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}
