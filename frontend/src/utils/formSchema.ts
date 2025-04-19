import { z } from 'zod';

const clientInfoSchema = z.object({
  fullName: z.string().min(2, 'form.fullName.error'),
  phoneNumber: z.string().regex(/^\+250\d{9}$/, 'form.phoneNumber.error'),
  email: z.string().email('form.email.error').optional(),
  gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say']).optional(),
  address: z.string().min(5, 'form.address.error'),
  clientCategory: z.enum(['Farmer', 'Distributor', 'Retailer', 'Partner', 'Individual Buyer']),
  dateOfRegistration: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'form.dateOfRegistration.error'),
  referredBy: z.string().optional(),
  preferredContactMethod: z.enum(['SMS', 'Call', 'Email']),
  businessName: z.string().optional(),
  taxId: z.string().optional(),
  loyaltyProgram: z.boolean().optional(),
  clientTier: z.enum(['Standard', 'Premium', 'Enterprise']),
  accountManager: z.string().optional(),
  clientPhoto: z.any().optional(),
});

const orderEntrySchema = z.object({
  orderCategory: z.enum(['Retail', 'Wholesale', 'Export', 'Internal Use']),
  productName: z.enum(['Soy Oil', 'Sunflower Oil', 'Soy Flour', 'Soy Seeds']),
  sku: z.string().min(5, 'form.sku.error'),
  unitType: z.enum(['Liters', 'Kilograms', 'Bottles', 'Bags']),
  quantity: z.number().min(1, 'form.quantity.error'),
  unitPrice: z.number().min(0, 'form.unitPrice.error'),
  discount: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
  orderUrgency: z.enum(['Standard', 'Expedited', 'Critical']),
  packagingPreference: z.enum(['Standard', 'Eco-Friendly', 'Custom']).optional(),
  paymentSchedule: z.enum(['Full Payment', '30% Deposit', 'Installments']).optional(),
});

const dispatchEntrySchema = z.object({
  dispatchDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'form.dispatchDate.error'),
  product: z.string().min(1, 'form.product.error'),
  quantityDispatched: z.number().min(1, 'form.quantityDispatched.error'),
  transportMethod: z.enum(['Truck', 'Motorcycle', 'On Foot', 'Third-Party Courier']),
  trackingReference: z.string().optional(),
  dispatchNotes: z.string().optional(),
  driverContact: z.string().optional(),
  warehouseLocation: z.enum(['Kigali', 'Kayonza', 'Musanze']).optional(),
  dispatchStatus: z.enum(['Scheduled', 'In Transit', 'Delivered', 'Delayed']),
  blockchainHash: z.string().optional(),
});

const salesOpsSchema = z.object({
  salesRepresentative: z.string().optional(),
  paymentStatus: z.enum(['Pending', 'Partial', 'Paid']),
  paymentMethod: z.enum(['Cash on Delivery', 'M-Pesa', 'Bank Transfer', 'Credit']).optional(),
  paymentReceived: z.number().min(0).optional(),
  paymentReceipt: z.any().optional(),
  deliveryStatus: z.enum(['Processing', 'Dispatched', 'Delivered', 'Cancelled']),
  preferredDeliveryDate: z.string().optional(),
  internalComments: z.string().optional(),
  orderPriority: z.enum(['Low', 'Medium', 'High']),
  salesChannel: z.enum(['Online', 'Phone', 'In-Person', 'Agent']),
  crmSync: z.boolean().optional(),
  invoiceNumber: z.string().optional(),
});

const complianceSchema = z.object({
  exportLicense: z.string().optional(),
  qualityCertification: z.enum(['ISO 22000', 'HACCP', 'Organic', 'None']).optional(),
  customsDeclaration: z.string().optional(),
  complianceNotes: z.string().optional(),
  digitalSignature: z.string().min(1, 'form.digitalSignature.error'),
});

export const formSchema = z.object({
  clientInfo: clientInfoSchema,
  orderDetails: z.array(orderEntrySchema).min(1, 'form.orderDetails.error'),
  dispatch: z.array(dispatchEntrySchema).min(1, 'form.dispatch.error'),
  salesOps: salesOpsSchema,
  compliance: complianceSchema,
});