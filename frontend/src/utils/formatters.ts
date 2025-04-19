import { format } from 'date-fns';

export const formatCustomerId = (fullName: string, phoneNumber: string, date: Date): string => {
  if (!fullName || !phoneNumber) return '';
  const namePrefix = fullName.slice(0, 2).toUpperCase();
  const timestamp = Math.floor(date.getTime() / 1000);
  const formattedDate = format(date, 'yyyyMMdd');
  return `${namePrefix}${timestamp}${phoneNumber}_DT:${formattedDate}_MMS`;
};

export const formatDate = (date: string | Date, locale: 'en' | 'rw' = 'en'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, locale === 'en' ? 'MM/dd/yyyy' : 'dd/MM/yyyy');
};

export const formatCurrency = (amount: number, currency: 'RWF' | 'USD' = 'RWF'): string => {
  return new Intl.NumberFormat(currency === 'RWF' ? 'rw-RW' : 'en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};