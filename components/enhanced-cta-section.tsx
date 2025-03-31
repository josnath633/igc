"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  DollarSign,
  ArrowRight,
  HandIcon as PrayingHands,
  HandHeart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EnhancedCtaSection() {
  const [hoverPrayer, setHoverPrayer] = useState(false);
  const [hoverDonation, setHoverDonation] = useState(false);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#FF4500]/5 blur-3xl"></div>

      {/* Circular border element inspired by the logo's circular border */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#FFD700]/10 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Participez à Notre Mission
          </h2>{" "}
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-[#FF4500] mx-auto mt-6 rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Rejoignez-nous dans notre mission divine et contribuez à l'impact
            global pour Christ à travers la prière et le soutien.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Besoin de Prière */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden shadow-xl h-full"
            onMouseEnter={() => setHoverPrayer(true)}
            onMouseLeave={() => setHoverPrayer(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 z-10"></div>
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hoverPrayer ? 1.05 : 1 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=2574&auto=format&fit=crop"
                alt="Personnes en prière"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>
              <div className="absolute top-4 right-4 w-20 h-20 border border-[#FFD700]/20 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border border-[#FFD700]/20 rounded-full"></div>
            </div>

            <div className="relative z-30 p-8 md:p-10 text-white h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center mr-4">
                  <PrayingHands size={24} className="text-[#FFD700]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Besoin de Prière ?
                </h3>
              </div>

              <p className="mb-8 text-gray-200 md:text-lg">
                Partagez vos demandes de prière avec notre communauté et recevez
                un soutien spirituel. Nous croyons au pouvoir de la prière
                collective.
              </p>

              <div className="mt-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button
                    variant="default"
                    className="relative overflow-hidden group bg-gradient-to-r from-[#FFD700] to-[#FF4500] hover:from-[#FF4500] hover:to-[#FFD700] text-black font-medium px-6 py-6 rounded-full shadow-lg shadow-amber-500/20"
                  >
                    <span className="relative z-10 flex items-center">
                      Soumettre une Demande
                      <motion.div
                        animate={{ x: hoverPrayer ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight size={18} className="ml-2" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Faire un Don */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden shadow-xl h-full"
            onMouseEnter={() => setHoverDonation(true)}
            onMouseLeave={() => setHoverDonation(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 z-10"></div>
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hoverDonation ? 1.05 : 1 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2574&auto=format&fit=crop"
                alt="Don à l'église"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>
              <div className="absolute top-4 left-4 w-20 h-20 border border-[#FFD700]/20 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border border-[#FFD700]/20 rounded-full"></div>
            </div>

            <div className="relative z-30 p-8 md:p-10 text-white h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center mr-4">
                  <HandHeart size={24} className="text-[#FFD700]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">Faire un Don</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <DollarSign size={28} className="text-[#FFD700] mr-2" />
                  <p className="text-3xl md:text-4xl font-bold">2 500 XFA</p>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-[#FFD700] to-[#FF4500] mt-2 rounded-full"></div>
              </div>

              <p className="mb-8 text-gray-200 md:text-lg">
                Soutenez notre mission et aidez-nous à répandre la Parole de
                Dieu. Votre générosité permet de financer nos programmes
                communautaires et nos actions d'évangélisation.
              </p>

              <div className="mt-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button
                    variant="default"
                    className="relative overflow-hidden group bg-gradient-to-r from-[#FFD700] to-[#FF4500] hover:from-[#FF4500] hover:to-[#FFD700] text-black font-medium px-6 py-6 rounded-full shadow-lg shadow-amber-500/20"
                  >
                    <span className="relative z-10 flex items-center">
                      Faire un Don Maintenant
                      <motion.div
                        animate={{ x: hoverDonation ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart size={18} className="ml-2" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
