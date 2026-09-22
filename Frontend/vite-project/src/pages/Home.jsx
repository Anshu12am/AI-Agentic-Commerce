import { Bot, ShieldCheck, Sparkles, Headphones, Percent, ArrowRight } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import { getAllProducts } from '../services/product.api.js'
import MainLayout from '../layouts/MainLayout'
import FeatureItem from '../components/FeatureItem'
import ProductCard from '../components/ProductCard'
import { useContext,useState,useEffect } from 'react'
import { AuthContext } from '../context/auth.context.jsx'
import { Link } from 'react-router-dom' 
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')


  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts()
      setProducts(data.products || [])
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  fetchProducts()
}, [])



const handleSearch = () => {
  const message = search.trim()

  if (!message) return

  navigate('/agent', {
    state: {
      message
    }
  })
}

  return (
    <MainLayout>
     
      <div className="rounded-[24px] bg-white p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg text-slate-500">Good morning, {user?.name || 'there'}</div>
          <Link to="/agent" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500">
            <Bot className="h-3.5 w-3.5 text-[#0D94FB]" />
          </Link>
        </div>

        <div className="mb-4 grid items-start gap-4 md:grid-cols-[1.1fr_2fr]">
          <div>
            <h1 className="max-w-[420px] font-semibold font-black leading-[0.96] tracking-[-0.06em] text-slate-900 text-[90px]">
              Find something
              <span className="block text-[#027a48]">you&apos;ll love.</span>
            </h1>
            <p className="mt-10 max-w-[480px] text-sm leading-6 text-slate-500">
              Discover the best products, get personalized recommendations and shop smarter with AI.
            </p>
          </div>

          <div className="relative h-[350px] overflow-hidden rounded-[24px] border border-slate-200 bg-[#f5f9ff] p-5">
            <div className="absolute left-2 top-2 flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            </div>
            <div className="mt-6 flex items-end justify-center gap-3">
              <div className="rounded-[20px] bg-white p-2 shadow-sm">
                <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80" alt="Laptop" className="h-60 w-45 rounded-[14px] object-cover" />
              </div>
              <div className="rounded-[20px] bg-white p-2 shadow-sm">
                <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80" alt="Phone" className="h-70 w-40 rounded-[14px] object-cover" />
              </div>
              <div className="rounded-[20px] bg-white p-2 shadow-sm">
                <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80" alt="Headphones" className="h-60 w-40 rounded-[14px] object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch}/>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {[
            { icon: Sparkles, title: 'Smart Recommendations', description: 'AI picks' },
            { icon: Percent, title: 'Best Prices', description: 'Verified deals' },
            { icon: ShieldCheck, title: 'Secure Payments', description: 'Protected' },
            { icon: Headphones, title: '24/7 Support', description: 'Always on' }
          ].map((item) => (
            <FeatureItem key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>

        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-[-0.03em] text-slate-900">Popular right now</h2>
          <button onClick={()=>navigate('/products')} className="inline-flex items-center gap-1 text-sm font-medium text-slate-700">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
  {loading ? (
    <div className="col-span-full py-10 text-center text-sm text-slate-500">
      Loading products...
    </div>
  ) : (
    products.slice(0, 4).map((product) => (
      <ProductCard
        key={product._id}
        product={product}
      />
    ))
  )}
</div>
      </div>

    </MainLayout>
        
        
  )
}
