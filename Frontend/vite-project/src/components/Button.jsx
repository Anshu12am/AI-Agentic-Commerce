export default function Button({ children, variant = 'primary', className = '', size = 'md', ...props }) {
  const styles = {
    primary: 'bg-[#0D94FB] text-white border border-[#0D94FB] hover:bg-[#0b84e0]',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-700 border border-slate-200 hover:bg-slate-50',
    muted: 'bg-[#edf7ff] text-[#0D94FB] border border-[#d9efff] hover:bg-[#dff2ff]'
  }

  const sizes = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-sm',
    xl: 'h-14 px-6 text-base'
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-medium transition ${sizes[size]} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
