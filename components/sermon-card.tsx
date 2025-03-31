"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface SermonProps {
  title: string
  preacher?: string
  date?: string
  duration: string
  audioUrl: string
}

export function SermonCard({ title, preacher, date, duration, audioUrl }: SermonProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration2, setDuration2] = useState(0)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audioElement = new Audio(audioUrl)
    setAudio(audioElement)

    audioElement.addEventListener("timeupdate", () => {
      setCurrentTime(audioElement.currentTime)
    })

    audioElement.addEventListener("loadedmetadata", () => {
      setDuration2(audioElement.duration)
    })

    audioElement.addEventListener("ended", () => {
      setIsPlaying(false)
    })

    return () => {
      audioElement.pause()
      audioElement.src = ""
      audioElement.remove()
    }
  }, [audioUrl])

  const handlePlayPause = () => {
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleSeek = (value: number[]) => {
    if (!audio) return
    const newTime = value[0]
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100 transition-all hover:border-amber-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-amber-800 mb-1">{title}</h3>
          <div className="text-gray-600 text-sm space-y-1">
            {preacher && <p>Par: {preacher}</p>}
            {date && <p>Date: {date}</p>}
            <p>Durée: {duration}</p>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-2">
            <Button
              onClick={handlePlayPause}
              size="sm"
              className={cn(
                "rounded-full w-10 h-10 p-0 flex items-center justify-center",
                isPlaying
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
              )}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>

            <div className="flex-1 flex items-center gap-2">
              <span className="text-xs text-gray-500 w-8">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration2 || 100}
                step={1}
                onValueChange={handleSeek}
                className="flex-1"
              />
              <span className="text-xs text-gray-500 w-8">{formatTime(duration2 || 0)}</span>
            </div>

            <Volume2 size={18} className="text-amber-700" />
          </div>
        </div>
      </div>
    </div>
  )
}

