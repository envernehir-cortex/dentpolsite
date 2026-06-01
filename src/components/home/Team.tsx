"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export const Team = () => {
  const team = [
    {
      name: "Dt. Esra Nehir Altıçek",
      role: "Kurucu Hekim",
      specialties: ["Estetik Diş Hekimliği", "Protetik Diş Tedavisi", "Gülüş Tasarımı"],
      img: "https://images.unsplash.com/photo-1594824432258-f7ebf89f28d4?q=80&w=800&auto=format&fit=crop",
      bio: "10 yılı aşkın tecrübesiyle estetik diş hekimliği ve protetik tedavilerde binlerce hastasına özgüvenli gülüşler kazandırmıştır."
    },
    {
      name: "Dt. Zeynep İrem Kurt",
      role: "Diş Hekimi",
      specialties: ["Endodonti", "Pedodonti", "Genel Diş Hekimliği"],
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
      bio: "Özellikle çocuk diş hekimliği ve kanal tedavisi alanında hasta konforunu ön planda tutan güncel tedavi yaklaşımları uygulamaktadır."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
            Uzman Hekim Kadromuz
          </h2>
          <p className="text-charcoal/70 text-lg font-light">
            Alanında deneyimli, yenilikleri takip eden ve hasta konforunu merkeze alan hekimlerimiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((doctor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-64 h-64 mb-6 rounded-full p-2 border-2 border-sage-light group-hover:border-brand-green transition-colors duration-500">
                <img 
                  src={doctor.img} 
                  alt={doctor.name}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-2 rounded-full bg-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">{doctor.name}</h3>
              <p className="text-brand-green font-medium mb-4">{doctor.role}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {doctor.specialties.map(spec => (
                  <span key={spec} className="px-3 py-1 bg-offWhite border border-border/50 rounded-full text-xs text-charcoal/80 font-medium">
                    {spec}
                  </span>
                ))}
              </div>
              
              <p className="text-charcoal/70 text-sm leading-relaxed max-w-sm mb-4">
                {doctor.bio}
              </p>

              <button className="text-charcoal/40 hover:text-[#0A66C2] transition-colors">
                <Linkedin size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
