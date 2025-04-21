// src/pages/OrderForm.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, FormProvider, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import { useFormStore } from '../hooks/useFormStore';
import { formSchema } from '../utils/formSchema';
import { FormData, OrderEntry, DispatchEntry } from '../types/form';
import { usePDFGenerator } from '../hooks/usePDFGenerator';
import PDFPreviewModal from '../components/PDFPreviewModal';
import ClientInfo from '../components/form/ClientInfo';
import OrderDetails from '../components/form/OrderDetails';
import SalesOps from '../components/form/SalesOps';
import Compliance from '../components/form/Compliance';
import ReviewSubmit from '../components/form/ReviewSubmit';
import { FileText, Trash2, X, Check, Undo, Redo } from 'lucide-react';
import Button from '../components/common/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/common/Dialog';

const OrderForm: React.FC = () => {
  const { t } = useTranslation('translation');
  const formData = useFormStore((state) => state.formData);
  const updateDraft = useFormStore((state) => state.updateDraft);
  const clearDraft = useFormStore((state) => state.clearDraft);
  const addAttachment = useFormStore((state) => state.addAttachment);
  const removeAttachment = useFormStore((state) => state.removeAttachment);
  const isSubmitting = useFormStore((state) => state.isSubmitting);
  const submitFormAsync = useFormStore((state) => state.submitFormAsync);
  const undo = useFormStore((state) => state.undo);
  const redo = useFormStore((state) => state.redo);
  const history = useFormStore((state) => state.history);
  const future = useFormStore((state) => state.future);
  const { generatePDF, generateReceiptPDF, shareViaWhatsApp } = usePDFGenerator();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfType, setPdfType] = useState<'order' | 'receipt' | null>(null);
  const [isClearFormDialogOpen, setIsClearFormDialogOpen] = useState(false);

  // Improved logging
  useEffect(() => {
    console.log('formData:', JSON.stringify(formData, null, 2));
  }, [formData]);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formData,
      clientInfo: {
        ...formData.clientInfo,
        clientCategory: formData.clientInfo.clientCategory || 'farmer',
      },
      orderDetails: formData.orderDetails || [
        {
          orderCategory: 'retail',
          productName: 'Soy Oil',
          sku: `SOY-${Math.random().toString(36).slice(2, 7)}`,
          unitType: 'liters',
          quantity: 1,
          unitPrice: 0,
          discount: 0,
          notes: '',
          orderUrgency: 'standard',
          packagingPreference: 'Standard',
          paymentSchedule: 'Full Payment',
        },
      ],
      dispatch: formData.dispatch || [{ product: '', quantityDispatched: 0, transportMethod: undefined, dispatchStatus: 'scheduled' }],
      attachments: formData.attachments || { attachment: [], attachmentName: [] },
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setError,
    reset,
    control,
  } = methods;

  const { fields: orderFields, append: appendOrder, remove: removeOrder } = useFieldArray({
    control,
    name: 'orderDetails',
  });

  const { fields: dispatchFields, append: appendDispatch, remove: removeDispatch } = useFieldArray({
    control,
    name: 'dispatch',
  });

  const debouncedUpdateDraft = useCallback(
    debounce((data: Partial<FormData>) => {
      updateDraft({
        ...data,
        clientInfo: data.clientInfo ? { ...data.clientInfo } : undefined,
        orderDetails: data.orderDetails ? [...data.orderDetails] : undefined,
        dispatch: data.dispatch ? [...data.dispatch] : undefined,
        attachments: data.attachments ? { ...data.attachments } : undefined,
      });
    }, 300),
    [updateDraft]
  );

  useEffect(() => {
    const subscription = methods.watch((value) => {
      debouncedUpdateDraft(value as Partial<FormData>);
    });
    return () => {
      subscription.unsubscribe();
      debouncedUpdateDraft.cancel();
    };
  }, [methods, debouncedUpdateDraft]);

  const handleGeneratePDF = async (type: 'order' | 'receipt') => {
    if (!isValid) {
      toast.error(t('form.validationError', { defaultValue: 'Please fix form errors before generating PDF' }));
      return;
    }
    try {
      const formValues = methods.getValues();
      const result = type === 'order'
        ? await generatePDF({ ...formValues, dispatch: formValues.dispatch || [] })
        : await generateReceiptPDF({
            ...formValues,
            dispatch: formValues.dispatch || [],
            clientInfo: {
              ...formValues.clientInfo,
              clientCategory: formValues.clientInfo.clientCategory || 'Farmer'.toLowerCase() as FormData['clientInfo']['clientCategory'],
            },
          });
      if (result) {
        setPdfUrl(result.url);
        setPdfType(type);
        setIsModalOpen(true);
      } else {
        toast.error(t('form.pdfError'));
      }
    } catch (error) {
      toast.error(t('form.pdfError'));
      console.error('PDF generation error:', error);
    }
  };

  const handleSharePDF = async () => {
    if (pdfUrl && pdfType) {
      try {
        const formValues = methods.getValues();
        const phoneNumber = formValues.clientInfo.phoneNumber;
        if (!phoneNumber) {
          toast.error(t('form.whatsappNoPhone'));
          return;
        }
        const result = pdfType === 'order'
          ? await generatePDF(formValues)
          : await generateReceiptPDF(formValues);
        if (result) {
          await shareViaWhatsApp(result, String(phoneNumber));
          toast.success(t('form.whatsappShared'));
        } else {
          toast.error(t('form.whatsappError'));
        }
      } catch (error) {
        toast.error(t('form.whatsappError'));
        console.error('WhatsApp sharing error:', error);
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      await submitFormAsync({ ...data, dispatch: data.dispatch || [] });
      toast.success(t('success.orderSubmitted'));
      reset(data);
      clearDraft();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('error.unexpectedError');
      setError('root', { message: errorMessage });
      toast.error(errorMessage);
    }
  };

  const handleClearForm = () => {
    setIsClearFormDialogOpen(true);
  };

  const confirmClearForm = () => {
    clearDraft();
    reset({
      clientInfo: {
        fullName: '',
        phoneNumber: '',
        email: '',
        gender: 'preferNotToSay',
        address: '',
        clientCategory: 'farmer',
        dateOfRegistration: new Date().toISOString().split('T')[0],
        referredBy: '',
        preferredContactMethod: 'sms',
        businessName: '',
        taxId: '',
        loyaltyProgram: false,
        clientTier: 'standard',
        accountManager: '',
      },
      orderDetails: [
        {
          orderCategory: 'retail',
          productName: 'Soy Oil',
          sku: `SOY-${Math.random().toString(36).slice(2, 7)}`,
          unitType: 'liters',
          quantity: 1,
          unitPrice: 0,
          discount: 0,
          notes: '',
          orderUrgency: 'standard',
          packagingPreference: 'standard',
          paymentSchedule: 'fullPayment',
        },
      ],
      dispatch: [{ product: '', quantityDispatched: 0, transportMethod: undefined, dispatchStatus: 'scheduled' }],
      salesOps: {
        salesRepresentative: '',
        paymentStatus: 'pending',
        paymentMethod: 'cashOnDelivery',
        paymentReceived: 0,
        paymentReceipt: null,
        deliveryStatus: 'processing',
        preferredDeliveryDate: '',
        internalComments: '',
        orderPriority: 'low',
        salesChannel: 'online',
        crmSync: false,
        invoiceNumber: '',
      },
      compliance: {
        exportLicense: '',
        qualityCertification: 'none',
        customsDeclaration: '',
        complianceNotes: '',
        digitalSignature: '',
      },
      confirmation: {
        confirmedBy: '',
        confirmationDate: new Date().toISOString().split('T')[0],
        confirmationStatus: 'pending',
      },
      notes: {
        internalNotes: '',
        clientNotes: '',
      },
      attachments: {
        attachment: [],
        attachmentName: [],
      },
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'User',
      updatedBy: '',
      clientId: '',
      dispatchDetails: [],
      salesOpsDetails: [],
      complianceDetails: [],
      adminConfirmationDetails: [],
    });
    setIsClearFormDialogOpen(false);
    toast.success(t('form.saved'));
  };

  const handleUndo = () => {
    undo();
    reset(useFormStore.getState().formData);
  };

  const handleRedo = () => {
    redo();
    reset(useFormStore.getState().formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 no-flicker max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{t('form.title')}</h1>
      {errors.root && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg" role="alert">
          {errors.root.message}
        </div>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit as SubmitHandler<FormData>)} className="space-y-8">
          <div className="flex gap-2 mb-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleUndo}
              disabled={history.length === 0}
              icon={Undo}
              aria-label={t('form.undo')}
            >
              {t('form.undo')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleRedo}
              disabled={future.length === 0}
              icon={Redo}
              aria-label={t('form.redo')}
            >
              {t('form.redo')}
            </Button>
          </div>
          <ClientInfo />
          <OrderDetails
            orderFields={orderFields}
            appendOrder={appendOrder}
            removeOrder={removeOrder}
          />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">{t('form.dispatch')}</h2>
            {dispatchFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-medium">{t('form.dispatch')} {index + 1}</h3>
                  <Button
                    variant="danger"
                    onClick={() => removeDispatch(index)}
                    aria-label={t('form.clearSection')}
                    className="p-1"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">{t('form.product')}</label>
                    <select
                      {...methods.register(`dispatch.${index}.product`)}
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t('form.select')}</option>
                      {Object.keys(t('options.productName', { returnObjects: true })).map((key) => (
                        <option key={key} value={key}>
                          {t(`options.productName.${key}`)}
                        </option>
                      ))}
                    </select>
                    {errors.dispatch?.[index]?.product && (
                      <p className="text-red-600 text-sm">{t(errors.dispatch[index]?.product?.message || 'form.error')}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">{t('form.quantityDispatched')}</label>
                    <input
                      type="number"
                      {...methods.register(`dispatch.${index}.quantityDispatched`, { valueAsNumber: true })}
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.dispatch?.[index]?.quantityDispatched && (
                      <p className="text-red-600 text-sm">{t(errors.dispatch[index]?.quantityDispatched?.message || 'form.error')}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">{t('form.transportMethod')}</label>
                    <select
                      {...methods.register(`dispatch.${index}.transportMethod`)}
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t('form.select')}</option>
                      {Object.keys(t('options.transportMethod', { returnObjects: true })).map((key) => (
                        <option key={key} value={key}>
                          {t(`options.transportMethod.${key}`)}
                        </option>
                      ))}
                    </select>
                    {errors.dispatch?.[index]?.transportMethod && (
                      <p className="text-red-600 text-sm">{t(errors.dispatch[index]?.transportMethod?.message || 'form.error')}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">{t('form.dispatchStatus')}</label>
                    <select
                      {...methods.register(`dispatch.${index}.dispatchStatus`)}
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t('form.select')}</option>
                      {Object.keys(t('options.dispatchStatus', { returnObjects: true })).map((key) => (
                        <option key={key} value={key}>
                          {t(`options.dispatchStatus.${key}`)}
                        </option>
                      ))}
                    </select>
                    {errors.dispatch?.[index]?.dispatchStatus && (
                      <p className="text-red-600 text-sm">{t(errors.dispatch[index]?.dispatchStatus?.message || 'form.error')}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => appendDispatch({ product: '', quantityDispatched: 0, transportMethod: undefined, dispatchStatus: 'scheduled' })}
              aria-label={t('form.addDispatch')}
              className="mt-2"
            >
              {t('form.addDispatch')}
            </Button>
          </div>
          <SalesOps />
          <Compliance />
          <ReviewSubmit />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">{t('form.attachments')}</h2>
            <input
              type="file"
              onChange={(e) => e.target.files && addAttachment(e.target.files[0])}
              className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label={t('form.attachments')}
            />
            <div className="mt-4 space-y-2">
              {formData.attachments && formData.attachments.attachmentName && formData.attachments.attachmentName.length > 0 ? (
                formData.attachments.attachmentName.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 truncate max-w-xs">{name}</span>
                    <Button
                      variant="danger"
                      onClick={() => removeAttachment(index)}
                      aria-label={t('form.removeAttachment', { defaultValue: 'Remove attachment' })}
                      className="p-1"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">{t('form.attachmentsPlaceholder')}</p>
              )}
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button
              type="button"
              variant="primary"
              onClick={() => handleGeneratePDF('order')}
              disabled={isSubmitting || !isValid}
              icon={FileText}
              aria-label={t('form.previewOrderPDF')}
              className="flex items-center gap-2"
            >
              {t('form.previewOrderPDF')}
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => handleGeneratePDF('receipt')}
              disabled={isSubmitting || !isValid}
              icon={FileText}
              aria-label={t('form.generateDownloadPDF')}
              className="flex items-center gap-2"
            >
              {t('form.generateDownloadPDF')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !isValid}
              aria-label={t('form.submit')}
            >
              {t('form.submit')}
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleClearForm}
              disabled={isSubmitting || !isDirty}
              aria-label={t('form.clearForm')}
              className="flex items-center gap-2"
            >
              {t('form.clearForm')}
            </Button>
          </div>
        </form>
      </FormProvider>
      <PDFPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pdfUrl={pdfUrl || ''}
        onDownload={() => pdfUrl && window.open(pdfUrl, '_blank')}
        onShare={handleSharePDF}
        title={t(`form.${pdfType === 'order' ? 'previewOrderPDF' : 'generateDownloadPDF'}`)}
      />
      <Dialog open={isClearFormDialogOpen} onOpenChange={setIsClearFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('form.clearFormConfirm')}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">{t('form.clearFormConfirm')}</p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsClearFormDialogOpen(false)}
              aria-label={t('form.cancel')}
            >
              {t('form.cancel')}
            </Button>
            <Button
              variant="danger"
              onClick={confirmClearForm}
              aria-label={t('form.clear')}
            >
              {t('form.clear')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderForm;