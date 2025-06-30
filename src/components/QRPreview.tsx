import React, { useEffect, useRef } from 'react';
import { generateQR } from '../utils/generateQR';
import { ar } from '../locales/ar';
import type { QROptions } from '../utils/generateQR';

interface QRPreviewProps {
  options: {
    text: string;
    foregroundColor: string;
    backgroundColor: string;
    cornerStyle: 'square' | 'dot';
    logo?: File;
  };
  isPreview?: boolean;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ options, isPreview = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<any>(null);
  const logoUrlRef = useRef<string>('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // Clean up previous QR instance
        if (qrRef.current) {
          qrRef.current = null;
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
          }
        }

        // Clean up previous logo URL
        if (logoUrlRef.current) {
          URL.revokeObjectURL(logoUrlRef.current);
          logoUrlRef.current = '';
        }

        // Create new logo URL if logo exists
        let logoUrl = '';
        if (options.logo) {
          logoUrl = URL.createObjectURL(options.logo);
          logoUrlRef.current = logoUrl;
        }

        const qrOptions: QROptions = {
          data: options.text || 'https://kwtech.it.com',
          foregroundColor: options.foregroundColor,
          backgroundColor: options.backgroundColor,
          cornersDotOptions: {
            type: options.cornerStyle,
            color: options.foregroundColor,
          },
          ...(logoUrl && {
            logo: {
              url: logoUrl,
              size: 0.25,
            },
          }),
        };

        // Create new QR instance
        qrRef.current = generateQR(qrOptions);
        if (containerRef.current) {
          await qrRef.current.append(containerRef.current);
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();

    // Cleanup function
    return () => {
      if (logoUrlRef.current) {
        URL.revokeObjectURL(logoUrlRef.current);
      }
      if (qrRef.current && containerRef.current) {
        containerRef.current.innerHTML = '';
        qrRef.current = null;
      }
    };
  }, [options]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex justify-center items-center min-h-[300px] sm:min-h-[350px] bg-gray-50 rounded-xl p-4 sm:p-8"
      />
      {isPreview && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px] rounded-xl">
          <span className="text-black/80 text-2xl font-bold transform -rotate-45 bg-white/90 px-8 py-3 rounded-full shadow-lg">
            {ar.preview}
          </span>
        </div>
      )}
    </div>
  );
}; 