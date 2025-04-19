import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

interface PaymentScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  index: number | null;
}

const PaymentScheduleModal: React.FC<PaymentScheduleModalProps> = ({ isOpen, onClose, index }) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();

  const handleSave = () => {
    // Example: Set payment schedule
    setValue(`orderDetails.${index}.paymentSchedule`, 'Installments');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('form.paymentSchedule')}>
      <div className="space-y-4">
        <Input name="installments" label="form.installments" type="number" />
        <Input name="amountPerInstallment" label="form.amountPerInstallment" type="number" />
        <Input name="firstPaymentDate" label="form.firstPaymentDate" type="date" />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          {t('form.cancel')}
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {t('form.save')}
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentScheduleModal;