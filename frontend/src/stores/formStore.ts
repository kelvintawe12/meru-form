import { create } from 'zustand';
import { FormData } from '../types/form';

interface FormState {
  formData: FormData;
  setDraft: (data: FormData) => void;
  loadDraft: () => FormData | null;
  clearDraft: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  formData: {
    clientInfo: {},
    orderDetails: [],
    dispatch: [],
    salesOps: {},
    compliance: {},
  },
  setDraft: (data) => {
    set({ formData: data });
    localStorage.setItem('form_draft', JSON.stringify(data));
    // Optional: Sync to backend
    // api.saveDraft(data);
  },
  loadDraft: () => {
    const draft = localStorage.getItem('form_draft');
    return draft ? JSON.parse(draft) : null;
  },
  clearDraft: () => {
    set({ formData: { clientInfo: {}, orderDetails: [], dispatch: [], salesOps: {}, compliance: {} } });
    localStorage.removeItem('form_draft');
  },
}));