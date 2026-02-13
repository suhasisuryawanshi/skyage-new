import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageProvider'
import CTAIcon from '../config/ctaIcon'

export default function Header() {
  const [id, setId] = useState('1')
  const navigate = useNavigate()
  const { t, lang, setLang } = useLanguage()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)
  const location = useLocation()

  useEffect(()=> {
    function updateHeight() {
      if (headerRef.current) setHeaderHeight(headerRef.current.getBoundingClientRect().height)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  // Keep selectedCategory in sync with the URL's `category` param
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const cat = (params.get('category') || '').toLowerCase()
    setSelectedCategory(cat)
  }, [location.search])

  function goToProduct(e) {
    e.preventDefault()
    if (!id) return
    navigate(`/product/${id}`)
  }

  return (
    <>
    <header ref={headerRef} className="bg-white shadow-sm ">
      {/* Top helper bar: hidden on extra-small screens, icons-only on small, labels visible on md+ */}
      <div className="bg-#fff-50 border-b">
        <div className="container mx-auto px-4 flex items-center justify-end gap-3 h-12 sm:h-16">
          <nav className="flex items-center gap-4 text-center">
            <Link to="/get-app" title={t('getApp')} aria-label={t('getApp')} className="flex flex-col items-center text-gray-700 hover:text-[#147E9E] focus:outline-none focus:ring-2 focus:ring-[#147E9E] rounded p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v12m0 0l3-3m-3 3l-3-3M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" />
              </svg>
              <span className="mt-1 text-[10px] block">{t('getApp')}</span>
            </Link>

            <Link to="/notifications" title={t('notifications')} aria-label={t('notifications')} className="flex flex-col items-center text-gray-700 hover:text-[#147E9E] focus:outline-none focus:ring-2 focus:ring-[#147E9E] rounded p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 6.165 8 7.512 8 9v5.159c0 .538-.214 1.055-.595 1.436L6 17h9z" />
              </svg>
              <span className="mt-1 text-[10px] block">{t('notifications')}</span>
            </Link>

            <Link to="/cart" title={t('cart')} aria-label={t('cart')} className="flex flex-col items-center text-gray-700 hover:text-[#147E9E] focus:outline-none focus:ring-2 focus:ring-[#147E9E] rounded p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5h13" />
              </svg>
              <span className="mt-1 text-[10px] block">{t('cart')}</span>
            </Link>

            <div className="flex flex-col items-center">
              <select value={lang} onChange={e=>setLang(e.target.value)} title={t('language')} aria-label={t('language')} className="bg-transparent text-[10px] focus:outline-none">
                <option value="en">English</option>
                <option value="mr">मराठी</option>
                <option value="hi">हिंदी</option>
              </select>
              <span className="mt-1 text-[10px] block">{t('language')}</span>
            </div>

            <Link to="/signin" title={t('signIn')} aria-label={t('signIn')} className="flex flex-col items-center text-gray-700 hover:text-[#147E9E] focus:outline-none focus:ring-2 focus:ring-[#147E9E] rounded p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A10.97 10.97 0 0112 15c2.485 0 4.78.8 6.879 2.17M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="mt-1 text-[10px] block">{t('signIn')}</span>
            </Link>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 flex items-center justify-between h-12 sm:h-16">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg sm:text-xl font-semibold text-[#147E9E]">{t('brand')}</Link>
          <nav className="hidden md:flex gap-3">
            <Link to="/products" className="px-3 py-2 rounded hover:bg-gray-100">{t('allProducts')}</Link>
            <Link to="/consultant" className="px-3 py-2 rounded hover:bg-gray-100">{t('consultant')}</Link>
            <Link to="/about" className="px-3 py-2 rounded hover:bg-gray-100">{t('aboutUs')}</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile CTA: icon-only, visible on very small screens */}
          <Link to="/consultant" title={t('tellUsRequirement')} aria-label={t('tellUsRequirement')} className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded sm:hidden flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-300">
            <CTAIcon className="h-4 w-4" />
          </Link>

          {/* Desktop CTA: full label, hidden on xs (icon + text) */}
          <Link to="/consultant" aria-label={t('tellUsRequirement')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded hidden sm:inline-flex text-sm items-center gap-2">
            <CTAIcon className="h-4 w-4" />
            <span>{t('tellUsRequirement')}</span>
          </Link>

          <form onSubmit={goToProduct} className="flex items-center gap-2">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border rounded px-2 py-1 w-20"
              aria-label="product id"
            />
            <button className="bg-[#147E9E] text-white px-3 py-1 rounded">{t('go')}</button>
          </form>
          <Link to="/products" className="md:hidden text-sm text-[#147E9E]">{t('browse')}</Link>
        </div>
      </div>

      {/* Search banner with categories behind it (centered) */}
      <div className="w-full" style={{
        backgroundImage: 'url(/pesticides-perfumes.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="p-6 relative">
          <div className="flex flex-col items-center gap-4 text-center relative z-10">
              <div className="text-white">
                <h3 className="text-lg font-semibold">{t('searchBannerTitle')}</h3>
                <p className="text-sm opacity-90 mt-1">{t('searchPlaceholder')}</p>
              </div>

              <form onSubmit={(e)=>{e.preventDefault(); const q = searchQuery.trim(); const params = new URLSearchParams(); if(q) params.set('search', q); if(selectedCategory) params.set('category', selectedCategory); navigate('/?'+params.toString())}} className="w-full max-w-3xl">
                <div className="flex bg-white rounded overflow-hidden">
                  <select
                    value={selectedCategory}
                    onChange={e => {
                      const val = e.target.value
                      setSelectedCategory(val)
                      // If 'home' chosen, navigate to app root; otherwise navigate to products with category
                      if (!val) {
                        navigate('/')
                        return
                      }
                      if (val === 'home') {
                        navigate('/')
                        return
                      }
                      const params = new URLSearchParams()
                      const q = searchQuery.trim()
                      if (q) params.set('search', q)
                      params.set('category', val)
                      navigate('/?' + params.toString())
                    }}
                    aria-label="Category"
                    className="px-3 bg-white text-sm"
                  >
                    <option value="">{t('all')}</option>
                    <option value="electronics">{t('category_electronics')}</option>
                    <option value="clothing">{t('category_clothing')}</option>
                    <option value="home">{t('category_home')}</option>
                  </select>
                  <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder={t('searchPlaceholder')} aria-label={t('search')} className="flex-1 px-3 py-2 outline-none" />
                  <button className="bg-[#147E9E] text-white px-4 py-2">{t('search')}</button>
                </div>
              </form>

              <div className="mt-4 w-full">
                <div className="flex gap-3 justify-center overflow-auto">
                  {['electronics','clothing','home'].map(cat => {
                    const isActive = selectedCategory === cat
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          // Special case: 'home' should take the user to the starting home page
                          if (cat === 'home') {
                            setSelectedCategory('')
                            navigate('/')
                            return
                          }

                          if (isActive) {
                            setSelectedCategory('')
                            navigate('/products')
                          } else {
                            setSelectedCategory(cat)
                            navigate(`/products?category=${encodeURIComponent(cat)}`)
                          }
                        }}
                        aria-pressed={isActive}
                        className={`px-3 py-1 rounded text-sm whitespace-nowrap focus:outline-none focus:ring-2 ${isActive ? 'bg-white text-[#147E9E] font-semibold' : 'bg-white/20 text-white'}`}>
                        {t(`category_${cat}`)}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
        </div>
      </div>
    </header>
    </>
  )

}
