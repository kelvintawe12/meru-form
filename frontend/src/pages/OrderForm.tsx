// src/pages/OrderForm.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { useFormStore } from '../hooks/useFormStore';
import { formSchema } from '../utils/formSchema';
import { FormData, OrderEntry, DispatchEntry } from '../types/form';
import { usePDFGenerator } from '../hooks/usePDFGenerator';
import PDFPreviewModal from '../components/PDFPreviewModal';
import ClientInfo from '../components/form/ClientInfo';
import OrderDetails from '../components/form/OrderDetails';
import SalesOps from '../components/form/SalesOps';
import Compliance from '../components/form/Compliance';
import ReviewSubmit from '../components/form/ReviewSubmit';
import { FileText, Trash2 } from 'lucide-react';
import Button from '../components/common/Button';

const OrderForm: React.FC = () => {
  const { t } = useTranslation('translation');
  const formData = useFormStore((state) => state.formData);
  const updateDraft = useFormStore((state) => state.updateDraft);
  const addAttachment = useFormStore((state) => state.addAttachment);
  const removeAttachment = useFormStore((state) => state.removeAttachment);
  const isSubmitting = useFormStore((state) => state.isSubmitting);
  const submitFormAsync = useFormStore((state) => state.submitFormAsync);
  const { generatePDF, generateReceiptPDF, shareViaWhatsApp } = usePDFGenerator();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfType, setPdfType] = useState<'order' | 'receipt' | null>(null);

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { ...formData, dispatch: formData.dispatch || [] },
    mode: 'onSubmit',
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = methods;

  const debouncedUpdateDraft = useCallback(
    debounce((data: Partial<FormData>) => {
      updateDraft(data);
    }, 300),
    [updateDraft]
  );

  useEffect(() => {
    console.log('OrderForm rendered');
    const subscription = methods.watch((value) => {
      const sanitizedValue = {
        ...value,
        clientInfo: value.clientInfo
          ? Object.fromEntries(
              Object.entries(value.clientInfo).filter(([_, v]) => v !== undefined)
            ) as { [key: string]: string | number }
          : undefined,
        orderDetails: value.orderDetails
          ? value.orderDetails.filter((detail) => detail !== undefined) as OrderEntry[]
          : undefined,
        dispatch: value.dispatch
          ? value.dispatch.filter((entry) => entry !== undefined) as DispatchEntry[]
          : undefined,
      };
      debouncedUpdateDraft(sanitizedValue);
    });
    return () => {
      subscription.unsubscribe();
      debouncedUpdateDraft.cancel();
    };
  }, [methods, debouncedUpdateDraft]);

  const handleGeneratePDF = async (type: 'order' | 'receipt') => {
    if (!isValid) {
      toast.error(t('form.validationError'));
      return;
    }
    const formValues = methods.getValues();
    const result = type === 'order' ? await generatePDF(formValues) : await generateReceiptPDF(formValues);
    if (result) {
      setPdfUrl(result.url);
      setPdfType(type);
      setIsModalOpen(true);
    }
  };

  const handleSharePDF = async () => {
    if (pdfUrl && pdfType) {
      const formValues = methods.getValues();
      const result = pdfType === 'order' ? await generatePDF(formValues) : await generateReceiptPDF(formValues);
      if (result) {
        await shareViaWhatsApp(result, String(formValues.clientInfo.phoneNumber));
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      await submitFormAsync({ ...data, dispatch: data.dispatch || [] });
      toast.success(t('form.submitSuccess'));
      methods.reset(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Form submission failed';
      setError('root', { message: errorMessage });
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 no-flicker">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{t('form.title')}</h1>
      {errors.root && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {errors.root.message}
        </div>
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <ClientInfo />
          <OrderDetails />
          <SalesOps />
          <Compliance />
          <ReviewSubmit />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">{t('form.attachments')}</h2>
            <input
              type="file"
              onChange={(e) => e.target.files && addAttachment(e.target.files[0])}
              className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="mt-4 space-y-2">
              {formData.attachments.attachmentName.map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{name}</span>
                  <Button
                    variant="danger"
                    onClick={() => removeAttachment(index)}
                    aria-label={t('form.removeAttachment')}
                    className="p-1"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="primary"
              onClick={() => handleGeneratePDF('order')}
              disabled={isSubmitting}
              icon={FileText}
              aria-label={t('form.previewOrderPDF')}
              className="flex items-center gap-2"
            >
              {t('form.previewOrderPDF')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              aria-label={t('form.submit')}
            >
              {t('form.submit')}
            </Button>
          </div>
        </form>
      </FormProvider>
      <PDFPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pdfUrl={pdfUrl || ''}
        onDownload={() => pdfUrl && window.open(pdfUrl, '_blank')}
        onShare={handleSharePDF}
      />
    </div>
  );
};

export default OrderForm;