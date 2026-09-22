import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { register,login,logout } from '../services/auth.api'


export const useAuth = () => {

  const context = useContext(AuthContext)
  const { user, setUser, loading, setLoading } = context

  const handleLogin = async({email,password}) =>{
    setLoading(true)
    try{
      const data =await login({ email, password })  
      setUser(data.user)
      return true
    }catch(error){
      console.error("Login failed:", error.response?.data)
      return false
    }
    finally{
      setLoading(false)
    }
  }

   const handleRegister = async({ name, email, password, confirmPassword }) =>{
    setLoading(true)
    try{
     const data =  await register({ name, email, password, confirmPassword})
      
     setUser(data.user)

     return true
    }catch(error){
      console.error("Registration failed:", error.response?.data)
      return false
    }
    finally{
      setLoading(false)
    }
  }

   const handleLogout = async () =>{
    setLoading(true)
    try{
      await logout()

      setUser(null)
      return true
    }catch(error){
      console.error("Logout failed:", error.response?.data)
      return false
    }finally{
      setLoading(false)
    }
  }
    
  return { user, setUser , loading, handleLogin, handleRegister, handleLogout }

}