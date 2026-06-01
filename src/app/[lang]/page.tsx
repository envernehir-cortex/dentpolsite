import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Features } from "@/components/home/Features";
import { ClinicGallery } from "@/components/home/ClinicGallery";
import { AppointmentForm } from "@/components/home/AppointmentForm";
import { Location } from "@/components/home/Location";
import { LatestArticles } from "@/components/home/LatestArticles";
import { Footer } from "@/components/layout/Footer";
import { getDictionary, Locale } from "@/i18n/dictionaries";
import { prisma } from "@/lib/prisma";

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang);
  
  const articles = await prisma.article.findMany({ take: 6, orderBy: { createdAt: 'desc' } });
  const treatments = await prisma.treatment.findMany({ orderBy: { createdAt: 'desc' } });
  const gallery = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } });

  return (
    <main className="min-h-screen bg-offWhite flex flex-col">
      <Navbar dict={dict.nav} currentLang={lang} />
      <Hero dict={dict.hero} lang={lang} />
      <ServicesGrid dict={dict.services} dbTreatments={treatments} />
      <Features dict={dict.features} />
      <AboutPreview dict={dict.about} />
      <ClinicGallery dict={dict.gallery} dbImages={gallery} />
      <AppointmentForm dict={dict.appointment} />
      <Location dict={dict.location} />
      <LatestArticles dict={dict.articles} currentLang={lang} dbArticles={articles} />
      <Footer dict={dict.footer} />
    </main>
  );
}
