import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import Modal from '../ui/Modal';
import Chart from '../ui/Chart';
import { usePDFGenerator } from '../../hooks/usePDFGenerator';
import { FormData } from '../../types/form';
import { formatCustomerId } from '../../utils/formatters';

const ReviewSubmit: React.FC = () => {
  const { t } = useTranslation();
  const { handleSubmit, formState: { errors, isValid }, watch, getValues } = useFormContext<FormData>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const { generatePDF, shareViaWhatsApp } = usePDFGenerator();

  const clientInfo = watch('clientInfo');
  const customerId = formatCustomerId(
    clientInfo.fullName,
    clientInfo.phoneNumber,
    new Date(clientInfo.dateOfRegistration || new Date())
  );

  // Cleanup PDF URL on unmount
  useEffect(() => {
    return () => {
      if (previewPdfUrl) {
        URL.revokeObjectURL(previewPdfUrl);
      }
    };
  }, [previewPdfUrl]);

  const validateSubmission = (data: FormData) => {
    if (data.emailPDF && !data.clientInfo.email) {
      toast.error(t('form.emailRequired'));
      return false;
    }
    if (data.shareWithManager && !data.clientInfo.accountManager) {
      toast.error(t('form.accountManagerRequired'));
      return false;
    }
    return true;
  };

  const onSubmit = async (data: FormData) => {
    if (!validateSubmission(data)) return;

    try {
      const pdfResult = await generatePDF(data, `MountMeruSoyCo_${customerId}.pdf`);
      if (!pdfResult?.blob) {
        toast.error(t('form.pdfError'));
        return;
      }

      // Download PDF
      const url = URL.createObjectURL(pdfResult.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MountMeruSoyCo_${customerId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      // Share via WhatsApp
      if (data.shareWithManager && data.clientInfo.accountManager) {
        shareViaWhatsApp(pdfResult, data.clientInfo.accountManager);
      }

      // Email PDF
      if (data.emailPDF && data.clientInfo.email) {
        // Implement email API call here
        toast.info(t('form.emailPDFNotImplemented'));
      }

      window.location.href = '/success';
    } catch (error) {
      toast.error(t('form.submitError'));
      console.error('Submit error:', error);
    }
  };

  const handlePreviewClick = async () => {
    if (!isValid) return;

    setIsGeneratingPreview(true);
    try {
      const formData = getValues();
      const pdfResult = await generatePDF(formData, 'MountMeruSoyCo_Preview.pdf');
      
      if (pdfResult?.blob) {
        const url = URL.createObjectURL(pdfResult.blob);
        setPreviewPdfUrl(url);
        setPreviewOpen(true);
      } else {
        toast.error(t('form.pdfError'));
      }
    } catch (error) {
      toast.error(t('form.previewError'));
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  const chartData = {
    labels: watch('orderDetails')?.map((order) => order.productName) || [],
    datasets: [{
      label: t('form.quantity'),
      data: watch('orderDetails')?.map((order) => order.quantity) || [],
      backgroundColor: '#4CAF50',
    }],
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t('form.summary')}</h3>
      
      <div className="mb-4">
        {chartData.labels.length === 0 ? (
          <p className="text-gray-500">{t('form.noOrderData')}</p>
        ) : (
          <Chart data={chartData} />
        )}
      </div>

      <Checkbox name="confirmation" label="form.confirmation" />
      
      <Checkbox 
        name="emailPDF" 
        label="form.emailPDF" 
        disabled={!watch('confirmation')}
      />
      
      <Checkbox 
        name="shareWithManager" 
        label="form.shareWithManager" 
        disabled={!watch('confirmation')}
      />

      <div className="flex gap-4 mt-4">
        <Button
          variant="secondary"
          onClick={handlePreviewClick}
          disabled={!isValid || isGeneratingPreview}
        >
          {isGeneratingPreview ? t('form.generating') : t('form.previewPDF')}
        </Button>
        
        <Button
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          {t('form.submit')}
        </Button>
      </div>

      <Modal 
        isOpen={previewOpen} 
        onClose={() => {
          setPreviewOpen(false);
          if (previewPdfUrl) {
            URL.revokeObjectURL(previewPdfUrl);
            setPreviewPdfUrl(null);
          }
        }}
        title={t('form.previewPDF')}
      >
        {previewPdfUrl ? (
          <iframe 
            src={previewPdfUrl} 
            width="100%" 
            height="600px" 
            title={t('form.previewPDF')}
          />
        ) : (
          <div>{t('form.generatingPreview')}</div>
        )}
      </Modal>
    </div>
  );
};

export default ReviewSubmit;