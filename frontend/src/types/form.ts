import { ClientInfo } from './client';
import { OrderEntry } from './order';
import { DispatchEntry } from './dispatch';

export interface FormData {
  clientInfo: ClientInfo;
  orderDetails: OrderEntry[];
  dispatch: DispatchEntry[];
  salesOps: {
    salesRepresentative: string;
    paymentStatus: 'Pending' | 'Partial' | 'Paid';
    paymentMethod?: 'Cash on Delivery' | 'M-Pesa' | 'Bank Transfer' | 'Credit';
    paymentReceived?: number;
    paymentReceipt?: File | string;
    deliveryStatus: 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
    preferredDeliveryDate?: string;
    internalComments?: string;
    orderPriority: 'Low' | 'Medium' | 'High';
    salesChannel: 'Online' | 'Phone' | 'In-Person' | 'Agent';
    crmSync?: boolean;
    invoiceNumber?: string;
  };
  compliance: {
    exportLicense?: string;
    qualityCertification?: 'ISO 22000' | 'HACCP' | 'Organic' | 'None';
    customsDeclaration?: string;
    complianceNotes?: string;
    digitalSignature: string;
  };
}