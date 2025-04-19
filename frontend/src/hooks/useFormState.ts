import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../utils/validators';
import { useFormStore } from '../stores/formStore';
import { FormData } from '../types/form';

export const useFormState = () => {
  const { formData } = useFormStore();

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const resetSection = (section: keyof FormData) => {
    methods.resetField(section);
  };

  const resetForm = () => {
    methods.reset();
    useFormStore.getState().clearDraft();
  };

  return { methods, resetSection, resetForm };
};