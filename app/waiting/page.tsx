"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { getRequestStatus } from "./action/requestStatusAction"
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const WaitingPage = () => {
  const { data: session, status: sessionStatus } = useSession()
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  const userEmail = session?.user?.email || null

  // Progress bar simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1))
    }, 300)
    return () => clearInterval(interval)
  }, [])

  // Status checking logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let intervalId: NodeJS.Timeout

    const checkRequestStatus = async () => {
      if (!userEmail) {
        setError("Utilisateur non connecté.")
        return
      }

      try {
        const userStatus = await getRequestStatus(userEmail)
        console.log("Statut reçu:", userStatus)

        if (userStatus === "APPROVED") {
          setStatus("APPROVED")
          setTimeout(() => router.push("/live"), 2000) // Redirige vers la page live après 2 secondes
        } else if (userStatus === "REJECTED") {
          setStatus("REJECTED")
        } else {
          setStatus("PENDING")
        }
      } catch (err) {
        console.error("Erreur lors de la vérification du statut :", err)
        setError("Impossible de vérifier le statut pour le moment.")
      }
    }

    if (sessionStatus === "authenticated") {
      checkRequestStatus() // Vérifie immédiatement au chargement

      // Vérifie à intervalles réguliers (toutes les 10 secondes)
      intervalId = setInterval(checkRequestStatus, 10000)
    }

    // Nettoyage des intervalle et timeout lorsque le composant est démonté
    return () => {
      clearInterval(intervalId)
      clearTimeout(intervalId)
    }
  }, [userEmail, sessionStatus, router])

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-yellow-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-yellow-200"
      >
        {!session && sessionStatus !== "loading" ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Non connecté</h2>
            <p className="text-gray-600 mb-4">Veuillez vous connecter pour continuer.</p>
            <button
              onClick={() => router.push("/api/auth/signin")}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Se connecter
            </button>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Erreur</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => router.push("/request-form")}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retour au formulaire
            </button>
          </div>
        ) : status === "APPROVED" ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-green-600 mb-2">Demande Approuvée!</h2>
            <p className="text-gray-600 mb-4">
              Votre demande a été approuvée. Vous allez être redirigé vers la page de live.
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-full bg-green-500"
              />
            </div>
          </div>
        ) : status === "REJECTED" ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Demande Rejetée</h2>
            <p className="text-gray-600 mb-4">
              Votre demande a été rejetée. Veuillez contacter l’administrateur pour plus d’informations.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retour à l’accueil
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-yellow-600 mb-2">Demande en Attente</h2>
            <p className="text-gray-600 mb-4">
              Votre demande est en cours d’examen. Veuillez patienter pendant que l’administrateur l’examine.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Progression</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <motion.div style={{ width: `${progress}%` }} className="h-full bg-yellow-500" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Cette page se rafraîchit automatiquement. Vous n’avez pas besoin de la recharger.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default WaitingPage
