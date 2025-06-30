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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="heading-1 mb-4">
            {ar.title}
          </h1>
          <p className="text-body text-lg max-w-2xl mx-auto">
            {ar.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Preview Section */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="card">
              <QRPreview options={qrOptions} />
            </div>
            <BuyButton
              productId="YOUR_PRODUCT_ID"
              className="btn btn-primary w-full"
            />
          </div>

          {/* Form Section */}
          <div className="card">
            <QRForm onUpdate={setQROptions} />
          </div>
        </div>

        <footer className="mt-16 text-center text-body">
          <p>
            {ar.footer.secure}{' '}
            <a
              href="https://www.lemonsqueezy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 font-medium hover:underline"
            >
              Lemon Squeezy
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
