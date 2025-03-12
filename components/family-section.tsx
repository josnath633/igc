"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// 🟢 Définition du type des données Live
interface Live {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: "EN COURS" | "TERMINÉ" | "À VENIR"; // Exemples de statuts possibles
}

// 🟢 Component for displaying individual live item
const LiveItem = ({ live }: { live: Live }) => {
  return (
    <motion.div
      key={live.id}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
    >
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-4 p-4">
        <Badge
          className={`${
            live.status === "EN COURS"
              ? "bg-green-500"
              : live.status === "TERMINÉ"
              ? "bg-gray-500"
              : "bg-orange-500"
          } text-white`}
        >
          {live.status}
        </Badge>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4 px-4">{live.title}</h2>

      {/* Time */}
      <div className="flex items-center text-gray-600 mb-4 px-4 space-x-2">
        <Clock size={18} className="text-orange-500" />
        <span>{live.startTime} - {live.endTime}</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 px-4">{live.description || "Aucune description disponible."}</p>
    </motion.div>
  );
};

// 🟢 Main Section Component
export default function FamilySection() {
  const [lives, setLives] = useState<Live[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLives = async () => {
      try {
        const response = await fetch("/api/auth/live");
        const data: Live[] = await response.json();
        setLives(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des lives", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLives();
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="relative h-[400px] md:h-auto overflow-hidden mb-6">
            <Image
              src="https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?q=80&w=2574&auto=format&fit=crop"
              alt="Famille en prière"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col justify-center">
            {loading ? (
              <p className="text-gray-600">Chargement des lives...</p>
            ) : lives.length > 0 ? (
              lives.map((live) => <LiveItem key={live.id} live={live} />)
            ) : (
              <p className="text-gray-600">Aucun live disponible pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
