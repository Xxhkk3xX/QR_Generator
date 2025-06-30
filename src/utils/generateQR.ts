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
  // Calculate optimal QR version based on data length
  const getQRVersion = (dataLength: number) => {
    if (dataLength <= 25) return 3;
    if (dataLength <= 47) return 4;
    if (dataLength <= 87) return 6;
    return 8;
  };

  const qrVersion = getQRVersion(data.length);
  console.log('Using QR version:', qrVersion, 'for data length:', data.length);

  const qr = new QRCodeStyling({
    width: size,
    height: size,
    type: 'canvas',
    data: data,
    margin: margin,
    qrOptions: {
      typeNumber: qrVersion,
      mode: 'Byte',
      errorCorrectionLevel: 'H',
    },
    dotsOptions: {
      type: 'dots',
      color: foregroundColor,
    },
    backgroundOptions: {
      color: backgroundColor,
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
      color: foregroundColor,
    },
    cornersDotOptions: {
      type: cornersDotOptions.type || 'dot',
      color: cornersDotOptions.color || foregroundColor,
    },
    ...(logo && {
      image: logo.url,
      imageOptions: {
        hideBackgroundDots: false,
        imageSize: 0.2,
        crossOrigin: 'anonymous',
        margin: 5,
      },
    }),
  });

  return qr;
}; 