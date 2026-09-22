import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface MenuCompositionSectionProps {
  compositionList: string[];
}

export const MenuCompositionSection: React.FC<MenuCompositionSectionProps> = ({
  compositionList,
}) => {
  return (
    <section
      id="mbg-composition-section"
      className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-3"
    >
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="w-6 h-6 flex items-center justify-center text-emerald-600">
          <UtensilsCrossed className="w-5 h-5" />
        </div>
        <h3 id="composition-section-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Daftar Komposisi Menu
        </h3>
      </div>

      <ul id="composition-items-list" className="space-y-2">
        {compositionList.map((item, index) => (
          <li
            id={`composition-item-${index + 1}`}
            key={index}
            className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100/60"
          >
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5">
              {index + 1}
            </span>
            <span className="flex-1 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
