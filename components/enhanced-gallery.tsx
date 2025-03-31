"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop",
    alt: "Bâtiment d'église",
    title: "Notre Sanctuaire",
  },
  {
    src: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=800&auto=format&fit=crop",
    alt: "Bâtiment d'église",
    title: "Service du Dimanche",
  },
  {
    src: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=800&auto=format&fit=crop",
    alt: "Bâtiment d'église",
    title: "Moments de Prière",
  },
  {
    src: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=800&auto=format&fit=crop",
    alt: "Bâtiment d'église",
    title: "Étude Biblique",
  },
  {
    src: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop",
    alt: "Bâtiment d'église",
    title: "Activités Communautaires",
  },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction: number) => {
    if (selectedImage === null) return;

    const newIndex = selectedImage + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedImage(newIndex);
    }
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#FF4500]/5 blur-3xl"></div>

      {/* Circular border element inspired by the logo's circular border */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#FFD700]/10 rounded-full"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Notre Galerie
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-[#FF4500] mx-auto mt-6 rounded-full"></div>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Découvrez les moments forts de notre ministère à travers ces images
            qui témoignent de notre engagement et de notre foi.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative h-60 md:h-72 group"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 border border-[#FFD700]/20 rounded-xl z-20"></div>

                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-medium text-sm md:text-base">
                    {image.title}
                  </h3>
                </div>

                {/* Zoom button */}
                <button
                  onClick={() => openLightbox(index)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FFD700]/80 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#FFD700] transform scale-0 group-hover:scale-100"
                >
                  <ZoomIn size={18} className="text-black" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <button className="px-6 py-2 bg-gradient-to-r from-[#FFD700] to-[#FF4500] text-black font-medium rounded-full hover:from-[#FF4500] hover:to-[#FFD700] transition-all duration-300 shadow-lg shadow-amber-500/20">
            Voir Plus de Photos
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center hover:bg-[#FFD700]/40 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => navigateImage(-1)}
              disabled={selectedImage === 0}
              className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center hover:bg-[#FFD700]/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => navigateImage(1)}
              disabled={selectedImage === images.length - 1}
              className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center hover:bg-[#FFD700]/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>

          <div className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <div className="relative w-full h-[70vh]">
                <Image
                  src={images[selectedImage].src || "/placeholder.svg"}
                  alt={images[selectedImage].alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-medium">
                  {images[selectedImage].title}
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
