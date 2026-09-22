import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 120000,
  withCredentials: true,
})

export async function createRazorpayOrder(orderId) {
  try {
    const response = await api.post(
      "/api/payment/create-order",
      {
        orderId,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
}


export async function verifyPayment({
   razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}){
  try{
    const response = await api.post( "/api/payment/verify-payment",
      {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      })

      return response.data;
  }catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
} 