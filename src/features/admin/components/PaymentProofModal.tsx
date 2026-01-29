"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface PaymentProofModalProps {
  imageUrl: string;
  onClose: () => void;
}

const PaymentProofModal: React.FC<PaymentProofModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#090223] border border-[#05C174] p-6 max-w-lg w-full relative shadow-[0_0_20px_rgba(5,193,116,0.3)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#05C174] hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl text-[#05C174] font-audiowide mb-4 text-center">Payment Proof</h2>
        <div className="relative w-full h-80 border border-[#05C174]/30">
          <Image
            src={imageUrl}
            alt="Payment Proof"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentProofModal;
