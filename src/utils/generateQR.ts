import QRCodeStyling from 'qr-code-styling';

export interface QROptions {
  data: string;
  foregroundColor?: string;
  backgroundColor?: string;
  cornersDotOptions?: {
    type?: 'square' | 'dot';
    color?: string;
  };
  logo?: {
    url: string;
    size?: number;
  };
  size?: number;
  margin?: number;
}

export const generateQR = ({
  data,
  foregroundColor = '#000000',
  backgroundColor = '#ffffff',
  cornersDotOptions = { type: 'square', color: '#000000' },
  logo,
  size = 300,
  margin = 10,
}: QROptions) => {
  const qr = new QRCodeStyling({
    width: size,
    height: size,
    type: 'canvas',
    data: data,
    margin,
    dotsOptions: {
      type: 'square',
      color: foregroundColor,
    },
    backgroundOptions: {
      color: backgroundColor,
    },
    cornersSquareOptions: {
      type: 'square',
      color: foregroundColor,
    },
    cornersDotOptions: {
      type: cornersDotOptions.type || 'square',
      color: cornersDotOptions.color || foregroundColor,
    },
    qrOptions: {
      errorCorrectionLevel: 'H',
    },
    ...(logo && {
      image: logo.url,
      imageOptions: {
        imageSize: 0.25,
        margin: 0,
        crossOrigin: 'anonymous',
      },
    }),
  });

  return qr;
}; 