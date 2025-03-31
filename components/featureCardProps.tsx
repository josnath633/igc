import { Button } from "@/components/ui/button"
import Image from "next/image"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  buttonText?: string
  buttonLink?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  buttonText = "En savoir plus",
  buttonLink = "#",
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105 border border-amber-100">
      <div className="flex justify-center mb-4">
        <Image src={icon || "/placeholder.svg"} alt={title} width={64} height={64} className="object-contain" />
      </div>
      <h3 className="text-xl font-bold text-amber-800 mb-3 text-center">{title}</h3>
      <p className="text-gray-600 mb-5 text-center">{description}</p>
      <div className="flex justify-center">
        <Button
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
          asChild
        >
          <a href={buttonLink}>{buttonText}</a>
        </Button>
      </div>
    </div>
  )
}

