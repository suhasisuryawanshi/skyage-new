import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/api'
import { useLanguage } from '../contexts/LanguageProvider'

export default function Product(){
  const { t } = useLanguage()
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    getProduct(id)
      .then(data => mounted && setProduct(data))
      .catch(err => setError(err.message))
      .finally(()=> mounted && setLoading(false))
    return ()=> mounted = false
  },[id])

  if(loading) return <div className="container mx-auto px-4 py-8">{t('loadingProduct')}</div>
  if(error) return <div className="container mx-auto px-4 py-8">{t('errorPrefix')} {error}</div>
  if(!product) return <div className="container mx-auto px-4 py-8">{t('noProductFound')}</div>

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-72 object-contain" />
        </div>
        <div className="md:col-span-2 bg-white rounded shadow p-6">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="mt-3 text-gray-600">{product.description}</p>
          <p className="mt-4 text-[#147E9E] font-bold text-lg">₹{product.price}</p>
          <p className="mt-2 text-sm text-gray-500">{t('category')}: {product.category}</p>
        </div>
      </div>
    </main>
  )
}
