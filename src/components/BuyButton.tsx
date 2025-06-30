import React, { useState } from 'react';
import { createCheckout } from '../utils/lemonSqueezy';

interface BuyButtonProps {
  className?: string;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const checkoutUrl = await createCheckout();
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full bg-black text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      data-payment-methods="card,apple-pay,google-pay"
    >
      {isLoading ? 'جارٍ التحميل...' : 'اشترِ الآن - ٢.٥ د.ك'}
    </button>
  );
}; 