import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { useFormStore } from '../../stores/formStore';
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
  const [isClearModalOpen, setClearModalOpen] = useState(false);
  const { saveDraftAsync, formData, isSubmitting } = useFormStore();
  const shouldReduceMotion = useReducedMotion();

  const handleSave = async () => {
    try {
      await saveDraftAsync(formData);
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  };

  return (
    <motion.div
      className="border-b border-gray-200 py-4"
      initial={shouldReduceMotion ? {} : { height: 0 }}
      animate={shouldReduceMotion ? {} : { height: 'auto' }}
      transition={{ duration: 0.3 }}
      role="region"
      aria-labelledby={id}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 id={id} className="text-xl font-semibold text-green-600">
          {t(title)}
        </h2>
        <div className="space-x-2">
          <Button
            variant="secondary"
            onClick={handleSave}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {t('form.save')}
          </Button>
          <Button
            variant="danger"
            onClick={() => setClearModalOpen(true)}
            disabled={isSubmitting}
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
        aria-describedby={`${id}-clear-description`}
      >
        <p id={`${id}-clear-description`}>{t('form.clearSectionConfirm')}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setClearModalOpen(false)}>
            {t('form.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onClear();
              setClearModalOpen(false);
            }}
          >
            {t('form.clear')}
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
};

export default FormSection;