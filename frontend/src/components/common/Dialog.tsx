// src/components/common/Dialog.tsx
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      ref={ref}
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg ${className}`}
      {...props}
    >
      {children}
      <DialogPrimitive.Close asChild>
        <Button variant="secondary" className="absolute top-4 right-4 p-1" aria-label="Close">
          <X size={16} />
        </Button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = 'DialogContent';

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={`mb-4 ${className}`} {...props} />
);

export const DialogTitle = DialogPrimitive.Title;

export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={`flex justify-end gap-2 mt-4 ${className}`} {...props} />
);