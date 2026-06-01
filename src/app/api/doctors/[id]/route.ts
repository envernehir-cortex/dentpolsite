import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

function isAuthenticated() {
  const authCookie = cookies().get('admin_auth');
  return authCookie?.value === 'true';
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const doctor = await prisma.doctor.update({
      where: { id: params.id },
      data: {
        name: data.name,
        title: data.title,
        bio: data.bio,
        imageUrl: data.imageUrl || '',
        specialties: data.specialties || '',
        order: parseInt(data.order) || 0,
      }
    });
    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.doctor.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}
