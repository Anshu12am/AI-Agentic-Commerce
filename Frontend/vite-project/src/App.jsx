import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes.jsx'
import { AuthProvider } from './context/auth.context.jsx'
import { Toaster } from "react-hot-toast";
import { CartProvider } from './context/cart.context.jsx';

function App() {
  return(
   <AuthProvider>
    <CartProvider>
    <Toaster position="top-right" />
   <RouterProvider router={router} />
   </CartProvider>
   </AuthProvider>
  )
}

export default App
