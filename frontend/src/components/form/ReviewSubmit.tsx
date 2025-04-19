import React, { useState } from 'react';
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
  const { handleSubmit, formState: { errors, isValid }, watch } = useFormContext<FormData>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const { generatePDF, shareViaWhatsApp } = usePDFGenerator();

  const clientInfo = watch('clientInfo');
  const customerId = formatCustomerId(
    clientInfo.fullName,
    clientInfo.phoneNumber,
    new Date(clientInfo.dateOfRegistration || new Date())
  );

  const onSubmit = async (data: FormData) => {
    try {
      const pdfBlob = await generatePDF(data, `MountMeruSoyCo_${customerId}.pdf`);
      if (!pdfBlob) {
        toast.error(t('form.pdfError'));
        return;
      }

      // Download PDF
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MountMeruSoyCo_${customerId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      // Share via WhatsApp if shareWithManager is checked
      if (data.shareWithManager && data.clientInfo.accountManager) {
        shareViaWhatsApp(pdfBlob, data.clientInfo.accountManager, t('form.managerShareMessage'));
      }

      // TODO: Implement emailPDF logic (e.g., send PDF via API)
      if (data.emailPDF && data.clientInfo.email) {
        toast.info(t('form.emailPDFNotImplemented'));
      }

      // Redirect to /success
      window.location.href = '/success';
    } catch (error) {
      toast.error(t('form.submitError'));
      console.error('Submit error:', error);
    }
  };

  const chartData = {
    labels: watch('orderDetails')?.map((order) => order.productName) || [],
    datasets: [
      {
        label: t('form.quantity'),
        data: watch('orderDetails')?.map((order) => order.quantity) || [],
        backgroundColor: '#4CAF50',
      },
    ],
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t('form.summary')}</h3>
      <div className="mb-4">
        <Chart data={chartData} />
      </div>
      <Checkbox name="confirmation" label="form.confirmation" />
      <Checkbox name="emailPDF" label="form.emailPDF" />
      <Checkbox name="shareWithManager" label="form.shareWithManager" />
      <div className="flex gap-4 mt-4">
        <Button
          variant="secondary"
          onClick={() => setPreviewOpen(true)}
          disabled={!isValid}
        >
          {t('form.previewPDF')}
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          {t('form.submit')}
        </Button>
      </div>
      <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} title={t('form.previewPDF')}>
        <div>{t('form.previewContent')}</div>
        {/* TODO: Implement PDF preview (e.g., using react-pdf) */}
      </Modal>
    </div>
  );
};

export default ReviewSubmit;