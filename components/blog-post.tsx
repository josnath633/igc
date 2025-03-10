import Image from "next/image"
import { Calendar, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface BlogPostProps {
  image: string
  title: string
  date: string
  comments: number
  excerpt: string
}

export default function BlogPost({ image, title, date, comments, excerpt }: BlogPostProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="md:w-1/2 relative h-64 md:h-auto">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover rounded-md" />
      </div>
      <div className="md:w-1/2">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1 text-orange-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare size={14} className="mr-1 text-orange-500" />
            <span>{comments} commentaires</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <Link href="#">
          <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
            Lire Plus
          </Button>
        </Link>
      </div>
    </div>
  )
}

