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
    <div className="space-y-6 p-6 md:p-8">
      {/* URL Input */}
      <div className="space-y-2">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          {ar.qrContent}
        </label>
        <input
          type="text"
          id="text"
          name="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
          value={formData.text}
          onChange={handleInputChange}
          placeholder={ar.urlPlaceholder}
        />
      </div>

      {/* Color Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="foregroundColor" className="block text-sm font-medium text-gray-700">
            {ar.foregroundColor}
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="color"
                id="foregroundColor"
                name="foregroundColor"
                className="h-12 w-24 rounded-lg cursor-pointer"
                value={formData.foregroundColor}
                onChange={handleInputChange}
              />
            </div>
            <span className="text-sm text-gray-600">{formData.foregroundColor.toUpperCase()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700">
            {ar.backgroundColor}
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="color"
                id="backgroundColor"
                name="backgroundColor"
                className="h-12 w-24 rounded-lg cursor-pointer"
                value={formData.backgroundColor}
                onChange={handleInputChange}
              />
              <div className="absolute inset-0 rounded-lg border border-gray-200 pointer-events-none"></div>
            </div>
            <span className="text-sm text-gray-600">{formData.backgroundColor.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Corner Style */}
      <div className="space-y-2">
        <label htmlFor="cornerStyle" className="block text-sm font-medium text-gray-700">
          {ar.cornerStyle}
        </label>
        <select
          id="cornerStyle"
          name="cornerStyle"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
          value={formData.cornerStyle}
          onChange={handleInputChange}
        >
          <option value="square">{ar.cornerStyles.square}</option>
          <option value="dot">{ar.cornerStyles.dot}</option>
        </select>
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {ar.logo.title}
        </label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-gray-400 transition-all bg-gray-50"
        >
          <input {...getInputProps()} />
          {logo ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-600">{logo.name}</span>
              <button
                className="text-red-500 hover:text-red-700 font-medium text-sm"
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
              <p className="text-sm text-gray-600 mb-1">
                {ar.logo.dropzone}
              </p>
              <p className="text-xs text-gray-500">
                {ar.logo.supportedFormats}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 