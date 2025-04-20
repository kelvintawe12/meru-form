import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import PaymentScheduleModal from './PaymentScheduleModal';
import { Trash2 } from 'lucide-react';
import { FormData } from '../../types/form';

const OrderDetails: React.FC = () => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'orderDetails',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const calculateSubtotal = (index: number) => {
    const quantity = watch(`orderDetails.${index}.quantity`) ?? 0;
    const unitPrice = watch(`orderDetails.${index}.unitPrice`) ?? 0;
    const discount = watch(`orderDetails.${index}.discount`) ?? 0;
    return (quantity * unitPrice * (1 - discount / 100)).toFixed(2);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 mb-4 rounded-lg relative">
          <Button
            variant="danger"
            onClick={() => remove(index)}
            className="absolute top-2 right-2"
            disabled={fields.length === 1}
            aria-label={t('form.removeProduct')}
          >
            <Trash2 size={16} />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              name={`orderDetails.${index}.orderCategory`}
              label="form.orderCategory"
              options={['Retail', 'Wholesale', 'Export', 'Internal Use']}
              placeholder={t('options.select')}
            />
            <Select
              name={`orderDetails.${index}.productName`}
              label="form.productName"
              options={['Soy Oil', 'Sunflower Oil', 'Soy Flour', 'Soy Seeds']}
              placeholder={t('options.select')}
            />
            <Input name={`orderDetails.${index}.sku`} label="form.sku" placeholder={`SOY-${Math.random().toString(36).slice(2, 7)}`} />
            <Select
              name={`orderDetails.${index}.unitType`}
              label="form.unitType"
              options={['Liters', 'Kilograms', 'Bottles', 'Bags']}
              placeholder={t('options.select')}
            />
            <Input
              name={`orderDetails.${index}.quantity`}
              label="form.quantity"
              type="number"
              placeholder="1"
            />
            <Input
              name={`orderDetails.${index}.unitPrice`}
              label="form.unitPrice"
              type="number"
              placeholder="0"
            />
            <Input
              name={`orderDetails.${index}.discount`}
              label="form.discount"
              type="number"
              placeholder="0"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">{t('form.subtotal')}</p>
              <p className="mt-1 text-gray-900">{calculateSubtotal(index)} RWF</p>
            </div>
            <Textarea name={`orderDetails.${index}.notes`} label="form.notes" placeholder={t('form.notes')} />
            <Select
              name={`orderDetails.${index}.orderUrgency`}
              label="form.orderUrgency"
              options={['Standard', 'Expedited', 'Critical']}
              placeholder={t('options.select')}
            />
            <Select
              name={`orderDetails.${index}.packagingPreference`}
              label="form.packagingPreference"
              options={['Standard', 'Eco-Friendly', 'Custom']}
              placeholder={t('options.select')}
            />
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedIndex(index);
                setModalOpen(true);
              }}
              aria-label={t('form.setPaymentSchedule')}
            >
              {t('form.setPaymentSchedule')}
            </Button>
          </div>
        </div>
      ))}
      <Button
        variant="primary"
        onClick={() => append({
          orderCategory: undefined,
          productName: undefined,
          sku: undefined,
          unitType: undefined,
          quantity: undefined,
          unitPrice: undefined,
          discount: undefined,
          notes: undefined,
          orderUrgency: undefined,
          packagingPreference: undefined,
          paymentSchedule: undefined,
        })}
        aria-label={t('form.addProduct')}
      >
        {t('form.addProduct')}
      </Button>
      <PaymentScheduleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        index={selectedIndex}
      />
    </div>
  );
};

export default OrderDetails;