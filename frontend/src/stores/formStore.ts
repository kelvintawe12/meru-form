import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { merge } from 'lodash';
import { FormData } from '../types/form';

interface FormState {
  formData: FormData;
  history: FormData[];
  isSubmitting: boolean;
  lastError: string | null;
  setDraft: (data: FormData) => void;
  loadDraft: () => FormData;
  updateDraft: (data: Partial<FormData>) => void;
  clearDraft: () => void;
  clearSection: <K extends keyof FormData>(section: K) => void;
  resetField: <K extends keyof FormData>(path: `${K}.${keyof FormData[K]}`) => void;
  addAttachment: (file: File) => void;
  removeAttachment: (index: number) => void;
  setStatus: (status: FormData['status']) => void;
  undo: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  saveDraftAsync: (data: FormData) => Promise<void>;
}

const initialFormData: FormData = {
  clientInfo: {
    fullName: '',
    phoneNumber: '',
    email: '',
    gender: undefined,
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
    clientPhoto: null,
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
      packagingPreference: undefined,
      paymentSchedule: undefined,
    },
  ],
  dispatch: [],
  salesOps: {
    salesRepresentative: '',
    paymentStatus: 'Pending',
    paymentMethod: undefined,
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
    qualityCertification: undefined,
    customsDeclaration: '',
    complianceNotes: '',
    digitalSignature: '',
  },
  confirmation: {
    confirmedBy: '',
    confirmationDate: '',
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
};

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      formData: initialFormData,
      history: [],
      isSubmitting: false,
      lastError: null,
      setDraft: (data) =>
        set((state) => ({
          formData: { ...data, updatedAt: new Date().toISOString() },
          history: [...state.history, state.formData],
        })),
      loadDraft: () => get().formData,
      updateDraft: (data) =>
        set((state) => ({
          formData: merge({}, state.formData, {
            ...data,
            updatedAt: new Date().toISOString(),
          }),
        })),
      clearDraft: () =>
        set((state) => ({
          history: [...state.history, state.formData],
          formData: {
            ...initialFormData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })),
      clearSection: <K extends keyof FormData>(section: K) =>
        set((state) => ({
          history: [...state.history, state.formData],
          formData: {
            ...state.formData,
            [section]: initialFormData[section],
            updatedAt: new Date().toISOString(),
          },
        })),
      resetField: <K extends keyof FormData>(path: `${K}.${keyof FormData[K]}`) =>
        set((state) => {
          const [section, field] = path.split('.') as [K, keyof FormData[K]];
          return {
            history: [...state.history, state.formData],
            formData: {
              ...state.formData,
              [section]: {
                ...state.formData[section],
                [field]: initialFormData[section][field],
              },
              updatedAt: new Date().toISOString(),
            },
          };
        }),
      addAttachment: (file: File) =>
        set((state) => ({
          formData: {
            ...state.formData,
            attachments: {
              attachment: [...state.formData.attachments.attachment, file],
              attachmentName: [...state.formData.attachments.attachmentName, file.name],
            },
            updatedAt: new Date().toISOString(),
          },
        })),
      removeAttachment: (index: number) =>
        set((state) => ({
          formData: {
            ...state.formData,
            attachments: {
              attachment: state.formData.attachments.attachment.filter((_, i) => i !== index),
              attachmentName: state.formData.attachments.attachmentName.filter((_, i) => i !== index),
            },
            updatedAt: new Date().toISOString(),
          },
        })),
      setStatus: (status) =>
        set((state) => ({
          formData: {
            ...state.formData,
            status,
            updatedAt: new Date().toISOString(),
          },
        })),
      undo: () =>
        set((state) => {
          const lastState = state.history[state.history.length - 1];
          if (!lastState) return state;
          return {
            formData: lastState,
            history: state.history.slice(0, -1),
          };
        }),
      setSubmitting: (isSubmitting) => set({ isSubmitting }),
      setError: (lastError) => set({ lastError }),
      saveDraftAsync: async (data: FormData) => {
        set({ isSubmitting: true, lastError: null });
        try {
          // Mock API call (replace with your backend endpoint)
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // Example: await fetch('/api/draft', { method: 'POST', body: JSON.stringify(data) });
          set((state) => ({
            formData: { ...data, updatedAt: new Date().toISOString() },
            history: [...state.history, state.formData],
          }));
        } catch (error) {
          set({ lastError: 'Failed to save draft' });
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
      migrate: (persistedState: Partial<FormState>, version: number) => {
        if (version < 1) {
          // Merge persisted formData with initialFormData to ensure all fields are present
          return {
            formData: merge({}, initialFormData, persistedState.formData),
            history: (persistedState.history || []).map((item) => merge({}, initialFormData, item)),
          };
        }
        return persistedState as FormState;
      },
    }
  )
);