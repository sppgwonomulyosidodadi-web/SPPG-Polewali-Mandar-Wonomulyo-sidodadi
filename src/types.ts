export interface NutritionValues {
  energiTotal: string;
  protein: string;
  lemak: string;
  karbohidrat: string;
  seratPangan: string;
}

export interface MenuItemData {
  id: string;
  sppgName: string;
  programTitle: string;
  dateFormatted: string;
  dateIso: string;
  photoUrl: string;
  photoCaption: string;
  compositionList: string[];
  nutrition: {
    porsiBesar: NutritionValues;
    porsiKecil: NutritionValues;
  };
  batasKonsumsi: {
    time: string;
    timezone: string;
    warningText: string;
  };
  aturanKhusus: {
    title: string;
    description: string;
  };
  aduan: {
    whatsapp: string;
    whatsappUrl: string;
    email: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      tiktok: string;
    };
  };
}

export interface LabelPrintConfig {
  targetSekolah: string;
  porsiType: 'Porsi Besar' | 'Porsi Kecil' | 'Campur';
  waktuMasak: string;
  batchProduksi: string;
  copiesCount: number;
  layoutGrid: '1' | '4' | '6' | '8';
}
