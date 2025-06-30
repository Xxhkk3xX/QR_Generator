import { LEMON_SQUEEZY_CONFIG } from '../config/lemonSqueezy';

interface LemonSqueezyProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export const fetchProducts = async (): Promise<LemonSqueezyProduct[]> => {
  try {
    const response = await fetch(`${LEMON_SQUEEZY_CONFIG.BASE_URL}/products`, {
      headers: {
        ...LEMON_SQUEEZY_CONFIG.HEADERS,
        'Authorization': `Bearer ${LEMON_SQUEEZY_CONFIG.API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.map((product: any) => ({
      id: product.id,
      name: product.attributes.name,
      price: product.attributes.price,
      description: product.attributes.description
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const createCheckout = async (): Promise<string> => {
  try {
    const storeId = LEMON_SQUEEZY_CONFIG.STORE_ID;
    const variantId = LEMON_SQUEEZY_CONFIG.VARIANT_ID;

    const payload = {
      data: {
        type: 'checkouts',
        attributes: {
          store_id: parseInt(storeId),
          variant_id: parseInt(variantId),
          product_options: {
            enabled_variants: [parseInt(variantId)]
          }
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: storeId
            }
          },
          variant: {
            data: {
              type: "variants",
              id: variantId
            }
          }
        }
      }
    };

    console.log('Sending checkout payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(`${LEMON_SQUEEZY_CONFIG.BASE_URL}/checkouts`, {
      method: 'POST',
      headers: {
        ...LEMON_SQUEEZY_CONFIG.HEADERS,
        'Authorization': `Bearer ${LEMON_SQUEEZY_CONFIG.API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Checkout error details:', responseData);
      if (responseData.errors) {
        const errorMessages = responseData.errors.map((error: any) => 
          `${error.title}: ${error.detail}`
        ).join(', ');
        throw new Error(`Checkout failed: ${errorMessages}`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Checkout response:', responseData);
    return responseData.data.attributes.url;
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
};

export const LEMON_SQUEEZY_CONFIG = {
  API_KEY: import.meta.env.VITE_LEMON_SQUEEZY_API_KEY,
  BASE_URL: 'https://api.lemonsqueezy.com/v1',
  STORE_ID: import.meta.env.VITE_LEMON_SQUEEZY_STORE_ID,
  VARIANT_ID: import.meta.env.VITE_LEMON_SQUEEZY_VARIANT_ID,
  HEADERS: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  }
};

// Verify environment variables are loaded
console.log('Lemon Squeezy Config Loaded:', {
  storeId: LEMON_SQUEEZY_CONFIG.STORE_ID,
  variantId: LEMON_SQUEEZY_CONFIG.VARIANT_ID,
  hasApiKey: !!LEMON_SQUEEZY_CONFIG.API_KEY
}); 