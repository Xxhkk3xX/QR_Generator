import { useState } from 'react'
import { QRForm } from './components/QRForm'
import { QRPreview } from './components/QRPreview'
import { BuyButton } from './components/BuyButton'
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kuwait QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create beautiful, customizable QR codes for your business or personal use
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* QR Preview Section */}
          <div className="order-1 md:order-none">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Your QR Code
                </h2>
                <QRPreview options={qrOptions} isPreview={!qrOptions.text} />
                <div className="mt-6">
                  <BuyButton productId="YOUR_PRODUCT_ID" />
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="order-2 md:order-none">
            <div className="bg-white rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 p-6 md:p-8 border-b border-gray-100">
                Customize Your QR Code
              </h2>
              <QRForm onUpdate={setQROptions} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600">
          <p>© 2024 Kuwait QR Code Generator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
