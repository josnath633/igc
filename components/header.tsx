"use client"

import Link from "next/link"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { Search, User, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"

export default function Header() {
  const { data: session } = useSession() // Récupérer la session utilisateur

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#000000] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-[#e8b423]">
                Rejoindre l'Église
              </a>
              <a href="#" className="hover:text-[#e8b423]">
                Événements
              </a>
              <a href="#" className="hover:text-[#e8b423]">
                Actualités
              </a>
              <a href="#" className="hover:text-[#e8b423]">
                Médias
              </a>
            </div>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-300 hover:text-[#e8b423]">
                <Facebook size={16} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#e8b423]">
                <Twitter size={16} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#e8b423]">
                <Linkedin size={16} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#e8b423]">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Now Sticky */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#f8f1d8] to-white shadow-md border-b-2 border-[#e8b423]/20">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="relative w-16 h-16 mr-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-07%20at%2022.12.45-TLL4bxzsrqUh4JI55we9r0EeZjFHyD.jpeg"
                    alt="IGC Logo"
                    fill
                    className="object-contain drop-shadow-md hover:drop-shadow-lg transition-all"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-[#000000]">IGC</span>
                  <span className="text-sm text-[#d13b22]">Centre d'Excellence</span>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-[#e8b423] font-medium">
                Accueil
              </Link>
              <Link href="/sermons" className="text-gray-700 hover:text-[#e8b423] font-medium">
                Sermons
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-[#e8b423] font-medium">
                Événements
              </Link>
              <Link href="/ministries" className="text-gray-700 hover:text-[#e8b423] font-medium">
                Ministères
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-[#e8b423] font-medium">
                À Propos
              </Link>
            </div>

            {/* Icônes (Recherche + Connexion/Avatar) */}
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-gray-600 hover:text-[#e8b423]">
                <Search size={20} />
              </Link>

              {session ? (
                <Link href="/profile" className="flex items-center">
                  <img
                    src={session.user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full border border-[#e8b423]"
                  />
                </Link>
              ) : (
                <Button
                  onClick={() => signIn("google", { redirectTo: "/" })}
                  className="bg-[#e8b423] hover:bg-[#d13b22] text-black"
                >
                  <User size={20} />
                </Button>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

