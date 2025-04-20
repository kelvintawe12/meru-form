import { z } from 'zod';

const clientInfoSchema = z.object({
  fullName: z.string().min(2, 'form.fullNameRequired'),
  phoneNumber: z.string().regex(/^\+250\d{9}$/, 'form.phoneNumberRequired'),
  email: z.string().email('form.emailInvalid').optional().or(z.literal('')),
  gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say']).optional(),
  address: z.string().min(5, 'form.addressRequired'),
  clientCategory: z.enum(['Farmer', 'Distributor', 'Retailer', 'Partner', 'Individual Buyer']),
  dateOfRegistration: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'form.dateOfRegistrationRequired'),
  referredBy: z.string().optional(),
  preferredContactMethod: z.enum(['SMS', 'Call', 'Email']),
  businessName: z.string().optional(),
  taxId: z.string().optional(),
  loyaltyProgram: z.boolean().optional(),
  clientTier: z.enum(['Standard', 'Premium', 'Enterprise']),
  accountManager: z.string().optional(),
  clientPhoto: z.any().optional().nullable(),
}).passthrough(); // Allow additional fields to accommodate flexible typing

const orderEntrySchema = z.object({
  orderCategory: z.enum(['Retail', 'Wholesale', 'Export', 'Internal Use']).optional(),
  productName: z.enum(['Soy Oil', 'Sunflower Oil', 'Soy Flour', 'Soy Seeds']).optional(),
  sku: z.string().min(5, 'form.sku.error').optional(),
  unitType: z.enum(['Liters', 'Kilograms', 'Bottles', 'Bags']).optional(),
  quantity: z.number().min(1, 'form.quantityRequired').optional(),
  unitPrice: z.number().min(0, 'form.unitPriceRequired').optional(),
  discount: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
  orderUrgency: z.enum(['Standard', 'Expedited', 'Critical']).optional(),
  packagingPreference: z.enum(['Standard', 'Eco-Friendly', 'Custom']).optional(),
  paymentSchedule: z.enum(['Full Payment', '30% Deposit', 'Installments']).optional(),
});

const dispatchEntrySchema = z.object({
  dispatchId: z.string().min(1, 'form.dispatchIdRequired'),
  dispatchDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'form.dispatchDateRequired'),
  dispatchStatus: z.enum(['Scheduled', 'In Transit', 'Delivered', 'Delayed']),
  dispatchTime: z.string().min(1, 'form.dispatchTimeRequired'),
  vehicleNumber: z.string().min(1, 'form.vehicleNumberRequired'),
  driverName: z.string().min(1, 'form.driverNameRequired'),
  contactNumber: z.string().min(1, 'form.contactNumberRequired'),
  notes: z.string().optional(),
});

const dispatchDetailSchema = z.object({
  dispatchDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'form.dispatchDate.error').optional(),
  dispatchTime: z.string().optional(),
  vehicleNumber: z.string().optional(),
  driverName: z.string().optional(),
  contactNumber: z.string().optional(),
  notes: z.string().optional(),
});

const salesOpsSchema = z.object({
  salesRepresentative: z.string().optional(),
  paymentStatus: z.enum(['Pending', 'Partial', 'Paid']),
  paymentMethod: z.enum(['Cash on Delivery', 'M-Pesa', 'Bank Transfer', 'Credit']).optional(),
  paymentReceived: z.number().min(0).optional(),
  paymentReceipt: z.any().optional().nullable(),
  deliveryStatus: z.enum(['Processing', 'Dispatched', 'Delivered', 'Cancelled']),
  preferredDeliveryDate: z.string().optional(),
  internalComments: z.string().optional(),
  orderPriority: z.enum(['Low', 'Medium', 'High']),
  salesChannel: z.enum(['Online', 'Phone', 'In-Person', 'Agent']),
  crmSync: z.boolean().optional(),
  invoiceNumber: z.string().optional(),
});

const salesOpsDetailSchema = z.object({
  operationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'form.operationDate.error').optional(),
  operationType: z.string().optional(),
  notes: z.string().optional(),
});

const complianceSchema = z.object({
  exportLicense: z.string().optional(),
  qualityCertification: z.enum(['ISO 22000', 'HACCP', 'Organic', 'None']).optional(),
  customsDeclaration: z.string().optional(),
  complianceNotes: z.string().optional(),
  digitalSignature: z.string().min(1, 'form.digitalSignatureRequired'),
});

const complianceDetailSchema = z.object({
  complianceType: z.string().optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
});

const confirmationSchema = z.object({
  confirmedBy: z.string(),
  confirmationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'form.confirmationDate.error'),
  confirmationStatus: z.enum(['Pending', 'Confirmed', 'Rejected']),
});

const adminConfirmationDetailSchema = z.object({
  confirmationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'form.confirmationDate.error').optional(),
  confirmedBy: z.string().optional(),
  notes: z.string().optional(),
});

const notesSchema = z.object({
  internalNotes: z.string(),
  clientNotes: z.string(),
});

const attachmentsSchema = z.object({
  attachment: z.array(z.any()).optional(),
  attachmentName: z.array(z.string()).optional(),
});

export const formSchema = z.object({
  clientInfo: clientInfoSchema,
  orderDetails: z.array(orderEntrySchema).min(1, 'form.orderDetailsRequired'),
  dispatch: z.array(dispatchEntrySchema).optional(),
  dispatchDetails: z.array(dispatchDetailSchema).optional(),
  salesOps: salesOpsSchema,
  salesOpsDetails: z.array(salesOpsDetailSchema).optional(),
  compliance: complianceSchema,
  complianceDetails: z.array(complianceDetailSchema).optional(),
  confirmation: confirmationSchema,
  adminConfirmationDetails: z.array(adminConfirmationDetailSchema).optional(),
  notes: notesSchema,
  attachments: attachmentsSchema,
  status: z.enum(['Draft', 'Submitted', 'Approved', 'Rejected']),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string().optional(),
  clientId: z.string().optional(),
}).strict();