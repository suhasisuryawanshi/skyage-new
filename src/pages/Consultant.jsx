import { useState } from 'react'
import { submitConsultantRequest } from '../services/api'
import { useLanguage } from '../contexts/LanguageProvider'
import ConsultantAside from '../components/ConsultantAside'

export default function Consultant(){
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [productService, setProductService] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()
    setStatus('loading')
    try{
      const res = await submitConsultantRequest({ name, productService, mobile, email, message })
      setStatus({ ok: true, id: res.id })
      setName(''); setProductService(''); setMobile(''); setEmail(''); setMessage('')
    }catch(err){
      setStatus({ ok: false, error: err.message })
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{t('consultantTitle')}</h1>
      <p className="mb-4 text-gray-600">{t('consultantText')}</p>
      <div className="flex flex-col md:flex-row items-start gap-0 h-[560px]">
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 h-full bg-white p-6 rounded shadow space-y-4">
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '26px', fontWeight: 600 }} className="mb-6">TELL US YOUR REQUIREMENT</h2>
          <div>
            <label className="block text-sm font-medium">{t('name')}</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Enter Product/Service Name</label>
            <input value={productService} onChange={e=>setProductService(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" required />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium">{t('mobileNumber')}</label>
              <input value={mobile} onChange={e=>setMobile(e.target.value)} type="tel" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">{t('email')}</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">{t('message')}</label>
            <textarea value={message} onChange={e=>setMessage(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" rows={5} required />
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#147E9E] text-white px-4 py-2 rounded">{t('sendRequest')}</button>
            {status === 'loading' && <span>{t('sending')}</span>}
            {status && typeof status === 'object' && status.ok && <span className="text-green-600">{t('sent')} (id: {status.id})</span>}
            {status && typeof status === 'object' && !status.ok && <span className="text-red-600">{t('errorPrefix')} {status.error}</span>}
          </div>
        </form>

        <ConsultantAside />
      </div>
    </main>
  )
}
