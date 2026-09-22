import { Zap } from 'lucide-react'

export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D94FB] shadow-sm shadow-[#0D94FB]/30">
        <Zap className="h-4 w-4 text-white" />
      </div>
      <span className="text-[28px] font-bold tracking-[-0.05em] text-slate-900">ShopAgent</span>
    </div>
  )
}
