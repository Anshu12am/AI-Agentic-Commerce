import { ArrowUp, Sparkles } from 'lucide-react'

export default function ChatInput() {
  return (
    <div className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-white p-2 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf7ff] text-[#0D94FB]">
        <Sparkles className="h-4 w-4" />
      </div>
      <input
        type="text"
        placeholder="Ask me anything..."
        className="flex-1 border-0 bg-transparent px-2 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
      />
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D94FB] text-white shadow-sm">
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  )
}
