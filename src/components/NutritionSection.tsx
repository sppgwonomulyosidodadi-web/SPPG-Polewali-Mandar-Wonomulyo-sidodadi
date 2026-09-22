import React from 'react';
import { Flame } from 'lucide-react';
import { MenuItemData } from '../types';

interface NutritionSectionProps {
  nutrition: MenuItemData['nutrition'];
}

export const NutritionSection: React.FC<NutritionSectionProps> = ({ nutrition }) => {
  return (
    <section
      id="mbg-nutrition-section"
      className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Flame className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <h3 id="nutrition-section-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Informasi Nilai Gizi
        </h3>
      </div>

      {/* Porsi Besar */}
      <div id="nutrition-porsi-besar" className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
            Porsi Besar
          </h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div id="porsi-besar-energi" className="p-3 bg-amber-50/60 rounded-lg border border-amber-100 text-center">
            <span className="text-[11px] text-amber-700 font-semibold block">
              Energi Total
            </span>
            <strong className="text-base sm:text-lg text-slate-900">
              {nutrition.porsiBesar.energiTotal}{' '}
              <span className="text-xs font-normal">Kkal</span>
            </strong>
          </div>

          <div id="porsi-besar-protein" className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-center">
            <span className="text-[11px] text-blue-700 font-semibold block">
              Protein
            </span>
            <strong className="text-base sm:text-lg text-slate-900">
              {nutrition.porsiBesar.protein}{' '}
              <span className="text-xs font-normal">g</span>
            </strong>
          </div>

          <div id="porsi-besar-lemak" className="p-3 bg-rose-50/60 rounded-lg border border-rose-100 text-center">
            <span className="text-[11px] text-rose-700 font-semibold block">
              Lemak
            </span>
            <strong className="text-base sm:text-lg text-slate-900">
              {nutrition.porsiBesar.lemak}{' '}
              <span className="text-xs font-normal">g</span>
            </strong>
          </div>

          <div id="porsi-besar-karbohidrat" className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 text-center">
            <span className="text-[11px] text-emerald-700 font-semibold block">
              Karbohidrat
            </span>
            <strong className="text-base sm:text-lg text-slate-900">
              {nutrition.porsiBesar.karbohidrat}{' '}
              <span className="text-xs font-normal">g</span>
            </strong>
          </div>

          <div id="porsi-besar-serat" className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 text-center">
            <span className="text-[11px] text-purple-700 font-semibold block">
              Serat Pangan
            </span>
            <strong className="text-base sm:text-lg text-slate-900">
              {nutrition.porsiBesar.seratPangan}{' '}
              <span className="text-xs font-normal">g</span>
            </strong>
          </div>
        </div>
      </div>

      {/* Porsi Kecil */}
      <div id="nutrition-porsi-kecil" className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">
            Porsi Kecil
          </h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div id="porsi-kecil-energi" className="p-3 bg-amber-50/60 rounded-lg border border-amber-100 text-center">
            <span className="text-[11px] text-amber-700 font-semibold block">
              Energi Total
            </span>
            <strong className="text-base sm:text-lg text-slate-900">
              {nutrition.porsiKecil.energiTotal}{' '}
              <span className="text-xs font-normal">Kkal</span>
            </strong>
          </div>

          <div id="porsi-kecil-protein" className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-center">
            <span className="text-[11px] text-blue-700 font-semibold block">
              Protein
            </span>
            <strong className="text-base sm:text-lg text-slate-900">
              {nutrition.porsiKecil.protein}{' '}
              <span className="text-xs font-normal">g</span>
            </strong>
          </div>

          <div id="porsi-kecil-lemak" className="p-3 bg-rose-50/60 rounded-lg border border-rose-100 text-center">
            <span className="text-[11px] text-rose-700 font-semibold block">
              Lemak
            </span>
            <strong className="text-base sm:text-lg text-slate-900">
              {nutrition.porsiKecil.lemak}{' '}
              <span className="text-xs font-normal">g</span>
            </strong>
          </div>

          <div id="porsi-kecil-karbohidrat" className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 text-center">
            <span className="text-[11px] text-emerald-700 font-semibold block">
              Karbohidrat
            </span>
            <strong className="text-base sm:text-lg text-slate-900">
              {nutrition.porsiKecil.karbohidrat}{' '}
              <span className="text-xs font-normal">g</span>
            </strong>
          </div>

          <div id="porsi-kecil-serat" className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 text-center">
            <span className="text-[11px] text-purple-700 font-semibold block">
              Serat Pangan
            </span>
            <strong className="text-base sm:text-lg text-slate-900">
              {nutrition.porsiKecil.seratPangan}{' '}
              <span className="text-xs font-normal">g</span>
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
};
