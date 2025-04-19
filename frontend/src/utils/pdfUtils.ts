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
      order.orderCategory || '',
      order.productName || '',
      order.sku || '',
      order.unitType || '',
      order.quantity || 0,
      order.unitPrice || 0,
      order.discount || 0,
      ((order.quantity || 0) * (order.unitPrice || 0) * (1 - (order.discount || 0) / 100)).toFixed(2),
      order.orderUrgency || '',
      order.packagingPreference || '',
      order.notes || '',
      order.paymentSchedule || '',
    ]),
    theme: 'striped',
    headStyles: { fillColor: [76, 175, 80] },
  });
  return (doc as any).lastAutoTable.finalY;
};

export const addDispatchTable = (doc: jsPDF, dispatchDetails: FormData['dispatchDetails'], t: (key: string) => string, startY: number): number => {
    autoTable(doc, {
        startY,
        head: [[t('form.dispatchDetails')]],
        body: dispatchDetails.map((dispatch) => [
            dispatch.dispatchDate || '',
            dispatch.dispatchTime || '',
            dispatch.vehicleNumber || '',
            dispatch.driverName || '',
            dispatch.contactNumber || '',
            dispatch.notes || '',
        ]),
        theme: 'striped',
        headStyles: { fillColor: [76, 175, 80] },
    });
    return (doc as any).lastAutoTable.finalY;
};

export const addSalesOpsTable = (doc: jsPDF, salesOpsDetails: FormData['salesOpsDetails'], t: (key: string) => string, startY: number): number => {
    autoTable(doc, {
        startY,
        head: [[t('form.salesOpsDetails')]],
        body: salesOpsDetails.map((salesOps) => [
            salesOps.operationDate || '',
            salesOps.operationType || '',
            salesOps.notes || '',
        ]),
        theme: 'striped',
        headStyles: { fillColor: [76, 175, 80] },
    });
    return (doc as any).lastAutoTable.finalY;
};

export const addComplianceTable = (doc: jsPDF, complianceDetails: FormData['complianceDetails'], t: (key: string) => string, startY: number): number => {
    autoTable(doc, {
        startY,
        head: [[t('form.complianceDetails')]],
        body: complianceDetails.map((compliance) => [
            compliance.complianceType || '',
            compliance.status || '',
            compliance.notes || '',
        ]),
        theme: 'striped',
        headStyles: { fillColor: [76, 175, 80] },
    });
    return (doc as any).lastAutoTable.finalY;
};

export const addAdminConfirmationTable = (doc: jsPDF, adminConfirmationDetails: FormData['adminConfirmationDetails'], t: (key: string) => string, startY: number): number => {
    autoTable(doc, {
        startY,
        head: [[t('form.adminConfirmationDetails')]],
        body: adminConfirmationDetails.map((adminConfirmation) => [
            adminConfirmation.confirmationDate || '',
            adminConfirmation.confirmedBy || '',
            adminConfirmation.notes || '',
        ]),
        theme: 'striped',
        headStyles: { fillColor: [76, 175, 80] },
    });
    return (doc as any).lastAutoTable.finalY;
};