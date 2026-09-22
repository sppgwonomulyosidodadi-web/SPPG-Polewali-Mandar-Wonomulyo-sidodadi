import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { MenuItemData } from '../types';

interface ConsumptionSafetySectionProps {
  batasKonsumsi: MenuItemData['batasKonsumsi'];
}

export const ConsumptionSafetySection: React.FC<ConsumptionSafetySectionProps> = ({
  batasKonsumsi,
}) => {
  return (
    <section
      id="mbg-safety-deadline-section"
      className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 shadow-sm border border-red-200"
    >
      <div className="flex items-center justify-between gap-2 mb-2 text-red-700">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 flex-shrink-0" />
          <h3 id="safety-deadline-heading" className="text-xs sm:text-sm font-bold uppercase tracking-wide">
            Batas Aman Konsumsi Makanan
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center mt-2">
        <div id="safety-deadline-card" className="bg-white/80 p-2.5 rounded-lg border border-red-100 shadow-2xs">
          <span className="text-[11px] text-red-600 font-semibold block">
            Wajib Dikonsumsi Sebelum
          </span>
          <strong id="safety-deadline-time" className="text-sm sm:text-base text-red-700">
            {batasKonsumsi.time} {batasKonsumsi.timezone}
          </strong>
        </div>

        <div id="safety-hygiene-badge" className="bg-white/80 p-2.5 rounded-lg border border-red-100 shadow-2xs flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-700">
            Kualitas Terjamin &amp; Higienis
          </span>
        </div>
      </div>

      <p id="safety-warning-text" className="text-[11px] text-slate-600 mt-2 text-center">
        {batasKonsumsi.warningText}
      </p>
    </section>
  );
};
