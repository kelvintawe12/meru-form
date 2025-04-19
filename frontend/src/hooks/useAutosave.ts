import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { FormData } from '../types/form';

export const useAutosave = (
  watch: () => FormData,
  save: (data: FormData) => void
) => {
  const { t } = useTranslation();
  // Removed useToast as it's not exported from react-toastify

  useEffect(() => {
    const debouncedSave = debounce((data: FormData) => {
      save(data);
      toast.success(t('form.saved'));
    }, 30000);

    const subscription = watch();
    if (subscription && typeof (subscription as any).onChange === 'function') {
      (subscription as any).onChange((data: FormData) => {
        debouncedSave(data);
      });
    }

    return () => {
      debouncedSave.cancel();
    };
  }, [watch, save, t, toast]);
};