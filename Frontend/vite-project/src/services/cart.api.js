import axios from "axios";

const api = axios.create({
  baseURL: "",
  timeout: 120000,
  withCredentials: true,
})



export async function addToCart( productId, quantity=1 ){
  try{
    const response = await api.post('/api/cart/add',{
      productId, quantity
    })

    return response.data;
  }catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
}


export async function getCart(){
  try{
    const response = await api.get('/api/cart');

    return response.data;
  }catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}


export async function updateCartItem( {productId, quantity} ){
  try{
    const response = await api.put(`/api/cart/update/${productId}`,{
      quantity
    })

    return response.data;
  }catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
}


export async function removeFromCart(productId){
  try{
    const response = await api.delete(`/api/cart/remove/${productId}`);

    return response.data;
  }catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
}

export async function clearCart(){
  try{
    const response = await api.delete('/api/cart/clear');

    return response.data;
  }catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
}