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
