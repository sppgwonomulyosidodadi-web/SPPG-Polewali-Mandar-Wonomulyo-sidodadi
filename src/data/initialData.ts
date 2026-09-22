import { MenuItemData } from '../types';

export const initialMenuData: MenuItemData = {
  id: 'mtufqh9h',
  sppgName: 'SPPG Polewali Mandar Wonomulyo Sidodadi',
  programTitle: 'Program Makan Bergizi Gratis',
  dateFormatted: 'Selasa, 22 September 2026',
  dateIso: '2026-09-22',
  photoUrl: '/menu-sample.jpg',
  photoCaption: 'Dokumentasi menu hidangan SPPG Polewali Mandar Wonomulyo Sidodadi',
  compositionList: [
    'Nasi Putih',
    'Ikan kembung goreng bumbu kecap',
    'Oseng tahu',
    'Lalapan timun, kemangi',
    'Buah Pisang',
  ],
  nutrition: {
    porsiBesar: {
      energiTotal: '601,3',
      protein: '29,3',
      lemak: '9,6',
      karbohidrat: '102,8',
      seratPangan: '1,7',
    },
    porsiKecil: {
      energiTotal: '407,6',
      protein: '23,8',
      lemak: '8,4',
      karbohidrat: '62,3',
      seratPangan: '1,5',
    },
  },
  batasKonsumsi: {
    time: '11:00',
    timezone: 'WIB',
    warningText: '⚠️ Makanan disarankan dikonsumsi maksimal 2 jam setelah diterima demi menjaga mutu dan higienitas.',
  },
  aturanKhusus: {
    title: 'Dilarang Membawa Pulang Makanan MBG',
    description: 'Makanan program Makan Bergizi Gratis wajib dikonsumsi langsung di tempat demi menjaga kualitas dan keamanan pangan.',
  },
  aduan: {
    whatsapp: '0811-1000-8008',
    whatsappUrl: 'https://api.whatsapp.com/send/?phone=6281110008008&text&type=phone_number&app_absent=0',
    email: 'halo@bgn.go.id',
    socialMedia: {
      facebook: 'https://www.facebook.com/profile.php?id=61571105639452',
      instagram: 'https://www.instagram.com/badangizinasional.ri',
      tiktok: 'https://www.tiktok.com/@badangizinasional.ri',
    },
  },
};
