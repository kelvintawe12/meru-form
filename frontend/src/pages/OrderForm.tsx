import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import ClientInfo from '../components/form/ClientInfo';
import OrderDetails from '../components/form/OrderDetails';
// import Compliance from '../components/form/Compliance';
import SalesOps from '../components/form/SalesOps';
import ReviewSubmit from '../components/form/ReviewSubmit';
import Button from '../components/common/Button';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { Trash2, FileText, Download } from 'lucide-react';
import { AdminConfirmationDetail, Attachments, Compliance, ComplianceDetail, Confirmation, DispatchDetail, DispatchEntry, FormData, Notes, OrderEntry, SalesOps as SalesOpsType, SalesOpsDetail } from '../types/form';
import { useFormStore } from '../stores/formStore';
import { usePDFGenerator } from '../hooks/usePDFGenerator';
import  PDFPreviewModal  from '../components/PDFPreviewModal';
import { v4 as uuidv4 } from 'uuid';

// Dispatch component
const Dispatch: React.FC = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dispatch',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 mb-4 rounded-lg relative">
          <Button
            variant="danger"
            onClick={() => remove(index)}
            className="absolute top-2 right-2"
            aria-label={t('form.removeDispatch')}
          >
            <Trash2 size={16} />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name={`dispatch.${index}.dispatchId`} label="form.dispatchId" readOnly value={field.dispatchId} />
            <Input name={`dispatch.${index}.dispatchDate`} label="form.dispatchDate" type="date" />
            <Select
              name={`dispatch.${index}.dispatchStatus`}
              label="form.dispatchStatus"
              options={['Scheduled', 'In Transit', 'Delivered', 'Delayed']}
            />
            <Input name={`dispatch.${index}.dispatchTime`} label="form.dispatchTime" type="time" />
            <Input name={`dispatch.${index}.vehicleNumber`} label="form.vehicleNumber" />
            <Input name={`dispatch.${index}.driverName`} label="form.driverName" />
            <Input name={`dispatch.${index}.contactNumber`} label="form.contactNumber" />
            <Input name={`dispatch.${index}.notes`} label="form.notes" />
          </div>
        </div>
      ))}
      <Button
        variant="primary"
        onClick={() =>
          append({
            dispatchId: uuidv4(),
            dispatchDate: '',
            dispatchStatus: 'Scheduled',
            dispatchTime: '',
            vehicleNumber: '',
            driverName: '',
            contactNumber: '',
            notes: '',
          })
        }
      >
        {t('form.addDispatch')}
      </Button>
    </div>
  );
};

// Dispatch Details component
const DispatchDetails: React.FC = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dispatchDetails',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 mb-4 rounded-lg relative">
          <Button
            variant="danger"
            onClick={() => remove(index)}
            className="absolute top-2 right-2"
            aria-label={t('form.removeDispatchDetail')}
          >
            <Trash2 size={16} />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name={`dispatchDetails.${index}.dispatchDate`} label="form.dispatchDate" type="date" />
            <Input name={`dispatchDetails.${index}.dispatchTime`} label="form.dispatchTime" type="time" />
            <Input name={`dispatchDetails.${index}.vehicleNumber`} label="form.vehicleNumber" />
            <Input name={`dispatchDetails.${index}.driverName`} label="form.driverName" />
            <Input name={`dispatchDetails.${index}.contactNumber`} label="form.contactNumber" />
            <Input name={`dispatchDetails.${index}.notes`} label="form.notes" />
          </div>
        </div>
      ))}
      <Button
        variant="primary"
        onClick={() =>
          append({
            dispatchDate: '',
            dispatchTime: '',
            vehicleNumber: '',
            driverName: '',
            contactNumber: '',
            notes: '',
          })
        }
      >
        {t('form.addDispatchDetail')}
      </Button>
    </div>
  );
};

// SalesOps Details component
const SalesOpsDetails: React.FC = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'salesOpsDetails',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 mb-4 rounded-lg relative">
          <Button
            variant="danger"
            onClick={() => remove(index)}
            className="absolute top-2 right-2"
            aria-label={t('form.removeSalesOpsDetail')}
          >
            <Trash2 size={16} />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name={`salesOpsDetails.${index}.operationDate`} label="form.operationDate" type="date" />
            <Input name={`salesOpsDetails.${index}.operationType`} label="form.operationType" />
            <Input name={`salesOpsDetails.${index}.notes`} label="form.notes" />
          </div>
        </div>
      ))}
      <Button
        variant="primary"
        onClick={() =>
          append({
            operationDate: '',
            operationType: '',
            notes: '',
          })
        }
      >
        {t('form.addSalesOpsDetail')}
      </Button>
    </div>
  );
};

