import Image from "next/image"
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SermonPlayer from "@/components/sermon-player"
import FeatureCard from "@/components/feature-card"
import EventCard from "@/components/event-card"
import BlogPost from "@/components/blog-post"
import StatCounter from "@/components/stat-counter"
import FamilySection from "@/components/family-section"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Navigation Secondaire */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-orange-400">
                Rejoindre l'Église
              </a>
              <a href="#" className="hover:text-orange-400">
                Événements
              </a>
              <a href="#" className="hover:text-orange-400">
                Actualités
              </a>
              <a href="#" className="hover:text-orange-400">
                Médias
              </a>
            </div>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={16} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={16} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={16} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section Héro */}
      <section className="relative h-[600px] w-full">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2574&auto=format&fit=crop"
            alt="Intérieur d'église avec vitraux"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
            Construire des Liens Plus Forts
            <br />
            Par l'Adoration
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mb-8">
            Vivez l'unité et la foi alors que nous nous rassemblons dans l'adoration, renforçant notre lien avec Dieu et
            les uns avec les autres dans la joie et la grâce.
          </p>
          <Button size="lg" variant="secondary" className="bg-white hover:bg-gray-100 text-gray-900">
            REJOINDRE L'ÉGLISE
          </Button>
        </div>
      </section>

      <FamilySection />

      {/* Section Caractéristiques */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="https://img.icons8.com/fluency/96/holy-bible.png"
              title="Portée Mondiale"
              description="Atteindre les communautés du monde entier avec notre message de foi et d'espérance."
            />
            <FeatureCard
              icon="https://img.icons8.com/fluency/96/church.png"
              title="L'Église en Ligne"
              description="Rejoignez nos services virtuels et connectez-vous avec des croyants du monde entier."
            />
            <FeatureCard
              icon="https://img.icons8.com/fluency/96/holy-bible.png"
              title="Vision Pastorale"
              description="Guidés par la vision de notre pasteur pour bâtir une communauté enracinée dans la foi et l'amour."
            />
          </div>
        </div>
      </section>

      {/* Section Sermons */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Écoutez Nos Sermons</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <SermonPlayer
              title="Aimez-vous les uns les autres : Votre but et votre marche avec le cœur"
              image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200&auto=format&fit=crop"
              duration="45:30"
            />
            <SermonPlayer
              title="Dieu est Beau : La Valeur de Dieu"
              image="https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?q=80&w=200&auto=format&fit=crop"
              duration="38:45"
            />
            <SermonPlayer
              title="Découvrez les Vrais Fidèles Partout"
              image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200&auto=format&fit=crop"
              duration="42:15"
            />
          </div>
          <div className="text-center mt-8">
            <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
              Voir Tous les Sermons
            </Button>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Besoin de Prière */}
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=2574&auto=format&fit=crop"
                alt="Personnes en prière"
                fill
                className="object-cover brightness-50"
              />
            </div>
            <div className="relative z-10 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Besoin de Prière ?</h3>
              <p className="mb-6">
                Partagez vos demandes de prière avec notre communauté et recevez un soutien spirituel.
              </p>
              <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
                Soumettre une Demande
              </Button>
            </div>
          </div>

          {/* Faire un Don */}
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2574&auto=format&fit=crop"
                alt="Don à l'église"
                fill
                className="object-cover brightness-50"
              />
            </div>
            <div className="relative z-10 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Faire un Don ?</h3>
              <p className="text-3xl font-bold mb-2">2 500 XFA</p>
              <p className="text-sm mb-6">Soutenez notre mission et aidez-nous à répandre la Parole de Dieu</p>
              <Button variant="default"  className="bg-orange-500 hover:bg-orange-600 text-white">
                Faire un Don Maintenant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Événements */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Événements Communautaires</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <EventCard
              image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2574&auto=format&fit=crop"
              title="Service Traditionnel pour Tous"
              date="25 Septembre 2023"
              time="9h00 - 11h00"
            />
            <EventCard
              image="https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=2574&auto=format&fit=crop"
              title="Participez en Ligne Avant de Venir sur Place"
              date="2 Octobre 2023"
              time="10h00 - 12h00"
            />
            <EventCard
              image="https://images.unsplash.com/photo-1508025690966-2a9a1957da31?q=80&w=2574&auto=format&fit=crop"
              title="Expérience de Culte Contemporain"
              date="9 Octobre 2023"
              time="11h00 - 13h00"
            />
          </div>
        </div>
      </section>

      {/* Section Blog */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Blog d'Éducation Religieuse</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <BlogPost
              image="https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=2574&auto=format&fit=crop"
              title="Comment Apprécier un Don qui Dure Éternellement"
              date="15 Septembre 2023"
              comments={8}
              excerpt="Découvrez la joie éternelle qui vient de l'acceptation du plus grand don de Dieu à l'humanité. Cet article perspicace explore l'impact profond de la foi dans notre vie quotidienne."
            />
            <BlogPost
              image="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2574&auto=format&fit=crop"
              title="Engagés à Répandre l'Évangile de Dieu"
              date="8 Septembre 2023"
              comments={12}
              excerpt="Apprenez-en plus sur la mission de notre église pour répandre la Parole de Dieu dans la communauté et au-delà. Rejoignez-nous dans notre engagement à partager le message d'espoir et de salut."
            />
          </div>
          <div className="text-center mt-8">
            <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
              Voir Tous les Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="bg-orange-500 py-10 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCounter number={12} label="ÉGLISES" />
            <StatCounter number={98} label="MEMBRES" />
            <StatCounter number={120} label="SERMONS" />
            <StatCounter number={50} label="ÉVÉNEMENTS" />
          </div>
        </div>
      </section>

      {/* Section Témoignage */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="mb-8">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              alt="Témoignage"
              width={80}
              height={80}
              className="rounded-full mx-auto object-cover"
            />
          </div>
          <p className="text-gray-600 italic mb-6 text-lg">
            "Depuis que ma femme et moi avons rejoint la communauté Abondante, nos vies ont été transformées. La
            communauté de croyants et le soutien du Pasteur Jean font vraiment la différence."
          </p>
          <p className="font-semibold">- Michel Dupont</p>
        </div>
      </section>

      {/* Galerie d'Églises */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="h-40">
              <Image
                src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=240&auto=format&fit=crop"
                alt="Bâtiment d'église"
                width={240}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-40">
              <Image
                src="https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=240&auto=format&fit=crop"
                alt="Bâtiment d'église"
                width={240}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-40">
              <Image
                src="https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=240&auto=format&fit=crop"
                alt="Bâtiment d'église"
                width={240}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-40">
              <Image
                src="https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=240&auto=format&fit=crop"
                alt="Bâtiment d'église"
                width={240}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-40">
              <Image
                src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=240&auto=format&fit=crop"
                alt="Bâtiment d'église"
                width={240}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

