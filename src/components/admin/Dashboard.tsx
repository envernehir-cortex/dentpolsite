'use client';

import React, { useState } from 'react';
import { LayoutDashboard, FileText, ActivitySquare, Users, Image as ImageIcon, LogOut } from 'lucide-react';
import { logout } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';
import ArticlesManager from './ArticlesManager';
import TreatmentsManager from './TreatmentsManager';
import DoctorsManager from './DoctorsManager';
import GalleryManager from './GalleryManager';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'articles' | 'treatments' | 'doctors' | 'gallery'>('articles');
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-green text-white rounded-xl flex items-center justify-center">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Dentpol</h2>
            <p className="text-xs text-slate-500 font-medium">Yönetim Paneli</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('articles')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'articles' 
                ? 'bg-brand-green/10 text-brand-green' 
                : 'text-slate-600 hover:bg-gray-100'
            }`}
          >
            <FileText size={20} />
            Makaleler
          </button>
          
          <button
            onClick={() => setActiveTab('treatments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'treatments' 
                ? 'bg-brand-green/10 text-brand-green' 
                : 'text-slate-600 hover:bg-gray-100'
            }`}
          >
            <ActivitySquare size={20} />
            Tedaviler
          </button>
          
          <button
            onClick={() => setActiveTab('doctors')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'doctors' 
                ? 'bg-brand-green/10 text-brand-green' 
                : 'text-slate-600 hover:bg-gray-100'
            }`}
          >
            <Users size={20} />
            Hekimlerimiz
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'gallery' 
                ? 'bg-brand-green/10 text-brand-green' 
                : 'text-slate-600 hover:bg-gray-100'
            }`}
          >
            <ImageIcon size={20} />
            Klinik Galerisi
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
        {activeTab === 'articles' && <ArticlesManager />}
        {activeTab === 'treatments' && <TreatmentsManager />}
        {activeTab === 'doctors' && <DoctorsManager />}
        {activeTab === 'gallery' && <GalleryManager />}
      </main>
    </div>
  );
}
