import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormData } from '../types/form';

export const addHeader = (doc: jsPDF, t: (key: string) => string): void => {
  doc.addImage('/logo.png', 'PNG', 10, 10, 30, 30);
  doc.setFontSize(16);
  doc.text('Mount Meru SoyCo Rwanda', 50, 20);
  doc.setFontSize(10);
  doc.text('Kigali, Rwanda | +250788123456 | www.mountmerusoyco.rw', 50, 30);
};

export const addFooter = (doc: jsPDF, t: (key: string) => string): void => {
  doc.setFontSize(10);
  doc.text(t('footer.tagline'), 10, doc.internal.pageSize.height - 10);
};

export const addClientTable = (doc: jsPDF, clientInfo: FormData['clientInfo'], t: (key: string) => string, startY: number): number => {
  autoTable(doc, {
    startY,
    head: [[t('form.clientInfo')]],
    body: Object.entries(clientInfo).map(([key, value]) => [t(`form.${key}`), String(value)]),
    theme: 'striped',
    headStyles: { fillColor: [76, 175, 80] },
  });
  return (doc as any).lastAutoTable.finalY;
};

export const addOrderTable = (doc: jsPDF, orderDetails: FormData['orderDetails'], t: (key: string) => string, startY: number): number => {
  autoTable(doc, {
    startY,
    head: [[t('form.orderDetails')]],
    body: orderDetails.map((order) => [
      order.orderCategory,
      order.productName,
      order.sku,
      order.unitType,
      order.quantity,
      order.unitPrice,
      order.discount,
      (order.quantity * order.unitPrice * (1 - (order.discount || 0) / 100)).toFixed(2),
      order.orderUrgency,
      order.packagingPreference,
      order.notes,
      order.paymentSchedule,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [76, 175, 80] },
  });
  return (doc as any).lastAutoTable.finalY;
};

// Similar functions for dispatch, salesOps, compliance, adminConfirmation