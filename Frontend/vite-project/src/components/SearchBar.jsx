import { Search, Sparkles } from 'lucide-react'

export default function SearchBar({ placeholder = 'Ask me what you\'re looking for...', className = '' , value ,onChange,onSubmit}) {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div className={`flex items-center gap-3 rounded-[18px] border border-slate-200 bg-white px-3 py-2.5 shadow-sm ${className}`}>
      <Search className="h-4 w-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
      />
      <button onClick={onSubmit} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D94FB] text-white shadow-sm transition hover:bg-[#0b84e0]">
        <Sparkles className="h-4 w-4" />
      </button>
    </div>
  )
}
