import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { merge, set } from 'lodash';
import { FormData } from '../types/form';
import { initialFormData } from '../utils/initialFormData';

// Utility type to generate valid dot-separated paths for FormData
type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${Path<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type FormDataPath = Path<FormData> | keyof FormData;

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
  resetField: (path: FormDataPath) => void;
  addAttachment: (file: File) => void;
  removeAttachment: (index: number) => void;
  setStatus: (status: FormData['status']) => void;
  undo: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  saveDraftAsync: (data: FormData) => Promise<void>;
}

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
      resetField: (path: FormDataPath) =>
        set((state) => {
          try {
            // Create a deep copy of formData
            const newFormData = merge({}, state.formData);
            // Get the initial value for the path
            let initialValue: any;
            try {
              initialValue = path.split('.').reduce((obj, key) => {
                if (obj === undefined) throw new Error(`Invalid path: ${path}`);
                return obj[key];
              }, initialFormData as any);
            } catch {
              console.warn(`Invalid path: ${path}, skipping reset`);
              return state;
            }
            // Set the value at the path
            newFormData[path] = initialValue;
            return {
              history: [...state.history, state.formData],
              formData: {
                ...newFormData,
                updatedAt: new Date().toISOString(),
              },
            };
          } catch (error) {
            console.error(`Failed to reset field at path: ${path}`, error);
            return {
              ...state,
              lastError: `Failed to reset field: ${path}`,
            };
          }
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
              attachment: state.formData.attachment.filter((_, i) => i !== index),
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