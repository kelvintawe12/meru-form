import { useEffect } from 'react';
import { useToast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { FormData } from '../types/form';

export const useAutosave = (
  watch: () => FormData,
  save: (data: FormData) => void
) => {
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    const debouncedSave = debounce((data: FormData) => {
      save(data);
      toast.success(t('form.saved'));
    }, 30000);

    const subscription = watch((data) => {
      debouncedSave(data);
    });

    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [watch, save, t, toast]);
};