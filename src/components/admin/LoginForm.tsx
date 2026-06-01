'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/admin/actions';
import { Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(password);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.error || 'Giriş başarısız');
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-4">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 text-center">Dentpol Admin</h1>
        <p className="text-slate-500 text-sm mt-2 text-center">İçerik yönetim paneline hoş geldiniz.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Yönetici Şifresi</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock size={18} />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all"
              placeholder="Şifrenizi girin..."
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
        </div>

        <Button type="submit" disabled={loading} className="w-full py-3 text-base shadow-lg">
          {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </Button>
      </form>
    </div>
  );
}
