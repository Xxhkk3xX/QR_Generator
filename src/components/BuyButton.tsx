import React from 'react';
import { ar } from '../locales/ar';

interface BuyButtonProps {
  className?: string;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ className = '' }) => {
  const handleClick = () => {
    // Open WhatsApp with a pre-filled message
    const message = encodeURIComponent('مرحباً، أود شراء نسخة كاملة من مولد رمز QR');
    const whatsappUrl = `https://wa.me/96599999999?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-black px-6 py-4 text-white transition-all hover:scale-[1.01] active:scale-100 ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-full bg-gradient-to-tr from-[#00E676] to-[#128C7E] opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <span className="relative flex items-center gap-2 font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
        </svg>
        {ar.buyButton}
      </span>
    </button>
  );
}; 