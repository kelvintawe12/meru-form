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
  
  export interface Order {
    id: string;
    clientId: string;
    entries: OrderEntry[];
    total: number;
    status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  }