export interface ClientInfo {
  fullName: string;
  phoneNumber: string;
  email?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  address: string;
  clientCategory: 'Farmer' | 'Distributor' | 'Retailer' | 'Partner' | 'Individual Buyer';
  dateOfRegistration: string;
  referredBy?: string;
  preferredContactMethod: 'SMS' | 'Call' | 'Email';
  businessName?: string;
  taxId?: string;
  loyaltyProgram?: boolean;
  clientTier: 'Standard' | 'Premium' | 'Enterprise';
  accountManager?: string;
  clientPhoto?: File | null;
}

export interface Client {
  id: string;
  info: ClientInfo;
  orders: string[];
}

export interface OrderEntry {
  orderCategory?: 'Retail' | 'Wholesale' | 'Export' | 'Internal Use';
  productName?: 'Soy Oil' | 'Sunflower Oil' | 'Soy Flour' | 'Soy Seeds';
  sku?: string;
  unitType?: 'Liters' | 'Kilograms' | 'Bottles' | 'Bags';
  quantity?: number;
  unitPrice?: number;
  discount?: number;
  notes?: string;
  orderUrgency?: 'Standard' | 'Expedited' | 'Critical';
  packagingPreference?: 'Standard' | 'Eco-Friendly' | 'Custom';
  paymentSchedule?: 'Full Payment' | '30% Deposit' | 'Installments';
}

export interface Order {
  id: string;
  clientId: string;
  entries: OrderEntry[];
  total: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
}

export interface DispatchEntry {
  dispatchId: string;
  dispatchDate: string;
  dispatchStatus: 'Scheduled' | 'In Transit' | 'Delivered' | 'Delayed';
  dispatchTime: string;
  vehicleNumber: string;
  driverName: string;
  contactNumber: string;
  notes: string;
}

export interface Dispatch {
  id: string;
  orderId: string;
  entries: DispatchEntry[];
}

export interface DispatchDetail {
  dispatchDate?: string;
  dispatchTime?: string;
  vehicleNumber?: string;
  driverName?: string;
  contactNumber?: string;
  notes?: string;
}

export interface SalesOps {
  salesRepresentative?: string;
  paymentStatus: 'Pending' | 'Partial' | 'Paid';
  paymentMethod?: 'Cash on Delivery' | 'M-Pesa' | 'Bank Transfer' | 'Credit';
  paymentReceived?: number;
  paymentReceipt?: File | null;
  deliveryStatus: 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  preferredDeliveryDate?: string;
  internalComments?: string;
  orderPriority: 'Low' | 'Medium' | 'High';
  salesChannel: 'Online' | 'Phone' | 'In-Person' | 'Agent';
  crmSync?: boolean;
  invoiceNumber?: string;
}

export interface SalesOpsDetail {
  operationDate?: string;
  operationType?: string;
  notes?: string;
}

export interface Compliance {
  exportLicense?: string;
  qualityCertification?: 'ISO 22000' | 'HACCP' | 'Organic' | 'None';
  customsDeclaration?: string;
  complianceNotes?: string;
  digitalSignature: string;
}

export interface ComplianceDetail {
  complianceType?: string;
  status?: string;
  notes?: string;
}

export interface Confirmation {
  confirmedBy: string;
  confirmationDate: string;
  confirmationStatus: 'Pending' | 'Confirmed' | 'Rejected';
}

export interface AdminConfirmationDetail {
  confirmationDate?: string;
  confirmedBy?: string;
  notes?: string;
}

export interface HistoryEntry {
  action: string;
  timestamp: string;
  user: string;
}

export interface Notes {
  internalNotes: string;
  clientNotes: string;
}

export interface Attachments {
  attachment: File[];
  attachmentName: string[];
}

export interface FormData {
  clientInfo: { [key: string]: string | number };
  orderDetails: OrderEntry[];
  dispatch: DispatchEntry[];
  salesOps: SalesOps;
  compliance: Compliance;
  confirmation: Confirmation;
  notes: Notes;
  attachments: Attachments;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
  clientId?: string;
  dispatchDetails: DispatchDetail[];
  salesOpsDetails: SalesOpsDetail[];
  complianceDetails: ComplianceDetail[];
  adminConfirmationDetails: AdminConfirmationDetail[];
}
