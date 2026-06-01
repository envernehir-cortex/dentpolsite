'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Treatment = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  benefits: string;
};

export default function TreatmentsManager() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Treatment | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      const res = await fetch('/api/treatments');
      const data = await res.json();
      setTreatments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu tedaviyi silmek istediğinize emin misiniz?')) return;
    
    try {
      await fetch(`/api/treatments/${id}`, { method: 'DELETE' });
      setTreatments(treatments.filter(t => t.id !== id));
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
      const url = isCreating ? '/api/treatments' : `/api/treatments/${editingItem.id}`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemToSave),
      });

      if (res.ok) {
        setIsCreating(false);
        setEditingItem(null);
        setSelectedFile(null);
        fetchTreatments();
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
            {isCreating ? 'Yeni Tedavi Ekle' : 'Tedaviyi Düzenle'}
          </h2>
          <button 
            onClick={() => { setEditingItem(null); setIsCreating(false); }}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Başlık</label>
              <input
                required
                type="text"
                value={editingItem?.title || ''}
                onChange={e => setEditingItem({...editingItem!, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">SEO URL (Slug) <span className="font-normal text-xs text-slate-400">- örn: implant-tedavisi</span></label>
              <input
                required
                type="text"
                value={editingItem?.slug || ''}
                onChange={e => setEditingItem({...editingItem!, slug: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori <span className="font-normal text-xs text-slate-400">- Örn: Cerrahi, Ortodonti</span></label>
              <input
                required
                type="text"
                value={editingItem?.category || ''}
                onChange={e => setEditingItem({...editingItem!, category: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kısa Açıklama (Özet)</label>
              <textarea
                required
                rows={2}
                value={editingItem?.shortDesc || ''}
                onChange={e => setEditingItem({...editingItem!, shortDesc: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green outline-none resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Uzun Açıklama (HTML destekler)</label>
              <textarea
                required
                rows={6}
                value={editingItem?.longDesc || ''}
                onChange={e => setEditingItem({...editingItem!, longDesc: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Avantajlar <span className="font-normal text-xs text-slate-400">- Virgül ile ayırın (Örn: Kalıcı, Doğal, Acısız)</span></label>
              <input
                type="text"
                value={editingItem?.benefits || ''}
                onChange={e => setEditingItem({...editingItem!, benefits: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green outline-none"
              />
            </div>
            <div className="md:col-span-2 border border-slate-200 p-4 rounded-xl">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tedavi Görseli Yükle (İsteğe Bağlı)</label>
              
              {(editingItem as any)?.imageUrl && !selectedFile && (
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2">Mevcut Görsel:</p>
                  <img src={(editingItem as any).imageUrl} alt="Current" className="h-24 rounded-lg object-cover" />
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
          <h1 className="text-3xl font-bold text-slate-800">Tedaviler</h1>
          <p className="text-slate-500 mt-1">Sitenizdeki tedavi hizmetlerini buradan yönetebilirsiniz.</p>
        </div>
        <Button 
          onClick={() => {
            setIsCreating(true);
            setEditingItem({ id: '', title: '', slug: '', category: '', shortDesc: '', longDesc: '', benefits: '' });
          }}
          className="flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Tedavi Ekle
        </Button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-slate-600">
              <th className="p-4 pl-6">Başlık</th>
              <th className="p-4 hidden md:table-cell">Kategori</th>
              <th className="p-4 hidden md:table-cell">Özet</th>
              <th className="p-4 pr-6 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {treatments.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">Henüz tedavi eklenmemiş.</td>
              </tr>
            ) : (
              treatments.map(item => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6 font-medium text-slate-800">{item.title}</td>
                  <td className="p-4 hidden md:table-cell text-slate-600">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 hidden md:table-cell text-slate-500 text-sm max-w-xs truncate">{item.shortDesc}</td>
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
