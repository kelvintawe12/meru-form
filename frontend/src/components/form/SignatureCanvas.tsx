import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SignaturePad from 'react-signature-canvas';
import Button from '../common/Button';
import { FormData } from '../../types/form';
import { AlertCircle } from 'lucide-react';

interface SignatureCanvasProps {
  name: keyof FormData;
  label: string;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ name, label }) => {
  const { t } = useTranslation();
  const { setValue, formState: { errors } } = useFormContext<FormData>();
  const sigCanvas = useRef<SignaturePad>(null);
  const error = errors[name]?.message as string | undefined;

  const saveSignature = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const data = sigCanvas.current.toDataURL();
      setValue(name, data, { shouldValidate: true });
    }
  };

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setValue(name, '', { shouldValidate: true });
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {t(label)}
        {errors[name] && <span className="text-red-600 ml-1">*</span>}
      </label>
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{
          id: name,
          className: 'border border-gray-300 rounded-lg w-full h-32 mt-1',
          'aria-label': t('form.signatureCanvas'),
        }}
        onEnd={saveSignature}
      />
      <Button
        variant="secondary"
        onClick={clearSignature}
        className="mt-2"
      >
        {t('form.clearSignature')}
      </Button>
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {t(error)}
        </p>
      )}
    </div>
  );
};

export default SignatureCanvas;