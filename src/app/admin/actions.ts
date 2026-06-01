'use server';

import { cookies } from 'next/headers';

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
  
  if (password === adminPassword) {
    cookies().set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return { success: true };
  }
  
  return { success: false, error: 'Şifre hatalı' };
}

export async function logout() {
  cookies().delete('admin_auth');
}
