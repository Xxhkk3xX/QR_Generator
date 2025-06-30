import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ar } from '../locales/ar';

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
          {ar.qrContent}
        </label>
        <input
          type="text"
          id="text"
          name="text"
          className="input"
          value={formData.text}
          onChange={handleInputChange}
          placeholder={ar.urlPlaceholder}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="foregroundColor" className="heading-2 block mb-2">
            {ar.foregroundColor}
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
            {ar.backgroundColor}
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
          {ar.cornerStyle}
        </label>
        <select
          id="cornerStyle"
          name="cornerStyle"
          className="input"
          value={formData.cornerStyle}
          onChange={handleInputChange}
        >
          <option value="square">{ar.cornerStyles.square}</option>
          <option value="dot">{ar.cornerStyles.dot}</option>
        </select>
      </div>

      <div>
        <label className="heading-2 block mb-2">
          {ar.logo.title}
        </label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
        >
          <input {...getInputProps()} />
          {logo ? (
            <div className="text-body">
              {logo.name}
              <button
                className="mr-3 text-red-500 hover:text-red-700 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setLogo(null);
                  handleUpdate({ logo: undefined });
                }}
              >
                {ar.logo.remove}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-body mb-2">
                {ar.logo.dropzone}
              </p>
              <p className="text-sm text-gray-500">
                {ar.logo.supportedFormats}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 