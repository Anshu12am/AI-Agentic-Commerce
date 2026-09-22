import { useState,useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import SearchBar from '../components/SearchBar'
import { getAllProducts } from '../services/product.api'
import ProductGrid from '../components/ProductGrid'


export default function Products() {

  const [products,setProducts] = useState([])
  const [loading,setLoading]= useState(true)
  const [error,setError] = useState("")
   const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [minRating, setMinRating] = useState(0)

  const categories = [
  'All',
  ...new Set(products.map((product) => product.category))
]

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true)

      const data = await getAllProducts()

      setProducts(data.products)
    } catch (error) {
      console.error(error)
      setError(
        error.response?.data?.message || 'Failed to load products'
      )
    } finally {
      setLoading(false)
    }
  }

  fetchProducts()
}, [])



   // 1. Search + Category + Price filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory

    let matchesPrice = true

    if (priceRange === 'under5k') {
      matchesPrice = product.price < 5000
    }

    if (priceRange === '5k-15k') {
      matchesPrice = product.price >= 5000 && product.price <= 15000
    }

    if (priceRange === '15k-30k') {
      matchesPrice = product.price > 15000 && product.price <= 30000
    }

    if (priceRange === 'over30k') {
      matchesPrice = product.price > 30000
    }

     return matchesSearch && matchesCategory && matchesPrice
})

  // 2. Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price
    }

    if (sortBy === 'price-high') {
      return b.price - a.price
    }

    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    }

    return 0 
  })


  return (
    <MainLayout>
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>

            <h1 className="mt-1 text-3xl font-medium font-black tracking-[-0.02em] text-slate-900">Categories</h1>
          </div>
        
        </div>

        <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4">
           
              <div className="flex flex-wrap gap-2 xl:flex-col xl:items-start">
                 {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-left text-sm font-medium transition ${
                    selectedCategory === category
                      ? 'bg-[#0D94FB] text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {category}
                </button>
              ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-3 text-sm font-semibold text-slate-900">Price range</div>
              <div className="space-y-2 text-sm text-slate-600">
                <label className="flex items-center gap-2"><input type="radio" name='price' checked={priceRange === 'under5k'}
                onChange={()=> setPriceRange('under5k')}/> Under ₹5k</label>
                <label className="flex items-center gap-2"><input type="radio" name='price' checked={priceRange==='5k-15k'} onChange={()=> setPriceRange('5k-15k')}/> ₹5k - ₹15k</label>
                <label className="flex items-center gap-2"><input type="radio" name='price' checked={priceRange==='15k-30k'} onChange={()=> setPriceRange('15k-30k')} /> ₹15k - ₹30k</label>
                <label className="flex items-center gap-2"><input type="radio" name='price' checked={priceRange==='over30k'} onChange={()=> setPriceRange('over30k')} /> Over ₹30k</label>
              </div>
            </div>

          

          </aside>

          <div>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex-1"><SearchBar  value={search}
              onChange={setSearch} placeholder="Search products..." /></div>
              <div className="w-full md:max-w-[220px]">
                <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)} className="w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none">
                  <option value="popular">Sort by: Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">A to Z</option>
                </select>
              </div>
            </div>

            <ProductGrid products={sortedProducts} />
          </div>
        </div>
      </div>
    </MainLayout>
  )

}