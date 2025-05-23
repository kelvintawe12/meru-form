// src/components/PDFPreviewModal.tsx
import React, { useState, useEffect } from 'react';
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
  const [isPdfLoaded, setIsPdfLoaded] = useState<boolean>(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsPdfLoaded(false);
      setPdfError(null);
    }
  }, [isOpen, pdfUrl]);

  const handleIframeLoad = () => {
    setIsPdfLoaded(true);
  };

  const handleIframeError = () => {
    setPdfError(t('form.pdfLoadError'));
    setIsPdfLoaded(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 mt-4 overflow-auto">
          <p className="text-gray-600 mb-4">{t('form.previewContent')}</p>
          <div className="relative w-full h-full min-h-[500px]">
            {!isPdfLoaded && !pdfError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <p className="text-gray-600">{t('form.loadingPdf')}</p>
              </div>
            )}
            {pdfError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <p className="text-red-600">{pdfError}</p>
              </div>
            )}
            <iframe
              src={pdfUrl}
              className={`w-full h-full min-h-[500px] border rounded ${!isPdfLoaded && !pdfError ? 'opacity-0' : 'opacity-100'}`}
              title={t('form.previewContent')}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              style={{ transition: 'opacity 0.3s ease' }}
            />
          </div>
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