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
  
  export interface Dispatch {
    id: string;
    orderId: string;
    entries: DispatchEntry[];
  }