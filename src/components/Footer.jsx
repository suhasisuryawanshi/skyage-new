import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageProvider'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Navigations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigations</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#147E9E] transition">{t('home') || 'Home'}</Link></li>
              <li><Link to="/products" className="hover:text-[#147E9E] transition">{t('allProducts') || 'All Products'}</Link></li>
              <li><Link to="/consultant" className="hover:text-[#147E9E] transition">{t('consultant') || 'Consultant'}</Link></li>
              <li><Link to="/about" className="hover:text-[#147E9E] transition">{t('aboutUs') || 'About Us'}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=electronics" className="hover:text-[#147E9E] transition">Electronics</Link></li>
              <li><Link to="/products?category=clothing" className="hover:text-[#147E9E] transition">Clothing</Link></li>
              <li><Link to="/products?category=home" className="hover:text-[#147E9E] transition">Home & Garden</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#147E9E] mt-1">📧</span>
                <span>support@skyage.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#147E9E] mt-1">📞</span>
                <span>+91-800-1-Skyage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#147E9E] mt-1">📍</span>
                <span>123 Business Ave, India</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#147E9E] transition text-2xl">f</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#147E9E] transition text-2xl">𝕏</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#147E9E] transition text-2xl">📷</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#147E9E] transition text-2xl">in</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Bottom Section with Privacy Policy */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>&copy; 2026 Skyage. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-[#147E9E] transition">Privacy Policy</Link>
            <a href="#terms" className="hover:text-[#147E9E] transition">Terms of Service</a>
            <a href="#cookies" className="hover:text-[#147E9E] transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
