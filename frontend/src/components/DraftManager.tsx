import React from 'react';
import { useFormDraft } from '../hooks/useFormDraft';
import { useTranslation } from 'react-i18next';
import Button from './common/Button';
import { Trash2 } from 'lucide-react';

const DraftManager: React.FC = () => {
  const { t } = useTranslation();
  const { initializeDraft, getDraft, resetDraft } = useFormDraft();

  const handleInitialize = () => {
    initializeDraft({
      fullName: 'John Kamau',
      phoneNumber: '+250788123456',
    });
    console.log('Draft initialized:', getDraft());
  };

  const handleViewDraft = () => {
    const draft = getDraft();
    console.log('Current draft:', draft);
  };

  const handleReset = () => {
    resetDraft();
    console.log('Draft reset');
  };

  return (
    <div className="flex gap-4">
      <Button onClick={handleInitialize}>
        {t('form.initializeDraft')}
      </Button>
      <Button onClick={handleViewDraft} variant="secondary">
        {t('form.viewDraft')}
      </Button>
      <Button onClick={handleReset} variant="danger" icon={Trash2}>
        {t('form.clearForm')}
      </Button>
    </div>
  );
};

export default DraftManager;