import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getAllProducts } from '../services/api'
import { useLanguage } from '../contexts/LanguageProvider'

export default function AllProducts(){
  const { t } = useLanguage()
  const location = useLocation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    getAllProducts()
      .then(data => { if(mounted){ setProducts(data) } })
      .catch(err => setError(err.message))
      .finally(()=> mounted && setLoading(false))
    return ()=> mounted = false
  },[])

  if(loading) return <div className="container mx-auto px-4 py-8">{t('loadingProducts')}</div>
  if(error) return <div className="container mx-auto px-4 py-8">{t('errorPrefix')} {error}</div>

  // Read query params for filtering
  const params = new URLSearchParams(location.search)
  const q = (params.get('search') || '').trim().toLowerCase()
  const category = (params.get('category') || '').trim().toLowerCase()

  const filtered = (products || []).filter(p => {
    const title = (p.title || '').toLowerCase()
    const desc = (p.description || '').toLowerCase()
    const cat = (p.category || '').toLowerCase()

    const matchesSearch = q ? (title + ' ' + desc).includes(q) : true
    const matchesCategory = category ? cat.includes(category) : true
    return matchesSearch && matchesCategory
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{t('allProductsHeader')}</h1>

      {filtered.length === 0 ? (
        <div className="text-gray-600">{t('noProductFound')}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(p => (
            <article key={p.id} className="bg-white rounded shadow p-4">
              <img src={p.image} alt={p.title} className="h-40 mx-auto object-contain" />
              <h2 className="mt-3 font-medium text-sm line-clamp-2">{p.title}</h2>
              <p className="mt-2 text-[#147E9E] font-semibold">₹{p.price}</p>
              <Link to={`/product/${p.id}`} className="inline-block mt-3 text-sm text-[#147E9E]">{t('view')}</Link>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
