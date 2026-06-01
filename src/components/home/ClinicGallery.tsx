"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Dictionary } from "@/i18n/dictionaries";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    alt: "Klinik Giriş",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
    alt: "Tedavi Odası",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop",
    alt: "Modern Ekipmanlar",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1598256989800-fea5ce5146c1?q=80&w=800&auto=format&fit=crop",
    alt: "Sterilizasyon",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
    alt: "Bekleme Alanı",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=800&auto=format&fit=crop",
    alt: "Ekip",
    span: "col-span-2 row-span-1",
  },
];

export const ClinicGallery = ({ dict, dbImages }: { dict: Dictionary["gallery"], dbImages?: any[] }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const defaultSpans = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
  ];

  const displayImages = dbImages && dbImages.length > 0 
    ? dbImages.map((img, idx) => ({
        src: img.imageUrl,
        alt: img.title || "Klinik Görseli",
        span: defaultSpans[idx % defaultSpans.length]
      }))
    : galleryImages;

  const prev = () =>
    setLightbox((l) => (l !== null ? (l - 1 + displayImages.length) % displayImages.length : null));
  const next = () =>
    setLightbox((l) => (l !== null ? (l + 1) % displayImages.length : null));

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green font-medium text-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            {dict.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {dict.title}{" "}
            <span className="text-brand-green">{dict.titleHighlight}</span>
          </h2>
          <p className="text-charcoal/65 text-lg font-light">{dict.subtitle}</p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-3 h-[560px]">
          {displayImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className={`${img.span} relative overflow-hidden rounded-2xl group cursor-pointer`}
              onClick={() => setLightbox(idx)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/35 transition-all duration-400" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <ZoomIn size={20} className="text-charcoal" />
                </div>
              </div>
              {/* Alt yazı */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-charcoal/70 to-transparent">
                <p className="text-white text-sm font-semibold">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10"
            >
              <X size={22} className="text-white" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft size={26} className="text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl max-h-[85vh] mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={displayImages[lightbox].src}
                alt={displayImages[lightbox].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
              <p className="text-white/70 text-center mt-4 text-sm font-medium">
                {displayImages[lightbox].alt} &nbsp;·&nbsp; {lightbox + 1} / {displayImages.length}
              </p>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight size={26} className="text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
