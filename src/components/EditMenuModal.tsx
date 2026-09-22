import React, { useState } from 'react';
import { X, Plus, Trash2, Save, Upload, RotateCcw } from 'lucide-react';
import { MenuItemData } from '../types';

interface EditMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MenuItemData;
  onSave: (updatedData: MenuItemData) => void;
  onReset: () => void;
}

export const EditMenuModal: React.FC<EditMenuModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<MenuItemData>(JSON.parse(JSON.stringify(data)));
  const [newMenuItem, setNewMenuItem] = useState('');

  if (!isOpen) return null;

  const handleAddMenuItem = () => {
    if (newMenuItem.trim()) {
      setFormData({
        ...formData,
        compositionList: [...formData.compositionList, newMenuItem.trim()],
      });
      setNewMenuItem('');
    }
  };

  const handleRemoveMenuItem = (index: number) => {
    setFormData({
      ...formData,
      compositionList: formData.compositionList.filter((_, i) => i !== index),
    });
  };

  const handleUpdateMenuItem = (index: number, val: string) => {
    const updated = [...formData.compositionList];
    updated[index] = val;
    setFormData({
      ...formData,
      compositionList: updated,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({
            ...formData,
            photoUrl: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Kelola Informasi Menu &amp; Nilai Gizi
            </h2>
            <p className="text-xs text-slate-500">
              Perbarui data sajian harian SPPG Wonomulyo Sidodadi
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs sm:text-sm">
          {/* General Information */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              Identitas SPPG &amp; Jadwal
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nama Satuan Pelayanan (SPPG)
                </label>
                <input
                  type="text"
                  value={formData.sppgName}
                  onChange={(e) => setFormData({ ...formData, sppgName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-800 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Tanggal Sajian
                </label>
                <input
                  type="text"
                  value={formData.dateFormatted}
                  onChange={(e) => setFormData({ ...formData, dateFormatted: e.target.value })}
                  placeholder="e.g. Selasa, 22 September 2026"
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-800 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Batas Waktu Konsumsi
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.batasKonsumsi.time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        batasKonsumsi: { ...formData.batasKonsumsi, time: e.target.value },
                      })
                    }
                    placeholder="11:00"
                    className="w-24 bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-800"
                    required
                  />
                  <input
                    type="text"
                    value={formData.batasKonsumsi.timezone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        batasKonsumsi: { ...formData.batasKonsumsi, timezone: e.target.value },
                      })
                    }
                    placeholder="WIB"
                    className="w-20 bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Ganti Foto Dokumentasi Sajian
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-md cursor-pointer text-xs font-semibold text-slate-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Pilih Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, photoUrl: '/menu-sample.jpg' })}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Pakai Foto Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Composition List */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              Daftar Komposisi Menu
            </h3>

            <div className="space-y-2">
              {formData.compositionList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateMenuItem(idx, e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-md px-3 py-1 text-slate-800"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMenuItem(idx)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md"
                    title="Hapus baris"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newMenuItem}
                  onChange={(e) => setNewMenuItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMenuItem();
                    }
                  }}
                  placeholder="Tambah menu baru (e.g. Sayur Bening Bayam)"
                  className="flex-1 bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-800"
                />
                <button
                  type="button"
                  onClick={handleAddMenuItem}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-500"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah</span>
                </button>
              </div>
            </div>
          </div>

          {/* Nutrition Values: Porsi Besar */}
          <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200 space-y-3">
            <h3 className="font-bold text-blue-900 text-xs uppercase tracking-wider">
              Kandungan Nilai Gizi - Porsi Besar
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Energi (Kkal)
                </label>
                <input
                  type="text"
                  value={formData.nutrition.porsiBesar.energiTotal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nutrition: {
                        ...formData.nutrition,
                        porsiBesar: { ...formData.nutrition.porsiBesar, energiTotal: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Protein (g)
                </label>
                <input
                  type="text"
                  value={formData.nutrition.porsiBesar.protein}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nutrition: {
                        ...formData.nutrition,
                        porsiBesar: { ...formData.nutrition.porsiBesar, protein: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Lemak (g)
                </label>
                <input
                  type="text"
                  value={formData.nutrition.porsiBesar.lemak}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nutrition: {
                        ...formData.nutrition,
                        porsiBesar: { ...formData.nutrition.porsiBesar, lemak: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Karbohidrat (g)
                </label>
                <input
                  type="text"
                  value={formData.nutrition.porsiBesar.karbohidrat}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nutrition: {
                        ...formData.nutrition,
                        porsiBesar: { ...formData.nutrition.porsiBesar, karbohidrat: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Serat (g)
                </label>
                <input
                  type="text"
                  value={formData.nutrition.porsiBesar.seratPangan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nutrition: {
                        ...formData.nutrition,
                        porsiBesar: { ...formData.nutrition.porsiBesar, seratPangan: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1"
                />
              </div>
            </div>
          </div>

          {/* Nutrition Values: Porsi Kecil */}
          <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200 space-y-3">
            <h3 className="font-bold text-emerald-900 text-xs uppercase tracking-wider">
              Kandungan Nilai Gizi - Porsi Kecil
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Energi (Kkal)
                </label>
                <input
                  type="text"
                  value={formData.nutrition.porsiKecil.energiTotal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nutrition: {
                        ...formData.nutrition,
                        porsiKecil: { ...formData.nutrition.porsiKecil, energiTotal: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Protein (g)
                </label>
                <input
                  type="text"
                  value={formData.nutrition.porsiKecil.protein}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nutrition: {
                        ...formData.nutrition,
                        porsiKecil: { ...formData.nutrition.porsiKecil, protein: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Lemak (g)
                </label>
                <input
                  type="text"
                  value={formData.nutrition.porsiKecil.lemak}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nutrition: {
                        ...formData.nutrition,
                        porsiKecil: { ...formData.nutrition.porsiKecil, lemak: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Karbohidrat (g)
                </label>
                <input
                  type="text"
                  value={formData.nutrition.porsiKecil.karbohidrat}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nutrition: {
                        ...formData.nutrition,
                        porsiKecil: { ...formData.nutrition.porsiKecil, karbohidrat: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Serat (g)
                </label>
                <input
                  type="text"
                  value={formData.nutrition.porsiKecil.seratPangan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nutrition: {
                        ...formData.nutrition,
                        porsiKecil: { ...formData.nutrition.porsiKecil, seratPangan: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1"
                />
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                if (confirm('Kembalikan ke data default awal (mtufqh9h)?')) {
                  onReset();
                  onClose();
                }
              }}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
