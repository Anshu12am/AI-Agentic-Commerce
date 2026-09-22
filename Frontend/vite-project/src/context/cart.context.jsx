import { createContext, useEffect, useState } from 'react'
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../services/cart.api'
import { useAuth } from '../hooks/useAuth'

export const CartContext = createContext();

export const CartProvider = ({children}) =>{

  const { user } = useAuth();
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)

   useEffect(() => {
     const fetchCart = async () => {
    if (!user) {
      setCart(null)
      return
    }

    try {
      setLoading(true)

      const data = await getCart()

      setCart(data.cart)

    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setLoading(false)
    }
  }
fetchCart()
   },[user])

     const addItem = async (productId, quantity = 1) => {

    const data = await addToCart(productId, quantity)

    setCart(data.cart)

    return data
  }

   const updateItem = async (productId, quantity) => {

    const data = await updateCartItem({
      productId,
      quantity
    })

    setCart(data.cart)

    return data
  }

    const removeItem = async (productId) => {

    const data = await removeFromCart(productId)

    setCart(data.cart)

    return data
  }

  const clearCartItems = async () => {

    const data = await clearCart()

    setCart(data.cart)

    return data
  }
  
   const cartCount =
    cart?.items?.reduce(
      (total, item) => total + item.quantity,
      0
    ) || 0


     return (
    
    <CartContext.Provider value={{ cart,cartCount,loading,addItem, updateItem,removeItem,clearCartItems }}>
      {children}
    </CartContext.Provider>
    
      )

}