import React from 'react';
import { Edit3, Printer, QrCode, RotateCcw, Share2, Check } from 'lucide-react';

interface TopOperatorBarProps {
  onOpenEdit: () => void;
  onOpenPrint: () => void;
  onOpenShare: () => void;
  onResetData: () => void;
  isModified: boolean;
}

export const TopOperatorBar: React.FC<TopOperatorBarProps> = ({
  onOpenEdit,
  onOpenPrint,
  onOpenShare,
  onResetData,
  isModified,
}) => {
  return (
    <div
      id="top-operator-bar"
      className="bg-slate-900 text-white px-3 sm:px-6 py-2.5 shadow-md border-b border-slate-800 print:hidden sticky top-0 z-40"
    >
      <div className="max-w-xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span id="operator-sppg-label" className="text-xs font-semibold text-slate-200">
            SPPG Wonomulyo Sidodadi
          </span>
          {isModified && (
            <span id="modified-status-badge" className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono border border-amber-500/30">
              Tersimpan
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="btn-kelola-menu"
            onClick={onOpenEdit}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
            title="Edit Menu & Kandungan Gizi"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Kelola Menu</span>
          </button>

          <button
            id="btn-cetak-label-qr"
            onClick={onOpenPrint}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer"
            title="Cetak Label Kontainer / Ompreng"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Label QR</span>
          </button>

          <button
            id="btn-share-qr"
            onClick={onOpenShare}
            className="p-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
            title="Tampilkan QR Scan untuk Siswa / Pengawas"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {isModified && (
            <button
              id="btn-reset-data"
              onClick={onResetData}
              className="p-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-200 transition cursor-pointer"
              title="Reset ke Menu Default Asli (mtufqh9h)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
