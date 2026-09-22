import { ShoppingCart } from 'lucide-react'
import { Link,useNavigate } from 'react-router-dom'
import { addToCart } from '../services/cart.api'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

export default function ProductCard({ product }) {

   const navigate = useNavigate()
   const { user } = useAuth()
   const { addItem } = useCart()
  

   const handleAddToCart = async () => {

     if (!user) {
    navigate('/login')
    return
  }

      try{
        await addItem(product._id,1)
  
        toast.success("Added to cart")
      }catch (error) {
      console.error(error)
       toast.error(
        error.response?.data?.message || 'Failed to add product to cart'
      )
    }
    }

  return (
    <div className="group rounded-[20px] border border-slate-200 bg-white p-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.02)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(15,23,42,0.05)]">
      <div className="relative overflow-hidden rounded-[16px] bg-slate-100">
        <Link to={`/products/${product._id}`}>
          <img src={product.images?.[0]} alt={product.name} className="h-32 w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
        </Link>
        
      </div>

      <div className="mt-2.5">
        <div className="text-[10px] uppercase tracking-[0.12em] text-slate-400">{product.category}</div>
        <Link to={`/products/${product._id}`} className="mt-1 block text-sm font-semibold tracking-[-0.02em] text-slate-900">
          {product.name}
        </Link>


        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="text-base font-bold tracking-[-0.04em] text-slate-900">₹{product.price.toLocaleString('en-IN')}</div>
          <button onClick={handleAddToCart} className="inline-flex items-center gap-1 rounded-full bg-[#0D94FB] px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-sm">
            <ShoppingCart className="h-3 w-3" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
