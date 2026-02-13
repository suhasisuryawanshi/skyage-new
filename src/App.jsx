import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import FeaturedProducts from './components/FeaturedProducts'
import HotSalesElectronics from './components/HotSalesElectronics'
import HotSalesClothing from './components/HotSalesClothing'
import AllProducts from './pages/AllProducts'
import Product from './pages/Product'
import Consultant from './pages/Consultant'
import About from './pages/About'
import { useLanguage } from './contexts/LanguageProvider'

export default function App(){
	const { t } = useLanguage()
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col bg-light-blue">
				<Header />
				<Routes>
					<Route path="/" element={<>
					<div className="container mx-auto px-4 py-12 bg-light-blue"><h2 className="text-2xl font-semibold">{t('welcomeTitle')}</h2><p className="mt-3 text-gray-600">{t('welcomeText')}</p></div>
						<FeaturedProducts />
						<Consultant />
						<HotSalesElectronics />
						<HotSalesClothing />
					</>} />
					<Route path="/products" element={<AllProducts/>} />
					<Route path="/product/:id" element={<Product/>} />
					<Route path="/consultant" element={<Consultant/>} />
					<Route path="/about" element={<About/>} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	)
}
