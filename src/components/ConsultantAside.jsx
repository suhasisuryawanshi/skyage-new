import React from 'react'

export default function ConsultantAside(){
  return (
    <aside className="w-full md:w-1/2 h-[560px] flex items-center justify-center p-6" style={{ backgroundColor: '#147E9E' }}>
      <div className="flex flex-col items-center text-center space-y-6 text-white" style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'Poppins, sans-serif' }} className="text-3xl md:text-4xl font-black">
          We connect
        </div>

        <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '45px' }} className="leading-none">
          Buyers & Sellers
        </div>

        <p className="max-w-xs">
          Skyage is India's largest online B2B marketplace connecting buyers with supplyers.
        </p>

        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l3 6 6 .5-4.5 3 1.5 6L12 15 5 18.5 6.5 12 2 9.5 8 9 12 2z" />
            </svg>
            <span className="mt-2 text-sm font-medium">Trusted Platform</span>
          </div>

          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c1.657 0 3-1.343 3-3V5a3 3 0 10-6 0v3c0 1.657 1.343 3 3 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 11v6a7 7 0 0014 0v-6" />
            </svg>
            <span className="mt-2 text-sm font-medium">Safe & Secure</span>
          </div>

          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 8a6 6 0 11-12 0 6 6 0 0112 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 20c1.5-4 6-6 10-6s8.5 2 10 6" />
            </svg>
            <span className="mt-2 text-sm font-medium">Quick Assistance</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
