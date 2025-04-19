import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ClientInfo from '../components/form/ClientInfo';
import OrderDetails from '../components/form/OrderDetails';
import Compliance from '../components/form/Compliance';
import SalesOps from '../components/form/SalesOps';
import ReviewSubmit from '../components/form/ReviewSubmit';
import Button from '../components/common/Button';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { Trash2 } from 'lucide-react';
import { FormData } from '../types/form';

// Dispatch component for dispatch section
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
          >
            <Trash2 size={16} />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name={`dispatch.${index}.dispatchDate`} label="form.dispatchDate" type="date" />
            <Input name={`dispatch.${index}.product`} label="form.product" />
            <Input name={`dispatch.${index}.quantityDispatched`} label="form.quantityDispatched" type="number" />
            <Select
              name={`dispatch.${index}.transportMethod`}
              label="form.transportMethod"
              options={['Truck', 'Motorcycle', 'On Foot', 'Third-Party Courier']}
            />
            <Input name={`dispatch.${index}.trackingReference`} label="form.trackingReference" />
            <Input name={`dispatch.${index}.dispatchNotes`} label="form.dispatchNotes" />
            <Input name={`dispatch.${index}.driverContact`} label="form.driverContact" />
            <Select
              name={`dispatch.${index}.warehouseLocation`}
              label="form.warehouseLocation"
              options={['Kigali', 'Kayonza', 'Musanze']}
            />
            <Select
              name={`dispatch.${index}.dispatchStatus`}
              label="form.dispatchStatus"
              options={['Scheduled', 'In Transit', 'Delivered', 'Delayed']}
            />
            <Input name={`dispatch.${index}.blockchainHash`} label="form.blockchainHash" />
          </div>
        </div>
      ))}
      <Button
        variant="primary"
        onClick={() =>
          append({
            dispatchDate: '',
            product: '',
            quantityDispatched: 1,
            transportMethod: 'Truck',
            trackingReference: '',
            dispatchNotes: '',
            driverContact: '',
            warehouseLocation: undefined,
            dispatchStatus: 'Scheduled',
            blockchainHash: '',
          })
        }
      >
        {t('form.addDispatch')}
      </Button>
    </div>
  );
};

// Zod schema for form validation
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
    clientPhoto: z.any().optional(),
  }),
  orderDetails: z
    .array(
      z.object({
        orderCategory: z.enum(['Retail', 'Wholesale', 'Export', 'Internal Use']),
        productName: z.enum(['Soy Oil', 'Sunflower Oil', 'Soy Flour', 'Soy Seeds']),
        sku: z.string().min(1, 'form.skuRequired'),
        unitType: z.enum(['Liters', 'Kilograms', 'Bottles', 'Bags']),
        quantity: z.number().min(1, 'form.quantityRequired'),
        unitPrice: z.number().min(0, 'form.unitPriceRequired'),
        discount: z.number().min(0).max(100).optional(),
        notes: z.string().optional(),
        orderUrgency: z.enum(['Standard', 'Expedited', 'Critical']),
        packagingPreference: z.enum(['Standard', 'Eco-Friendly', 'Custom']).optional(),
        paymentSchedule: z.enum(['Full Payment', '30% Deposit', 'Installments']).optional(),
      })
    )
    .min(1, 'form.orderDetailsRequired'),
  dispatch: z
    .array(
      z.object({
        dispatchDate: z.string().min(1, 'form.dispatchDateRequired'),
        product: z.string().min(1, 'form.productRequired'),
        quantityDispatched: z.number().min(1, 'form.quantityDispatchedRequired'),
        transportMethod: z.enum(['Truck', 'Motorcycle', 'On Foot', 'Third-Party Courier']),
        trackingReference: z.string().optional(),
        dispatchNotes: z.string().optional(),
        driverContact: z.string().optional(),
        warehouseLocation: z.enum(['Kigali', 'Kayonza', 'Musanze']).optional(),
        dispatchStatus: z.enum(['Scheduled', 'In Transit', 'Delivered', 'Delayed']),
        blockchainHash: z.string().optional(),
      })
    )
    .optional(),
  salesOps: z.object({
    salesRepresentative: z.string().optional(),
    paymentStatus: z.enum(['Pending', 'Partial', 'Paid']),
    paymentMethod: z.enum(['Cash on Delivery', 'M-Pesa', 'Bank Transfer', 'Credit']).optional(),
    paymentReceived: z.number().optional(),
    paymentReceipt: z.any().optional(),
    deliveryStatus: z.enum(['Processing', 'Dispatched', 'Delivered', 'Cancelled']),
    preferredDeliveryDate: z.string().optional(),
    internalComments: z.string().optional(),
    orderPriority: z.enum(['Low', 'Medium', 'High']),
    salesChannel: z.enum(['Online', 'Phone', 'In-Person', 'Agent']),
    crmSync: z.boolean().optional(),
    invoiceNumber: z.string().optional(),
  }),
  compliance: z.object({
    exportLicense: z.string().optional(),
    qualityCertification: z.enum(['ISO 22000', 'HACCP', 'Organic', 'None']).optional(),
    customsDeclaration: z.string().optional(),
    complianceNotes: z.string().optional(),
    digitalSignature: z.string().min(1, 'form.digitalSignatureRequired'),
  }),
  confirmation: z.boolean().refine((val) => val === true, { message: 'form.confirmationRequired' }),
  emailPDF: z.boolean().optional(),
  shareWithManager: z.boolean().optional(),
});

const OrderForm: React.FC = () => {
  const { t } = useTranslation();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientInfo: {
        fullName: '',
        phoneNumber: '',
        email: '',
        gender: undefined,
        address: '',
        clientCategory: 'Farmer',
        dateOfRegistration: new Date().toISOString().split('T')[0],
        referredBy: '',
        preferredContactMethod: 'SMS',
        businessName: '',
        taxId: '',
        loyaltyProgram: false,
        clientTier: 'Standard',
        accountManager: '',
        clientPhoto: null,
      },
      orderDetails: [
        {
          orderCategory: 'Retail',
          productName: 'Soy Oil',
          sku: `SOY-${Math.random().toString(36).slice(2, 7)}`,
          unitType: 'Liters',
          quantity: 1,
          unitPrice: 0,
          discount: 0,
          notes: '',
          orderUrgency: 'Standard',
          packagingPreference: undefined,
          paymentSchedule: undefined,
        },
      ],
      dispatch: [],
      salesOps: {
        salesRepresentative: '',
        paymentStatus: 'Pending',
        paymentMethod: undefined,
        paymentReceived: 0,
        paymentReceipt: null,
        deliveryStatus: 'Processing',
        preferredDeliveryDate: '',
        internalComments: '',
        orderPriority: 'Low',
        salesChannel: 'Online',
        crmSync: false,
        invoiceNumber: '',
      },
      compliance: {
        exportLicense: '',
        qualityCertification: undefined,
        customsDeclaration: '',
        complianceNotes: '',
        digitalSignature: '',
      },
      confirmation: false,
      emailPDF: false,
      shareWithManager: false,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{t('form.title')}</h1>
      <FormProvider {...methods}>
        <form className="space-y-8">
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
            <h2 className="text-xl font-semibold mb-4">{t('form.salesOps')}</h2>
            <SalesOps />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.compliance')}</h2>
            <Compliance />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('form.reviewSubmit')}</h2>
            <ReviewSubmit />
          </section>
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={() => methods.reset()}
            >
              {t('form.reset')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default OrderForm;