// Add type declaration for the global variable
declare const __LEMON_SQUEEZY_CONFIG__: {
  API_KEY: string;
  STORE_ID: string;
  VARIANT_ID: string;
};

interface LemonSqueezyConfig {
  API_KEY: string;
  STORE_ID: string;
  VARIANT_ID: string;
  BASE_URL: string;
  HEADERS: {
    'Accept': string;
    'Content-Type': string;
  };
}

// Initialize configuration with validation and fallbacks
const initConfig = (): LemonSqueezyConfig => {
  // Log all available environment variables (without values)
  console.log('[LemonSqueezy] Initializing configuration');

  const config = {
    API_KEY: __LEMON_SQUEEZY_CONFIG__.API_KEY,
    STORE_ID: __LEMON_SQUEEZY_CONFIG__.STORE_ID,
    VARIANT_ID: __LEMON_SQUEEZY_CONFIG__.VARIANT_ID,
    BASE_URL: 'https://api.lemonsqueezy.com/v1',
    HEADERS: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  // Log configuration status (without sensitive values)
  console.log('[LemonSqueezy] Configuration status:', {
    hasApiKey: !!config.API_KEY,
    hasStoreId: !!config.STORE_ID,
    hasVariantId: !!config.VARIANT_ID,
    apiKeyLength: config.API_KEY?.length || 0,
    baseUrl: config.BASE_URL
  });

  // Validate configuration
  if (!config.API_KEY) {
    console.error('[LemonSqueezy] API key is not configured');
    throw new Error('API key is not configured');
  }

  if (!config.STORE_ID || !config.VARIANT_ID) {
    console.error('[LemonSqueezy] Store ID or Variant ID is not configured');
    throw new Error('Store ID or Variant ID is not configured');
  }

  return config;
};

export const LEMON_SQUEEZY_CONFIG = initConfig();

// Helper function to check if configuration is valid
export const isConfigValid = () => {
  return !!(
    LEMON_SQUEEZY_CONFIG.API_KEY &&
    LEMON_SQUEEZY_CONFIG.STORE_ID &&
    LEMON_SQUEEZY_CONFIG.VARIANT_ID
  );
};

// Helper function to get headers with authorization
export const getHeaders = () => {
  if (!isConfigValid()) {
    throw new Error('Lemon Squeezy configuration is not valid. Please check your environment variables.');
  }
  
  return {
    ...LEMON_SQUEEZY_CONFIG.HEADERS,
    'Authorization': `Bearer ${LEMON_SQUEEZY_CONFIG.API_KEY}`
  };
}; 