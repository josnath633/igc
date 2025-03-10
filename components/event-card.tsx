import Image from "next/image"
import { Calendar, Clock } from "lucide-react"

interface EventCardProps {
  image: string
  title: string
  date: string
  time: string
}

export default function EventCard({ image, title, date, time }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-3">{title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar size={14} className="mr-2 text-orange-500" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock size={14} className="mr-2 text-orange-500" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  )
}

