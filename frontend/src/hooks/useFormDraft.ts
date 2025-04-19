import { useCallback } from 'react';
import { useFormStore } from '../stores/formStore';
import { initialFormData } from '../utils/initialFormData';
import { FormData } from '../types/form';

export const useFormDraft = () => {
  const { setDraft, loadDraft, clearDraft } = useFormStore();

  const initializeDraft = useCallback((clientInfo?: Partial<FormData['clientInfo']>) => {
    const newDraft: FormData = {
      ...initialFormData,
      clientInfo: {
        ...initialFormData.clientInfo,
        ...clientInfo,
      },
    };
    setDraft(newDraft);
    return newDraft;
  }, [setDraft]);

  const getDraft = useCallback(() => {
    const draft = loadDraft();
    return draft || initialFormData; // Return initialFormData if draft is undefined
  }, [loadDraft]);

  const resetDraft = useCallback(() => {
    clearDraft();
    setDraft(initialFormData); // Ensure formData is reset to initial state
  }, [clearDraft, setDraft]);

  return {
    initializeDraft,
    getDraft,
    resetDraft,
  };
};