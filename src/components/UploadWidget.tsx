// components/UploadWidget.tsx
'use client'

import { useRef, useState } from 'react';
import Script from 'next/script';
import { generateSignature } from '@/lib/utils/cloudinary';

interface UploadWidgetProps {
  folder: string;
  onSuccess: (result: any) => void;
  children: (args: { open: () => void; isLoading: boolean }) => React.ReactNode;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function UploadWidget({ folder, onSuccess, children }: UploadWidgetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const widgetRef = useRef<any>(null);

  const openWidget = async () => {
    if (!window.cloudinary) {
      console.error('Cloudinary script not loaded');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Call Server Action to get signature
      const { signature, timestamp } = await generateSignature({ folder });

      // 2. Create Widget Instance (if not already created or if params change)
      // Note: We create it fresh to ensure timestamp matches signature
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET, 
          folder: folder, // Must match what you signed in Server Action
          timestamp,      // Must match what you signed in Server Action
          signature,      // The signature from Server Action
          sources: ['local', 'url', 'camera'],
          multiple: false,
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            onSuccess(result);
          }
        }
      );

      // 3. Open Widget
      widgetRef.current.open();
    } catch (err) {
      console.error("Failed to sign request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script 
        src="https://widget.cloudinary.com/v2.0/global/all.js" 
        onLoad={() => console.log("Cloudinary Widget Loaded")}
      />
      {children({ open: openWidget, isLoading })}
    </>
  );
}