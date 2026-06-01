import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

function isAuthenticated() {
  const authCookie = cookies().get('admin_auth');
  return authCookie?.value === 'true';
}

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const doctor = await prisma.doctor.create({
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
    console.error(error);
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}
