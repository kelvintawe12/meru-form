import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormData } from '../types/form';
const logo = 'MMS';

export const usePDFGenerator = () => {
  const { t } = useTranslation();

  const generatePDF = useCallback(
    (formData: FormData, fileName: string = 'order_summary.pdf') => {
      try {
        const doc = new jsPDF();

        // Attempt to add logo
        try {
          const img = new Image();
          img.src = logo;
          img.onload = () => {
            const imgWidth = 30;
            const imgHeight = (img.height * imgWidth) / img.width; // Maintain aspect ratio
            doc.addImage(logo, 'PNG', 10, 10, imgWidth, imgHeight);
          };
          img.onerror = () => {
            throw new Error('Failed to load logo image');
          };
        } catch (imgError) {
          console.warn('Logo loading failed:', imgError);
          toast.warn(t('form.pdfImageWarning'));
          // Proceed without logo
          doc.setFontSize(18);
          doc.text(t('form.title'), 10, 20);
        }

        // Title (adjusted if logo is present)
        doc.setFontSize(18);
        doc.text(t('form.title'), 50, logo ? 40 : 20);

        // Client Info Table
        autoTable(doc, {
          startY: logo ? 60 : 40,
          head: [[t('form.clientInfo')]],
          body: [
            [t('form.fullName'), formData.clientInfo.fullName],
            [t('form.phoneNumber'), formData.clientInfo.phoneNumber],
            [t('form.email'), formData.clientInfo.email || '-'],
            [t('form.address'), formData.clientInfo.address],
            [t('form.clientCategory'), t(`options.${formData.clientInfo.clientCategory}`)],
            [t('form.dateOfRegistration'), formData.clientInfo.dateOfRegistration],
            [t('form.preferredContactMethod'), t(`options.${formData.clientInfo.preferredContactMethod}`)],
            [t('form.clientTier'), t(`options.${formData.clientInfo.clientTier}`)],
          ],
          theme: 'striped',
          headStyles: { fillColor: [0, 105, 92] }, // Teal
        });

        // Order Details Table
        autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY + 10,
          head: [[t('form.orderDetails')]],
          body: formData.orderDetails.map((order, index) => [
            index + 1,
            t(`options.${order.productName}`),
            order.sku,
            t(`options.${order.unitType}`),
            order.quantity,
            order.unitPrice,
            order.discount || 0,
            t(`options.${order.orderUrgency}`),
          ]),
          columns: [
            { header: '#', dataKey: 'index' },
            { header: t('form.productName'), dataKey: 'productName' },
            { header: t('form.sku'), dataKey: 'sku' },
            { header: t('form.unitType'), dataKey: 'unitType' },
            { header: t('form.quantity'), dataKey: 'quantity' },
            { header: t('form.unitPrice'), dataKey: 'unitPrice' },
            { header: t('form.discount'), dataKey: 'discount' },
            { header: t('form.orderUrgency'), dataKey: 'orderUrgency' },
          ],
          theme: 'striped',
          headStyles: { fillColor: [0, 105, 92] },
        });

        // Dispatch Table
        autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY + 10,
          head: [[t('form.dispatch')]],
          body: formData.dispatch.map((dispatch, index) => [
            index + 1,
            dispatch.dispatchDate,
            dispatch.product,
            dispatch.quantityDispatched,
            t(`options.${dispatch.transportMethod}`),
            dispatch.trackingReference || '-',
            t(`options.${dispatch.dispatchStatus}`),
          ]),
          columns: [
            { header: '#', dataKey: 'index' },
            { header: t('form.dispatchDate'), dataKey: 'dispatchDate' },
            { header: t('form.product'), dataKey: 'product' },
            { header: t('form.quantityDispatched'), dataKey: 'quantityDispatched' },
            { header: t('form.transportMethod'), dataKey: 'transportMethod' },
            { header: t('form.trackingReference'), dataKey: 'trackingReference' },
            { header: t('form.dispatchStatus'), dataKey: 'dispatchStatus' },
          ],
          theme: 'striped',
          headStyles: { fillColor: [0, 105, 92] },
        });

        // Sales & Operations Table
        autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY + 10,
          head: [[t('form.salesOps')]],
          body: [
            [t('form.salesRepresentative'), formData.salesOps.salesRepresentative || '-'],
            [t('form.paymentStatus'), t(`options.${formData.salesOps.paymentStatus}`)],
            [t('form.deliveryStatus'), t(`options.${formData.salesOps.deliveryStatus}`)],
            [t('form.orderPriority'), t(`options.${formData.salesOps.orderPriority}`)],
            [t('form.salesChannel'), t(`options.${formData.salesOps.salesChannel}`)],
          ],
          theme: 'striped',
          headStyles: { fillColor: [0, 105, 92] },
        });

        // Compliance Table
        autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY + 10,
          head: [[t('form.compliance')]],
          body: [
            [t('form.digitalSignature'), formData.compliance.digitalSignature],
            [t('form.qualityCertification'), t(`options.${formData.compliance.qualityCertification || 'None'}`)],
          ],
          theme: 'striped',
          headStyles: { fillColor: [0, 105, 92] },
        });

        // Save PDF and return blob
        const pdfBlob = doc.output('blob');
        doc.save(fileName);
        toast.success(t('form.pdfGenerated'));
        return pdfBlob;
      } catch (error) {
        toast.error(t('form.pdfError'));
        console.error('PDF generation error:', error);
        return null;
      }
    },
    [t],
  );

  const shareViaWhatsApp = useCallback((pdfBlob: Blob, phoneNumber: string, message: string = t('form.whatsappMessage')) => {
    try {
      const url = URL.createObjectURL(pdfBlob);
      const encodedMessage = encodeURIComponent(`${message} ${url}`);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      toast.success(t('form.whatsappShared'));
    } catch (error) {
      toast.error(t('form.whatsappError'));
      console.error('WhatsApp sharing error:', error);
    }
  }, [t]);

  return { generatePDF, shareViaWhatsApp };
};