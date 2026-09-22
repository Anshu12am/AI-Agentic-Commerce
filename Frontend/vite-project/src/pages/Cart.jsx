import { ArrowLeft, Minus, Plus, X } from 'lucide-react'
import MainLayout from '../layouts/MainLayout'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import { getCart } from '../services/cart.api'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Cart() {

  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshCart,setRefreshCart] = useState(0);

  useEffect(() => {
    const fetchCart = async () =>{
      try{
        const data = await getCart()

        setCartItems(data.cart?.items || [])
      } catch (error) {
        console.error('Failed to fetch cart:', error)

        setError(
          error.response?.data?.message || 'Failed to load cart'
        )
      } finally {
        setLoading(false)
      }
    
    }
    fetchCart()
  },[refreshCart])

   const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const discount = 0
  const delivery = 0
  const total = subtotal - discount + delivery

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-slate-500">
            Loading your cart...
          </p>
        </div>
      </MainLayout>
    )
  }

   if (error) {
    return (
      <MainLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Unable to load cart
            </h2>

            <p className="mt-2 text-sm text-red-500">
              {error}
            </p>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] sm:p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xl font-medium font-black tracking-[-0.04em] text-slate-900">My Cart ({cartItems.length})</div>
            </div>
            <button onClick={() => navigate('/products')}  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </button>
          </div>

         {cartItems.length === 0 ? (
  <p className="py-20 text-center text-sm text-slate-500">
    Your cart is empty.
  </p>
) : (
  <div className="space-y-3">
    {cartItems.map((item) => (
      <CartItem
        key={item.product._id}
        item={item}
        onCartUpdate={() => setRefreshCart(prev => prev + 1)}
      />
    ))}
  </div>
)}
        </section>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.03)]">
          <h2 className="text-2xl font-medium font-black tracking-[-0.04em] text-slate-900">Order Summary</h2>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between"><span>Subtotal</span><span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span></div>
            <div className="flex items-center justify-between"><span>Discount</span><span className="font-semibold text-slate-900">-₹{discount.toLocaleString('en-IN')}</span></div>
            <div className="flex items-center justify-between"><span>Delivery</span><span className="font-semibold text-slate-900">₹{delivery.toLocaleString('en-IN')}</span></div>
            <div className="border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
              <div className="flex items-center justify-between"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            </div>
          </div>

          <Button
  disabled={cartItems.length === 0}
  onClick={() => navigate('/checkout')}
  className={`w-full rounded-full px-6 py-4 text-sm font-semibold ${
    cartItems.length === 0
      ? 'cursor-not-allowed'
      : 'bg-[#0D94FB] text-white'
  }`}
>
  Proceed to Checkout
</Button>
          <p className="mt-3 text-center text-[11px] text-slate-500">Secure checkout with trusted payment partners</p>
        </aside>
      </div>
    </MainLayout>
  )
}
