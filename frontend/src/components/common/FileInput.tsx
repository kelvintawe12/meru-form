import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FileInputProps {
  name: string;
  label: string;
  accept?: string;
  maxSizeMB?: number;
  error?: string;
}

const FileInput: React.FC<FileInputProps> = ({ name, label, accept = 'image/*', maxSizeMB = 5, error }) => {
  const { t } = useTranslation();
  const { register, formState: { errors }, setValue } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const errorMessage = errors[name]?.message as string;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= maxSizeMB * 1024 * 1024) {
      setValue(name, file);
      setPreview(URL.createObjectURL(file));
    } else {
      setValue(name, null);
      setPreview(null);
      // Trigger error via form validation
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {t(label)} {(error || errorMessage) && <span className="text-red-600">*</span>}
      </label>
      <input
        type="file"
        id={name}
        accept={accept}
        className={`mt-1 w-full ${error || errorMessage ? 'border-red-600' : 'border-gray-300'}`}
        {...register(name, {
          onChange: (e) => handleFileChange(e),
        })}
      />
      {preview && <img src={preview} alt="Preview" className="mt-2 w-24 h-24 object-cover" />}
      {(error || errorMessage) && <p className="mt-1 text-sm text-red-600">{t(error || errorMessage)}</p>}
    </div>
  );
};

export default FileInput;