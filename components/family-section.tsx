"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Calendar } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Définition du type des données Live
interface Live {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  status: "EN COURS" | "TERMINÉ" | "À VENIR"
}

// Component for displaying individual live item
const LiveItem = ({ live }: { live: Live }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push("/liverequest")
  }

  // Déterminer la couleur du badge en fonction du statut
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "EN COURS":
        return "success"
      case "TERMINÉ":
        return "secondary"
      case "À VENIR":
        return "warning"
      default:
        return "outline"
    }
  }

  return (
    <Card
      className="h-full overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl"
      onClick={handleClick}
    >
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 pb-2">
        <div className="flex justify-between items-center">
          <Badge variant={getBadgeVariant(live.status) as any} className="font-medium">
            {live.status}
          </Badge>
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock size={14} className="mr-1" />
            <span>
              {live.startTime} - {live.endTime}
            </span>
          </div>
        </div>
        <CardTitle className="text-2xl mt-2 line-clamp-1">{live.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <CardDescription className="text-base line-clamp-3 min-h-[4.5rem]">
          {live.description || "Aucune description disponible."}
        </CardDescription>
      </CardContent>
      <CardFooter className="bg-amber-100/50 p-3 flex justify-end">
        <Button variant="ghost" size="sm" className="text-amber-900 hover:text-amber-700 hover:bg-amber-200/50">
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  )
}

// Main Section Component
export default function FamilySection() {
  const [lives, setLives] = useState<Live[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with mock data for demonstration
    const mockLives: Live[] = [
      {
        id: "1",
        title: "Culte du Dimanche",
        description: "Rejoignez-nous pour notre culte hebdomadaire avec louange et enseignement biblique.",
        startTime: "10:00",
        endTime: "12:00",
        status: "EN COURS",
      },
      {
        id: "2",
        title: "Étude Biblique",
        description: "Approfondissez votre connaissance des Écritures avec notre pasteur.",
        startTime: "19:00",
        endTime: "20:30",
        status: "À VENIR",
      },
      {
        id: "3",
        title: "Prière Matinale",
        description: "Commencez votre journée avec un temps de prière communautaire.",
        startTime: "06:30",
        endTime: "07:30",
        status: "TERMINÉ",
      },
    ]

    const fetchLives = async () => {
      try {
        // Uncomment this to use real API
        // const response = await fetch("/api/auth/live")
        // const data: Live[] = await response.json()
        // setLives(data)

        // Using mock data for now
        setTimeout(() => {
          setLives(mockLives)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Erreur lors de la récupération des lives", error)
        setLoading(false)
      }
    }

    fetchLives()
  }, [])

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-2">Nos Diffusions</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Rejoignez-nous pour nos diffusions en direct</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <motion.div
            className="relative h-[400px] md:h-auto rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 border-2 border-amber-400 rounded-xl z-10 pointer-events-none"></div>
            <Image
              src="https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?q=80&w=2574&auto=format&fit=crop"
              alt="Famille en prière"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} className="text-amber-400" />
                <span className="text-white font-medium">Prochains événements</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">IGC Centre d'Excellence</h3>
              <p className="text-amber-200">Grandissez dans la foi ensemble</p>
            </div>
          </motion.div>

          {/* Content Section - Carousel */}
          <motion.div
            className="flex flex-col justify-center mt-16"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                <p className="text-muted-foreground mt-4">Chargement des diffusions...</p>
              </div>
            ) : lives.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {lives.map((live) => (
                    <CarouselItem key={live.id}>
                      <div className="p-1 h-[400px]">
                        <LiveItem live={live} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex items-center justify-center mt-6 gap-4">
                  <CarouselPrevious className="static transform-none bg-amber-100 hover:bg-amber-200 border-amber-300" />
                  <div className="flex gap-2">
                    {lives.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === 0 ? "bg-amber-500" : "bg-amber-200"}`}
                      />
                    ))}
                  </div>
                  <CarouselNext className="static transform-none bg-amber-100 hover:bg-amber-200 border-amber-300" />
                </div>
              </Carousel>
            ) : (
              <Card className="bg-amber-50 border border-amber-200">
                <CardContent className="flex flex-col items-center justify-center h-[300px] text-center">
                  <p className="text-amber-800 font-medium mb-2">Aucune diffusion disponible pour le moment.</p>
                  <p className="text-muted-foreground">Revenez plus tard pour nos prochaines diffusions.</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

