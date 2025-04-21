import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { merge } from 'lodash';
import { FormData } from '../types/form';

// Mock API utility
const mockApiCall = <T>(data: T, delay: number = 1000, shouldFail: boolean = false): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Mock API: Failed to process request'));
      } else {
        resolve(data);
      }
    }, delay);
  });
};

// Utility to update timestamps
const updateTimestamps = <T extends FormData>(data: T): T => ({
  ...data,
  updatedAt: new Date().toISOString(),
});

// Utility to clean up form data
const cleanFormData = (data: FormData): FormData => ({
  ...data,
  orderDetails: data.orderDetails.filter(
    (order) =>
      order.productName &&
      order.quantity != null &&
      order.unitPrice != null &&
      order.orderCategory
  ),
  dispatch: (data.dispatch ?? []).filter(
    (dispatch) =>
      dispatch.product &&
      dispatch.quantityDispatched > 0 &&
      dispatch.transportMethod &&
      dispatch.dispatchStatus
  ),
});

// Initial form data
const initialFormData: FormData = {
  clientInfo: {
    fullName: '',
    phoneNumber: '',
    email: '',
    gender: 'preferNotToSay',
    address: '',
    clientCategory: 'farmer',
    dateOfRegistration: new Date().toISOString().split('T')[0],
    referredBy: '',
    preferredContactMethod: 'sms',
    businessName: '',
    taxId: '',
    loyaltyProgram: false,
    clientTier: 'standard',
    accountManager: '',
    clientPhoto: null,
    clientId: '',
    updatedBy: '',
  },
  orderDetails: [
    {
      orderCategory: 'retail',
      productName: 'soyOil',
      sku: `SOY-${Math.random().toString(36).slice(2, 7)}`,
      unitType: 'liters',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      notes: '',
      orderUrgency: 'standard',
      packagingPreference: 'standard',
      paymentSchedule: 'fullPayment',
    },
  ],
  dispatch: [],
  salesOps: {
    salesRepresentative: '',
    paymentStatus: 'pending',
    paymentMethod: 'cashOnDelivery',
    paymentReceived: 0,
    paymentReceipt: null,
    deliveryStatus: 'processing',
    preferredDeliveryDate: '',
    internalComments: '',
    orderPriority: 'low',
    salesChannel: 'online',
    crmSync: false,
    invoiceNumber: '',
  },
  compliance: {
    exportLicense: '',
    qualityCertification: 'none',
    customsDeclaration: '',
    complianceNotes: '',
    digitalSignature: '',
  },
  confirmation: {
    confirmedBy: '',
    confirmationDate: new Date().toISOString().split('T')[0],
    confirmationStatus: 'pending',
  },
  notes: {
    internalNotes: '',
    clientNotes: '',
  },
  attachments: {
    attachment: [],
    attachmentName: [],
  },
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: 'User',
  updatedBy: '',
  clientId: '',
  dispatchDetails: [],
  salesOpsDetails: [],
  complianceDetails: [],
  adminConfirmationDetails: [],
};

// Interface for Zustand store
interface FormState {
  formData: FormData;
  history: FormData[];
  future: FormData[];
  isSubmitting: boolean;
  lastError: string | null;
  setDraft: (data: FormData) => void;
  updateDraft: (data: Partial<FormData>) => void;
  clearDraft: () => void;
  setStatus: (status: FormData['status']) => void;
  saveDraftAsync: (data: FormData, signal?: AbortSignal) => Promise<void>;
  submitFormAsync: (data: FormData, signal?: AbortSignal) => Promise<void>;
}

// Zustand store implementation
export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      formData: initialFormData,
      history: [],
      future: [],
      isSubmitting: false,
      lastError: null,

      setDraft: (data) =>
        set((state) => ({
          formData: updateTimestamps(data),
          history: [...state.history, state.formData],
          future: [],
        })),

      updateDraft: (data) =>
        set((state) => ({
          formData: updateTimestamps(merge({}, state.formData, data)),
          history: [...state.history, state.formData],
          future: [],
        })),

      clearDraft: () =>
        set((state) => ({
          formData: updateTimestamps(initialFormData),
          history: [...state.history, state.formData],
          future: [],
        })),

      setStatus: (status) =>
        set((state) => ({
          formData: updateTimestamps({
            ...state.formData,
            status,
          }),
          history: [...state.history, state.formData],
          future: [],
        })),

      saveDraftAsync: async (data: FormData, signal?: AbortSignal) => {
        set({ isSubmitting: true, lastError: null });
        try {
          const cleanedData = cleanFormData(data);
          await mockApiCall(cleanedData, 1000, Math.random() < 0.1);
          if (signal?.aborted) throw new DOMException('Operation cancelled', 'AbortError');

          set((state) => ({
            formData: updateTimestamps(cleanedData),
            history: [...state.history, state.formData],
            future: [],
          }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to save draft';
          set({ lastError: errorMessage });
          throw error;
        } finally {
          set({ isSubmitting: false });
        }
      },

      submitFormAsync: async (data: FormData, signal?: AbortSignal) => {
        set({ isSubmitting: true, lastError: null });
        try {
          const cleanedData = cleanFormData(data);
          await mockApiCall(cleanedData, 1500, Math.random() < 0.05);
          if (signal?.aborted) throw new DOMException('Operation cancelled', 'AbortError');

          set((state) => ({
            formData: updateTimestamps({ ...cleanedData, status: 'submitted' }),
            history: [...state.history, state.formData],
            future: [],
          }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to submit form';
          set({ lastError: errorMessage });
          throw error;
        } finally {
          set({ isSubmitting: false });
        }
      },
    }),
    {
      name: 'mount-meru-soyco-form-storage',
      partialize: (state) => ({
        formData: state.formData,
        history: state.history,
      }),
      version: 1,
    }
  )
);