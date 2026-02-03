"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: React.ReactNode;
}

const InstructionModal: React.FC<InstructionModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Container - using div as rule #4 (no rounded corners if div container) */}
      <div className="relative w-[90%] max-w-md flex flex-col bg-[#090223] border border-[#05C174] p-6 shadow-[0_0_15px_rgba(5,193,116,0.3)]">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-family-audiowide text-xl text-[#05B0C1] tracking-wider">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-[#05C174] hover:text-[#05B0C1] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="font-family-spacemono text-white text-sm md:text-base leading-relaxed">
          {message}
        </div>

        {/* Footer / Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="font-family-spacemono bg-[#05C174] text-[#090223] px-6 py-2 font-bold hover:bg-[#05B0C1] transition-colors"
          >
            UNDERSTOOD
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default InstructionModal;
