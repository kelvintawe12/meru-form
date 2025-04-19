import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { formSchema } from '../utils/validators';
import { useFormStore } from '../stores/formStore';
import { useAutosave } from '../hooks/useAutosave';
import FormSection from '../components/form/FormSection';
import ClientInfo from '../components/form/ClientInfo';
import OrderDetails from '../components/form/OrderDetails';
import Dispatch from '../components/form/Dispatch';
import SalesOps from '../components/form/SalesOps';
import Compliance from '../components/form/Compliance';
import ReviewSubmit from '../components/form/ReviewSubmit';
import Sidebar from '../components/Layout/Sidebar';
import Modal from '../components/ui/Modal';
import Button from '../components/common/Button';
import { FormData } from '../types/form';

const OrderForm: React.FC = () => {
  const { t } = useTranslation();
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: useFormStore.getState().formData,
  });
  const { setDraft, clearDraft, loadDraft } = useFormStore();
  const [isClearModalOpen, setClearModalOpen] = React.useState(false);

  useAutosave(methods.watch, (data) => setDraft(data));

  useEffect(() => {
    const savedDraft = loadDraft();
    if (savedDraft) {
      methods.reset(savedDraft);
    }
  }, [methods, loadDraft]);

  const handleClearForm = () => {
    methods.reset();
    clearDraft();
    setClearModalOpen(false);
  };

  const sections = [
    { id: 'clientInfo', title: t('form.clientInfo'), component: <ClientInfo /> },
    { id: 'orderDetails', title: t('form.orderDetails'), component: <OrderDetails /> },
    { id: 'dispatch', title: t('form.dispatch'), component: <Dispatch /> },
    { id: 'salesOps', title: t('form.salesOps'), component: <SalesOps /> },
    { id: 'compliance', title: t('form.compliance'), component: <Compliance /> },
    { id: 'reviewSubmit', title: t('form.reviewSubmit'), component: <ReviewSubmit /> },
  ];

  return (
    <FormProvider {...methods}>
      <motion.div
        className="container mx-auto p-4 flex flex-col md:flex-row gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex-grow">
          <div className="form-card">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-teal-600">{t('form.title')}</h1>
              <div className="space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => setDraft(methods.getValues())}
                >
                  {t('form.save')}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setClearModalOpen(true)}
                >
                  {t('form.clearForm')}
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              {sections.map((section) => (
                <FormSection
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  onClear={() => methods.resetField(section.id as any)}
                >
                  {section.component}
                </FormSection>
              ))}
            </div>
          </div>
        </div>
        <Sidebar />
        <Modal
          isOpen={isClearModalOpen}
          onClose={() => setClearModalOpen(false)}
          title={t('form.clearForm')}
        >
          <p>{t('form.clearFormConfirm')}</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setClearModalOpen(false)}>
              {t('form.cancel')}
            </Button>
            <Button variant="danger" onClick={handleClearForm}>
              {t('form.clear')}
            </Button>
          </div>
        </Modal>
      </motion.div>
    </FormProvider>
  );
};

export default OrderForm;