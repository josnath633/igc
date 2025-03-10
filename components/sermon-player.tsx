"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Pause } from "lucide-react"

interface SermonPlayerProps {
  title: string
  image: string
  duration: string
}

export default function SermonPlayer({ title, image, duration }: SermonPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex items-center bg-gray-50 rounded-md p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 mr-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-gray-800">{title}</h3>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">{duration}</span>
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
    </div>
  )
}

