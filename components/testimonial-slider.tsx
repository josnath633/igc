"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Données des témoignages
const testimonials = [
  {
    id: 1,
    quote:
      "Depuis que ma femme et moi avons rejoint la communauté Abondante, nos vies ont été transformées. La communauté de croyants et le soutien du Pasteur Jean font vraiment la différence.",
    name: "Michel Dupont",
    role: "Membre depuis 2020",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      "J'étais perdu et sans espoir, mais grâce à IGC, j'ai retrouvé ma foi et un sens à ma vie. Les enseignements bibliques profonds m'ont aidé à surmonter des moments difficiles.",
    name: "Sophie Martin",
    role: "Membre depuis 2018",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      "Les programmes pour les jeunes ont été une bénédiction pour mes enfants. Ils ont grandi dans leur foi et ont développé de solides valeurs chrétiennes grâce à l'encadrement exceptionnel.",
    name: "Thomas Lefebvre",
    role: "Père de famille",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    quote:
      "La louange et l'adoration à IGC sont incomparables. Chaque dimanche, je me sens véritablement en présence de Dieu. C'est une expérience spirituelle qui me nourrit toute la semaine.",
    name: "Marie Dubois",
    role: "Membre du chœur",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToTestimonial = (index: number) => {
    setCurrent(index);
  };

  // Gestion de l'autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextTestimonial();
      }, 6000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Pause l'autoplay au survol
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section
      className="relative py-20 md:py-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>
      <div className="absolute -top-40 right-20 w-80 h-80 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
      <div className="absolute -bottom-40 left-20 w-80 h-80 rounded-full bg-[#FF4500]/5 blur-3xl"></div>

      {/* Circular border element inspired by the logo's circular border */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#FFD700]/10 rounded-full"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Témoignages Inspirants
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-[#FF4500] mx-auto mt-6 rounded-full"></div>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Découvrez comment Dieu transforme des vies à travers notre ministère
            et notre communauté de foi.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial slider */}
          <div className="relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center px-4"
              >
                <div className="mb-8 relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 relative mx-auto">
                    <Image
                      src={testimonials[current].image || "/placeholder.svg"}
                      alt={testimonials[current].name}
                      width={100}
                      height={100}
                      className="rounded-full h-full mx-auto object-cover border-4 border-white shadow-xl"
                    />
                  </div>
                </div>
                <p className="text-gray-700 italic mb-8 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                  "{testimonials[current].quote}"
                </p>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {testimonials[current].name}
                  </p>
                  <p className="text-[#FF4500] text-sm">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border border-[#FFD700]/20 hover:border-[#FFD700] transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border border-[#FFD700]/20 hover:border-[#FFD700] transition-colors"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </motion.button>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center space-x-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-gradient-to-r from-[#FFD700] to-[#FF4500] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Voir témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
