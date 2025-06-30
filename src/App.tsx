import { useState } from 'react'
import { QRForm } from './components/QRForm'
import { QRPreview } from './components/QRPreview'
import { BuyButton } from './components/BuyButton'
import { ar } from './locales/ar'
import './App.css'

interface QROptions {
  text: string;
  foregroundColor: string;
  backgroundColor: string;
  cornerStyle: 'square' | 'dot';
  logo?: File;
}

function App() {
  const [qrOptions, setQROptions] = useState<QROptions>({
    text: '',
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    cornerStyle: 'square',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 sm:py-12 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="heading-1 mb-3 sm:mb-4 text-3xl sm:text-4xl">
            {ar.title}
          </h1>
          <p className="text-body text-base sm:text-lg max-w-2xl mx-auto">
            {ar.subtitle}
          </p>
        </header>

        {/* Instructions Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 sm:mb-12 text-right" dir="rtl">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            {ar.instructions.title}
          </h2>
          <ol className="list-none space-y-2">
            {ar.instructions.steps.map((step, index) => (
              <li key={index} className="flex items-start space-x-reverse space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700 text-base sm:text-lg">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* QR Preview Section */}
          <div className="lg:sticky lg:top-8 space-y-4 sm:space-y-6">
            <div className="card p-4 sm:p-6">
              <QRPreview options={qrOptions} />
            </div>
            <div className="mt-8">
              <BuyButton productId="your-product-id" className="w-full" />
            </div>
          </div>

          {/* Form Section */}
          <div className="card p-4 sm:p-6">
            <QRForm onUpdate={setQROptions} />
          </div>
        </div>

        <footer className="mt-8 sm:mt-16 text-center text-body text-sm sm:text-base">
          {/* Removed copyright text from the footer */}
        </footer>
      </div>
    </div>
  )
}

export default App
