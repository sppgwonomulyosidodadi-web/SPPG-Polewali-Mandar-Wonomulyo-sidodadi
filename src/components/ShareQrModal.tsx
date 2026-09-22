import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, ExternalLink, QrCode as QrIcon } from 'lucide-react';
import { MenuItemData } from '../types';

interface ShareQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MenuItemData;
}

export const ShareQrModal: React.FC<ShareQrModalProps> = ({ isOpen, onClose, data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://labelmbg.web.id/m/' + data.id;

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        currentUrl,
        {
          width: 220,
          margin: 2,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) console.error('Error generating QR code', error);
        }
      );
    }
  }, [isOpen, currentUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
          <QrIcon className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900">
          QR Code Menu MBG
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Pindai kode QR ini dengan kamera HP untuk melihat informasi gizi &amp; menu langsung.
        </p>

        {/* Canvas for QR */}
        <div className="my-4 flex justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 inline-block mx-auto">
          <canvas ref={canvasRef} className="rounded-lg shadow-2xs" />
        </div>

        <div className="text-[11px] font-medium text-slate-500 mb-4 bg-slate-100 py-1.5 px-3 rounded-md truncate max-w-full">
          {currentUrl}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin Tautan'}</span>
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
