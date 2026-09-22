import {  Minus, Plus } from 'lucide-react'
import MainLayout from '../layouts/MainLayout'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductById } from '../services/product.api'
import { addToCart } from '../services/cart.api'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'


export default function ProductDetails() {

  const navigate = useNavigate();
  const { user } = useAuth()
  const { addItem } = useCart()
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1)
  const [product,setProduct] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("")

  useEffect(()=>{
    const fetchProduct = async() => {
      try{

        setLoading(true);
        setError("");

        const data = await getProductById(id)
        setProduct(data.product)
      }catch (error) {
        console.error('Failed to fetch product:', error)

        setError(
          error.response?.data?.message || 'Failed to load product'
        )
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  },[id])

  const handleAddToCart = async () => {

    if (!user) {
    navigate('/login')
    return
  }
  
    try{
      await addItem(product._id,quantity)

      navigate('/cart')
    }catch (error) {
    console.error(error)
  }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-[500px] items-center justify-center">
          <p className="text-sm text-slate-500">
            Loading product...
          </p>
        </div>
      </MainLayout>
    )
  }

   if (error || !product) {
    return (
      <MainLayout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Product not found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error || 'This product does not exist.'}
            </p>
          </div>
        </div>
      </MainLayout>
    )
  }

  
   return (
    <MainLayout>
      <div className="mx-auto max-w-[1200px] px-6 py-10">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-slate-500">
          Home / {product.category} / {product.name}
        </div>

        <div className="grid gap-10 md:grid-cols-2">

          {/* Product Image */}
          <div>
            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-[500px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[500px] items-center justify-center text-sm text-slate-400">
                  No image available
                </div>
              )}
            </div>

            {/* Image thumbnails */}
            {product.images?.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 overflow-hidden rounded-xl border border-slate-200"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div>

            <div className="text-sm font-medium text-[#0D94FB]">
              {product.category}
            </div>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              {product.name}
            </h1>

            {product.brand && (
              <p className="mt-2 text-sm text-slate-500">
                Brand: {product.brand}
              </p>
            )}

            <div className="mt-6">
              <span className="text-3xl font-bold text-slate-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="mt-6 leading-7 text-slate-600">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-6">
              {product.stock > 0 ? (
                <span className="text-sm font-medium text-emerald-600">
                  In stock · {product.stock} available
                </span>
              ) : (
                <span className="text-sm font-medium text-red-500">
                  Out of stock
                </span>
              )}
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="mt-8 flex items-center gap-4">
              <button
  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200"
>
  <Minus className="h-4 w-4" />
</button>

              <span className="text-sm font-semibold">
                {quantity}
              </span>

              <button
  onClick={() =>
    setQuantity((prev) => Math.min(product.stock, prev + 1))
  }
  disabled={quantity >= product.stock}
  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
>
  <Plus className="h-4 w-4" />
</button>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <Button onClick={handleAddToCart}
                className="flex-1 rounded-full bg-[#0D94FB] px-6 py-3 text-sm font-semibold text-white"
              >
                Add to cart
              </Button>

             
            </div>

          </div>
        </div>

        {/* Specifications */}
        {product.specifications &&
          Object.keys(product.specifications).length > 0 && (
            <div className="mt-16 border-t border-slate-200 pt-10">

              <h2 className="text-2xl font-bold text-slate-900">
                Specifications
              </h2>

              <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
                {Object.entries(product.specifications).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between gap-6 px-5 py-4"
                    >
                      <span className="text-sm font-medium text-slate-600">
                        {key}
                      </span>

                      <span className="text-right text-sm text-slate-900">
                        {value}
                      </span>
                    </div>
                  )
                )}
              </div>

            </div>
          )}

      </div>
    </MainLayout>
  )
}