/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEMON_SQUEEZY_API_KEY: string
  readonly VITE_LEMON_SQUEEZY_STORE_ID: string
  readonly VITE_LEMON_SQUEEZY_VARIANT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 