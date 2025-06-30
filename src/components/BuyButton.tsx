import React, { useState } from 'react';
import { createCheckout } from '../utils/lemonSqueezy';

interface BuyButtonProps {
  productId: string;
  className?: string;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ productId, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const checkoutUrl = await createCheckout(productId);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full bg-black text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? 'جارٍ التحميل...' : 'اشترِ الآن وتحميل مباشر'}
    </button>
  );
}; 