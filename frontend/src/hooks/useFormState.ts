import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../utils/formSchema';
import { useFormStore } from '../stores/formStore';
import { FormData } from '../types/form';
import { debounce } from 'lodash';

export const useFormState = () => {
  const { formData } = useFormStore();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    mode: 'onChange', // Enable real-time validation
  });

  const resetSection = (section: keyof FormData) => {
    methods.resetField(section);
  };

  const resetForm = () => {
    methods.reset();
    useFormStore.getState().clearDraft();
  };

  // Debounced validation trigger
  const triggerValidation = debounce((field: keyof FormData) => {
    methods.trigger(field);
  }, 300);

  return { methods, resetSection, resetForm, triggerValidation };
};