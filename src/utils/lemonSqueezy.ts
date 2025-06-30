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
    const payload = {
      data: {
        type: 'checkouts',
        attributes: {
          store_id: parseInt(LEMON_SQUEEZY_CONFIG.STORE_ID),
          variant_id: parseInt(LEMON_SQUEEZY_CONFIG.VARIANT_ID),
          product_options: {
            enabled_variants: [parseInt(LEMON_SQUEEZY_CONFIG.VARIANT_ID)]
          }
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: LEMON_SQUEEZY_CONFIG.STORE_ID
            }
          },
          variant: {
            data: {
              type: "variants",
              id: LEMON_SQUEEZY_CONFIG.VARIANT_ID
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