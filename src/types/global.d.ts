// types/global.d.ts OR global.d.ts

export {}; // This makes the file a module

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: any, 
        callback: (error: any, result: any) => void
      ) => {
        open: () => void;
        close: () => void;
        destroy: () => void;
      };
    };
  }
}