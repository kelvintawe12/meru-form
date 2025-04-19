import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormData } from '../types/form';

interface FormState {
  formData: FormData;
  history: FormData[];
  updateDraft: (data: Partial<FormData>) => void;
  clearDraft: () => void;
  clearSection: (section: keyof FormData) => void;
  pushHistory: () => void;
  undo: () => void;
}

const initialFormData: FormData = {
  clientInfo: {
    fullName: '',
    phoneNumber: '',
    email: '',
    gender: undefined,
    address: '',
    clientCategory: 'Individual Buyer',
    dateOfRegistration: new Date().toISOString().split('T')[0],
    referredBy: '',
    preferredContactMethod: 'SMS',
    businessName: '',
    taxId: '',
    loyaltyProgram: false,
    clientTier: 'Standard',
    accountManager: '',
    clientPhoto: undefined,
  },
  orderDetails: [{
    orderCategory: 'Retail',
    productName: 'Soy Oil',
    sku: `SOY-${Math.random().toString(36).slice(2, 7)}`,
    unitType: 'Liters',
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    notes: '',
    orderUrgency: 'Standard',
    packagingPreference: 'Standard',
    paymentSchedule: 'Full Payment',
  }],
  dispatch: [{
    dispatchDate: '',
    product: '',
    quantityDispatched: 1,
    transportMethod: 'Truck',
    trackingReference: '',
    dispatchNotes: '',
    driverContact: '',
    warehouseLocation: 'Kigali',
    dispatchStatus: 'Scheduled',
    blockchainHash: '',
  }],
  salesOps: {
    salesRepresentative: '',
    paymentStatus: 'Pending',
    paymentMethod: undefined,
    paymentReceived: undefined,
    paymentReceipt: undefined,
    deliveryStatus: 'Processing',
    preferredDeliveryDate: '',
    internalComments: '',
    orderPriority: 'Medium',
    salesChannel: 'Online',
    crmSync: false,
    invoiceNumber: '',
  },
  compliance: {
    exportLicense: '',
    qualityCertification: 'None',
    customsDeclaration: '',
    complianceNotes: '',
    digitalSignature: '',
  },
};

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      formData: initialFormData,
      history: [],
      updateDraft: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      clearDraft: () => {
        set((state) => ({
          history: [...state.history, state.formData],
          formData: initialFormData,
        }));
      },
      clearSection: (section) => {
        set((state) => ({
          history: [...state.history, state.formData],
          formData: {
            ...state.formData,
            [section]: initialFormData[section],
          },
        }));
      },
      pushHistory: () => {
        set((state) => ({
          history: [...state.history, state.formData],
        }));
      },
      undo: () => {
        set((state) => {
          const lastState = state.history[state.history.length - 1];
          if (!lastState) return state;
          return {
            formData: lastState,
            history: state.history.slice(0, -1),
          };
        });
      },
    }),
    {
      name: 'form-storage',
      partialize: (state) => ({ formData: state.formData, history: state.history }),
    },
  ),
);