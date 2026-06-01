import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

function isAuthenticated() {
  const authCookie = cookies().get('admin_auth');
  return authCookie?.value === 'true';
}

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const image = await prisma.galleryImage.create({
      data: {
        title: data.title || '',
        imageUrl: data.imageUrl,
        order: parseInt(data.order) || 0,
      }
    });
    return NextResponse.json(image);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 });
  }
}
