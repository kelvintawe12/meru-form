import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import RadioGroup from '../common/RadioGroup';
import Checkbox from '../common/Checkbox';
import FileInput from '../common/FileInput';
import { FormData } from '../../types/form';

const formatCustomerId = (fullName: string, phoneNumber: string, date: Date): string => {
  if (!fullName || !phoneNumber) return '';
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('');
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  return `${initials}-${phoneNumber.slice(-4)}-${dateStr}`;
};

const ClientInfo: React.FC = () => {
  const { t } = useTranslation('translation');
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();

  const fullName = watch('clientInfo.fullName') || '';
  const phoneNumber = watch('clientInfo.phoneNumber') || '';
  const customerId = formatCustomerId(fullName, String(phoneNumber), new Date());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 no-flicker">
      <div>
        <Input
          label={t('form.fullName')}
          placeholder={t('form.fullNamePlaceholder')}
          {...register('clientInfo.fullName')}
          required
          error={errors.clientInfo?.fullName?.message}
        />
      </div>
      <div>
        <Input
          label={t('form.phoneNumber')}
          placeholder={t('form.phoneNumberPlaceholder')}
          type="tel"
          {...register('clientInfo.phoneNumber')}
          required
          error={errors.clientInfo?.phoneNumber?.message}
        />
      </div>
      <div>
        <Input
          label={t('form.email')}
          placeholder={t('form.emailPlaceholder')}
          type="email"
          {...register('clientInfo.email')}
          error={errors.clientInfo?.email?.message}
        />
      </div>
      <div>
        <Select
          name="clientInfo.gender"
          label={t('form.gender')}
          options={['Male', 'Female', 'Other', 'Prefer not to say']}
          error={errors.clientInfo?.gender?.message}
        />
      </div>
      <div>
        <Textarea
          name="clientInfo.address"
          label={t('form.address')}
          placeholder={t('form.addressPlaceholder')}
          error={errors.clientInfo?.address?.message}
        />
      </div>
      <div>
        <Select
          name="clientInfo.clientCategory"
          label={t('form.clientCategory')}
          options={['Farmer', 'Distributor', 'Retailer', 'Partner', 'Individual Buyer']}
          required
          error={errors.clientInfo?.clientCategory?.message}
        />
      </div>
      <div>
        <Input
          name="clientInfo.dateOfRegistration"
          label={t('form.dateOfRegistration')}
          type="text"
          disabled
          className="bg-gray-100 cursor-not-allowed"
        />
      </div>
      <div>
        <Input
          name="clientInfo.referredBy"
          label={t('form.referredBy')}
          placeholder={t('form.referredByPlaceholder')}
          error={errors.clientInfo?.referredBy?.message}
        />
      </div>
      <div>
        <RadioGroup
          name="clientInfo.preferredContactMethod"
          label={t('form.preferredContactMethod')}
          options={['SMS', 'Call', 'Email']}
          error={errors.clientInfo?.preferredContactMethod?.message}
        />
      </div>
      <div>
        <Input
          name="clientInfo.businessName"
          label={t('form.businessName')}
          placeholder={t('form.businessNamePlaceholder')}
          error={errors.clientInfo?.businessName?.message}
        />
      </div>
      <div>
        <Input
          name="clientInfo.taxId"
          label={t('form.taxId')}
          placeholder={t('form.taxIdPlaceholder')}
          error={errors.clientInfo?.taxId?.message}
        />
      </div>
      <div>
        <Checkbox
          name="clientInfo.loyaltyProgram"
          label={t('form.loyaltyProgram')}
          tooltip={t('form.loyaltyProgramTooltip')}
          error={errors.clientInfo?.loyaltyProgram?.message}
        />
      </div>
      <div>
        <Select
          name="clientInfo.clientTier"
          label={t('form.clientTier')}
          options={['Standard', 'Premium', 'Enterprise']}
          error={errors.clientInfo?.clientTier?.message}
        />
      </div>
      <div>
        <Input
          name="clientInfo.accountManager"
          label={t('form.accountManager')}
          placeholder={t('form.accountManagerPlaceholder')}
          error={errors.clientInfo?.accountManager?.message}
        />
      </div>
      <div>
        <FileInput
          name="clientInfo.clientPhoto"
          label={t('form.clientPhoto')}
          accept="image/jpeg,image/png"
          error={errors.clientInfo?.clientPhoto?.message}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t('form.customerId')}
        </label>
        <p className="mt-1 text-gray-900">
          {customerId || t('form.customerIdPending')}
        </p>
      </div>
    </div>
  );
};

export default ClientInfo;