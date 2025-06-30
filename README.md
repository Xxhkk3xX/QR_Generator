# QR Code Generator

A beautiful, mobile-first QR code generator built with React and TypeScript. Create fully customizable QR codes with your brand colors and logo.

## Features

- 📱 Mobile-first, responsive design
- 🎨 Customize colors and corner styles
- 🖼️ Add your logo to the QR code
- 💳 Secure payments with Apple Pay via Lemon Squeezy
- 🔄 Real-time preview
- 📥 High-resolution PNG download

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/qr-generator.git
   cd qr-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the Lemon Squeezy product ID:
   - Open `src/App.tsx`
   - Replace `YOUR_PRODUCT_ID` with your actual Lemon Squeezy product ID

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Tech Stack

- React.js with TypeScript
- Tailwind CSS for styling
- qr-code-styling for QR code generation
- react-dropzone for file uploads
- Lemon Squeezy for payments

## License

MIT License - see LICENSE file for details
