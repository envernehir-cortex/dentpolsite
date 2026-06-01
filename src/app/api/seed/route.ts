import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { makaleler } from '@/data/makaleler';
import trDict from '@/i18n/locales/tr.json';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 0. Clear existing data to guarantee clean re-seeding
    await prisma.article.deleteMany();
    await prisma.treatment.deleteMany();
    await prisma.galleryImage.deleteMany();

    // 1. Seed Articles
    let articlesCreated = 0;
    for (const makale of makaleler) {
      await prisma.article.create({
        data: {
          title: makale.title,
          slug: makale.slug,
          excerpt: makale.excerpt,
          content: makale.content,
          imageUrl: makale.imageUrl,
          category: makale.category,
          date: makale.date,
          tags: makale.tags ? makale.tags.join(',') : '',
        }
      });
      articlesCreated++;
    }

    // 2. Seed Treatments
    let treatmentsCreated = 0;
    const items = trDict.treatmentsPage.items;
    for (const item of items) {
      // Generate a slug from title
      const slug = item.title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // Dynamically check which image file exists in public/uploads for this slug
      let imageUrl = '';
      const extensions = ['jpg', 'png', 'jpeg', 'webp'];
      for (const ext of extensions) {
        const testPath = path.join(process.cwd(), 'public', 'uploads', `${slug}.${ext}`);
        if (fs.existsSync(testPath)) {
          imageUrl = `/uploads/${slug}.${ext}`;
          break;
        }
      }

      await prisma.treatment.create({
        data: {
          title: item.title,
          slug: slug,
          category: item.category,
          shortDesc: item.shortDesc,
          longDesc: item.longDesc,
          benefits: item.benefits ? item.benefits.join(',') : '',
          imageUrl: imageUrl || null, 
        }
      });
      treatmentsCreated++;
    }

    // 3. Seed Gallery Images
    let galleryCreated = 0;
    const galleryItems = [
      { title: "Klinik Görünüm 1", imageUrl: "/uploads/gallery-1.jpg", order: 1 },
      { title: "Klinik Görünüm 2", imageUrl: "/uploads/gallery-2.jpg", order: 2 },
      { title: "Klinik Görünüm 3", imageUrl: "/uploads/gallery-3.jpg", order: 3 },
      { title: "Klinik Görünüm 4", imageUrl: "/uploads/gallery-4.jpg", order: 4 },
      { title: "Klinik Görünüm 5", imageUrl: "/uploads/gallery-5.jpg", order: 5 },
    ];
    for (const item of galleryItems) {
      await prisma.galleryImage.create({
        data: item
      });
      galleryCreated++;
    }

    return NextResponse.json({
      message: 'Seeding completed successfully.',
      details: {
        articlesCreated,
        treatmentsCreated,
        galleryCreated,
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}


