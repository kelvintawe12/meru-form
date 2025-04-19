import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import DatePicker from '../common/DatePicker';
import Checkbox from '../common/Checkbox';
import FileInput from '../common/FileInput';
import { FormData } from '../../types/form';

const SalesOps: React.FC = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext<FormData>();
  const paymentStatus = watch('salesOps.paymentStatus');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input name="salesOps.salesRepresentative" label="form.salesRepresentative" />
      <Select
        name="salesOps.paymentStatus"
        label="form.paymentStatus"
        options={['Pending', 'Partial', 'Paid']}
      />
      {['Partial', 'Paid'].includes(paymentStatus) && (
        <>
          <Select
            name="salesOps.paymentMethod"
            label="form.paymentMethod"
            options={['Cash on Delivery', 'M-Pesa', 'Bank Transfer', 'Credit']}
          />
          <Input name="salesOps.paymentReceived" label="form.paymentReceived" type="number" />
          <FileInput name="salesOps.paymentReceipt" label="form.paymentReceipt" accept="image/*,application/pdf" />
        </>
      )}
      <Select
        name="salesOps.deliveryStatus"
        label="form.deliveryStatus"
        options={['Processing', 'Dispatched', 'Delivered', 'Cancelled']}
      />
      <DatePicker name="salesOps.preferredDeliveryDate" label="form.preferredDeliveryDate" />
      <Textarea name="salesOps.internalComments" label="form.internalComments" />
      <Select
        name="salesOps.orderPriority"
        label="form.orderPriority"
        options={['Low', 'Medium', 'High']}
      />
      <Select
        name="salesOps.salesChannel"
        label="form.salesChannel"
        options={['Online', 'Phone', 'In-Person', 'Agent']}
      />
      <Checkbox name="salesOps.crmSync" label="form.crmSync" />
      <Input name="salesOps.invoiceNumber" label="form.invoiceNumber" />
    </div>
  );
};

export default SalesOps;