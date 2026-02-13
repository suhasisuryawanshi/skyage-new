import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../services/api'
import { useLanguage } from '../contexts/LanguageProvider'

export default function HotSalesClothing(){
  const { t } = useLanguage()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    getAllProducts()
      .then(data => { 
        if(mounted){
          const clothing = (data || []).filter(p => (p.category || '').toLowerCase() === 'clothing')
          setItems(clothing)
        } 
      })
      .catch(err => setError(err.message))
      .finally(()=> mounted && setLoading(false))
    return ()=> mounted = false
  },[])

  if(loading) return <div className="container mx-auto px-4 py-6">{t('loadingProducts')}</div>
  if(error) return <div className="container mx-auto px-4 py-6">{t('errorPrefix')} {error}</div>
  if(items.length === 0) return null

  const promoImage = (items[0] && items[0].image) || ''
  const rightItems = items.slice(1, 11)

  return (
    <section className="container mx-auto px-4 py-6  bg-white" style={{ borderTop: '3px solid #147E9E' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Hot Sales on Clothing</h2>
        <Link to="/products?category=clothing" className="text-sm text-[#147E9E]">{t('viewAll')}</Link>
      </div>

      {/* Desktop: left promo spanning 2 rows, right grid 5 cols x 2 rows */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-stretch h-[560px]">
        <div className="md:col-span-2 row-span-2 flex items-center justify-center">
          <Link to="/products?category=clothing" aria-label="See all clothing" className="block">
            <div className="w-[325px] h-[432px] rounded overflow-hidden relative shadow-lg">
              <img src={promoImage} alt="Hot Sales Clothing" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 text-center px-4 py-2 rounded">
                  <span className="text-sm font-semibold">See All Clothing</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 grid-rows-2 gap-4 h-full">
          {rightItems.map(p => (
            <article key={p.id} className="bg-white rounded shadow p-3 flex flex-col h-full">
              <img src={p.image} alt={p.title} className="h-24 object-contain mb-2" />
              <h3 className="text-sm font-medium line-clamp-2">{p.title}</h3>
              <p className="mt-auto text-[#147E9E] font-semibold">${p.price}</p>
              <Link to={`/product/${p.id}`} className="inline-block mt-2 text-sm text-[#147E9E]">{t('view')}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
