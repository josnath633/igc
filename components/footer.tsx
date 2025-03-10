import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, ChevronRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#000000] to-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* À Propos */}
          <div>
            <div className="mb-4 flex items-center">
              <div className="relative w-16 h-16 mr-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-07%20at%2022.12.45-NIaVziyL8UfIAerdLJtsRMxduYNrm6.jpeg"
                  alt="IGC Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#FFD700]">IGC</span>
                <span className="text-sm text-[#FF4500]">Centre d'Excellence</span>
              </div>
            </div>
            <p className="text-sm mb-4">
              Un ministère charismatique centré sur l'impact global pour Christ à travers la foi, l'espérance et
              l'amour. Rejoignez-nous dans notre mission divine.
            </p>
            <div className="flex space-x-2">
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center hover:bg-[#FFD700] transition-colors group"
              >
                <Facebook size={16} className="text-[#FFD700] group-hover:text-black" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center hover:bg-[#FFD700] transition-colors group"
              >
                <Twitter size={16} className="text-[#FFD700] group-hover:text-black" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center hover:bg-[#FFD700] transition-colors group"
              >
                <Instagram size={16} className="text-[#FFD700] group-hover:text-black" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center hover:bg-[#FFD700] transition-colors group"
              >
                <Youtube size={16} className="text-[#FFD700] group-hover:text-black" />
              </Link>
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-[#FFD700] font-bold mb-4 uppercase text-sm">Liens Utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm flex items-center hover:text-[#FF4500]">
                  <ChevronRight size={14} className="mr-1" />À Propos de Nous
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm flex items-center hover:text-[#FF4500]">
                  <ChevronRight size={14} className="mr-1" />
                  Ministères
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm flex items-center hover:text-[#FF4500]">
                  <ChevronRight size={14} className="mr-1" />
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm flex items-center hover:text-[#FF4500]">
                  <ChevronRight size={14} className="mr-1" />
                  Événements
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm flex items-center hover:text-[#FF4500]">
                  <ChevronRight size={14} className="mr-1" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Dernières Nouvelles */}
          <div>
            <h3 className="text-[#FFD700] font-bold mb-4 uppercase text-sm">Dernières Nouvelles</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-16 h-16 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=80&auto=format&fit=crop"
                    alt="Actualité"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <Link href="#" className="text-sm hover:text-[#FF4500]">
                    Nouveau Programme d'École du Dimanche
                  </Link>
                  <p className="text-xs text-gray-500">12 Juin 2023</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-16 h-16 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=80&auto=format&fit=crop"
                    alt="Actualité"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <Link href="#" className="text-sm hover:text-[#FF4500]">
                    Succès de l'Action Communautaire
                  </Link>
                  <p className="text-xs text-gray-500">28 Mai 2023</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div>
            <h3 className="text-[#FFD700] font-bold mb-4 uppercase text-sm">Photos Instagram</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                "1547637205-fde0c9011f9d",
                "1544365558-35aa4afcf11f",
                "1501281668745-f7f57925c3b4",
                "1544365558-35aa4afcf11f",
                "1501281668745-f7f57925c3b4",
                "1547637205-fde0c9011f9d",
              ].map((photoId, i) => (
                <div key={i} className="relative h-20">
                  <Image
                    src={`https://images.unsplash.com/photo-${photoId}?q=80&w=80&auto=format&fit=crop`}
                    alt={`Photo Instagram ${i + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black py-4 text-center text-sm border-t border-[#FFD700]/20">
        <div className="container mx-auto px-4">
          <p>
            Copyright © 2025 IGC - Impact Global pour Christ. Tous Droits Réservés. | Design par{" "}
            <Link href="#" className="text-[#FFD700]">
              JosNath
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

