import MainLayout from '../layouts/MainLayout'
import OrderCard from '../components/OrderCard'
import { useState,useEffect } from 'react'
import { getMyOrders } from '../services/order.api'

const filters = ['All Orders']

export default function Orders() {

  const [orders, setOrders] = useState([])
  const [activeFilter, setActiveFilter] = useState('All Orders')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    const fetchOrders = async () =>{
      try{
        
        const data = await getMyOrders();


        setOrders(data.orders || [])
      }catch (error) {
        console.error('Failed to fetch orders:', error)
        setError(
          error.response?.data?.message ||
          'Failed to load orders'
        )
      } finally {
        setLoading(false)
      }
     
    }
     fetchOrders()
  },[])

  const filteredOrders =
    activeFilter === 'All Orders'
      ? orders
      : orders.filter(
          (order) =>
            order.status.toLowerCase() ===
            activeFilter.toLowerCase()
        )

  return (
    <MainLayout>
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold font-black tracking-[-0.05em] text-slate-900">My Orders</h1>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full px-4 py-2 text-sm font-medium ${activeFilter === filter ? 'bg-[#0D94FB] text-white' : 'bg-slate-100 text-slate-600'}`}>
              {filter}
            </button>
          ))}
        </div>

       {loading && (
          <div className="py-12 text-center text-slate-500">
            Loading orders...
          </div>
        )}

        {!loading && error && (
          <div className="py-12 text-center text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && filteredOrders.length === 0 && (
          <div className="py-12 text-center">
            <h2 className="text-xl font-semibold text-slate-800">
              No orders found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Your orders will appear here after a successful payment.
            </p>
          </div>
        )}

        {!loading && !error && filteredOrders.length > 0 && (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
