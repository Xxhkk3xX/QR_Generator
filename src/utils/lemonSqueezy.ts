import { LEMON_SQUEEZY_CONFIG } from '../config/lemonSqueezy';

interface LemonSqueezyProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export const fetchProducts = async (): Promise<LemonSqueezyProduct[]> => {
  try {
    if (!LEMON_SQUEEZY_CONFIG.API_KEY) {
      throw new Error('API key is not configured');
    }

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
    // Validate configuration
    if (!LEMON_SQUEEZY_CONFIG.API_KEY) {
      throw new Error('API key is not configured');
    }
    if (!LEMON_SQUEEZY_CONFIG.STORE_ID || !LEMON_SQUEEZY_CONFIG.VARIANT_ID) {
      throw new Error('Store ID or Variant ID is not configured');
    }

    // Parse IDs and clean API key
    const storeId = parseInt(LEMON_SQUEEZY_CONFIG.STORE_ID);
    const variantId = parseInt(LEMON_SQUEEZY_CONFIG.VARIANT_ID);
    const apiKey = LEMON_SQUEEZY_CONFIG.API_KEY.replace(/^["']|["']$/g, '');

    if (isNaN(storeId) || isNaN(variantId)) {
      throw new Error('Invalid store ID or variant ID');
    }

    const payload = {
      data: {
        type: 'checkouts',
        attributes: {
          store_id: storeId,
          variant_id: variantId,
          product_options: {
            enabled_variants: [variantId]
          }
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: storeId.toString()
            }
          },
          variant: {
            data: {
              type: "variants",
              id: variantId.toString()
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
        'Authorization': `Bearer ${apiKey}`
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

// Log configuration status
console.log('Lemon Squeezy Config Status:', {
  hasApiKey: !!LEMON_SQUEEZY_CONFIG.API_KEY,
  hasStoreId: !!LEMON_SQUEEZY_CONFIG.STORE_ID,
  hasVariantId: !!LEMON_SQUEEZY_CONFIG.VARIANT_ID,
  storeId: LEMON_SQUEEZY_CONFIG.STORE_ID,
  variantId: LEMON_SQUEEZY_CONFIG.VARIANT_ID
}); 