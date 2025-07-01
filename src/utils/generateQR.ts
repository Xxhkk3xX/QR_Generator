import QRCodeStyling from 'qr-code-styling';

export interface QROptions {
  data: string;
  foregroundColor?: string;
  backgroundColor?: string;
  cornersDotOptions?: {
    type?: 'square' | 'dot';
    color?: string;
  };
  dotsOptions?: {
    type: 'square';
    color: string;
  };
  backgroundOptions?: {
    color: string;
  };
  cornersSquareOptions?: {
    type: 'square' | 'dot';
    color: string;
  };
  image?: string;
  imageOptions?: {
    hideBackgroundDots?: boolean;
    imageSize?: number;
    margin?: number;
    crossOrigin?: 'anonymous';
  };
  qrOptions?: {
    errorCorrectionLevel: 'H';
  };
  size?: number;
  margin?: number;
}

export const generateQR = ({
  data,
  foregroundColor = '#000000',
  backgroundColor = '#ffffff',
  cornersDotOptions = { type: 'square', color: '#000000' },
  dotsOptions,
  backgroundOptions,
  cornersSquareOptions,
  image,
  imageOptions,
  qrOptions = { errorCorrectionLevel: 'H' },
  size = 300,
  margin = 10,
}: QROptions) => {
  const qr = new QRCodeStyling({
    width: size,
    height: size,
    type: 'canvas',
    data: data,
    margin,
    dotsOptions: dotsOptions || {
      type: 'square',
      color: foregroundColor,
    },
    backgroundOptions: backgroundOptions || {
      color: backgroundColor,
    },
    cornersSquareOptions: cornersSquareOptions || {
      type: 'square',
      color: foregroundColor,
    },
    cornersDotOptions: {
      type: cornersDotOptions.type || 'square',
      color: cornersDotOptions.color || foregroundColor,
    },
    qrOptions,
    ...(image && {
      image,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.3,
        margin: 10,
        crossOrigin: 'anonymous',
        ...imageOptions,
      },
    }),
  });

  return qr;
}; 