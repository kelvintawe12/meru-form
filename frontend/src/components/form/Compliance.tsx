import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import SignatureCanvas from './SignatureCanvas';

const Compliance: React.FC = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const orderCategory = watch('orderDetails')?.some((order: any) => order.orderCategory === 'Export');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {orderCategory && (
        <>
          <Input name="compliance.exportLicense" label="form.exportLicense" />
          <Textarea name="compliance.customsDeclaration" label="form.customsDeclaration" />
        </>
      )}
      <Select
        name="compliance.qualityCertification"
        label="form.qualityCertification"
        options={['ISO 22000', 'HACCP', 'Organic', 'None']}
      />
      <Textarea name="compliance.complianceNotes" label="form.complianceNotes" />
      <SignatureCanvas name="compliance.digitalSignature" label="form.digitalSignature" />
    </div>
  );
};

export default Compliance;