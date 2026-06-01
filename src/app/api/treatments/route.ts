import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

function isAuthenticated() {
  const authCookie = cookies().get('admin_auth');
  return authCookie?.value === 'true';
}

export async function GET() {
  try {
    const treatments = await prisma.treatment.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(treatments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch treatments' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const treatment = await prisma.treatment.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        shortDesc: data.shortDesc,
        longDesc: data.longDesc,
        benefits: data.benefits || '',
        imageUrl: data.imageUrl || '',
      }
    });
    return NextResponse.json(treatment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create treatment' }, { status: 500 });
  }
}
