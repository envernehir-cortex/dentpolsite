"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dictionary } from "@/i18n/dictionaries";

export const Location = ({ dict }: { dict: Dictionary["location"] }) => {
  const encodedAddress = encodeURIComponent(dict.addressValue);
  
  return (
    <section className="py-24 bg-sage-light/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
            {dict.title}
          </h2>
          <p className="text-charcoal/70 text-lg font-light">
            {dict.subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch bg-white rounded-3xl overflow-hidden shadow-xl border border-border/50">
          {/* Contact Info */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
            <h4 className="text-2xl font-bold text-brand-dark mb-6">{dict.howToGetThereTitle}</h4>
                
                <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 mb-5 flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-bold text-sm">i</span>
                  </div>
                  <p className="text-charcoal/75 text-[13px] leading-relaxed">
                    {dict.tramInfo}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {[
                    { no: "36", color: "black", route: "Keskin Mh. ⇄ Y. Emre Hast." },
                    { no: "53", color: "black", route: "Uludere Mh. ⇄ Y. Emre Hast." },
                    { no: "5",  color: "black", route: "Yaşamkent ⇄ Odunpazarı" },
                    { no: "74", color: "black", route: "Yaşamkent ⇄ Y. Emre Hast." },
                    { no: "16", color: "blue",  route: "Yaşamkent ⇄ Yenikent" },
                  ].map((bus) => (
                    <div key={bus.no} className="flex items-center gap-3 bg-gray-50/80 p-2.5 rounded-xl border border-gray-100 hover:border-brand-green/30 transition-colors">
                      <div className={`w-9 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs shrink-0 ${bus.color === 'black' ? 'bg-[#1a1a1a]' : 'bg-blue-600'}`}>
                        {bus.no}
                      </div>
                      <span className="text-charcoal/80 font-medium text-[13px] leading-tight">
                        {bus.route}
                      </span>
                    </div>
                  ))}
                </div>

                <a 
                  href="https://www.eskisehir.bel.tr/ulasim-hizmetleri-otobus-saatleri-guzergah-get.php?otobus_guzergah_id=1196&menu_id=57" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:text-brand-green/80 transition-colors mb-10"
                >
                  Otobüs Saatleri ve Güzergah Detayları <ExternalLink size={14} />
                </a>
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-auto"
            >
              <Button size="lg" className="w-full flex items-center gap-2">
                {dict.directions}
                <ExternalLink size={18} />
              </Button>
            </a>
          </div>

          {/* Map */}
          <div className="flex-1 min-h-[300px] md:min-h-0 relative bg-gray-100">
            <iframe
              title="Dentpol Konum"
              src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