// Compliance Details component
const ComplianceDetails: React.FC = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'complianceDetails',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 mb-4 rounded-lg relative">
          <Button
            variant="danger"
            onClick={() => remove(index)}
            className="absolute top-2 right-2"
            aria-label={t('form.removeComplianceDetail')}
          >
            <Trash2 size={16} />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name={`complianceDetails.${index}.complianceType`} label="form.complianceType" />
            <Input name={`complianceDetails.${index}.status`} label="form.status" />
            <Input name={`complianceDetails.${index}.notes`} label="form.notes" />
          </div>
        </div>
      ))}
      <Button
        variant="primary"
        onClick={() =>
          append({
            complianceType: '',
            status: '',
            notes: '',
          })
        }
      >
        {t('form.addComplianceDetail')}
      </Button>
    </div>
  );
};

// Admin Confirmation Details component
const AdminConfirmationDetails: React.FC = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'adminConfirmationDetails',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 mb-4 rounded-lg relative">
          <Button
            variant="danger"
            onClick={() => remove(index)}
            className="absolute top-2 right-2"
            aria-label={t('form.removeAdminConfirmationDetail')}
          >
            <Trash2 size={16} />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name={`adminConfirmationDetails.${index}.confirmationDate`} label="form.confirmationDate" type="date" />
            <Input name={`adminConfirmationDetails.${index}.confirmedBy`} label="form.confirmedBy" />
            <Input name={`adminConfirmationDetails.${index}.notes`} label="form.notes" />
          </div>
        </div>
      ))}
      <Button
        variant="primary"
        onClick={() =>
          append({
            confirmationDate: '',
            confirmedBy: '',
            notes: '',
          })
        }
      >
        {t('form.addAdminConfirmationDetail')}
      </Button>
    </div>
  );
};

