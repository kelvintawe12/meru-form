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

// Initial form data
const initialFormData: FormData = {
  clientInfo: {
    fullName: '',
    phoneNumber: '',
    email: '',
    gender: 'Prefer not to say',
    address: '',
    clientCategory: 'Farmer',
    dateOfRegistration: new Date().toISOString().split('T')[0],
    referredBy: '',
    preferredContactMethod: 'SMS',
    businessName: '',
    taxId: '',
    loyaltyProgram: false,
    clientTier: 'Standard',
    accountManager: '',
  },
  orderDetails: [
    {
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
    },
  ],
  dispatch: [],
  salesOps: {
    salesRepresentative: '',
    paymentStatus: 'Pending',
    paymentMethod: 'Cash on Delivery',
    paymentReceived: 0,
    paymentReceipt: null,
    deliveryStatus: 'Processing',
    preferredDeliveryDate: '',
    internalComments: '',
    orderPriority: 'Low',
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
  confirmation: {
    confirmedBy: '',
    confirmationDate: new Date().toISOString().split('T')[0],
    confirmationStatus: 'Pending',
  },
  notes: {
    internalNotes: '',
    clientNotes: '',
  },
  attachments: {
    attachment: [],
    attachmentName: [],
  },
  status: 'Draft',
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

// Interface for the Zustand store
interface FormState {
  formData: FormData;
  history: FormData[];
  future: FormData[];
  isSubmitting: boolean;
  lastError: string | null;
  setDraft: (data: FormData) => void;
  updateDraft: (data: Partial<FormData>) => void;
  clearDraft: () => void;
  resetField: (path: string) => void;
  addAttachment: (file: File) => void;
  removeAttachment: (index: number) => void;
  setStatus: (status: FormData['status']) => void;
  undo: () => void;
  redo: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  saveDraftAsync: (data: FormData, signal?: AbortSignal) => Promise<void>;
  submitFormAsync: (data: FormData, signal?: AbortSignal) => Promise<void>;
}

// Persisted state type for migration
interface PersistedFormState {
  formData: FormData;
  history: FormData[];
}

// Constants
const HISTORY_LIMIT = 50;

// Utility to reset a nested field by path
const resetFieldByPath = (state: FormData, path: string): FormData => {
  const parts = path.split('.');
  if (parts.length === 1) {
    const key = parts[0] as keyof FormData;
    return {
      ...state,
      [key]: initialFormData[key],
    };
  }

  const [section, ...rest] = parts;
  const sectionKey = section as keyof FormData;
  if (!(sectionKey in initialFormData)) return state;

  if (sectionKey === 'clientInfo') {
    const field = rest.join('.');
    return {
      ...state,
      clientInfo: {
        ...state.clientInfo,
        [field]: initialFormData.clientInfo[field] || '',
      },
    };
  }

  if (sectionKey === 'dispatch' || sectionKey === 'orderDetails' || sectionKey === 'dispatchDetails' || sectionKey === 'salesOpsDetails' || sectionKey === 'complianceDetails' || sectionKey === 'adminConfirmationDetails') {
    // Handle array fields (not resetting entire array)
    return state;
  }

  const resetNested = (obj: any, path: string[], initObj: any): any => {
    if (path.length === 1) {
      return { ...obj, [path[0]]: initObj[path[0]] ?? '' };
    }
    const [current, ...next] = path;
    return {
      ...obj,
      [current]: resetNested(obj[current], next, initObj[current]),
    };
  };

  return {
    ...state,
    [sectionKey]: resetNested(state[sectionKey], rest, initialFormData[sectionKey]),
  };
};

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
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [],
        })),

      updateDraft: (data) =>
        set((state) => ({
          formData: updateTimestamps(merge({}, state.formData, data)),
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [],
        })),

      clearDraft: () =>
        set((state) => ({
          formData: updateTimestamps(initialFormData),
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [],
        })),

      resetField: (path) =>
        set((state) => ({
          formData: updateTimestamps(resetFieldByPath(state.formData, path)),
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [],
        })),

      addAttachment: (file: File) =>
        set((state) => ({
          formData: updateTimestamps({
            ...state.formData,
            attachments: {
              attachment: [...state.formData.attachments.attachment, file],
              attachmentName: [...state.formData.attachments.attachmentName, file.name],
            },
          }),
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [],
        })),

      removeAttachment: (index: number) =>
        set((state) => ({
          formData: updateTimestamps({
            ...state.formData,
            attachments: {
              attachment: state.formData.attachments.attachment.filter((_, i) => i !== index),
              attachmentName: state.formData.attachments.attachmentName.filter((_, i) => i !== index),
            },
          }),
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [],
        })),

      setStatus: (status) =>
        set((state) => ({
          formData: updateTimestamps({
            ...state.formData,
            status,
          }),
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [],
        })),

      undo: () =>
        set((state) => {
          const lastState = state.history[state.history.length - 1];
          if (!lastState) return state;
          return {
            formData: lastState,
            history: state.history.slice(0, -1),
            future: [...state.future, state.formData],
          };
        }),

      redo: () =>
        set((state) => {
          const nextState = state.future[state.future.length - 1];
          if (!nextState) return state;
          return {
            formData: nextState,
            history: [...state.history, state.formData],
            future: state.future.slice(0, -1),
          };
        }),

      setSubmitting: (isSubmitting) => set({ isSubmitting }),

      setError: (error) => set({ lastError: error }),

      saveDraftAsync: async (data: FormData, signal?: AbortSignal) => {
        set({ isSubmitting: true, lastError: null });
        try {
          await mockApiCall(data, 1000, Math.random() < 0.1);
          if (signal?.aborted) throw new DOMException('Operation cancelled', 'AbortError');

          set((state) => ({
            formData: updateTimestamps(data),
            history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
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
                await mockApiCall(
                  { id: generateAdminID(), ...data },
                  1500,
                  Math.random() < 0.05
                );
                if (signal?.aborted) throw new DOMException('Operation cancelled', 'AbortError');
      
                set((state) => ({
                  formData: updateTimestamps({ ...data, status: 'Submitted' }),
                  history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
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
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as PersistedFormState;
        if (version < 1) {
          return {
            formData: merge({}, initialFormData, state.formData),
            history: (state.history || []).map((item) => merge({}, initialFormData, item)),
          };
        }
        return state as FormState;
      },
    }
  )
);

// Utility to generate admin ID
const generateAdminID = (): string => {
  const date = new Date();
  return `MMS-${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Math.floor(
    Math.random() * 1000
  ).toString().padStart(3, '0')}`;
};