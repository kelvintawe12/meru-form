import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SignaturePad from 'react-signature-canvas';
import Button from '../common/Button';

interface SignatureCanvasProps {
  name: string;
  label: string;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ name, label }) => {
  const { t } = useTranslation();
  const { setValue, formState: { errors } } = useFormContext();
  const sigCanvas = useRef<SignaturePad>(null);
  const error = errors[name]?.message as string;

  const saveSignature = () => {
    if (sigCanvas.current) {
      const data = sigCanvas.current.toDataURL();
      setValue(name, data);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {t(label)} {errors[name] && <span className="text-red-600">*</span>}
      </label>
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{ className: 'border border-gray-300 rounded-lg w-full h-32 mt-1' }}
        onEnd={saveSignature}
      />
      <Button
        variant="secondary"
        onClick={() => sigCanvas.current?.clear()}
        className="mt-2"
      >
        {t('form.clearSignature')}
      </Button>
      {error && <p className="mt-1 text-sm text-red-600">{t(error)}</p>}
    </div>
  );
};

export default SignatureCanvas;