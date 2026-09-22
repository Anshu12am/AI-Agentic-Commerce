import { Minus, Plus, X } from 'lucide-react'
import { updateCartItem,removeFromCart } from '../services/cart.api'
import { useCart } from '../hooks/useCart'

export default function CartItem({ item, onCartUpdate }) {

  const product = item.product;
  const { removeItem } = useCart()

  const handleDecrease = async () => {
    if (item.quantity <= 1) return
    try {
      await updateCartItem({
        productId: product._id,
        quantity: item.quantity - 1,
      })

      onCartUpdate()
    } catch (error) {
      console.error('Failed to decrease quantity:', error)
    }
  }


  const handleIncrease = async () => {
  if (item.quantity >= product.stock) {
    console.log('Maximum stock reached')
    return
  }

  try {
    await updateCartItem({
      productId: product._id,
      quantity: item.quantity + 1,
    })

    onCartUpdate()
  } catch (error) {
    console.error(
      'Failed to increase quantity:',
      error.response?.data || error
    )
  }
}

  const handleRemove = async () => {
    try {
      await removeItem(product._id)

      onCartUpdate()
    } catch (error) {
      console.error('Failed to remove product:', error)
    }
  }

  return (
    <div className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-white p-3">
      <img src={product.images?.[0]} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{product.name}</h4>
            <p className="text-xs text-slate-500">{product.category}</p>
          </div>
          <button onClick={handleRemove} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
            <button onClick={handleDecrease} disabled={item.quantity <= 1} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white"><Minus className="h-3.5 w-3.5" /></button>
            <span className="min-w-5 text-center text-sm font-medium">{item.quantity}</span>
            <button onClick={handleIncrease} disabled={item.quantity >= product.stock} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white"><Plus className="h-3.5 w-3.5" /></button>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-900">₹{(product.price*item.quantity).toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
