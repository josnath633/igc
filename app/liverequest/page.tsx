"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { RequestFormAction } from "./action/request"
import { User, Briefcase, Check } from "lucide-react"

const RequestForm = () => {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [functionInChurch, setFunctionInChurch] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation des champs du formulaire
    if (!name || !surname || !functionInChurch) {
      setError("Tous les champs sont requis.")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Appel à l'action serveur pour envoyer la requête
      const response = await RequestFormAction({ name, surname, functionInChurch })

      if (response.success) {
        setIsSuccess(true)
        // Stocker le nom d'utilisateur dans localStorage pour la page d'attente
        localStorage.setItem("userName", name)

        // Rediriger après 2 secondes
        setTimeout(() => {
          router.push("/waiting")
        }, 2000)
      } else {
        setError(response.message || "Une erreur est survenue.")
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error)
      setError("Une erreur s'est produite. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-yellow-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-green-200 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Demande Envoyée!</h2>
            <p className="text-gray-600 mb-4">
              Votre demande a été soumise avec succès. Vous allez être redirigé vers la page d'attente.
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-full bg-green-500"
              />
            </div>
          </motion.div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg border border-yellow-200">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-black mb-6">Formulaire de Demande</h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Entrez votre nom"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="surname"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Entrez votre prénom"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="functionInChurch" className="block text-sm font-medium text-gray-700">
                  Fonction dans l'église
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="functionInChurch"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                    value={functionInChurch}
                    onChange={(e) => setFunctionInChurch(e.target.value)}
                    placeholder="Entrez votre fonction"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-600 transition-all duration-300 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Traitement en cours...
                  </>
                ) : (
                  "Envoyer la demande"
                )}
              </motion.button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default RequestForm
