// src/components/PDFPreviewModal.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './common/Dialog';
import Button from './common/Button';
import { Download, Share2 } from 'lucide-react';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  onDownload: () => void;
  onShare: () => void;
  title: string;
}

const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  onDownload,
  onShare,
  title,
}) => {
  const { t } = useTranslation('translation');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-gray-600 mb-4">{t('form.previewContent')}</p>
          <iframe
            src={pdfUrl}
            className="w-full h-[500px] border rounded"
            title={t('form.previewContent')}
          />
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={onDownload}
            icon={Download}
            aria-label={t('form.download')}
          >
            {t('form.download')}
          </Button>
          <Button
            variant="primary"
            onClick={onShare}
            icon={Share2}
            aria-label={t('form.share')}
          >
            {t('form.share')}
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            aria-label={t('form.close')}
          >
            {t('form.close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PDFPreviewModal;