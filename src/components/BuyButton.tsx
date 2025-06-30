import React from 'react';

interface BuyButtonProps {
  productId: string;
  className?: string;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ productId, className = '' }) => {
  return (
    <button
      onClick={() => window.location.href = `https://yourstore.lemonsqueezy.com/buy/${productId}`}
      className={`w-full bg-black text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors ${className}`}
    >
      اشترِ الآن وتحميل مباشر
    </button>
  );
}; 