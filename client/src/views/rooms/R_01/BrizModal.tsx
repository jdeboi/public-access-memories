// ModalOverlay.tsx
import React from "react";
import { createPortal } from "react-dom";
import { BrizQuadType } from "./briz";

type Props = {
  visible: boolean;
  content: BrizQuadType | null;
  onClose: () => void;
};

const BrizModal: React.FC<Props> = ({ visible, content, onClose }) => {
  if (!visible || !content) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                      max-h-[80vh] w-[min(90vw,900px)] overflow-auto rounded-2xl 
                      p-6 shadow-2xl bg-white/90 font-mono"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center
                     rounded-full border border-slate-300 bg-white/80 text-slate-700 
                     hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          aria-label="Close"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="text-2xl font-bold font-[manoloFont] uppercase mb-2">
          {content.vector}
        </div>
        <div className="text-4xl font-bold mb-4">{content.label}</div>

        <div className="font-mono">{content.content}</div>
      </div>
    </div>,
    document.body
  );
};

export default React.memo(BrizModal);
