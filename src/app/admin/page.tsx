import React from 'react';
import { cookies } from 'next/headers';
import LoginForm from '@/components/admin/LoginForm';
import Dashboard from '@/components/admin/Dashboard';

export default function AdminPage() {
  const authCookie = cookies().get('admin_auth');
  const isAuthenticated = authCookie?.value === 'true';

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <LoginForm />
      </div>
    );
  }

  return <Dashboard />;
}
