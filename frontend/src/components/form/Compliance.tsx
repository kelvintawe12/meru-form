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
    <div className="space-y-6 no-flicker">
      <div>
        <Input
          label={t('form.exportLicense')}
          name="compliance.exportLicense"
          register={register}
          error={errors.compliance?.exportLicense?.message}
        />
      </div>
      <div>
        <Select
          label={t('form.qualityCertification')}
          name="compliance.qualityCertification"
          options={['ISO 22000', 'HACCP', 'Organic', 'None']}
          register={register}
          error={errors.compliance?.qualityCertification?.message}
        />
      </div>
      <div>
        <Input
          label={t('form.customsDeclaration')}
          name="compliance.customsDeclaration"
          register={register}
          error={errors.compliance?.customsDeclaration?.message}
        />
      </div>
      <div>
        <Textarea
          label={t('form.complianceNotes')}
          name="compliance.complianceNotes"
          register={register}
          error={errors.compliance?.complianceNotes?.message}
        />
      </div>
      <div>
        <Input
          label={t('form.digitalSignature')}
          name="compliance.digitalSignature"
          register={register}
          required
          error={errors.compliance?.digitalSignature?.message}
        />
      </div>
    </div>
  );
};

export default Compliance;