import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import { merge, isEqual } from 'lodash';
import { FormData } from '../types/form';

// Utility to update timestamps
const updateTimestamps = <T extends FormData>(data: T): T => ({
  ...data,
  updatedAt: new Date().toISOString(),
});

// Define initial form data (unchanged from your original)
const initialFormData: FormData = {
  clientInfo: {
    fullName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    address: '',
    clientCategory: 'Farmer',
    dateOfRegistration: new Date().toISOString().split('T')[0],
    referredBy: '',
    preferredContactMethod: 'SMS',
    businessName: '',
    taxId: '',
    loyaltyProgram: '',
    clientTier: 'Standard',
    accountManager: '',
    clientPhoto: '',
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

// Interface for the Zustand store
interface FormState {
  formData: FormData;
  history: FormData[];
  future: FormData[]; // For redo functionality
  isSubmitting: boolean;
  lastError: string | null;
  setDraft: (data: FormData) => void;
  loadDraft: () => FormData;
  updateDraft: (data: Partial<FormData>) => void;
  clearDraft: () => void;
  clearSection: <K extends keyof FormData>(section: K) => void;
  resetField: <K extends keyof FormData>(path: `${K}.${string}`) => void;
  addAttachment: (file: File) => void;
  removeAttachment: (index: number) => void;
  setStatus: (status: FormData['status']) => void;
  undo: () => void;
  redo: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  saveDraftAsync: (data: FormData, signal?: AbortSignal) => Promise<void>;
}

// Persisted state type for migration
interface PersistedFormState {
  formData: FormData;
  history: FormData[];
}

// Constants
const HISTORY_LIMIT = 50; // Limit history to prevent memory bloat

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      formData: initialFormData,
      history: [],
      future: [], // For redo functionality
      isSubmitting: false,
      lastError: null,

      // Save a new draft and add current state to history
      setDraft: (data) =>
        set((state) => ({
          formData: updateTimestamps(data),
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [], // Clear future on new action
        })),

      // Retrieve current draft
      loadDraft: () => get().formData,

      // Update draft with partial data
      updateDraft: (data) =>
        set((state) => ({
          formData: updateTimestamps(merge({}, state.formData, data)),
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [], // Clear future on new action
        })),

      // Reset to initial form data
      clearDraft: () =>
        set((state) => ({
          formData: updateTimestamps(initialFormData),
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [], // Clear future on new action
        })),

      // Clear a specific section
      clearSection: <K extends keyof FormData>(section: K) =>
        set((state) => ({
          formData: updateTimestamps({
            ...state.formData,
            [section]: initialFormData[section],
          }),
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [], // Clear future on new action
        })),

      // Reset a specific field
      resetField: <K extends keyof FormData>(path: `${K}.${string}`) =>
        set((state) => {
          const [section, field] = path.split('.') as [K, string];
          return {
            formData: updateTimestamps({
              ...state.formData,
              [section]: {
                ...state.formData[section],
                [field]: initialFormData[section][field as keyof FormData[K]],
              },
            }),
            history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
            future: [], // Clear future on new action
          };
        }),

      // Add an attachment
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
          future: [], // Clear future on new action
        })),

      // Remove an attachment
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
          future: [], // Clear future on new action
        })),

      // Update form status
      setStatus: (status) =>
        set((state) => ({
          formData: updateTimestamps({
            ...state.formData,
            status,
          }),
          history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
          future: [], // Clear future on new action
        })),

      // Undo last action
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

      // Redo undone action
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

      // Set submitting status
      setSubmitting: (isSubmitting) => set({ isSubmitting }),

      // Set error message
      setError: (lastError) => set({ lastError }),

      // Save draft asynchronously with cancellation support
      saveDraftAsync: async (data: FormData, signal?: AbortSignal) => {
        set({ isSubmitting: true, lastError: null });
        try {
          // Mock API call (replace with your backend endpoint)
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(resolve, 1000);
            signal?.addEventListener('abort', () => {
              clearTimeout(timeout);
              reject(new DOMException('Operation cancelled', 'AbortError'));
            });
          });
          if (signal?.aborted) throw new DOMException('Operation cancelled', 'AbortError');

          set((state) => ({
            formData: updateTimestamps(data),
            history: [...state.history.slice(-HISTORY_LIMIT), state.formData],
            future: [], // Clear future on new action
          }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to save draft';
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
      migrate: (persistedState: PersistedFormState, version: number) => {
        if (version < 1) {
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