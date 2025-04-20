import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { FormData } from '../../types/form';

interface PaymentScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  index: number | null;
}

const PaymentScheduleModal: React.FC<PaymentScheduleModalProps> = ({ isOpen, onClose, index }) => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext<FormData>();

  if (!isOpen || index === null) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">{t('form.setPaymentSchedule')}</h2>
        <Select
          name={`orderDetails.${index}.paymentSchedule`}
          label="form.setPaymentSchedule"
          options={['Full Payment', '30% Deposit', 'Installments']}
        />
        <Button variant="primary" onClick={onClose} className="mt-4">
          {t('form.save')}
        </Button>
        <Button variant="secondary" onClick={onClose} className="mt-2">
          {t('form.cancel')}
        </Button>
      </div>
    </div>
  );
};

export default PaymentScheduleModal;