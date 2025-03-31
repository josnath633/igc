"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Données des slides
const slides = [
  {
    id: 1,
    image: "/images/igc.jpg", // Image principale de l'église
    title: "Construire des Liens Plus Forts\nPar l'Adoration",
    description:
      "Vivez l'unité et la foi alors que nous nous rassemblons dans l'adoration, renforçant notre lien avec Dieu et les uns avec les autres dans la joie et la grâce.",
    buttonText: "REJOINDRE L'ÉGLISE",
    buttonLink: "#",
    type: "main",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?q=80&w=2574&auto=format&fit=crop",
    title: "Sanctuaire Principal\nIGC Centre d'Excellence",
    description:
      "Notre sanctuaire principal offre un espace sacré pour l'adoration collective, avec des services réguliers le dimanche et des événements spéciaux tout au long de la semaine.",
    location: "123 Avenue de la Foi, Quartier Central",
    schedule: "Dimanche: 9h00 & 11h00 | Mercredi: 18h30",
    buttonText: "NOUS LOCALISER",
    buttonLink: "#map",
    type: "location",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2574&auto=format&fit=crop",
    title: "IGC Quartier Nord\nCommunauté de Foi",
    description:
      "Notre église du quartier Nord est un lieu chaleureux et accueillant où les familles se réunissent pour grandir ensemble dans leur foi et leur relation avec Dieu.",
    location: "45 Rue des Oliviers, Quartier Nord",
    schedule: "Dimanche: 10h00 | Vendredi: 19h00",
    buttonText: "NOUS LOCALISER",
    buttonLink: "#map",
    type: "location",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2574&auto=format&fit=crop",
    title: "Journée de Prière\nIntercession Collective",
    description:
      "Rejoignez-nous pour une journée entière dédiée à la prière et à l'intercession. Ensemble, nous élèverons nos voix vers Dieu pour notre communauté, notre nation et le monde.",
    date: "Samedi 28 Octobre 2023",
    time: "8h00 - 17h00",
    location: "Sanctuaire Principal IGC",
    buttonText: "PARTICIPER",
    buttonLink: "#prayer",
    type: "prayer",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=2574&auto=format&fit=crop",
    title: "Veillée de Prière\nNuit d'Adoration",
    description:
      "Une nuit spéciale d'adoration, de louange et de prière où nous cherchons la face de Dieu ensemble. Un moment puissant de renouvellement spirituel et de communion.",
    date: "Vendredi 10 Novembre 2023",
    time: "21h00 - 5h00",
    location: "IGC Quartier Nord",
    buttonText: "S'INSCRIRE",
    buttonLink: "#prayer",
    type: "prayer",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // Gestion de l'autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 6000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, currentSlide, isTransitioning])

  // Pause l'autoplay au survol
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <section
      className="relative w-full h-[700px] md:h-[800px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>
            <div className="absolute top-10 right-10 w-40 h-40 border border-[#FFD700]/10 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-60 h-60 border border-[#FFD700]/10 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4 container mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
                {slides[currentSlide].title.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </h1>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-white text-lg md:text-xl max-w-2xl mb-4">{slides[currentSlide].description}</p>

              {/* Additional info based on slide type */}
              {slides[currentSlide].type === "location" && (
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
                  <div className="flex items-center text-[#FFD700] text-lg">
                    <MapPin size={20} className="mr-2" />
                    <span>{slides[currentSlide].location}</span>
                  </div>
                  <div className="hidden md:block w-1 h-6 bg-[#FFD700]/30 rounded-full mx-2"></div>
                  <div className="flex items-center text-[#FFD700] text-lg">
                    <Clock size={20} className="mr-2" />
                    <span>{slides[currentSlide].schedule}</span>
                  </div>
                </div>
              )}

              {slides[currentSlide].type === "prayer" && (
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
                  <div className="flex items-center text-[#FFD700] text-lg">
                    <Calendar size={20} className="mr-2" />
                    <span>{slides[currentSlide].date}</span>
                  </div>
                  <div className="hidden md:block w-1 h-6 bg-[#FFD700]/30 rounded-full mx-2"></div>
                  <div className="flex items-center text-[#FFD700] text-lg">
                    <Clock size={20} className="mr-2" />
                    <span>{slides[currentSlide].time}</span>
                  </div>
                  {slides[currentSlide].location && (
                    <>
                      <div className="hidden md:block w-1 h-6 bg-[#FFD700]/30 rounded-full mx-2"></div>
                      <div className="flex items-center text-[#FFD700] text-lg">
                        <MapPin size={20} className="mr-2" />
                        <span>{slides[currentSlide].location}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#FFD700] to-[#FF4500] hover:from-[#FF4500] hover:to-[#FFD700] text-black font-bold px-8 py-7 rounded-full shadow-lg shadow-amber-500/20 group"
              >
                <span className="flex items-center">
                  {slides[currentSlide].buttonText}
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-4 md:left-10 -translate-y-1/2 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/50 transition-colors"
          aria-label="Slide précédent"
        >
          <ChevronLeft size={24} className="text-white" />
        </motion.button>
      </div>

      <div className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/50 transition-colors"
          aria-label="Slide suivant"
        >
          <ChevronRight size={24} className="text-white" />
        </motion.button>
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-40 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "transition-all duration-300",
              index === currentSlide
                ? "w-10 h-3 bg-gradient-to-r from-[#FFD700] to-[#FF4500] rounded-full"
                : "w-3 h-3 bg-white/50 hover:bg-white/80 rounded-full",
            )}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide type indicator */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40">
        <div className="flex space-x-4">
          {["main", "location", "prayer"].map((type) => (
            <div
              key={type}
              className={cn(
                "px-4 py-1 rounded-full text-xs uppercase font-bold tracking-wider transition-all duration-300",
                slides[currentSlide].type === type
                  ? "bg-gradient-to-r from-[#FFD700] to-[#FF4500] text-black"
                  : "bg-black/30 backdrop-blur-sm text-white/70 border border-white/10",
              )}
            >
              {type === "main" ? "Accueil" : type === "location" ? "Église" : "Prière"}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

