import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import Modal from '../ui/Modal';
import Chart from '../ui/Chart';
import { usePDFGenerator } from '../../hooks/usePDFGenerator';
import { FormData } from '../../types/form';

const ReviewSubmit: React.FC = () => {
  const { t } = useTranslation();
  const { handleSubmit, formState: { errors, isValid } } = useFormContext();
  const [previewOpen, setPreviewOpen] = useState(false);
  const generatePDF = usePDFGenerator();

  const onSubmit = async (data: FormData) => {
    const pdfBlob = await generatePDF(data);
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MountMeruSoyCo_${data.clientInfo.customerId}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    // Redirect to /success
    window.location.href = '/success';
  };

  const chartData = {
    labels: (watch('orderDetails') as any[])?.map((order) => order.productName) || [],
    datasets: [{
      label: t('form.quantity'),
      data: (watch('orderDetails') as any[])?.map((order) => order.quantity) || [],
      backgroundColor: '#4CAF50',
    }],
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t('form.summary')}</h3>
      {/* Accordion for each section */}
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
        {/* PDF preview logic */}
      </Modal>
    </div>
  );
};

export default ReviewSubmit;