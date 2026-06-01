'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type GalleryImage = {
  id: string;
  title: string;
  imageUrl: string;
  order: number;
};

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu görseli silmek istediğinize emin misiniz?')) return;
    
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      setImages(images.filter(d => d.id !== id));
    } catch (err) {
      alert('Silinirken hata oluştu.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isCreating && !selectedFile) {
      alert('Lütfen bir görsel seçin.');
      return;
    }

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
      const url = isCreating ? '/api/gallery' : `/api/gallery/${editingItem.id}`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemToSave),
      });

      if (res.ok) {
        setIsCreating(false);
        setEditingItem(null);
        setSelectedFile(null);
        fetchImages();
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
            {isCreating ? 'Yeni Görsel Ekle' : 'Görseli Düzenle'}
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Başlık (İsteğe Bağlı)</label>
              <input
                type="text"
                value={editingItem?.title || ''}
                onChange={e => setEditingItem({...editingItem!, title: e.target.value})}
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Galeri Görseli Yükle</label>
              
              {(editingItem as any)?.imageUrl && !selectedFile && (
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2">Mevcut Görsel:</p>
                  <img src={(editingItem as any).imageUrl} alt="Current" className="h-32 rounded-lg object-cover" />
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
          <h1 className="text-3xl font-bold text-slate-800">Klinik Galerisi</h1>
          <p className="text-slate-500 mt-1">Klinik fotoğraflarını buradan ekleyip düzenleyebilirsiniz.</p>
        </div>
        <Button 
          onClick={() => {
            setIsCreating(true);
            setEditingItem({ id: '', title: '', imageUrl: '', order: 0 });
          }}
          className="flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Görsel Ekle
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="h-40 relative bg-gray-100">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-white text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-full shadow-lg transition-colors"
                >
                  <Edit2 size={14} /> Düzenle
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-white text-sm font-medium text-red-600 hover:bg-red-50 rounded-full shadow-lg transition-colors"
                >
                  <Trash2 size={14} /> Sil
                </button>
              </div>
            </div>
            {item.title && (
              <div className="p-3 text-center text-sm font-medium text-slate-700 truncate">
                {item.title}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="p-12 text-center text-slate-500 bg-white rounded-3xl border border-gray-100 shadow-sm">
          Henüz galeriye görsel eklenmemiş.
        </div>
      )}
    </div>
  );
}
