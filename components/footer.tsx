"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, ChevronRight, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  const flameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animation for the flame effect
    const flame = flameRef.current
    if (!flame) return

    const animateFlame = () => {
      const flames = flame.querySelectorAll(".flame")
      flames.forEach((f, i) => {
        const el = f as HTMLElement
        el.style.height = `${Math.random() * 10 + 20}px`
        el.style.left = `${i * 20 + Math.random() * 5}px`
      })
    }

    const interval = setInterval(animateFlame, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="relative bg-gradient-to-b from-[#000000] to-gray-900 text-gray-300 overflow-hidden">
      {/* Decorative elements inspired by the logo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>

      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#FF4500]/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#FFD700]/5 blur-3xl"></div>

      {/* Circular border element inspired by the logo's circular border */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-[#FFD700]/5 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#FFD700]/10 rounded-full"></div>

      <div className="container relative mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* À Propos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 flex items-center">
              <div className="relative w-20 h-20 mr-3">
                <div className="absolute inset-0 rounded-full bg-[#FFD700]/10 animate-pulse"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-07%20at%2022.12.45-NIaVziyL8UfIAerdLJtsRMxduYNrm6.jpeg"
                  alt="IGC Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#FFD700]">IGC</span>
                <span className="text-sm text-[#FF4500]">Centre d'Excellence</span>
              </div>
            </div>
            <p className="text-sm mb-6 leading-relaxed">
              Un ministère charismatique centré sur l'impact global pour Christ à travers la foi, l'espérance et
              l'amour. Rejoignez-nous dans notre mission divine.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#FFD700] hover:to-[#FF4500] transition-all duration-300 group shadow-lg shadow-black/20"
                  >
                    <social.icon size={18} className="text-[#FFD700] group-hover:text-white" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3">
                  <MapPin size={14} className="text-[#FFD700]" />
                </div>
                <span>123 Rue de l'Église, Ville, Pays</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3">
                  <Phone size={14} className="text-[#FFD700]" />
                </div>
                <span>+123 456 7890</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3">
                  <Mail size={14} className="text-[#FFD700]" />
                </div>
                <span>contact@igc-ministere.org</span>
              </div>
            </div>
          </motion.div>

          {/* Liens Rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[#FFD700] font-bold mb-6 uppercase text-sm tracking-wider relative inline-block">
              Liens Utiles
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FF4500]"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "À Propos de Nous",
                "Ministères",
                "Sermons",
                "Événements",
                "Contact",
                "Faire un Don",
                "Témoignages",
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href="#"
                    className="text-sm flex items-center hover:text-[#FFD700] transition-colors duration-300 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FFD700]/5 flex items-center justify-center mr-2 group-hover:bg-[#FFD700]/20 transition-colors duration-300">
                      <ChevronRight size={14} className="text-[#FFD700]" />
                    </div>
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Dernières Nouvelles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[#FFD700] font-bold mb-6 uppercase text-sm tracking-wider relative inline-block">
              Dernières Nouvelles
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FF4500]"></span>
            </h3>
            <div className="space-y-5">
              {[
                {
                  image: "1501281668745-f7f57925c3b4",
                  title: "Nouveau Programme d'École du Dimanche",
                  date: "12 Juin 2023",
                },
                {
                  image: "1544365558-35aa4afcf11f",
                  title: "Succès de l'Action Communautaire",
                  date: "28 Mai 2023",
                },
                {
                  image: "1547637205-fde0c9011f9d",
                  title: "Conférence Annuelle des Leaders",
                  date: "15 Avril 2023",
                },
              ].map((news, index) => (
                <motion.div
                  key={index}
                  className="flex gap-3 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-[#FF4500]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <Image
                      src={`https://images.unsplash.com/photo-${news.image}?q=80&w=100&auto=format&fit=crop`}
                      alt="Actualité"
                      fill
                      className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <Link href="#" className="text-sm font-medium hover:text-[#FFD700] transition-colors duration-300">
                      {news.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">{news.date}</p>
                    <Link
                      href="#"
                      className="text-xs text-[#FF4500] hover:text-[#FFD700] mt-1 inline-block transition-colors duration-300"
                    >
                      Lire plus →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[#FFD700] font-bold mb-6 uppercase text-sm tracking-wider relative inline-block">
              Photos Instagram
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FF4500]"></span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                "1547637205-fde0c9011f9d",
                "1544365558-35aa4afcf11f",
                "1501281668745-f7f57925c3b4",
                "1544365558-35aa4afcf11f",
                "1501281668745-f7f57925c3b4",
                "1547637205-fde0c9011f9d",
              ].map((photoId, i) => (
                <motion.div
                  key={i}
                  className="relative h-24 overflow-hidden rounded-lg group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/40 to-[#FF4500]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <div className="absolute inset-0 border border-[#FFD700]/10 rounded-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={`https://images.unsplash.com/photo-${photoId}?q=80&w=100&auto=format&fit=crop`}
                    alt={`Photo Instagram ${i + 1}`}
                    fill
                    className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <Instagram size={18} className="text-white" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8 bg-gradient-to-br from-black/60 to-gray-900/60 p-4 rounded-lg border border-[#FFD700]/10">
              <h4 className="text-[#FFD700] font-bold mb-3 text-sm">Abonnez-vous à Notre Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="bg-black/50 text-white text-sm rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#FFD700]/50 border border-[#FFD700]/20"
                />
                <button className="bg-gradient-to-r from-[#FFD700] to-[#FF4500] text-black font-medium px-4 rounded-r-md text-sm hover:from-[#FF4500] hover:to-[#FFD700] transition-all duration-300">
                  Envoyer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Flame effect */}
      <div ref={flameRef} className="relative h-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flame absolute bottom-0 w-4 rounded-t-full bg-gradient-to-t from-[#FF4500] via-[#FFD700] to-transparent"
              style={{
                height: `${Math.random() * 10 + 20}px`,
                left: `${i * 20 + Math.random() * 5}px`,
                transition: "height 0.2s ease-in-out",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black py-5 text-center text-sm border-t border-[#FFD700]/10">
        <div className="container mx-auto px-4">
          <p className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-0">
            <span>Copyright © 2025 IGC - Impact Global pour Christ. Tous Droits Réservés.</span>
            <span className="hidden md:inline mx-2">|</span>
            <span>
              Design par{" "}
              <Link href="#" className="text-[#FFD700] hover:text-[#FF4500] transition-colors duration-300">
                JosNath
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

