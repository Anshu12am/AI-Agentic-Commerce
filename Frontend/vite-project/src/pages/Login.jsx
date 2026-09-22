import Logo from '../components/Logo'
import Button from '../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Bot, ShieldCheck, Sparkles, Search, Zap } from 'lucide-react'

export default function Login() {

  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const success = await handleLogin({ email, password })

    if (success) {
      toast.success("Login successful")
      navigate("/")
    } else {
      toast.error('login failed')
    }

    setIsSubmitting(false)
  }

  const featureList = [
    {
      icon: Bot,
      title: 'AI Shopping Agent',
      description: 'Tell us what you need, and let AI find the best options for you.'
    },
    {
      icon: Sparkles,
      title: 'Personalized Recommendations',
      description: 'Get explainable product suggestions, upsells and better deals.'
    },
    {
      icon: Search,
      title: 'Smart Product Discovery',
      description: 'Search and discover products based on your needs and budget.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      description: 'Add to cart and pay securely with Razorpay.'
    },
    {
      icon: Zap,
      title: 'AI-Driven Shopping',
      description: 'A conversational AI experience designed to make shopping simpler.'
    }
  ]

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#edf5fb] lg:h-screen lg:overflow-hidden">

      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:h-full lg:grid-cols-[1.12fr_0.88fr]">

        {/* ================= LEFT SIDE ================= */}

        <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2f9f] via-[#0d5ed0] to-[#1086ff] px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-7">

          {/* Background glow */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.18),_transparent_30%)]" />

          <div className="relative z-10 flex h-full max-w-[640px] flex-col">

            {/* ShopAgent Logo */}

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
                <Zap className="h-5 w-5 text-white" />
              </div>

              <span className="text-3xl font-bold tracking-[-0.06em] text-white">
                ShopAgent
              </span>

            </div>


            {/* Hero Content */}

            <div className="mt-5">

              <h1 className="max-w-[570px] text-4xl font-bold font-black leading-[0.94] tracking-[-0.06em] text-white sm:text-5xl lg:text-[50px]">

                AI-Powered

                <span className="block ">
                  Agentic Commerce
                </span>

                <span className="block">
                  for <span className="text-[#0af291]">Smarter</span> Shopping.
                </span>

              </h1>


              <p className="mt-4 max-w-[560px] text-sm font-medium leading-6 text-blue-50/90 sm:text-base">
                Discover products, get personalized recommendations,
                chat with your AI shopping agent and checkout securely —
                all in one place.
              </p>

            </div>


            {/* Features */}

            <div className="mt-5 space-y-2">

              {featureList.map(({ icon: Icon, title, description }) => (

                <div
                  key={title}
                  className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/5 px-3 py-2"
                >

                  {/* Feature Icon */}

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15">

                    <Icon className="h-4 w-4" />

                  </div>


                  {/* Feature Content */}

                  <div>

                    <h2 className="text-base font-semibold leading-5 text-white">
                      {title}
                    </h2>

                    <p className="text-xs leading-5 text-blue-50/80">
                      {description}
                    </p>

                  </div>

                </div>

              ))}

            </div>


           
          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="flex min-h-screen items-center justify-center bg-[#edf5fb] p-4 sm:p-6 lg:h-full lg:min-h-0 lg:p-8">

          <div className="w-full max-w-[500px] rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.03)] sm:p-6">

            {/* Logo */}

            <div className="mb-4 flex justify-center">
              <Logo />
            </div>


            {/* Heading */}

            <h1 className="text-center text-3xl font-black tracking-[-0.05em] text-slate-900">
              Welcome back
            </h1>


            {/* Login Form */}

            <form onSubmit={handleSubmit}>

              <div className="mt-5 space-y-3">

                {/* Email */}

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email
                  </label>

                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#0D94FB] focus:ring-2 focus:ring-[#0D94FB]/10"
                    placeholder="you@example.com"
                  />

                </div>


                {/* Password */}

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#0D94FB] focus:ring-2 focus:ring-[#0D94FB]/10"
                    placeholder="••••••••"
                  />

                </div>

              </div>


              {/* Remember Me */}

              <div className="mt-3 flex items-center justify-between text-sm text-slate-600">

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300"
                  />

                  Remember me

                </label>

              </div>


              {/* Login Button */}

              <Button
                size="lg"
                className="mt-5 w-full rounded-full text-[18px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

            </form>


            {/* Register Link */}

            <Link
              to="/register"
              className="mt-5 block text-center text-sm text-slate-600"
            >

              <span>
                Don't have an account?
              </span>

              <span className="font-semibold text-[#0D94FB]">
                register
              </span>

            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}