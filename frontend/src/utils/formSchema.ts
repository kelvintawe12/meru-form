// src/schemas/formSchema.ts
import { z } from 'zod';

export type OrderEntry = {
  orderCategory?: 'Retail' | 'Wholesale' | 'Export';
  productName?: string;
  sku?: string;
  unitType?: string;
  quantity?: number;
  pricePerUnit?: number;
  totalPrice?: number;
  paymentSchedule?: string;
};

export type ClientInfo = {
  fullName: string;
  phoneNumber: string;
  clientCategory: 'Farmer' | 'Distributor' | 'Retailer' | 'Partner' | 'Individual Buyer';
  preferredContactMethod: 'SMS' | 'Call' | 'Email';
  loyaltyProgram: boolean;
  [key: string]: string | number | boolean | undefined;
};

export const formSchema = z.object({
  clientInfo: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say']).optional(),
    address: z.string().optional(),
    clientCategory: z
      .enum(['Farmer', 'Distributor', 'Retailer', 'Partner', 'Individual Buyer'])
      .default('Farmer'),
    dateOfRegistration: z.string().optional(),
    referredBy: z.string().optional(),
    preferredContactMethod: z.enum(['SMS', 'Call', 'Email']).default('SMS'),
    businessName: z.string().optional(),
    taxId: z.string().optional(),
    loyaltyProgram: z.boolean().default(false),
    clientTier: z.enum(['Standard', 'Premium', 'Enterprise']).optional(),
    accountManager: z.string().optional(),
    clientPhoto: z.any().optional(), // File input, refine if needed
  }),
  compliance: z.object({
    exportLicense: z.string().optional(),
    qualityCertification: z
      .enum(['ISO 22000', 'HACCP', 'Organic', 'None'])
      .default('None'),
    customsDeclaration: z.string().optional(),
    complianceNotes: z.string().optional(),
    digitalSignature: z.string().min(1, 'Digital signature is required'),
  }),
  orderDetails: z.array(
    z.object({
      orderCategory: z.enum(['Retail', 'Wholesale', 'Export']).default('Retail'),
      productName: z.string().min(1, 'Product name is required'),
      sku: z.string().min(1, 'SKU is required'),
      unitType: z.string().min(1, 'Unit type is required'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
      unitPrice: z.number().min(0, 'Unit price cannot be negative'),
      discount: z.number().min(0, 'Discount cannot be negative').optional(),
      notes: z.string().optional(),
      orderUrgency: z.enum(['Standard', 'Urgent']).default('Standard'),
      packagingPreference: z.string().optional(),
      paymentSchedule: z.string().optional(),
    })
  ).min(1, 'At least one order detail is required'),
  salesOps: z.object({
    salesRepresentative: z.string().optional(),
    paymentStatus: z.enum(['Pending', 'Paid', 'Failed']).default('Pending'),
    paymentMethod: z
      .enum(['Cash on Delivery', 'Bank Transfer', 'Mobile Money'])
      .default('Cash on Delivery'),
    paymentReceived: z.number().min(0).optional(),
    paymentReceipt: z.any().optional(),
    deliveryStatus: z.enum(['Processing', 'Shipped', 'Delivered']).default('Processing'),
    preferredDeliveryDate: z.string().optional(),
    internalComments: z.string().optional(),
    orderPriority: z.enum(['Low', 'Medium', 'High']).default('Low'),
    salesChannel: z.enum(['Online', 'Offline']).default('Online'),
    crmSync: z.boolean().default(false),
    invoiceNumber: z.string().optional(),
  }),
  confirmation: z.object({
    confirmedBy: z.string().optional(),
    confirmationDate: z.string().optional(),
    confirmationStatus: z.enum(['Pending', 'Confirmed']).default('Pending'),
  }),
  notes: z.object({
    internalNotes: z.string().optional(),
    clientNotes: z.string().optional(),
  }),
  attachments: z.object({
    attachment: z.array(z.any()).optional(),
    attachmentName: z.array(z.string()).optional(),
  }),
  status: z.enum(['Draft', 'Submitted', 'Approved']).default('Draft'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  clientId: z.string().optional(),
  dispatchDetails: z.array(z.any()).optional(),
  salesOpsDetails: z.array(z.any()).optional(),
  complianceDetails: z.array(z.any()).optional(),
  adminConfirmationDetails: z.array(z.any()).optional(),
});

export interface FormData {
  clientInfo: {
    fullName: string;
    phoneNumber: string;
    clientCategory: 'Farmer' | 'Distributor' | 'Retailer' | 'Partner' | 'Individual Buyer';
    preferredContactMethod: 'SMS' | 'Call' | 'Email';
    loyaltyProgram: boolean;
    [key: string]: string | number | boolean; // Stricter type excluding undefined
  };
  orderDetails?: {
    orderCategory?: 'Retail' | 'Wholesale' | 'Export' | 'Internal Use';
    productName?: 'Soy Oil' | 'Palm Oil' | 'Sunflower Oil' | 'Canola Oil';
    // Other fields...
  };
  // Other properties...
}