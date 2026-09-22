import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { X, Printer, Settings2 } from 'lucide-react';
import { MenuItemData } from '../types';

interface PrintLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MenuItemData;
}

export const PrintLabelModal: React.FC<PrintLabelModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [targetSchool, setTargetSchool] = useState('SDN 01 Wonomulyo');
  const [porsiSelection, setPorsiSelection] = useState<'Semua' | 'Porsi Besar' | 'Porsi Kecil'>('Semua');
  const [gridCount, setGridCount] = useState<number>(4);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://labelmbg.web.id/m/' + data.id;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(
        currentUrl,
        {
          width: 140,
          margin: 1,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
        },
        (err, url) => {
          if (!err && url) {
            setQrDataUrl(url);
          }
        }
      );
    }
  }, [isOpen, currentUrl]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const labels = Array.from({ length: gridCount }, (_, i) => ({
    id: i,
    porsi:
      porsiSelection === 'Semua'
        ? i % 2 === 0
          ? 'Porsi Besar'
          : 'Porsi Kecil'
        : porsiSelection,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[95vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Printer className="w-5 h-5 text-emerald-600" />
              Cetak Label Makanan MBG
            </h2>
            <p className="text-xs text-slate-500">
              Stiker resmi untuk ditempel pada kotak makan/ompreng siswa
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Bar */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Nama Sekolah / Penerima
            </label>
            <input
              type="text"
              value={targetSchool}
              onChange={(e) => setTargetSchool(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="e.g. SDN 01 Wonomulyo"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Jenis Porsi
            </label>
            <select
              value={porsiSelection}
              onChange={(e) => setPorsiSelection(e.target.value as any)}
              className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="Semua">Campur (Besar &amp; Kecil)</option>
              <option value="Porsi Besar">Khusus Porsi Besar</option>
              <option value="Porsi Kecil">Khusus Porsi Kecil</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Jumlah Label per Halaman
            </label>
            <div className="flex gap-2">
              {[1, 2, 4, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGridCount(num)}
                  className={`flex-1 py-1.5 rounded-md font-medium border text-center transition ${
                    gridCount === num
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {num}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Printable Area Preview */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-100 rounded-xl border border-slate-200">
          <div
            id="printable-label-area"
            className={`grid gap-4 ${
              gridCount === 1
                ? 'grid-cols-1 max-w-md mx-auto'
                : gridCount === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {labels.map((item) => {
              const isPorsiBesar = item.porsi === 'Porsi Besar';
              const kalori = isPorsiBesar
                ? data.nutrition.porsiBesar.energiTotal
                : data.nutrition.porsiKecil.energiTotal;
              const protein = isPorsiBesar
                ? data.nutrition.porsiBesar.protein
                : data.nutrition.porsiKecil.protein;

              return (
                <div
                  key={item.id}
                  className="bg-white border-2 border-slate-800 rounded-xl p-3.5 shadow-sm text-slate-900 flex flex-col justify-between font-sans relative overflow-hidden"
                  style={{ breakInside: 'avoid' }}
                >
                  {/* Top Bar with Agency Header */}
                  <div className="flex items-center gap-2.5 border-b border-slate-200 pb-2 mb-2">
                    <img
                      src="/logo-halaman-informasi.png"
                      alt="Logo BGN"
                      className="w-10 h-10 object-contain flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider leading-tight">
                        Badan Gizi Nasional RI
                      </p>
                      <p className="text-[11px] font-extrabold text-slate-900 leading-tight">
                        {data.sppgName}
                      </p>
                      <p className="text-[9px] text-slate-500">
                        {data.dateFormatted}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                        isPorsiBesar
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {item.porsi}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="grid grid-cols-3 gap-2 items-center mb-2">
                    <div className="col-span-2 space-y-1">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase">
                        Tujuan: <span className="text-slate-900 font-bold">{targetSchool}</span>
                      </p>

                      <div className="text-[11px] text-slate-700 line-clamp-3">
                        <strong>Menu:</strong> {data.compositionList.slice(0, 4).join(', ')}
                        {data.compositionList.length > 4 ? '...' : ''}
                      </div>

                      <div className="flex items-center gap-3 pt-1 text-[10px]">
                        <span className="bg-amber-50 text-amber-800 font-bold px-1.5 py-0.5 rounded border border-amber-200">
                          {kalori} Kkal
                        </span>
                        <span className="bg-blue-50 text-blue-800 font-bold px-1.5 py-0.5 rounded border border-blue-200">
                          Prot {protein}g
                        </span>
                      </div>
                    </div>

                    {/* QR Code Container */}
                    <div className="flex flex-col items-center justify-center text-center">
                      {qrDataUrl && (
                        <img
                          src={qrDataUrl}
                          alt="QR Code"
                          className="w-18 h-18 object-contain border border-slate-200 rounded"
                        />
                      )}
                      <span className="text-[8px] font-bold text-slate-500 mt-0.5 uppercase tracking-tight">
                        Scan Info Gizi
                      </span>
                    </div>
                  </div>

                  {/* Warning Footer */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-1.5 text-center mt-auto">
                    <div className="text-[10px] font-extrabold text-red-700">
                      Wajib Dikonsumsi Sebelum {data.batasKonsumsi.time}{' '}
                      {data.batasKonsumsi.timezone}
                    </div>
                    <div className="text-[8px] text-red-600 font-medium">
                      Dilarang Membawa Pulang Makanan MBG • WA Aduan: 0811-1000-8008
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-4">
          <div className="text-xs text-slate-500">
            Tip: Gunakan opsi cetak browser &gt; Tata Letak Landscape/Portrait sesuai kebutuhan.
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              Kembali
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
