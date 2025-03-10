"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  BookIcon as Bible,
  Heart,
  Users,
  ChevronRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const socialLinks = [
  { icon: Youtube, color: "", label: "Suivez-nous sur Youtube" },
  { icon: Facebook, color: "", label: "Rejoignez-nous sur Facebook" },
  { icon: Twitter, color: "", label: "Suivez-nous sur Twitter" },
  { icon: Linkedin, color: "", label: "Connectez-vous sur LinkedIn" },
]

export default function FamilySection() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-[400px] md:h-auto overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?q=80&w=2574&auto=format&fit=crop"
                alt="Famille en prière"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-6">
                <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600">
                  EN DIRECT
                </Badge>
                <TooltipProvider>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`${social.color} `}
                          >
                            <social.icon size={20} />
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{social.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              </div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Prédication. Adoration. Une Famille en Christ.
                </h2>

                <div className="flex items-center text-gray-600 mb-4 space-x-2">
                  <Clock size={18} className="text-orange-500" />
                  <span>Lundi, 8h00 - Mardi, 17h00</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Bible className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-600">
                      Venez découvrir la Parole de Dieu dans une communauté accueillante où chacun peut grandir
                      spirituellement.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-600">
                      Le salut est un don précieux que vous pouvez recevoir en suivant les pas de Jésus-Christ.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-600">
                      Rejoignez notre famille spirituelle et partagez des moments de communion fraternelle.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Rejoindre la communauté
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-500">
                    En savoir plus
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

