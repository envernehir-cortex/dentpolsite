import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getDictionary, Locale } from "@/i18n/dictionaries";
import { MakaleDetayClient } from "./MakaleDetayClient";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(
  { params }: { params: { lang: Locale; slug: string } }
): Promise<Metadata> {
  const makale = await prisma.article.findUnique({ where: { slug: params.slug } });
  if (!makale) return {};
  return {
    title: `${makale.title} | Dentpol Söğütönü`,
    description: makale.excerpt,
    openGraph: {
      title: makale.title,
      description: makale.excerpt,
      images: [{ url: makale.imageUrl }],
      type: "article",
      publishedTime: makale.date,
      authors: makale.author ? [makale.author] : undefined,
      tags: makale.tags ? makale.tags.split(',') : undefined,
    },
  };
}

export default async function MakaleDetayPage({ params }: { params: { lang: Locale; slug: string } }) {
  const makale = await prisma.article.findUnique({ where: { slug: params.slug } });
  if (!makale) notFound();

  const diger = await prisma.article.findMany({
    where: { slug: { not: params.slug } },
    take: 2,
    orderBy: { createdAt: 'desc' }
  });
  const dict = getDictionary(params.lang);

  return (
    <MakaleDetayClient
      makale={makale}
      diger={diger}
      lang={params.lang}
      dict={dict}
    />
  );
}
