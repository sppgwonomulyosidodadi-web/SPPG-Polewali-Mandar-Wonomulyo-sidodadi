/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialMenuData } from './data/initialData';
import { MenuItemData } from './types';
import { HeaderSection } from './components/HeaderSection';
import { PhotoSection } from './components/PhotoSection';
import { MenuCompositionSection } from './components/MenuCompositionSection';
import { NutritionSection } from './components/NutritionSection';
import { ConsumptionSafetySection } from './components/ConsumptionSafetySection';
import { PolicyBannerSection } from './components/PolicyBannerSection';
import { ContactSection } from './components/ContactSection';
import { TopOperatorBar } from './components/TopOperatorBar';
import { EditMenuModal } from './components/EditMenuModal';
import { PrintLabelModal } from './components/PrintLabelModal';
import { ShareQrModal } from './components/ShareQrModal';

const STORAGE_KEY = 'mbg_menu_data_v1';

export default function App() {
  const [menuData, setMenuData] = useState<MenuItemData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load menu data from localStorage', e);
    }
    return initialMenuData;
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setIsModified(!!saved);
    } catch (e) {
      setIsModified(false);
    }
  }, [menuData]);

  const handleSaveMenu = (updatedData: MenuItemData) => {
    setMenuData(updatedData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      setIsModified(true);
    } catch (e) {
      console.error('Failed to save menu data to localStorage', e);
    }
  };

  const handleResetData = () => {
    setMenuData(initialMenuData);
    try {
      localStorage.removeItem(STORAGE_KEY);
      setIsModified(false);
    } catch (e) {
      console.error('Failed to clear localStorage', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top operator action bar */}
      <TopOperatorBar
        onOpenEdit={() => setIsEditOpen(true)}
        onOpenPrint={() => setIsPrintOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onResetData={handleResetData}
        isModified={isModified}
      />

      {/* Main MBG public information view matching labelmbg.web.id/m/mtufqh9h */}
      <main
        id="main-mbg-content"
        className="flex-1 py-6 px-4 sm:px-6 lg:px-8 text-slate-800 antialiased font-sans"
      >
        <div className="max-w-xl mx-auto space-y-5">
          {/* Header */}
          <HeaderSection data={menuData} />

          {/* Authentic Dish Photo Section */}
          <PhotoSection
            photoUrl={menuData.photoUrl}
            sppgName={menuData.sppgName}
          />

          {/* Menu Composition List */}
          <MenuCompositionSection
            compositionList={menuData.compositionList}
          />

          {/* Nutrition Facts */}
          <NutritionSection nutrition={menuData.nutrition} />

          {/* Safety & Consumption Deadline */}
          <ConsumptionSafetySection
            batasKonsumsi={menuData.batasKonsumsi}
          />

          {/* No Take-Home Policy Notice */}
          <PolicyBannerSection aturanKhusus={menuData.aturanKhusus} />

          {/* Contact and Complaint Box */}
          <ContactSection aduan={menuData.aduan} />

          {/* Footer branding note */}
          <div className="text-center pt-2 pb-6 text-slate-400 text-xs space-y-1">
            <p className="font-medium text-slate-500">
              Program Makan Bergizi Gratis (MBG) • Badan Gizi Nasional Republik Indonesia
            </p>
            <p className="text-[11px]">
              {menuData.sppgName}
            </p>
          </div>
        </div>
      </main>

      {/* Management & Printing Modals */}
      <EditMenuModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        data={menuData}
        onSave={handleSaveMenu}
        onReset={handleResetData}
      />

      <PrintLabelModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        data={menuData}
      />

      <ShareQrModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        data={menuData}
      />
    </div>
  );
}
