import React from 'react';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  onDownload: () => void;
  onShare: () => Promise<void>;
}

const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  onDownload,
  onShare,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-preview-title"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-full flex flex-col">
        <header className="flex justify-between items-center p-4 border-b">
          <h2 id="pdf-preview-title" className="text-lg font-semibold">
            PDF Preview
          </h2>
          <button
            onClick={onClose}
            aria-label="Close PDF preview"
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </header>
        <div className="flex-1 overflow-auto">
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            className="w-full h-full"
            frameBorder="0"
          />
        </div>
        <footer className="flex justify-end gap-4 p-4 border-t">
          <button
            onClick={onDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download
          </button>
          <button
            onClick={onShare}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Share via WhatsApp
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PDFPreviewModal;