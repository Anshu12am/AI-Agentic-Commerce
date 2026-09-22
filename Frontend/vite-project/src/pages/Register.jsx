import Logo from '../components/Logo'
import Button from '../components/Button'
import { useState } from 'react'
import { Bot, Search, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function Register() {

  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const success = await handleRegister({
      name,
      email,
      password,
      confirmPassword
    })

    if (success) {
      toast.success("Registration successful")
      navigate("/")
    } else {
      toast.error("Registration failed")
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

            {/* Logo */}
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

                <span className="block text-[#0af291]">
                  Agentic Commerce
                </span>

                <span className="block">
                  for Smarter Shopping.
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

                  {/* Icon */}

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15">

                    <Icon className="h-4 w-4" />

                  </div>


                  {/* Text */}

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
              Create your account
            </h1>


            {/* Form */}

            <form onSubmit={handleSubmit}>

              <div className="mt-5 space-y-3">

                {/* Name */}

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full name
                  </label>

                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#0D94FB] focus:ring-2 focus:ring-[#0D94FB]/10"
                    placeholder="Your name"
                  />

                </div>


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
                    placeholder="Create a strong password"
                  />

                </div>


                {/* Confirm Password */}

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Confirm password
                  </label>

                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className="w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#0D94FB] focus:ring-2 focus:ring-[#0D94FB]/10"
                    placeholder="Confirm your password"
                  />

                </div>

              </div>


              {/* Button */}

              <Button
                size="lg"
                className="mt-5 w-full rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>

            </form>


            {/* Login Link */}

            <Link
              to="/login"
              className="mt-5 block text-center text-sm text-slate-600"
            >
              <span>
                Already have an account?
              </span>

              <span className="font-semibold text-[#0D94FB]">
                login
              </span>

            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}