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
      <header className="text-center mb-8 animate-in">
        <h1>{ar.title}</h1>
        <p className="text-secondary text-lg max-w-2xl mx-auto">
          {ar.subtitle}
        </p>
      </header>

      <div className="card mb-8 animate-in" style={{ animationDelay: '0.1s' }} dir="rtl">
        <h2 className="text-primary mb-6">
          {ar.instructions.title}
        </h2>
        <ol className="space-y-8">
          {ar.instructions.steps.map((step, index) => (
            <li 
              key={index} 
              className="flex gap-3 items-start animate-in"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <span className="step-number">
                {index + 1}
              </span>
              <span className="text-secondary flex-1 text-lg">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="animate-in" style={{ animationDelay: '0.3s' }}>
          <div className="card">
            <QRPreview options={qrOptions} />
          </div>
          <div className="mt-8">
            <BuyButton />
          </div>
        </div>

        <div className="card animate-in" style={{ animationDelay: '0.4s' }}>
          <QRForm onUpdate={setQROptions} />
        </div>
      </div>

      <footer className="text-center mt-8 animate-in" style={{ animationDelay: '0.5s' }}>
        <p className="text-secondary text-small">
          © {new Date().getFullYear()} QR Generator
        </p>
      </footer>
    </div>
  )
}

export default App
