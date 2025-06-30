import React, { useEffect, useRef } from 'react';
import { generateQR } from '../utils/generateQR';
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

  useEffect(() => {
    if (!options.text) return;

    const generateQRCode = async () => {
      let logoUrl = '';
      if (options.logo) {
        logoUrl = URL.createObjectURL(options.logo);
      }

      const qrOptions: QROptions = {
        data: options.text,
        foregroundColor: options.foregroundColor,
        backgroundColor: options.backgroundColor,
        cornersDotOptions: {
          type: options.cornerStyle,
          color: options.foregroundColor,
        },
        ...(logoUrl && {
          logo: {
            url: logoUrl,
          },
        }),
      };

      if (!qrRef.current) {
        qrRef.current = generateQR(qrOptions);
        if (containerRef.current) {
          await qrRef.current.append(containerRef.current);
        }
      } else {
        // Update existing QR code
        qrRef.current.update({
          data: options.text,
          dotsOptions: {
            color: options.foregroundColor,
            type: 'square',
          },
          backgroundOptions: {
            color: options.backgroundColor,
          },
          cornersSquareOptions: {
            color: options.foregroundColor,
            type: 'square',
          },
          cornersDotOptions: {
            color: options.foregroundColor,
            type: options.cornerStyle,
          },
          ...(logoUrl && {
            image: logoUrl,
          }),
        });
      }

      if (logoUrl) {
        URL.revokeObjectURL(logoUrl);
      }
    };

    generateQRCode();
  }, [options]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex justify-center items-center min-h-[350px] bg-gray-50 rounded-xl p-8"
      />
      {isPreview && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px] rounded-xl">
          <span className="text-black/70 text-xl font-bold transform -rotate-45 bg-white/80 px-6 py-2 rounded-full shadow-sm">
            PREVIEW
          </span>
        </div>
      )}
    </div>
  );
}; 