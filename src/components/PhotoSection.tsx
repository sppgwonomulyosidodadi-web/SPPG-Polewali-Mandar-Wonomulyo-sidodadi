import React, { useState } from 'react';
import { Maximize } from 'lucide-react';
import { LightboxModal } from './LightboxModal';

interface PhotoSectionProps {
  photoUrl: string;
  sppgName: string;
}

export const PhotoSection: React.FC<PhotoSectionProps> = ({ photoUrl, sppgName }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const altText = `Dokumentasi menu hidangan ${sppgName}`;

  return (
    <>
      <section
        id="mbg-photo-section"
        className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 overflow-hidden space-y-3"
      >
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 id="photo-section-heading" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Dokumentasi Sajian Makanan
            </h3>
            <p className="text-[11px] text-slate-400">
              Foto autentik porsi hidangan dari dapur SPPG
            </p>
          </div>
        </div>

        <div
          id="btn-open-photo-lightbox"
          onClick={() => setIsLightboxOpen(true)}
          className="relative w-full aspect-[3/4] max-h-[560px] rounded-lg overflow-hidden border border-slate-100 bg-slate-900/5 cursor-pointer group select-none"
          title="Klik foto untuk melihat ukuran penuh"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsLightboxOpen(true);
            }
          }}
        >
          <img
            id="dish-authentic-image"
            src={photoUrl}
            alt={altText}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== window.location.origin + '/menu-sample.jpg') {
                target.src = '/menu-sample.jpg';
              }
            }}
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs shadow-md">
              <Maximize className="w-3.5 h-3.5" />
              <span>Lihat Ukuran Penuh</span>
            </span>
          </div>
        </div>
      </section>

      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={photoUrl}
        altText={altText}
      />
    </>
  );
};
