import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormData } from '../types/form';

// Assets
const logo = '/logo.png';
const watermark = '/watermark.png';

export const usePDFGenerator = () => {
  const { t } = useTranslation();

  const generateAdminID = () => {
    const date = new Date();
    return `MMS-${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Math.floor(
      Math.random() * 1000
    ).toString().padStart(3, '0')}`;
  };

  const generatePDF = useCallback(
    (formData: FormData, fileName: string = 'meru_order_summary.pdf') => {
      try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const adminID = generateAdminID();
        let currentY = 0;

        // Add Watermark
        try {
          doc.addImage(watermark, 'PNG', 50, 50, pageWidth - 100, 100, '', 'FAST');
          doc.setGState(new jsPDF.GState({ opacity: 0.1 }));
        } catch (error) {
          console.warn('Watermark not found');
        }

        // Header Section
        doc.setDrawColor(0, 105, 92);
        doc.setFillColor(245, 245, 245);
        doc.rect(0, 0, pageWidth, 50, 'F');
        
        try {
          doc.addImage(logo, 'PNG', 15, 10, 30, 30);
        } catch {
          doc.setFontSize(24);
          doc.setTextColor(0, 105, 92);
          doc.text('MMS', 15, 25);
        }

        // Admin ID Barcode
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`ADMIN ID: ${adminID}`, pageWidth - 80, 20);
        doc.text(`DATE: ${new Date().toLocaleDateString()}`, pageWidth - 80, 28);

        // Title Section
        doc.setFontSize(18);
        doc.setTextColor(0, 105, 92);
        doc.setFont('helvetica', 'bold');
        doc.text(t('form.title'), pageWidth / 2, 40, { align: 'center' });

        // Client Info Table
        autoTable(doc, {
          startY: 60,
          head: [[
            { 
              content: t('form.clientInfo'),
              styles: { 
                fillColor: [44, 62, 80],
                textColor: 255,
                fontSize: 14,
              }
            }
          ]],
          body: [
            [t('form.fullName'), formData.clientInfo.fullName],
            [t('form.clientID'), adminID],
            [t('form.phoneNumber'), formData.clientInfo.phoneNumber],
            [t('form.email'), formData.clientInfo.email || '-'],
            [t('form.address'), formData.clientInfo.address],
            [t('form.clientCategory'), t(`options.${formData.clientInfo.clientCategory}`)],
            [t('form.dateOfRegistration'), formData.clientInfo.dateOfRegistration],
            [t('form.preferredContactMethod'), t(`options.${formData.clientInfo.preferredContactMethod}`)],
            [t('form.clientTier'), t(`options.${formData.clientInfo.clientTier}`)],
          ],
          theme: 'grid',
          styles: { cellPadding: 3, fontSize: 12 },
          headStyles: { fillColor: [44, 62, 80] },
          alternateRowStyles: { fillColor: [245, 245, 245] },
          margin: { horizontal: 15 },
        });

        // Financial Summary
        currentY = (doc as any).lastAutoTable.finalY + 15;
        doc.setFontSize(14);
        doc.setTextColor(0, 105, 92);
        doc.text(t('form.financialSummary'), 15, currentY);
        
        autoTable(doc, {
          startY: currentY + 5,
          body: [
            [t('form.totalAmount'), 'RWF 1,250,000'],
            [t('form.totalDiscount'), 'RWF 150,000'],
            [t('form.netAmount'), 'RWF 1,100,000'],
            [t('form.taxVAT'), 'RWF 220,000'],
            [t('form.grandTotal'), 'RWF 1,320,000'],
          ],
          styles: { cellPadding: 3, fontSize: 12 },
          theme: 'grid',
          margin: { horizontal: 15 },
        });

        // Order Details Table
        currentY = (doc as any).lastAutoTable.finalY + 15;
        doc.setFontSize(14);
        doc.text(t('form.orderDetails'), 15, currentY);
        
        autoTable(doc, {
          startY: currentY + 5,
          head: [
            [
              { content: '#', styles: { cellWidth: 15 } },
              { content: t('form.productName'), styles: { cellWidth: 40 } },
              { content: t('form.sku'), styles: { cellWidth: 35 } },
              { content: t('form.quantity'), styles: { cellWidth: 25 } },
              { content: t('form.unitPrice'), styles: { cellWidth: 30 } },
              { content: t('form.total'), styles: { cellWidth: 30 } },
            ]
          ],
          body: formData.orderDetails.map((order, index) => [
            index + 1,
            t(`options.${order.productName}`),
            order.sku,
            order.quantity,
            `RWF ${order.unitPrice.toLocaleString()}`,
            `RWF ${(order.quantity * order.unitPrice).toLocaleString()}`,
          ]),
          styles: { cellPadding: 3, fontSize: 10 },
          theme: 'grid',
          headStyles: { fillColor: [44, 62, 80], textColor: 255 },
          margin: { horizontal: 15 },
        });

        // Admin Section
        currentY = (doc as any).lastAutoTable.finalY + 20;
        doc.setFillColor(44, 62, 80);
        doc.rect(0, currentY, pageWidth, 15, 'F');
        doc.setTextColor(255);
        doc.setFontSize(12);
        doc.text('MERU ADMIN SECTION', 15, currentY + 10);

        autoTable(doc, {
          startY: currentY + 20,
          columns: [
            { header: 'Internal Code', dataKey: 'code' },
            { header: 'Approval Status', dataKey: 'status' },
            { header: 'Inventory Check', dataKey: 'inventory' },
            { header: 'QC Approval', dataKey: 'qc' },
          ],
          body: [
            {
              code: 'MMS-2023-INV',
              status: 'Approved',
              inventory: 'Stock Verified',
              qc: formData.compliance.qualityCertification ? 'Passed' : 'Pending'
            }
          ],
          styles: { cellPadding: 3, fontSize: 10 },
          theme: 'grid',
          headStyles: { fillColor: [0, 105, 92], textColor: 255 },
          margin: { horizontal: 15 },
        });

        // Signature Section
        currentY = (doc as any).lastAutoTable.finalY + 20;
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Authorized Signature:', 15, currentY);
        doc.text('________________________', 15, currentY + 5);
        doc.text('Digital Stamp:', pageWidth - 60, currentY);
        doc.addImage(formData.compliance.digitalSignature || '/default-sig.png', 'PNG', pageWidth - 60, currentY + 2, 50, 20);

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(100);
        const footerText = `CONFIDENTIAL - ${adminID} - Mount Meru SoyCo Rwanda | ${new Date().toLocaleDateString()} | Page ${doc.internal.getNumberOfPages()}`;
        doc.text(footerText, 15, doc.internal.pageSize.getHeight() - 10);

        // Finalize
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
    [t]
  );

  const shareViaWhatsApp = useCallback(
    (pdfBlob: Blob, phoneNumber: string) => {
      try {
        const url = URL.createObjectURL(pdfBlob);
        const message = encodeURIComponent(`Mount Meru SoyCo Order Document\nID: ${generateAdminID()}\nDownload: ${url}`);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        toast.success(t('form.whatsappShared'));
      } catch (error) {
        toast.error(t('form.whatsappError'));
      }
    },
    [t]
  );

  return { generatePDF, shareViaWhatsApp };
};