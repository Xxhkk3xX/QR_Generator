import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    base: '/QR_Generator/',
    server: {
      headers: {
        'Content-Security-Policy': `
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.lemonsqueezy.com;
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: blob: https:;
          connect-src 'self' https://api.lemonsqueezy.com;
          frame-src 'self' https://checkout.lemonsqueezy.com;
        `.replace(/\s+/g, ' ').trim()
      }
    },
    build: {
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'index.css') return 'assets/index.[hash].css';
            return 'assets/[name].[hash][extname]';
          },
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
    },
    define: {
      // Ensure environment variables are replaced at build time
      'import.meta.env.VITE_LEMON_SQUEEZY_API_KEY': JSON.stringify(env.VITE_LEMON_SQUEEZY_API_KEY || ''),
      'import.meta.env.VITE_LEMON_SQUEEZY_STORE_ID': JSON.stringify(env.VITE_LEMON_SQUEEZY_STORE_ID || ''),
      'import.meta.env.VITE_LEMON_SQUEEZY_VARIANT_ID': JSON.stringify(env.VITE_LEMON_SQUEEZY_VARIANT_ID || ''),
    }
  }
})
