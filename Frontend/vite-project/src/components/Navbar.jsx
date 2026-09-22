import { Link, NavLink,useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { ShoppingCart, User, Menu, Bot, LogOut} from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import toast from 'react-hot-toast'


const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Categories', to: '/products' },
]

export default function Navbar() {

  const { user, handleLogout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false)



  const handleLogoutClick = async() => {
    await handleLogout();

    setShowProfileMenu(false);
    toast.success("Logout successfull");

    navigate('/')
  }


  return (
    <header className="rounded-[18px] bg-white/95 px-1 py-2.5">
      <div className="flex items-center justify-between gap-3">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-2">
          <Logo className="scale-[1]" />
        </Link>


        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-1 md:flex">

          {/* Always visible */}

          {navItems.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#0D94FB] text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}


          {/* Logged-in navigation */}

          {user && (
            <>
              {/* Orders */}

              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#0D94FB] text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                Orders
              </NavLink>


              {/* Ask ShopAgent */}

              <Link
                to="/agent"
                className="ml-2 flex items-center gap-1.5 rounded-full bg-[#0D94FB] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0785e3]"
              >
                <Bot className="h-4 w-4" />
                Ask ShopAgent
              </Link>
            </>
          )}

        </nav>


        {/* Right Side Actions */}

        <div className="flex items-center gap-2">

        


          {/* Cart - only logged in */}

         {/* Cart - only logged in */}
{user && (
  <Link
    to="/cart"
    className="relative flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
  >
    <ShoppingCart className="h-3.5 w-3.5" />

    {cartCount > 0 && (
      <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0D94FB] px-1 text-[9px] font-bold text-white">
        {cartCount > 99 ? '99+' : cartCount}
      </span>
    )}
  </Link>
)}


          {/* Profile / Login */}

         {user ? (
  <div className="relative">

    {/* User Icon */}

    <button
      onClick={() => setShowProfileMenu((prev) => !prev)}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
    >
      <User className="h-3.5 w-3.5" />
    </button>


    {/* Dropdown */}

    {showProfileMenu && (
      <div className="absolute right-0 top-10 z-50 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">

        <div
          to="/profile"
          onClick={() => setShowProfileMenu(false)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <User className="h-4 w-4" />
          {user.name}
        </div>


        <button
          onClick={handleLogoutClick}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>

      </div>
    )}

  </div>
) : (
  <Link
    to="/login"
    className="rounded-full bg-[#0D94FB] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-[#0785e3]"
  >
    Login
  </Link>
)}


          {/* Mobile Menu */}

          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 md:hidden"
          >
            <Menu className="h-3.5 w-3.5" />
          </button>

        </div>

      </div>
    </header>
  )
}