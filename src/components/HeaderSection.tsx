import React from 'react';
import { Calendar } from 'lucide-react';
import { MenuItemData } from '../types';

interface HeaderSectionProps {
  data: MenuItemData;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ data }) => {
  return (
    <header
      id="mbg-header-card"
      className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 text-center relative overflow-hidden"
    >
      {/* Top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500"></div>

      {/* Brand & Agency Header */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <img
          id="bgn-logo-img"
          src="/logo-halaman-informasi.png"
          alt="Logo BGN"
          className="w-14 h-14 object-contain flex-shrink-0"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />
        <div className="text-left">
          <p className="text-sm font-bold text-blue-700 uppercase tracking-wide leading-tight">
            {data.programTitle}
          </p>
          <p className="text-base font-extrabold text-slate-900 leading-tight mt-1">
            {data.sppgName}
          </p>
        </div>
      </div>

      {/* Main Title */}
      <h1 id="mbg-title-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
        Informasi Menu MBG
      </h1>

      {/* Date Pill */}
      <h2
        id="mbg-date-pill"
        className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-emerald-50 text-emerald-800 text-sm font-semibold rounded-full border border-emerald-200"
      >
        <Calendar className="w-4 h-4 text-emerald-600" />
        <span>Tanggal: {data.dateFormatted}</span>
      </h2>
    </header>
  );
};
