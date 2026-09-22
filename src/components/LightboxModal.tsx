import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  altText,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Control bar */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          title="Perkecil"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          title="Perbesar"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleRotate}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          title="Putar"
        >
          <RotateCw className="w-5 h-5" />
        </button>
        <a
          href={imageUrl}
          download="menu-mbg.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          title="Unduh foto"
        >
          <Download className="w-5 h-5" />
        </a>
        <button
          onClick={() => {
            handleReset();
            onClose();
          }}
          className="p-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition ml-2"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Backdrop click handler */}
      <div
        className="absolute inset-0"
        onClick={() => {
          handleReset();
          onClose();
        }}
      />

      {/* Image container */}
      <div className="relative max-w-4xl max-h-[85vh] flex items-center justify-center overflow-hidden z-0">
        <img
          src={imageUrl}
          alt={altText}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl select-none"
        />
      </div>

      {/* Caption at bottom */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none px-4">
        <p className="text-white/80 text-xs sm:text-sm bg-black/60 backdrop-blur-xs inline-block px-4 py-1.5 rounded-full">
          {altText}
        </p>
      </div>
    </div>
  );
};
