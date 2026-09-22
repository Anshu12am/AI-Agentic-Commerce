import MainLayout from '../layouts/MainLayout'
import Button from '../components/Button'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart } from '../services/cart.api'
import { createOrder } from '../services/order.api.js'
import { createRazorpayOrder,verifyPayment } from '../services/payment.api.js'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context.jsx'


export default function Checkout() {

  const { user } = useContext(AuthContext);
  const [cartItems,setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate();

   useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart()
        setCartItems(data.cart?.items || [])
      } catch (error) {
        console.error('Failed to fetch checkout cart:', error)

        setError(
          error.response?.data?.message ||
          'Failed to load checkout details'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const handlePayNow = async () => {
    try{
      const orderData = await createOrder();
      const orderId = orderData.order._id

      const razorpayData = await createRazorpayOrder(orderId)


      const options = {
  key: razorpayData.key,
  amount: razorpayData.order.amount,
  currency: razorpayData.order.currency,
  name: "ShopAgent",
  description: "ShopAgent Order",
  order_id: razorpayData.order.id,

  prefill: {
    name: user?.name || "",
    email: user?.email || "",
  },

  theme: {
    color: "#0D94FB",
  },

  handler: async function (response) {
    try{
    console.log("Payment successful:", response);

    const verificationData = await verifyPayment({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    })

    console.log(
        "Payment verification response:",
        verificationData
      )

      navigate('/orders')
  } catch (error) {
    console.error("Payment verification failed:", error)

    setError(
      error.response?.data?.message ||
      "Payment verification failed"
    )
  }
  },
};

console.log("Razorpay object:", window.Razorpay)

if (!window.Razorpay) {
  setError("Razorpay Checkout failed to load")
  return
}

const razorpay = new window.Razorpay(options);


razorpay.open();

    } catch (error) {
    console.error("Payment initialization failed:", error)

    setError(
      error.response?.data?.message ||
      "Unable to start payment"
    )
  }
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const delivery = 0
  const total = subtotal + delivery

   if (loading) {
    return (
      <MainLayout>
        <div className="rounded-[28px] border border-slate-200 bg-white p-8">
          <p className="text-slate-500">Loading checkout...</p>
        </div>
      </MainLayout>
    )
  }

   if (error) {
    return (
      <MainLayout>
        <div className="rounded-[28px] border border-slate-200 bg-white p-8">
          <p className="text-red-500">{error}</p>
        </div>
      </MainLayout>
    )
  }

   if (!cartItems.length) {
    return (
      <MainLayout>
        <div className="rounded-[28px] border border-slate-200 bg-white p-8">
          <h1 className="text-3xl font-black tracking-[-0.05em] text-slate-900">
            Checkout
          </h1>

          <p className="mt-4 text-slate-500">
            Your cart is empty.
          </p>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] sm:p-6">
        <h1 className="text-3xl font-medium font-black tracking-[-0.05em] text-slate-900">Checkout</h1>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
           <div className="mb-3 text-lg font-semibold text-slate-900">
            1. Customer Information
           </div>

           <div className="rounded-[18px] bg-white p-4 text-sm text-slate-600">
             <div className="font-semibold text-slate-900">
            {user?.name}
            </div>

            <div className="mt-1">
             {user?.email}
            </div>
           </div>
          </div>

             <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">

              <div className="mb-3 text-lg font-semibold text-slate-900">
                2. Payment Method
              </div>

              <div className="space-y-3">

                <label className="flex items-center gap-3 rounded-[16px] bg-white p-3 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                  />

                  <span>Razorpay</span>
                </label>

              </div>
            </div>

          </div>

          <aside className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">

            <div className="mb-4 text-lg font-semibold text-slate-900">
              Order Summary
            </div>

            <div className="space-y-3">

              {cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between gap-3 rounded-[16px] bg-white p-3 text-sm"
                >

                  <div className="flex min-w-0 items-center gap-3">

                    <img
                      src={item.product.images?.[0]}
                      alt={item.product.name}
                      className="h-12 w-12 shrink-0 rounded-xl object-cover"
                    />

                    <div className="min-w-0">
                      <div className="truncate font-medium text-slate-900">
                        {item.product.name}
                      </div>

                      <div className="mt-1 text-xs text-slate-500">
                        Qty: {item.quantity}
                      </div>
                    </div>

                  </div>

                  <div className="shrink-0 font-semibold text-slate-900">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>

                </div>
              ))}

            </div>


            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Subtotal</span><span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex items-center justify-between"><span>Delivery</span><span className="font-semibold text-slate-900">-₹{delivery.toLocaleString('en-IN')}</span></div>
              <div className="flex items-center justify-between"><span>Delivery</span><span className="font-semibold text-slate-900">₹0</span></div>
              <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-base font-semibold text-slate-900"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            </div>

            <Button onClick={handlePayNow} size="lg" className="mt-6 w-full rounded-full">Pay Now</Button>
          </aside>
        </div>
      </div>
    </MainLayout>
  )
}
