import { useState } from 'react'
import { QRForm } from './components/QRForm'
import { QRPreview } from './components/QRPreview'
import { BuyButton } from './components/BuyButton'
import { ar } from './locales/ar'

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
    <div className="container">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold mb-4">{ar.title}</h1>
        <p className="text-gray-600 text-lg">{ar.subtitle}</p>
      </header>

      <div className="card mb-8" dir="rtl">
        <h2 className="text-2xl font-bold mb-4">{ar.instructions.title}</h2>
        <ol className="space-y-4">
          {ar.instructions.steps.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                {index + 1}
              </span>
              <span className="text-gray-700">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="card">
            <QRPreview options={qrOptions} />
          </div>
          <div className="mt-8">
            <BuyButton />
          </div>
        </div>

        <div className="card">
          <QRForm onUpdate={setQROptions} />
        </div>
      </div>

      <footer className="text-center text-gray-600 text-sm mt-8">
        © {new Date().getFullYear()} QR Generator
      </footer>
    </div>
  )
}

export default App
