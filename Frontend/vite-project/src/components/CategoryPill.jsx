export default function CategoryPill({ label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? 'border-[#0D94FB] bg-[#0D94FB] text-white shadow-sm'
          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
      }`}
    >
      {label}
    </button>
  )
}
