"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPostProps {
  image: string;
  title: string;
  date: string;
  comments: number;
  excerpt: string;
  category?: string;
}

const BlogPost = ({
  image,
  title,
  date,
  comments,
  excerpt,
  category = "Enseignement",
}: BlogPostProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col"
    >
      {/* Image container with overlay */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
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
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1 text-[#FFD700]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle size={14} className="mr-1 text-[#FFD700]" />
            <span>{comments} commentaires</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3 group-hover:text-[#FFD700] transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 flex-1">{excerpt}</p>

        <Link
          href="#"
          className="inline-flex items-center text-[#FF4500] font-medium text-sm group-hover:text-[#FFD700] transition-colors duration-300"
        >
          Lire l'article complet
          <ArrowRight
            size={16}
            className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default function EnhancedBlogSection() {
  const [isHovered, setIsHovered] = useState(false);

  const blogPosts = [
    {
      image:
        "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=2574&auto=format&fit=crop",
      title: "Comment Apprécier un Don qui Dure Éternellement",
      date: "15 Septembre 2023",
      comments: 8,
      excerpt:
        "Découvrez la joie éternelle qui vient de l'acceptation du plus grand don de Dieu à l'humanité. Cet article perspicace explore l'impact profond de la foi dans notre vie quotidienne.",
      category: "Spiritualité",
    },
    {
      image:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2574&auto=format&fit=crop",
      title: "Engagés à Répandre l'Évangile de Dieu",
      date: "8 Septembre 2023",
      comments: 12,
      excerpt:
        "Apprenez-en plus sur la mission de notre église pour répandre la Parole de Dieu dans la communauté et au-delà. Rejoignez-nous dans notre engagement à partager le message d'espoir et de salut.",
      category: "Mission",
    },
    {
      image:
        "https://images.unsplash.com/photo-1490127252417-7c393f993ee4?q=80&w=2574&auto=format&fit=crop",
      title: "La Prière: Un Dialogue Intime avec Dieu",
      date: "1 Septembre 2023",
      comments: 15,
      excerpt:
        "Explorez les différentes formes de prière et comment développer une vie de prière plus profonde. Découvrez comment la prière peut transformer votre relation avec Dieu et votre vie quotidienne.",
      category: "Prière",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2574&auto=format&fit=crop",
      title: "Comprendre les Paraboles de Jésus",
      date: "25 Août 2023",
      comments: 10,
      excerpt:
        "Une analyse approfondie des paraboles les plus importantes de Jésus et de leur signification pour notre vie moderne. Découvrez comment ces histoires anciennes restent pertinentes aujourd'hui.",
      category: "Étude Biblique",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700] to-[#FFD700]/0"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#FF4500]/5 blur-3xl"></div>

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
              Blog d&#39;Éducation
              Religieuse
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-[#FF4500] mx-auto  rounded-full"></div>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explorez nos articles inspirants et éducatifs pour approfondir votre
            foi et votre compréhension des enseignements bibliques.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BlogPost {...post} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button
            variant="default"
            className="relative overflow-hidden group bg-gradient-to-r from-[#FFD700] to-[#FF4500] hover:from-[#FF4500] hover:to-[#FFD700] text-black font-medium px-8 py-6 rounded-full shadow-lg shadow-amber-500/20"
          >
            <span className="relative z-10 flex items-center">
              Voir Tous les Articles
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={18} className="ml-2" />
              </motion.div>
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