// Zod schema
const formSchema = z.object({
  clientInfo: z.object({
    fullName: z.string().min(1, 'form.fullNameRequired'),
    phoneNumber: z.string().min(1, 'form.phoneNumberRequired'),
    email: z.string().email('form.emailInvalid').optional().or(z.literal('')),
    gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say']).optional(),
    address: z.string().min(1, 'form.addressRequired'),
    clientCategory: z.enum(['Farmer', 'Distributor', 'Retailer', 'Partner', 'Individual Buyer']),
    dateOfRegistration: z.string().min(1, 'form.dateOfRegistrationRequired'),
    referredBy: z.string().optional(),
    preferredContactMethod: z.enum(['SMS', 'Call', 'Email']),
    businessName: z.string().optional(),
    taxId: z.string().optional(),
    loyaltyProgram: z.boolean().optional(),
    clientTier: z.enum(['Standard', 'Premium', 'Enterprise']),
    accountManager: z.string().optional(),
  }),
  orderDetails: z
    .array(
      z.object({
        orderCategory: z.enum(['Retail', 'Wholesale', 'Export', 'Internal Use']).optional(),
        productName: z.enum(['Soy Oil', 'Sunflower Oil', 'Soy Flour', 'Soy Seeds']).optional(),
        sku: z.string().optional(),
        unitType: z.enum(['Liters', 'Kilograms', 'Bottles', 'Bags']).optional(),
        quantity: z.number().min(1, 'form.quantityRequired').optional(),
        unitPrice: z.number().min(0, 'form.unitPriceRequired').optional(),
        discount: z.number().min(0).max(100).optional(),
        notes: z.string().optional(),
        orderUrgency: z.enum(['Standard', 'Expedited', 'Critical']).optional(),
        packagingPreference: z.enum(['Standard', 'Eco-Friendly', 'Custom']).optional(),
        paymentSchedule: z.enum(['Full Payment', '30% Deposit', 'Installments']).optional(),
      })
    )
    .min(1, 'form.orderDetailsRequired'),
  dispatch: z
    .array(
      z.object({
        dispatchId: z.string().min(1, 'form.dispatchIdRequired'),
        dispatchDate: z.string().min(1, 'form.dispatchDateRequired'),
        dispatchStatus: z.enum(['Scheduled', 'In Transit', 'Delivered', 'Delayed']),
        dispatchTime: z.string().min(1, 'form.dispatchTimeRequired'),
        vehicleNumber: z.string().min(1, 'form.vehicleNumberRequired'),
        driverName: z.string().min(1, 'form.driverNameRequired'),
        contactNumber: z.string().min(1, 'form.contactNumberRequired'),
        notes: z.string().optional(),
      })
    )
    .optional(),
  dispatchDetails: z
    .array(
      z.object({
        dispatchDate: z.string().optional(),
        dispatchTime: z.string().optional(),
        vehicleNumber: z.string().optional(),
        driverName: z.string().optional(),
        contactNumber: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .optional(),
  salesOps: z.object({
    salesRepresentative: z.string().optional(),
    paymentStatus: z.enum(['Pending', 'Partial', 'Paid']),
    paymentMethod: z.enum(['Cash on Delivery', 'M-Pesa', 'Bank Transfer', 'Credit']).optional(),
    paymentReceived: z.number().optional(),
    paymentReceipt: z.instanceof(File).optional().nullable(),
    deliveryStatus: z.enum(['Processing', 'Dispatched', 'Delivered', 'Cancelled']),
    preferredDeliveryDate: z.string().optional(),
    internalComments: z.string().optional(),
    orderPriority: z.enum(['Low', 'Medium', 'High']),
    salesChannel: z.enum(['Online', 'Phone', 'In-Person', 'Agent']),
    crmSync: z.boolean().optional(),
    invoiceNumber: z.string().optional(),
  }),
  salesOpsDetails: z
    .array(
      z.object({
        operationDate: z.string().optional(),
        operationType: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .optional(),
  compliance: z.object({
    exportLicense: z.string().optional(),
    qualityCertification: z.enum(['ISO 22000', 'HACCP', 'Organic', 'None']).optional(),
    customsDeclaration: z.string().optional(),
    complianceNotes: z.string().optional(),
    digitalSignature: z.string().min(1, 'form.digitalSignatureRequired'),
  }),
  complianceDetails: z
    .array(
      z.object({
        complianceType: z.string().optional(),
        status: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .optional(),
  confirmation: z.object({
    confirmedBy: z.string(),
    confirmationDate: z.string(),
    confirmationStatus: z.enum(['Pending', 'Confirmed', 'Rejected']),
  }),
  adminConfirmationDetails: z
    .array(
      z.object({
        confirmationDate: z.string().optional(),
        confirmedBy: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .optional(),
  notes: z.object({
    internalNotes: z.string(),
    clientNotes: z.string(),
  }),
  attachments: z.object({
    attachment: z.array(z.instanceof(File)).optional(),
    attachmentName: z.array(z.string()).optional(),
  }),
  status: z.enum(['Draft', 'Submitted', 'Approved', 'Rejected']),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string().optional(),
  clientId: z.string().optional(),
}).strict();

const OrderForm: React.FC = () => {
  const { t } = useTranslation();
  const { formData, updateDraft, clearDraft, resetField, addAttachment, removeAttachment, undo, isSubmitting, lastError, saveDraftAsync } = useFormStore();
  const { generatePDF, generateReceiptPDF, shareViaWhatsApp } = usePDFGenerator();
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });
  const [pdfPreview, setPdfPreview] = useState<{ url: string; type: 'order' | 'receipt' } | null>(null);

  // Sync formData from store to react-hook-form
  useEffect(() => {
    methods.reset(formData);
  }, [formData, methods]);

  // Update store on form changes
  const onChange: SubmitHandler<FormData> = async (data) => {
    try {
      await saveDraftAsync(data);
    } catch (error) {
      toast.error(t('form.saveError'));
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await submitFormAsync({ ...data, status: 'Submitted' });
      toast.success(t('form.submitSuccess'));
      window.location.href = '/success';
    } catch (error) {
      toast.error(t('form.submitError'));
      console.error('Submission error:', error);
    }
  };

  // Handle PDF generation
  const handleGeneratePDF = async (type: 'order' | 'receipt') => {
    const isValid = await methods.trigger();
    if (!isValid) {
      toast.error(t('form.validationError'));
      return;
    }

    await methods.handleSubmit(async (data) => {
      try {
        await saveDraftAsync(data);
        const result = type === 'order' ? await generatePDF(data) : await generateReceiptPDF(data);
        if (result) {
          setPdfPreview({ url: result.url, type });
        }
      } catch (error) {
        toast.error(t(type === 'order' ? 'form.pdfError' : 'form.receiptError'));
      }
    })();
  };

  // Handle PDF download from preview
  const handleDownloadPDF = () => {
    if (!pdfPreview) return;
    const link = document.createElement('a');
    link.href = pdfPreview.url;
    link.download = pdfPreview.type === 'order' ? 'meru_order_summary.pdf' : 'meru_receipt.pdf';
    link.click();
  };

  // Handle PDF sharing
  const handleSharePDF = async () => {
    if (!pdfPreview || !formData.clientInfo.phoneNumber) {
      toast.error(t('form.shareError'));
      return;
    }
    const pdfResult = {
      blob: new Blob(),
      url: pdfPreview.url,
      adminID: `MMS-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    };
    try {
      await shareViaWhatsApp(pdfResult, formData.clientInfo.phoneNumber as string);
    } catch (error) {
      toast.error(t('form.whatsappError'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{t('form.title')}</h1>
      {lastError && <div className="text-red-500 mb-4">{t(lastError)}</div>}
      {isSubmitting && <div className="text-teal-600 mb-4">{t('form.saving')}</div>}
      <FormProvider {...methods}>
        <form
          onChange={() => methods.handleSubmit(onChange)()}
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.clientInfo')}</h2>
            <ClientInfo />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.orderDetails')}</h2>
            <OrderDetails />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.dispatch')}</h2>
            <Dispatch />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.dispatchDetails')}</h2>
            <DispatchDetails />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.salesOps')}</h2>
            <SalesOps />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.salesOpsDetails')}</h2>
            <SalesOpsDetails />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.compliance')}</h2>
            <Compliance />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.complianceDetails')}</h2>
            <ComplianceDetails />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.reviewSubmit')}</h2>
            <ReviewSubmit />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.adminConfirmationDetails')}</h2>
            <AdminConfirmationDetails />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.notes')}</h2>
            <Input name="notes.internalNotes" label="form.internalNotes" />
            <Input name="notes.clientNotes" label="form.clientNotes" />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.attachments')}</h2>
            <input
              aria-label={t('form.attachments')}
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                files.forEach((file) => addAttachment(file as File));
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div className="mt-4">
              {formData.attachments.attachmentName.map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span>{name}</span>
                  <Button
                    variant="danger"
                    onClick={() => removeAttachment(index)}
                    aria-label={t('form.removeAttachment')}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.otherFields')}</h2>
            <Input name="clientId" label="form.clientId" />
            <Input name="updatedBy" label="form.updatedBy" />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.pdfActions')}</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => handleGeneratePDF('order')}
                disabled={isSubmitting}
                icon={FileText}
                aria-label={t('form.previewOrderPDF')}
              >
                {t('form.previewOrderPDF')}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleGeneratePDF('receipt')}
                disabled={isSubmitting || formData.salesOps.paymentStatus === 'Pending'}
                icon={Download}
                aria-label={t('form.downloadReceipt')}
              >
                {t('form.downloadReceipt')}
              </Button>
            </div>
          </section>
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={() => clearDraft()}
              disabled={isSubmitting}
              aria-label={t('form.clear')}
            >
              {t('form.clear')}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                methods.resetField('clientInfo.fullName');
                resetField('clientInfo.fullName');
              }}
              disabled={isSubmitting}
              aria-label={t('form.resetFullName')}
            >
              {t('form.resetFullName')}
            </Button>
            <Button
              variant="secondary"
              onClick={() => undo()}
              disabled={isSubmitting || !useFormStore.getState().history.length}
              aria-label={t('form.undo')}
            >
              {t('form.undo')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              aria-label={t('form.submit')}
            >
              {t('form.submit')}
            </Button>
          </div>
        </form>
        <PDFPreviewModal
          isOpen={!!pdfPreview}
          onClose={() => setPdfPreview(null)}
          pdfUrl={pdfPreview?.url || ''}
          onDownload={handleDownloadPDF}
          onShare={handleSharePDF}
        />
      </FormProvider>
    </div>
  );
};

export default OrderForm;

async function submitFormAsync(data: {
  status: string;
  clientInfo: { [key: string]: string | number };
  orderDetails: OrderEntry[];
  dispatch: DispatchEntry[];
  salesOps: typeof SalesOpsType;
  compliance: typeof Compliance;
  confirmation: Confirmation;
  notes: Notes;
  attachments: Attachments;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
  clientId?: string;
  dispatchDetails: DispatchDetail[];
  salesOpsDetails: SalesOpsDetail[];
  complianceDetails: ComplianceDetail[];
  adminConfirmationDetails: AdminConfirmationDetail[];
}) {
  try {
    // Simulate an API call to submit the form data
    const response = await fetch('/api/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit the form');
    }

    const result = await response.json();
    console.log('Form submitted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}
