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
  
  export interface OrderEntry {
    orderCategory: 'Retail' | 'Wholesale' | 'Export' | 'Internal Use';
    productName: 'Soy Oil' | 'Sunflower Oil' | 'Soy Flour' | 'Soy Seeds';
    sku: string;
    unitType: 'Liters' | 'Kilograms' | 'Bottles' | 'Bags';
    quantity: number;
    unitPrice: number;
    discount?: number;
    notes?: string;
    orderUrgency: 'Standard' | 'Expedited' | 'Critical';
    packagingPreference?: 'Standard' | 'Eco-Friendly' | 'Custom';
    paymentSchedule?: 'Full Payment' | '30% Deposit' | 'Installments';
  }
  
  export interface DispatchEntry {
    dispatchDate: string;
    product: string;
    quantityDispatched: number;
    transportMethod: 'Truck' | 'Motorcycle' | 'On Foot' | 'Third-Party Courier';
    trackingReference?: string;
    dispatchNotes?: string;
    driverContact?: string;
    warehouseLocation?: 'Kigali' | 'Kayonza' | 'Musanze';
    dispatchStatus: 'Scheduled' | 'In Transit' | 'Delivered' | 'Delayed';
    blockchainHash?: string;
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
  
  export interface Compliance {
    exportLicense?: string;
    qualityCertification?: 'ISO 22000' | 'HACCP' | 'Organic' | 'None';
    customsDeclaration?: string;
    complianceNotes?: string;
    digitalSignature: string;
  }
  
  export interface Confirmation {
    confirmedBy: string;
    confirmationDate: string;
    confirmationStatus: 'Pending' | 'Confirmed' | 'Rejected';
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
    clientInfo: ClientInfo;
    orderDetails: OrderEntry[];
    dispatch: DispatchEntry[] | undefined;
    salesOps: SalesOps;
    compliance: Compliance;
    confirmation: Confirmation;
    notes: Notes;
    attachments: Attachments;
    status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    
  }