"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn } from 'next-auth/react';
import { Search, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function Header() {
  const { data: session } = useSession(); // Récupérer la session utilisateur

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-16 h-16 mr-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-07%20at%2022.12.45-NIaVziyL8UfIAerdLJtsRMxduYNrm6.jpeg"
                  alt="IGC Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#000000]">IGC</span>
                <span className="text-sm text-[#FF4500]">Centre d'Excellence</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#FF4500] font-medium">Accueil</Link>
            <Link href="/sermons" className="text-gray-700 hover:text-[#FF4500] font-medium">Sermons</Link>
            <Link href="/events" className="text-gray-700 hover:text-[#FF4500] font-medium">Événements</Link>
            <Link href="/ministries" className="text-gray-700 hover:text-[#FF4500] font-medium">Ministères</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#FF4500] font-medium">À Propos</Link>
          </div>

          {/* Icônes (Recherche + Connexion/Avatar) */}
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-gray-600 hover:text-[#FF4500]">
              <Search size={20} />
            </Link>

            {session ? (
              <Link href="/profile" className="flex items-center">
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full border border-gray-300"
                />
              </Link>
            ) : (
              <Button   onClick={() => signIn('google', { redirectTo: '/' })}>
                <User size={20} />
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
