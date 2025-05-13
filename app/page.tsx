"use client";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { FeatureCard } from "@/components/featureCardProps";
import FamilySection from "@/components/family-section";
import { Button } from "@/components/ui/button";
import { getAudioFiles } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SermonsSection from "@/components/sermons-section";
import StatsSection from "@/components/stats-section";
import GallerySection from "@/components/enhanced-gallery";
import TestimonialSlider from "@/components/testimonial-slider";
import EnhancedBlogSection from "@/components/enhanced-blog-section";
import EnhancedEventsSection from "@/components/enhanced-events-section";
import EnhancedCtaSection from "@/components/enhanced-cta-section";
import HeroSlider from "@/components/hero-slider";

export default function Home() {
  const [showAll, setShowAll] = useState(false); // Ajouter un état pour basculer l'affichage

  const [audioFiles, setAudioFiles] = useState<
    {
      title: string;
      image: string;
      duration: string;
      audioUrl: string;
      isPlaying: boolean;
      currentTime: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      const urls = await getAudioFiles();
      console.log("Fetched audio URLs:", urls); // Vérifier les URLs récupérées

      const sermons = await Promise.all(
        urls.map(async (url, index) => {
          // Créer un objet Audio pour charger et obtenir la durée réelle
          const audio = new Audio(url);

          // Attendre que l'audio soit chargé pour obtenir la durée
          await new Promise<void>((resolve) => {
            audio.onloadedmetadata = () => {
              resolve();
            };
          });

          // Récupérer la durée réelle de l'audio
          const duration = formatDuration(audio.duration); // Convertir la durée en format "mm:ss"

          return {
            title: `Sermon ${index + 1}`,
            image:
              "https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=240&auto=format&fit=crop", // URL d'image par défaut
            duration,
            audioUrl: url, // Ajouter l'URL audio ici
            isPlaying: false, // État pour savoir si l'audio est en lecture
            currentTime: 0, // Temps actuel de lecture
          };
        })
      );

      // Limiter les sermons à 3 éléments
      setAudioFiles(sermons.slice(0, 3)); // Mise à jour de l'état avec les 3 premiers sermons
    };

    fetchAudioFiles();
  }, []);
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // Gérer la lecture du sermon (Play/Pause)
  const handlePlayPause = (index: number) => {
    const updatedFiles = [...audioFiles];
    const selectedFile = updatedFiles[index];
    const audioElement = new Audio(selectedFile.audioUrl);

    // Si l'audio est déjà en lecture, on le met en pause
    if (selectedFile.isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
      audioElement.ontimeupdate = () => {
        // Mise à jour du temps actuel pendant la lecture
        const currentTime = audioElement.currentTime;
        updatedFiles[index].currentTime = currentTime;
        setAudioFiles(updatedFiles); // Mettre à jour l'état avec le temps actuel
      };
    }

    updatedFiles[index].isPlaying = !selectedFile.isPlaying;
    setAudioFiles(updatedFiles);
  };

  const handleToggleShowAll = () => {
    setShowAll(!showAll); // Alterner entre afficher tous ou seulement les 3 premiers
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Section Héro */}
      <HeroSlider />

      <FamilySection />

      {/* Section Caractéristiques */}
      <section className="bg-gradient-to-b from-amber-50 to-amber-100 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-2">
              Nos Publications Spirituelles
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Explorez notre collection de livres et ressources spirituelles
              pour vous aider dans votre apprentissage et votre croissance
              spirituelle.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="https://img.icons8.com/fluency/96/holy-bible.png"
              title="La Parole Révélée"
              description="Découvrez notre collection de livres d'enseignements bibliques pour approfondir votre connaissance spirituelle."
              buttonText="Découvrir les livres"
              buttonLink="/livres"
            />
            <FeatureCard
              icon="https://img.icons8.com/fluency/96/book-shelf.png"
              title="Bibliothèque de Foi"
              description="Explorez notre bibliothèque de ressources spirituelles pour nourrir votre foi et votre croissance personnelle."
              buttonText="Explorer la bibliothèque"
              buttonLink="/bibliotheque"
            />
            <FeatureCard
              icon="https://img.icons8.com/fluency/96/holy-bible.png"
              title="Études Bibliques"
              description="Accédez à nos guides d'études bibliques pour approfondir votre compréhension des Écritures saintes."
              buttonText="Voir les études"
              buttonLink="/etudes"
            />
          </div>
        </div>
      </section>

      {/* Section Sermons */}
      {/* <SermonsSection /> */}

      {/* Section CTA */}
      <EnhancedCtaSection />

      {/* Section Événements */}
      <EnhancedEventsSection />

      {/* Section Blog */}
      <EnhancedBlogSection />

      {/* Section Statistiques */}
      <StatsSection />

      {/* Section Témoignage */}
      <TestimonialSlider />
      {/* Galerie d'Églises */}
      <GallerySection />

      <Footer />
    </div>
  );
}
