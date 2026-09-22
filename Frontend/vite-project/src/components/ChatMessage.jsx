export default function ChatMessage({ role, text, type = 'default' }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-[18px] bg-[#0D94FB] px-4 py-3 text-sm text-white shadow-sm">
          {text}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf7ff] text-[#0D94FB]">
        {type === 'assistant' ? 'AI' : '✦'}
      </div>
      <div className="max-w-[80%] rounded-[18px] bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-700">
        {text}
      </div>
    </div>
  )
}
