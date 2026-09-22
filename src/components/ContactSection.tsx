import React from 'react';
import { Mail, MessageCircle, Globe } from 'lucide-react';
import { MenuItemData } from '../types';

interface ContactSectionProps {
  aduan: MenuItemData['aduan'];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ aduan }) => {
  return (
    <section
      id="mbg-complaints-section"
      className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-3.5"
    >
      <div className="border-b border-slate-100 pb-2.5 flex items-center justify-between">
        <h3 id="complaints-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Kotak Aduan
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* WhatsApp */}
        <a
          id="link-whatsapp-aduan"
          href={aduan.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 hover:bg-emerald-100/70 transition text-slate-800 group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
              WhatsApp Aduan
            </span>
            <span className="text-xs font-semibold text-slate-900 truncate block">
              {aduan.whatsapp}
            </span>
          </div>
        </a>

        {/* Email */}
        <a
          id="link-email-layanan"
          href={`mailto:${aduan.email}`}
          className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/70 border border-blue-200 hover:bg-blue-100/70 transition text-slate-800 group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Mail className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
              Email Layanan
            </span>
            <span className="text-xs font-semibold text-slate-900 truncate block">
              {aduan.email}
            </span>
          </div>
        </a>
      </div>

      {/* Social Media */}
      <div className="pt-2 border-t border-slate-100">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
          Media Sosial Resmi:
        </span>
        <div className="grid grid-cols-3 gap-2">
          <a
            id="link-social-facebook"
            href={aduan.socialMedia.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition text-xs font-medium text-slate-700"
          >
            <span className="font-bold text-blue-600">f</span>
            <span>Facebook</span>
          </a>

          <a
            id="link-social-instagram"
            href={aduan.socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition text-xs font-medium text-slate-700"
          >
            <span className="font-bold text-pink-600">IG</span>
            <span>Instagram</span>
          </a>

          <a
            id="link-social-tiktok"
            href={aduan.socialMedia.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition text-xs font-medium text-slate-700"
          >
            <span className="font-bold text-slate-900">TT</span>
            <span>TikTok</span>
          </a>
        </div>
      </div>
    </section>
  );
};
