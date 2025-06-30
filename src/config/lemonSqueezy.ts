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

// Validate environment variables with better error handling and debugging
const validateEnvVar = (name: string, value: string | undefined): string => {
  if (!value) {
    console.error(`[LemonSqueezy] Missing environment variable: ${name}`);
    return ''; // Return empty string instead of throwing
  }
  return value.trim();
};

// Initialize configuration with validation and fallbacks
const initConfig = (): LemonSqueezyConfig => {
  // Log all available environment variables (without values)
  console.log('[LemonSqueezy] Available environment variables:', 
    Object.keys(import.meta.env)
      .filter(key => key.startsWith('VITE_'))
      .join(', ')
  );

  const config = {
    API_KEY: validateEnvVar('VITE_LEMON_SQUEEZY_API_KEY', import.meta.env.VITE_LEMON_SQUEEZY_API_KEY),
    STORE_ID: validateEnvVar('VITE_LEMON_SQUEEZY_STORE_ID', import.meta.env.VITE_LEMON_SQUEEZY_STORE_ID),
    VARIANT_ID: validateEnvVar('VITE_LEMON_SQUEEZY_VARIANT_ID', import.meta.env.VITE_LEMON_SQUEEZY_VARIANT_ID),
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
    baseUrl: config.BASE_URL
  });

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