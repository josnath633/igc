"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EventCardProps {
  image: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  attendees?: number;
  category?: string;
}

const EventCard = ({
  image,
  title,
  date,
  time,
  location = "Centre IGC, Salle Principale",
  attendees = 0,
  category = "Service",
}: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Parse date for countdown
  const eventDate = new Date(date.split(" ").reverse().join("-"));
  const currentDate = new Date();
  const diffTime = Math.abs(eventDate.getTime() - currentDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isUpcoming = eventDate > currentDate;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with overlay */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-gradient-to-r from-[#FFD700] to-[#FF4500] hover:from-[#FF4500] hover:to-[#FFD700] text-black font-medium px-3 py-1">
            {category}
          </Badge>
        </div>

        {/* Countdown badge for upcoming events */}
        {isUpcoming && (
          <div className="absolute bottom-4 right-4 z-20">
            <Badge className="bg-black/70 text-white font-medium px-3 py-1">
              {diffDays === 0
                ? "Aujourd'hui"
                : `Dans ${diffDays} jour${diffDays > 1 ? "s" : ""}`}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 group-hover:text-[#FFD700] transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        <div className="space-y-3 mb-5">
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3">
              <Calendar size={16} className="text-[#FFD700]" />
            </div>
            <span>{date}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3">
              <Clock size={16} className="text-[#FFD700]" />
            </div>
            <span>{time}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3">
              <MapPin size={16} className="text-[#FFD700]" />
            </div>
            <span>{location}</span>
          </div>

          {attendees > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3">
                <Users size={16} className="text-[#FFD700]" />
              </div>
              <span>{attendees} participants</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Link
            href="#"
            className="inline-flex items-center text-[#FF4500] font-medium text-sm group-hover:text-[#FFD700] transition-colors duration-300"
          >
            Plus de détails
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight size={16} className="ml-1" />
            </motion.div>
          </Link>

          <Button
            variant="outline"
            size="sm"
            className="border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors duration-300"
          >
            S'inscrire
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function EnhancedEventsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const events = [
    {
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2574&auto=format&fit=crop",
      title: "Service Traditionnel pour Tous",
      date: "25 Septembre 2023",
      time: "9h00 - 11h00",
      location: "Sanctuaire Principal, IGC",
      attendees: 85,
      category: "Service",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=2574&auto=format&fit=crop",
      title: "Participez en Ligne Avant de Venir sur Place",
      date: "2 Octobre 2023",
      time: "10h00 - 12h00",
      location: "En ligne et sur site",
      attendees: 120,
      category: "Hybride",
    },
    {
      image:
        "https://images.unsplash.com/photo-1508025690966-2a9a1957da31?q=80&w=2574&auto=format&fit=crop",
      title: "Expérience de Culte Contemporain",
      date: "9 Octobre 2023",
      time: "11h00 - 13h00",
      location: "Salle de Conférence, IGC",
      attendees: 65,
      category: "Culte",
    },
    {
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2574&auto=format&fit=crop",
      title: "Retraite Spirituelle de Jeunes Adultes",
      date: "15 Octobre 2023",
      time: "Journée entière",
      location: "Centre de Retraite Montagne de Foi",
      attendees: 40,
      category: "Retraite",
    },
  
  ];

  // Determine number of slides to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = events.length;
  const maxSlideIndex = totalSlides - slidesToShow;

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      // Only advance if not at the last slide
      return prev < maxSlideIndex ? prev + 1 : prev;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      // Only go back if not at the first slide
      return prev > 0 ? prev - 1 : prev;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Handle autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          // If at the end, go back to the beginning
          if (prev >= maxSlideIndex) {
            return 0;
          }
          // Otherwise, advance to the next slide
          return prev + 1;
        });
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, maxSlideIndex]);

  // Animate slider on slide change
  useEffect(() => {
    controls.start({
      x: `-${(currentSlide * 100) / slidesToShow}%`,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  }, [currentSlide, controls, slidesToShow]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>
      <div className="absolute -top-40 right-20 w-80 h-80 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
      <div className="absolute -bottom-40 left-20 w-80 h-80 rounded-full bg-[#FF4500]/5 blur-3xl"></div>

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
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Événements Communautaires
            </h2>
          </div>{" "}
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-[#FF4500] mx-auto mt-6 rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Rejoignez-nous pour ces moments de partage, d'apprentissage et de
            communion. Nos événements sont ouverts à tous et conçus pour
            renforcer notre foi ensemble.
          </p>
        </motion.div>

        {/* Slider container */}
        <div
          className="relative mx-auto max-w-7xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -left-5 md:-left-10 -translate-y-1/2 z-20">
            <motion.button
              whileHover={currentSlide > 0 ? { scale: 1.1 } : {}}
              whileTap={currentSlide > 0 ? { scale: 0.95 } : {}}
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border transition-all ${
                currentSlide === 0
                  ? "border-gray-200 cursor-not-allowed opacity-50"
                  : "border-[#FFD700]/20 hover:border-[#FFD700]"
              }`}
              aria-label="Événement précédent"
            >
              <ChevronLeft
                size={20}
                className={
                  currentSlide === 0 ? "text-gray-400" : "text-gray-700"
                }
              />
            </motion.button>
          </div>

          <div className="absolute top-1/2 -right-5 md:-right-10 -translate-y-1/2 z-20">
            <motion.button
              whileHover={currentSlide < maxSlideIndex ? { scale: 1.1 } : {}}
              whileTap={currentSlide < maxSlideIndex ? { scale: 0.95 } : {}}
              onClick={nextSlide}
              disabled={currentSlide >= maxSlideIndex}
              className={`w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border transition-all ${
                currentSlide >= maxSlideIndex
                  ? "border-gray-200 cursor-not-allowed opacity-50"
                  : "border-[#FFD700]/20 hover:border-[#FFD700]"
              }`}
              aria-label="Événement suivant"
            >
              <ChevronRight
                size={20}
                className={
                  currentSlide >= maxSlideIndex
                    ? "text-gray-400"
                    : "text-gray-700"
                }
              />
            </motion.button>
          </div>

          {/* Slider */}
          <div className="overflow-hidden mx-4">
            <motion.div
              ref={sliderRef}
              className="flex"
              animate={controls}
              initial={{ x: 0 }}
              style={{
                width: `${(events.length * 100) / slidesToShow}%`,
              }}
            >
              {events.map((event, index) => (
                <div
                  key={index}
                  className="px-3"
                  style={{ width: `${100 / events.length}%` }}
                >
                  <EventCard {...event} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center space-x-2 mt-10">
            {Array.from({ length: maxSlideIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "transition-all duration-300",
                  index === currentSlide
                    ? "w-8 h-3 bg-gradient-to-r from-[#FFD700] to-[#FF4500] rounded-full"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full"
                )}
                aria-label={`Aller à l'événement ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            variant="default"
            className="relative overflow-hidden group bg-gradient-to-r from-[#FFD700] to-[#FF4500] hover:from-[#FF4500] hover:to-[#FFD700] text-black font-medium px-8 py-6 rounded-full shadow-lg shadow-amber-500/20"
          >
            <span className="relative z-10 flex items-center">
              Voir Tous les Événements
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
