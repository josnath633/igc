"use client"

import { useState, useEffect } from "react"
import { SermonCard } from "./sermon-card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Type pour les sermons
interface Sermon {
  id: string
  title: string
  preacher: string
  date: string
  duration: string
  audioUrl: string
}

// Données d'exemple (à remplacer par vos données réelles)
const sampleSermons: Sermon[] = [
  {
    id: "1",
    title: "La Foi qui Déplace les Montagnes",
    preacher: "Pasteur Emmanuel",
    date: "12 Mars 2025",
    duration: "45:30",
    audioUrl: "/sermons/sermon1.mp3", // Remplacer par l'URL réelle
  },
  {
    id: "2",
    title: "Vivre dans la Présence de Dieu",
    preacher: "Pasteur Jean",
    date: "5 Mars 2025",
    duration: "38:15",
    audioUrl: "/sermons/sermon2.mp3", // Remplacer par l'URL réelle
  },
  {
    id: "3",
    title: "Le Pouvoir de la Prière",
    preacher: "Évangéliste Marie",
    date: "26 Février 2025",
    duration: "42:20",
    audioUrl: "/sermons/sermon3.mp3", // Remplacer par l'URL réelle
  },
]

export default function SermonsSection() {
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)

  // Simuler le chargement des sermons
  useEffect(() => {
    // Dans un cas réel, vous feriez un appel API ici
    setTimeout(() => {
      setSermons(sampleSermons)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <section className="bg-gradient-to-b from-amber-50 to-amber-100 py-16">
      <div className="container mx-auto px-4">
        <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-2">
            Écoutez Nos Sermons
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Découvrez nos sermons et apprenez à vivre la foi dans votre vie.
            </p>
          </motion.div>
        <div className="space-y-4 max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent"></div>
              <p className="mt-4 text-amber-800">Chargement des sermons...</p>
            </div>
          ) : sermons.length > 0 ? (
            sermons.map((sermon) => (
              <SermonCard
                key={sermon.id}
                title={sermon.title}
                preacher={sermon.preacher}
                date={sermon.date}
                duration={sermon.duration}
                audioUrl={sermon.audioUrl}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">Aucun sermon disponible pour le moment.</p>
          )}
        </div>

        <div className="text-center mt-10">
          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2">
            Voir Tous les Sermons
          </Button>
        </div>
      </div>
    </section>
  )
}

