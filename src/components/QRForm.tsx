import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface QRFormProps {
  onUpdate: (data: {
    text: string;
    foregroundColor: string;
    backgroundColor: string;
    cornerStyle: 'square' | 'dot';
    logo?: File;
  }) => void;
}

export const QRForm: React.FC<QRFormProps> = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    text: '',
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    cornerStyle: 'square' as const,
  });
  const [logo, setLogo] = useState<File | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        setLogo(acceptedFiles[0]);
        handleUpdate({ logo: acceptedFiles[0] });
      }
    },
  });

  const handleUpdate = (update: Partial<typeof formData & { logo?: File }>) => {
    const newData = { ...formData, ...update };
    setFormData(newData);
    onUpdate({
      ...newData,
      logo: update.logo || logo || undefined,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleUpdate({ [name]: value });
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <label htmlFor="text" className="heading-2 block mb-2">
          QR Code Content
        </label>
        <input
          type="text"
          id="text"
          name="text"
          className="input"
          value={formData.text}
          onChange={handleInputChange}
          placeholder="Enter URL or text"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="foregroundColor" className="heading-2 block mb-2">
            Foreground Color
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="color"
              id="foregroundColor"
              name="foregroundColor"
              className="h-12 w-24 rounded-lg cursor-pointer"
              value={formData.foregroundColor}
              onChange={handleInputChange}
            />
            <span className="text-body">{formData.foregroundColor.toUpperCase()}</span>
          </div>
        </div>

        <div>
          <label htmlFor="backgroundColor" className="heading-2 block mb-2">
            Background Color
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="color"
              id="backgroundColor"
              name="backgroundColor"
              className="h-12 w-24 rounded-lg cursor-pointer"
              value={formData.backgroundColor}
              onChange={handleInputChange}
            />
            <span className="text-body">{formData.backgroundColor.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="cornerStyle" className="heading-2 block mb-2">
          Corner Style
        </label>
        <select
          id="cornerStyle"
          name="cornerStyle"
          className="input"
          value={formData.cornerStyle}
          onChange={handleInputChange}
        >
          <option value="square">Square</option>
          <option value="dot">Dot</option>
        </select>
      </div>

      <div>
        <label className="heading-2 block mb-2">
          Logo (optional)
        </label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-gray-300 transition-colors bg-gray-50"
        >
          <input {...getInputProps()} />
          {logo ? (
            <div className="text-body">
              {logo.name}
              <button
                className="ml-3 text-red-500 hover:text-red-700 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setLogo(null);
                  handleUpdate({ logo: undefined });
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <p className="text-body mb-2">
                Drag & drop a logo here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supports PNG, JPG up to 2MB
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 