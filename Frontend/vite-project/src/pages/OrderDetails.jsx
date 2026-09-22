import MainLayout from '../layouts/MainLayout'
import OrderStatusBadge from '../components/OrderStatusBadge'
import { orderTimeline } from '../data/orders'

export default function OrderDetails() {
  return (
    <MainLayout>
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] sm:p-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Order details</div>
            <h1 className="mt-1 text-3xl font-black tracking-[-0.05em] text-slate-900">ORD#012345</h1>
          </div>
          <OrderStatusBadge status="Delivered" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 text-lg font-semibold text-slate-900">Products</div>
            <div className="space-y-3">
              {[
                { name: 'ASUS Vivobook 15', qty: 1, price: 54999 },
                { name: 'Sony WH-1000XM5', qty: 1, price: 29999 }
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-[16px] bg-white p-3 text-sm text-slate-600">
                  <div>
                    <div className="font-medium text-slate-900">{item.name}</div>
                    <div>Qty: {item.qty}</div>
                  </div>
                  <div className="font-semibold text-slate-900">₹{item.price.toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 text-lg font-semibold text-slate-900">Order summary</div>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Order date</span><span className="font-medium text-slate-900">Sep 2025</span></div>
              <div className="flex items-center justify-between"><span>Delivery</span><span className="font-medium text-slate-900">123, Green Park, New Delhi</span></div>
              <div className="flex items-center justify-between"><span>Payment</span><span className="font-medium text-slate-900">Razorpay</span></div>
              <div className="flex items-center justify-between"><span>Total</span><span className="font-bold text-slate-900">₹18,597</span></div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[22px] border border-slate-200 bg-white p-4">
          <div className="mb-4 text-lg font-semibold text-slate-900">Delivery status</div>
          <div className="grid gap-4 md:grid-cols-5">
            {orderTimeline.map((step, index) => (
              <div key={step.label} className="relative flex flex-col gap-2 border-l border-slate-200 pl-4 first:border-l-0 first:pl-0">
                <div className={`h-3 w-3 rounded-full ${step.done ? 'bg-[#0D94FB]' : 'bg-slate-200'}`} />
                <div className="text-sm font-medium text-slate-900">{step.label}</div>
                <div className="text-xs text-slate-500">{step.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
