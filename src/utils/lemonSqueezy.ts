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
    const response = await fetch(`${LEMON_SQUEEZY_CONFIG.BASE_URL}/checkouts`, {
      method: 'POST',
      headers: {
        ...LEMON_SQUEEZY_CONFIG.HEADERS,
        'Authorization': `Bearer ${LEMON_SQUEEZY_CONFIG.API_KEY}`
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            product_id: LEMON_SQUEEZY_CONFIG.PRODUCT_ID,
            checkout_data: {
              custom: {
                user_id: 'anonymous'
              },
              checkout_options: {
                embed: true,
                media: false,
                button_color: '#000000',
                dark: false,
                paymentMethods: ['card', 'apple_pay', 'google_pay'],
                displayMode: 'inline',
                collectBillingAddress: false,
                collectShippingAddress: false,
                enabledPaymentMethods: ['card', 'apple_pay', 'google_pay']
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.attributes.url;
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
}; 