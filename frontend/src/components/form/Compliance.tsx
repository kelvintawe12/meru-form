// src/components/form/Compliance.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import { FormData } from '../../types/form';

const Compliance: React.FC = () => {
  const { t } = useTranslation('translation');
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Input
          label={t('form.exportLicense')}
          placeholder={t('form.exportLicensePlaceholder')}
          {...register('compliance.exportLicense')}
          error={errors.compliance?.exportLicense?.message}
        />
      </div>
      <div>
        <Select
          name="compliance.qualityCertification"
          label={t('form.qualityCertification')}
          options={['ISO 22000', 'HACCP', 'Organic', 'None']}
          error={errors.compliance?.qualityCertification?.message}
        />
      </div>
      <div>
        <Input
          label={t('form.customsDeclaration')}
          placeholder={t('form.customsDeclarationPlaceholder')}
          {...register('compliance.customsDeclaration')}
          error={errors.compliance?.customsDeclaration?.message}
        />
      </div>
      <div>
        <Textarea
          name="compliance.complianceNotes"
          label={t('form.complianceNotes')}
          placeholder={t('form.complianceNotesPlaceholder')}
          error={errors.compliance?.complianceNotes?.message}
        />
      </div>
      <div>
        <Input
          label={t('form.digitalSignature')}
          placeholder={t('form.digitalSignaturePlaceholder')}
          {...register('compliance.digitalSignature')}
          required
          error={errors.compliance?.digitalSignature?.message}
        />
      </div>
    </div>
  );
};

export default Compliance;