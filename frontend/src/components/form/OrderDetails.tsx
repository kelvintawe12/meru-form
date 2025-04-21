// src/components/form/OrderDetails.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Trash2 } from 'lucide-react';
import Button from '../common/Button';

interface OrderDetailsProps {
  orderFields: any[];
  appendOrder: (order: any) => void;
  removeOrder: (index: number) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderFields, appendOrder, removeOrder }) => {
  const { t } = useTranslation('translation');
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">{t('form.orderDetails')}</h2>
      {orderFields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium">{t('form.product')} {index + 1}</h3>
            <Button
              variant="danger"
              onClick={() => removeOrder(index)}
              aria-label={t('form.clearSection')}
              className="p-1"
            >
              <Trash2 size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">{t('form.productName')}</label>
              <select
                {...register(`orderDetails.${index}.productName`)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('form.selectProductName')}</option>
                {Object.keys(t('options.productName', { returnObjects: true })).map((key) => (
                  <option key={key} value={key}>
                    {t(`options.productName.${key}`)}
                  </option>
                ))}
              </select>
              {errors.orderDetails?.[index]?.productName && (
                <p className="text-red-600 text-sm">{t(errors.orderDetails[index].productName.message)}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">{t('form.quantity')}</label>
              <input
                type="number"
                {...register(`orderDetails.${index}.quantity`, { valueAsNumber: true })}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {errors.orderDetails?.[index]?.quantity && (
                <p className="text-red-600 text-sm">{t(errors.orderDetails[index].quantity.message)}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">{t('form.unitPrice')}</label>
              <input
                type="number"
                {...register(`orderDetails.${index}.unitPrice`, { valueAsNumber: true })}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {errors.orderDetails?.[index]?.unitPrice && (
                <p className="text-red-600 text-sm">{t(errors.orderDetails[index].unitPrice.message)}</p>
              )}
            </div>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() => appendOrder({ productName: '', sku: '', unitType: '', quantity: 0, unitPrice: 0, discount: 0 })}
        aria-label={t('form.addProduct')}
        className="mt-2"
      >
        {t('form.addProduct')}
      </Button>
    </div>
  );
};

export default OrderDetails;