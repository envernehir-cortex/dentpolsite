'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Doctor = {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  specialties: string;
  order: number;
};

export default function DoctorsManager() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Doctor | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors');
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu doktoru silmek istediğinize emin misiniz?')) return;
    
    try {
      await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
      setDoctors(doctors.filter(d => d.id !== id));
    } catch (err) {
      alert('Silinirken hata oluştu.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setUploading(true);
    let finalImageUrl = (editingItem as any).imageUrl || '';

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.url;
        } else {
          alert('Görsel yüklenirken hata oluştu.');
          setUploading(false);
          return;
        }
      }

      const itemToSave = { ...editingItem, imageUrl: finalImageUrl };

      const method = isCreating ? 'POST' : 'PUT';
      const url = isCreating ? '/api/doctors' : `/api/doctors/${editingItem.id}`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemToSave),
      });

      if (res.ok) {
        setIsCreating(false);
        setEditingItem(null);
        setSelectedFile(null);
        fetchDoctors();
      } else {
        alert('Kaydedilirken hata oluştu.');
      }
    } catch (err) {
      alert('Bir hata oluştu.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  if (editingItem || isCreating) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            {isCreating ? 'Yeni Hekim Ekle' : 'Hekim Düzenle'}
          </h2>
          <button 
            onClick={() => { setEditingItem(null); setIsCreating(false); setSelectedFile(null); }}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Ad Soyad <span className="font-normal text-xs text-slate-400">- Örn: Dt. Esra Nehir</span></label>
              <input
                required
                type="text"
                value={editingItem?.name || ''}
                onChange={e => setEditingItem({...editingItem!, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Unvan / Rol <span className="font-normal text-xs text-slate-400">- Örn: Ortodonti Uzmanı</span></label>
              <input
                required
                type="text"
                value={editingItem?.title || ''}
                onChange={e => setEditingItem({...editingItem!, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Uzmanlık Alanları <span className="font-normal text-xs text-slate-400">- Virgül ile ayırın (Örn: İmplant, Pedodonti)</span></label>
              <input
                type="text"
                value={editingItem?.specialties || ''}
                onChange={e => setEditingItem({...editingItem!, specialties: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Özgeçmiş (Biyografi)</label>
              <textarea
                required
                rows={4}
                value={editingItem?.bio || ''}
                onChange={e => setEditingItem({...editingItem!, bio: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Sıralama (Küçük sayı önce çıkar)</label>
              <input
                required
                type="number"
                value={editingItem?.order || 0}
                onChange={e => setEditingItem({...editingItem!, order: parseInt(e.target.value)})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green outline-none"
              />
            </div>
            <div className="md:col-span-2 border border-slate-200 p-4 rounded-xl">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Hekim Fotoğrafı Yükle</label>
              
              {(editingItem as any)?.imageUrl && !selectedFile && (
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2">Mevcut Görsel:</p>
                  <img src={(editingItem as any).imageUrl} alt="Current" className="h-24 w-24 rounded-full object-cover" />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-green/10 file:text-brand-green hover:file:bg-brand-green/20"
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={uploading} className="flex items-center gap-2 px-8 py-3">
              <Check size={18} /> {uploading ? 'Yükleniyor...' : 'Kaydet'}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Hekimlerimiz</h1>
          <p className="text-slate-500 mt-1">Klinikteki doktorları buradan ekleyip düzenleyebilirsiniz.</p>
        </div>
        <Button 
          onClick={() => {
            setIsCreating(true);
            setEditingItem({ id: '', name: '', title: '', bio: '', imageUrl: '', specialties: '', order: 0 });
          }}
          className="flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Hekim Ekle
        </Button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-slate-600">
              <th className="p-4 pl-6">Fotoğraf</th>
              <th className="p-4">Ad Soyad</th>
              <th className="p-4 hidden md:table-cell">Unvan</th>
              <th className="p-4 pr-6 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">Henüz hekim eklenmemiş.</td>
              </tr>
            ) : (
              doctors.map(item => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">Yok</div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-slate-800">{item.name}</td>
                  <td className="p-4 hidden md:table-cell text-slate-600">{item.title}</td>
                  <td className="p-4 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setEditingItem(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit2 size={14} /> Düzenle
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} /> Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
