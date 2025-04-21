// src/types/form.ts
export interface ClientInfo {
  fullName: string;
  phoneNumber: string;
  email?: string;
  gender?: 'male' | 'female' | 'other' | 'preferNotToSay';
  address: string;
  clientCategory?: 'farmer' | 'distributor' | 'retailer' | 'partner' | 'individualBuyer';
  clientPhoto?: File | null;
  clientId: string;
  clientStatus?: string;
  clientCreatedAt?: string;
  clientUpdatedAt?: string;
  clientCreatedBy?: string;
  clientUpdatedBy?: string;
  clientAttachments?: string[];
  updatedBy: string; 
  dateOfRegistration?: string;
  referredBy?: string;
  preferredContactMethod?: 'sms' | 'call' | 'email' | 'whatsapp';
  businessName?: string;
  taxId?: string;
  loyaltyProgram?: boolean;
  clientTier?: 'standard' | 'premium' | 'enterprise';
  accountManager?: string;
}

export interface OrderEntry {
  orderCategory?: 'retail' | 'wholesale' | 'export';
  productName: string;
  sku?: string;
  unitType?: 'liters' | 'kilograms' | 'bottles' | 'bags';
  quantity: number;
  unitPrice: number;
  discount?: number;
  notes?: string;
  orderUrgency?: 'standard' | 'urgent';
  packagingPreference?: 'standard' | 'custom';
  paymentSchedule?: 'fullPayment' | 'installments';
}

export interface DispatchEntry {
  product: string;
  quantityDispatched: number;
  transportMethod?: 'truck' | 'motorcycle' | 'onFoot' | 'thirdPartyCourier';
  dispatchStatus?: 'scheduled' | 'inTransit' | 'delivered' | 'delayed';
  dispatchDate?: string;
  trackingReference?: string;
  dispatchNotes?: string;
  driverContact?: string;
  warehouseLocation?: 'kigali' | 'kayonza' | 'musanze';
  blockchainHash?: string;
}

export interface SalesOps {
  salesRepresentative?: string;
  paymentStatus?: 'pending' | 'partial' | 'paid';
  paymentMethod?: 'cashOnDelivery' | 'mPesa' | 'bankTransfer' | 'credit';
  paymentReceived?: number;
  paymentReceipt?: any;
  deliveryStatus?: 'processing' | 'dispatched' | 'delivered' | 'cancelled';
  preferredDeliveryDate?: string;
  internalComments?: string;
  orderPriority?: 'low' | 'medium' | 'high';
  salesChannel?: 'online' | 'phone' | 'inPerson' | 'agent';
  crmSync?: boolean;
  invoiceNumber?: string;
}

export interface Compliance {
  exportLicense?: string;
  qualityCertification?: 'iso22000' | 'haccp' | 'organic' | 'none';
  customsDeclaration?: string;
  complianceNotes?: string;
  digitalSignature?: string;
}

export interface Confirmation {
  confirmedBy?: string;
  confirmationDate?: string;
  confirmationStatus?: 'pending' | 'confirmed' | 'rejected';
}

export interface Notes {
  internalNotes?: string;
  clientNotes?: string;
}

export interface Attachments {
  attachment?: any[];
  attachmentName?: string[];
}

export interface FormData {
  clientInfo: ClientInfo;
  orderDetails: OrderEntry[];
  dispatch?: DispatchEntry[];
  salesOps?: SalesOps;
  compliance?: Compliance;
  confirmation?: Confirmation;
  notes?: Notes;
  attachments?: Attachments;
  status?: 'draft' | 'submitted' | 'processing' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  clientId?: string;
  orderId?: string;
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
  clientCategory?: string;
  clientTier?: string;
  clientPhoto?: string;
  clientBusinessName?: string;
  clientTaxId?: string;
  clientLoyaltyProgram?: boolean;
  clientAccountManager?: string;
  clientReferredBy?: string;
  clientPreferredContactMethod?: string;
  clientGender?: string;
  clientDateOfRegistration?: string;
  clientNotes?: string;
  // clientId: string;
  clientAttachments?: string[];
  clientStatus?: string;
  clientCreatedAt?: string;
  clientUpdatedAt?: string;
  clientCreatedBy?: string;
  shareWithManager?: boolean;
  emailPDF?: boolean;
  shippingDetails?: any[];
  // Removed duplicate and conflicting declaration of orderDetails
  orderStatus?: string;
  orderPriority?: string;
  dispatchDetails?: any[];
  salesOpsDetails?: any[];
  complianceDetails?: any[];
  adminConfirmationDetails?: any[];
}