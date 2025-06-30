import React from 'react';

interface BuyButtonProps {
  productId: string;
  className?: string;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ productId, className = '' }) => {
  return (
    <a
      href={`https://yourstore.lemonsqueezy.com/buy/${productId}`}
      className={`lemonsqueezy-button ${className}`}
      data-payment-methods="card,apple-pay,google-pay"
    >
      Buy & Download
    </a>
  );
}; 