import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 120000,
  withCredentials: true,
})

export async function createOrder(){
  try{
    const response = await api.post('/api/orders/create');

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function getMyOrders(){
  try{
    const response = await api.get('/api/orders');

    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function getOrderById(orderId){
  try{
    const response = await api.get(`/api/orders/${orderId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}