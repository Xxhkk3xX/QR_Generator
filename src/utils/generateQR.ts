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
    margin: margin,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: 'H',
    },
    dotsOptions: {
      color: foregroundColor,
      type: 'square',
    },
    backgroundOptions: {
      color: backgroundColor,
    },
    cornersSquareOptions: {
      color: foregroundColor,
      type: 'square',
    },
    cornersDotOptions: {
      color: cornersDotOptions.color || foregroundColor,
      type: cornersDotOptions.type || 'square',
    },
    ...(logo && {
      image: logo.url,
      imageOptions: {
        hideBackgroundDots: false,
        imageSize: logo.size || 0.2,
        margin: 5,
        crossOrigin: 'anonymous',
      },
    }),
  });

  return qr;
}; 