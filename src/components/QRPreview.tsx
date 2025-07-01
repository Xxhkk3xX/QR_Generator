import React, { useEffect, useRef } from 'react';
import { generateQR } from '../utils/generateQR';
import type { QROptions } from '../utils/generateQR';
import { ar } from '../locales/ar';

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
        console.log('Starting QR code generation with options:', options);
        
        // Clean up previous QR instance
        if (qrRef.current) {
          console.log('Cleaning up previous QR instance');
          qrRef.current = null;
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
          }
        }

        // Clean up previous logo URL
        if (logoUrlRef.current) {
          console.log('Cleaning up previous logo URL');
          URL.revokeObjectURL(logoUrlRef.current);
          logoUrlRef.current = '';
        }

        // Create new logo URL if logo exists
        let logoUrl = '';
        if (options.logo instanceof File) {
          console.log('Creating new logo URL for file:', options.logo.name);
          try {
            // Create a simple URL for the logo
            logoUrl = URL.createObjectURL(options.logo);
            logoUrlRef.current = logoUrl;
          } catch (error) {
            console.error('Error processing logo:', error);
          }
        }

        const qrOptions: QROptions = {
          data: options.text || 'https://kwtech.it.com',
          foregroundColor: options.foregroundColor,
          backgroundColor: options.backgroundColor,
          cornersDotOptions: {
            type: options.cornerStyle as 'square' | 'dot',
            color: options.foregroundColor
          },
          size: 300,
          margin: 10,
          ...(logoUrl && {
            image: logoUrl,
            imageOptions: {
              hideBackgroundDots: false,
              imageSize: 0.35,
              margin: 0,
              crossOrigin: 'anonymous'
            }
          })
        };

        console.log('Generating QR with options:', qrOptions);

        // Create new QR instance
        qrRef.current = generateQR(qrOptions);
        
        if (containerRef.current) {
          console.log('Appending QR code to container');
          await qrRef.current.append(containerRef.current);
          console.log('QR code appended successfully');
        }
      } catch (error) {
        console.error('Error in QR code generation:', error);
      }
    };

    generateQRCode();

    // Cleanup function
    return () => {
      console.log('Running cleanup function');
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
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="flex justify-center items-center min-h-[300px] sm:min-h-[350px] bg-gray-50 rounded-xl p-4 sm:p-8 overflow-hidden"
        style={{
          WebkitOverflowScrolling: 'touch',
          maxWidth: '100%'
        }}
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