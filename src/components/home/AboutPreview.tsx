"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Dictionary } from "@/i18n/dictionaries";

export const AboutPreview = ({ dict }: { dict: Dictionary["about"] }) => {
  return (
    <section className="py-24 bg-offWhite">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-[90%] mx-auto lg:ml-auto lg:mr-0"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative z-10">
              <img 
                src="/images/dtesranehir.png" 
                alt="Dt. Esra Nehir Altıçek"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-sage-light rounded-2xl z-0" />
            <div className="absolute top-12 -left-8 w-32 h-32 border-2 border-brand-green/20 rounded-full z-0" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-sage-light text-brand-dark text-sm font-medium mb-6">
              {dict.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6 leading-tight">
              {dict.title} <br />
              <span className="text-brand-green">{dict.titleHighlight}</span>
            </h2>
            <p className="text-lg text-charcoal/80 mb-8 leading-relaxed font-light">
              {dict.description}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {dict.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-brand-green shrink-0 mt-0.5" size={20} />
                  <span className="text-charcoal/90 font-medium text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline" size="lg">
              {dict.learnMore}
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
