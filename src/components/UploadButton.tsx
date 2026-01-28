"use client";

import { CldUploadWidget, CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo, CldUploadWidgetProps } from 'next-cloudinary';
import { useState } from 'react';

interface UploadButtonProps {
  options?: CldUploadWidgetProps['options'];
  onSuccess?: (url: string) => void;
  children: (args: { open: () => void; isLoading: boolean }) => React.ReactNode;
}

export default function UploadButton({ options, onSuccess, children }: UploadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === 'object' && result.event === "success") {
       const info = result.info as CloudinaryUploadWidgetInfo;
       if (onSuccess) onSuccess(info.secure_url);
    }
  };

  const handleOpen = (openWidget: () => void) => {
    setIsLoading(true);
    openWidget();
  }

  const handleWidgetOpen = () => {
    // Widget initialized but not necessarily shown
  }

  const handleDisplayChanged = (results: any) => {
    const event = results?.event;
    if (event === 'show') {
       setIsLoading(false);
    }
  }

  const handleClose = () => {
    setIsLoading(false);
  }

  const handleError = () => {
      setIsLoading(false);
  }

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={handleSuccess}
      onOpen={handleWidgetOpen}
      onDisplayChanged={handleDisplayChanged}
      onClose={handleClose}
      onError={handleError}
      options={{
        singleUploadAutoClose: false,
        multiple: false, 
        sources: ['local', 'url'],
        ...options,
      }}
    >
      {({ open, isLoading: widgetLoading }) => {
        return children({ 
            open: () => handleOpen(open), 
            isLoading: isLoading || !!widgetLoading 
        });
      }}
    </CldUploadWidget>
  );
}
