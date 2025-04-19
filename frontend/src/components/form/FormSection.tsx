import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import Modal from '../ui/Modal';

interface FormSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClear: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({ id, title, children, onClear }) => {
  const { t } = useTranslation();
  const [isClearModalOpen, setClearModalOpen] = React.useState(false);

  return (
    <motion.div
      className="border-b border-gray-200 py-4"
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-green-600">{title}</h2>
        <div className="space-x-2">
          <Button
            variant="secondary"
            onClick={() => useFormStore.getState().setDraft(useFormStore.getState().formData)}
          >
            {t('form.save')}
          </Button>
          <Button
            variant="danger"
            onClick={() => setClearModalOpen(true)}
          >
            {t('form.clearSection')}
          </Button>
        </div>
      </div>
      {children}
      <Modal
        isOpen={isClearModalOpen}
        onClose={() => setClearModalOpen(false)}
        title={t('form.clearSection')}
      >
        <p>{t('form.clearSectionConfirm')}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setClearModalOpen(false)}>
            {t('form.cancel')}
          </Button>
          <Button variant="danger" onClick={() => {
            onClear();
            setClearModalOpen(false);
          }}>
            {t('form.clear')}
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
};

export default FormSection;