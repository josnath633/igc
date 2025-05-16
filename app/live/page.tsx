"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { getYouTubeConfig } from "@/lib/firebase"
import { Send, ThumbsUp, MessageSquare, Share2, User } from "lucide-react"
import { createComment } from "./actions/comments"
import { getRequestStatus } from "./actions/request"

interface YouTubeConfig {
  apiKey: string
  videoId: string
}

interface VideoData {
  id: string
  snippet: {
    title: string
    description: string
  }
  statistics: {
    viewCount: string
    likeCount: string
  }
}

interface Comment {
  id: string
  text: string
  author: string
  timestamp: Date
}


export default function Page(){

  const [videoData, setVideoData] = useState<VideoData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [comment, setComment] = useState<string>("")
  const [comments, setComments] = useState<Comment[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const [userName, setUserName] = useState<string>("Anonyme")
  const [userEmail, setUserEmail] = useState<string>("")
  const router = useRouter()

  // Récupère les infos utilisateur depuis le localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "Anonyme"
    const storedEmail = localStorage.getItem("userEmail") || ""

    setUserName(storedName)
    setUserEmail(storedEmail)
  }, [])

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      const text = comment.trim()
      setComment("")

      try {
        const savedComment = await createComment({ text, author: userName })

        if ("error" in savedComment) {
          console.error("Erreur:", savedComment.error)
          return
        }

        setComments((prev) => [
          {
            id: savedComment.id,
            text: savedComment.text,
            author: savedComment.author,
            timestamp: new Date(savedComment.timestamp),
          },
          ...prev,
        ])
      } catch (err) {
        console.error("Erreur lors de l’envoi du commentaire :", err)
      }
    }
  }

  const handleLike = () => {
    setIsLiked((prev) => !prev)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const status = await getRequestStatus(userEmail)
        if (status !== "APPROVED") router.push("/")
      } catch (err) {
        console.error("Erreur lors de la vérification du statut :", err)
        router.push("/")
      }
    }

    if (userEmail) {
      checkAccess()
    }
  }, [userEmail, router])

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const APPROVED = await getRequestStatus(userEmail)
        if (!APPROVED) {
          router.push('/')
          return
        }

        setIsLoading(true)
        const config = await getYouTubeConfig()
        if (config?.apiKey && config?.videoId) {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${config.videoId}&key=${config.apiKey}`
          )
          const data = await response.json()

          if (data.items?.length > 0) {
            setVideoData(data.items[0])
            setLikeCount(parseInt(data.items[0].statistics.likeCount || "0"))
          } else {
            setError("Aucune vidéo trouvée.")
          }
        } else {
          setError("Clé API ou Video ID non trouvée.")
        }
      } catch (err) {
        setError("Erreur de récupération des données.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideoData()
  }, [userEmail, router])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comments")
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires :", error)
      }
    }

    const interval = setInterval(() => {
      fetchComments()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-yellow-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-red-600 rounded-full animate-spin mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Chargement du live...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-yellow-50">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-red-200 max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Erreur</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50">
      {videoData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto p-4 md:p-6">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold mb-6 text-center text-black"
          >
            {videoData.snippet.title}
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Video Section */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1 lg:w-2/3"
            >
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoData.id}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 bg-white p-4 rounded-xl shadow-md border border-yellow-200">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleLike}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${isLiked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} transition-colors`}
                    >
                      <ThumbsUp className={`h-5 w-5 ${isLiked ? "fill-red-600 text-red-600" : ""}`} />
                      <span>{likeCount}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>{comments.length}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                      <span>Partager</span>
                    </motion.button>
                  </div>

                  <div className="text-gray-600 text-sm">
                    {parseInt(videoData.statistics.viewCount).toLocaleString()} vues
                  </div>
                </div>

                <div className="text-gray-700 text-sm md:text-base">
                  <p className="whitespace-pre-line">{videoData.snippet.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Chat Section */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="lg:w-1/3 flex flex-col"
            >
              <div className="bg-white rounded-xl shadow-md border border-yellow-200 flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-yellow-200 bg-yellow-50">
                  <h3 className="text-lg font-bold text-black flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-yellow-600" />
                    Discussion en direct
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-3 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="bg-yellow-100 rounded-full p-1">
                          <User className="h-4 w-4 text-yellow-600" />
                        </div>
                        <span className="font-medium text-sm text-gray-700">{comment.author}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-yellow-200 bg-yellow-50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Écrivez un commentaire..."
                      className="flex-1 px-3 py-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onKeyPress={(e) => e.key === "Enter" && handleCommentSubmit()}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCommentSubmit}
                      className="bg-gradient-to-r from-red-600 to-red-500 text-white p-2 rounded-lg hover:from-red-700 hover:to-red-600 transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
