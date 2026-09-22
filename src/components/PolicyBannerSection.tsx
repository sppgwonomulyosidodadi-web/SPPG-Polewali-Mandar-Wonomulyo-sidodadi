import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { MenuItemData } from '../types';

interface PolicyBannerSectionProps {
  aturanKhusus: MenuItemData['aturanKhusus'];
}

export const PolicyBannerSection: React.FC<PolicyBannerSectionProps> = ({ aturanKhusus }) => {
  return (
    <section
      id="mbg-no-takehome-banner"
      className="bg-red-600 text-white rounded-xl p-4 shadow-sm flex items-center gap-3.5 border border-red-700"
    >
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
        <AlertTriangle className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 id="no-takehome-title" className="text-xs sm:text-sm font-extrabold uppercase tracking-wide">
          {aturanKhusus.title}
        </h3>
        <p id="no-takehome-desc" className="text-[11px] sm:text-xs text-red-100 mt-0.5 leading-snug">
          {aturanKhusus.description}
        </p>
      </div>
    </section>
  );
};
