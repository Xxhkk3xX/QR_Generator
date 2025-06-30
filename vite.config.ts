import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  // Log environment variables during build (without values)
  console.log('Available VITE_ env variables:', 
    Object.keys(env).filter(key => key.startsWith('VITE_'))
  )

  return {
    plugins: [react()],
    base: './',
    server: {
      headers: {
        'Content-Security-Policy': `
          default-src 'self' https://*.lemonsqueezy.com;
          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.lemonsqueezy.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
          img-src 'self' data: blob: https:;
          connect-src 'self' https://*.lemonsqueezy.com;
          frame-src 'self' https://*.lemonsqueezy.com;
        `.replace(/\s+/g, ' ').trim()
      }
    },
    build: {
      sourcemap: true,
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'index.css') return 'assets/style.[hash].css';
            return 'assets/[name].[hash][extname]';
          },
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
    },
    define: {
      __LEMON_SQUEEZY_CONFIG__: {
        API_KEY: JSON.stringify(env.VITE_LEMON_SQUEEZY_API_KEY || ''),
        STORE_ID: JSON.stringify(env.VITE_LEMON_SQUEEZY_STORE_ID || ''),
        VARIANT_ID: JSON.stringify(env.VITE_LEMON_SQUEEZY_VARIANT_ID || '')
      }
    }
  }
})
