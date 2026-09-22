import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 120000,
  withCredentials: true,
})

export async function createProduct(productData){
  try{
    const response = await api.post('/api/products', productData);

    return response.data;
  }catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

 export async function getAllProducts(){
  try{
    const response = await api.get('/api/products');

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
 }


 export async function getProductById(productId){
  try{
    const response = await api.get(`/api/products/${productId}`)

    return response.data;
  }catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
 }


 export async function updateProduct({productId, productData}) {
  try {
    const response = await api.put(
      `/api/products/${productId}`,
      productData
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}



export async function deleteProduct(productId) {
  try {
    const response = await api.delete(
      `/api/products/${productId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}