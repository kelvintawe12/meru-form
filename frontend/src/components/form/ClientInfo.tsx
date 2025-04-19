import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import RadioGroup from '../common/RadioGroup';
import Checkbox from '../common/Checkbox';
import FileInput from '../common/FileInput';
import { formatCustomerId } from '../../utils/formatters';

const ClientInfo: React.FC = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const fullName = watch('clientInfo.fullName') || '';
  const phoneNumber = watch('clientInfo.phoneNumber') || '';
  const customerId = formatCustomerId(fullName, phoneNumber, new Date());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input name="clientInfo.fullName" label="form.fullName" placeholder="form.fullNamePlaceholder" />
      <Input name="clientInfo.phoneNumber" label="form.phoneNumber" placeholder="form.phoneNumberPlaceholder" />
      <Input name="clientInfo.email" label="form.email" placeholder="form.emailPlaceholder" type="email" />
      <Select
        name="clientInfo.gender"
        label="form.gender"
        options={['Male', 'Female', 'Other', 'Prefer not to say']}
      />
      <Textarea name="clientInfo.address" label="form.address" placeholder="form.addressPlaceholder" />
      <Select
        name="clientInfo.clientCategory"
        label="form.clientCategory"
        options={['Farmer', 'Distributor', 'Retailer', 'Partner', 'Individual Buyer']}
      />
      <Input name="clientInfo.dateOfRegistration" label="form.dateOfRegistration" type="text" disabled />
      <Input name="clientInfo.referredBy" label="form.referredBy" placeholder="form.referredByPlaceholder" />
      <RadioGroup
        name="clientInfo.preferredContactMethod"
        label="form.preferredContactMethod"
        options={['SMS', 'Call', 'Email']}
      />
      <Input name="clientInfo.businessName" label="form.businessName" placeholder="form.businessNamePlaceholder" />
      <Input name="clientInfo.taxId" label="form.taxId" placeholder="form.taxIdPlaceholder" />
      <Checkbox name="clientInfo.loyaltyProgram" label="form.loyaltyProgram" />
      <Select
        name="clientInfo.clientTier"
        label="form.clientTier"
        options={['Standard', 'Premium', 'Enterprise']}
      />
      <Input name="clientInfo.accountManager" label="form.accountManager" placeholder="form.accountManagerPlaceholder" />
      <FileInput name="clientInfo.clientPhoto" label="form.clientPhoto" accept="image/jpeg,image/png" />
      <div>
        <p className="text-sm font-medium text-gray-700">{t('form.customerId')}</p>
        <p className="mt-1 text-gray-900">{customerId || t('form.customerIdPending')}</p>
      </div>
    </div>
  );
};

export default ClientInfo;