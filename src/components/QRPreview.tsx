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
            const reader = new FileReader();
            const dataUrl = await new Promise<string>((resolve, reject) => {
              reader.onload = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                  resolve(result);
                } else {
                  reject(new Error('Failed to read file as data URL'));
                }
              };
              reader.onerror = () => reject(reader.error);
              reader.readAsDataURL(options.logo as File);
            });

            // Create an image element to load the data URL
            const img = new Image();
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = dataUrl;
            });

            // Create a canvas to resize the image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const maxSize = 100; // Maximum size for the logo
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions while maintaining aspect ratio
            if (width > height) {
              if (width > maxSize) {
                height = height * (maxSize / width);
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width = width * (maxSize / height);
                height = maxSize;
              }
            }

            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);

            // Get the resized image as a data URL
            logoUrl = canvas.toDataURL('image/png');
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
          qrOptions: {
            errorCorrectionLevel: 'H'
          },
          ...(logoUrl && {
            image: logoUrl,
            imageOptions: {
              hideBackgroundDots: true,
              imageSize: 0.3,
              margin: 10,
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